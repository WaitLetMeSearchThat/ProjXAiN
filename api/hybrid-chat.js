function hasAny(text, keywords) {
  return keywords.some((kw) => text.includes(kw))
}

function isStudentSpecificQuery(text) {
  const normalized = String(text || '').toLowerCase()
  return hasAny(normalized, [
    'my grade',
    'my grades',
    'grade',
    'gpa',
    'gwa',
    'student id',
    'transcript',
    'tor',
    'subject grade',
    'record',
    'my account',
    'my profile',
    'grades ko',
    'tor ko',
    'grado',
    'marka'
  ])
}

function getLanguageInstruction(lang) {
  if (lang === 'tl') return 'Respond in Tagalog.'
  if (lang === 'hil') return 'Respond in Hiligaynon.'
  return 'Respond in English.'
}

function buildSystemPrompt(lang) {
  const languageInstruction = getLanguageInstruction(lang)
  return [
    'You are a public school portal assistant.',
    languageInstruction,
    'Stay aligned to these strict rules:',
    '1) Do not invent student records, grades, or personal data.',
    '2) If user asks student-specific info, require student ID + school email verification first.',
    '3) Keep answers concise and practical.',
    '4) Suggest next steps using existing portal services: Grade Inquiry, TOR/Prospectus, Document Requests, Enrollment Assistance, Student Records.',
    '5) Never ask for secrets like passwords.'
  ].join('\n')
}

async function callGemini(apiKey, systemPrompt, userPrompt) {
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
  const response = await fetch(`${endpoint}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 220
      }
    })
  })

  if (!response.ok) {
    const raw = await response.text()
    throw new Error(`Gemini request failed (${response.status}): ${raw}`)
  }

  const payload = await response.json()
  const reply = payload?.candidates?.[0]?.content?.parts
    ?.map((part) => part?.text || '')
    .join('')
    .trim()

  return reply || ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = req.body || {}
    const message = String(body.message || '').trim()
    const language = String(body.language || 'en').toLowerCase()
    const context = body.context || {}
    const isGuest = Boolean(context.isGuest)
    const isIdentityVerified = Boolean(context.isIdentityVerified)

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    if (isGuest && isStudentSpecificQuery(message) && !isIdentityVerified) {
      return res.status(200).json({
        source: 'policy',
        requiresVerification: true,
        reply: language === 'tl'
          ? 'Maaari kitang tulungan, pero kailangan muna ang verification gamit student ID at school email para sa student-specific data.'
          : language === 'hil'
            ? 'Mabuligan ta ikaw, pero kinahanglan anay verification gamit student ID kag school email para sa student-specific data.'
            : 'I can help, but student-specific data requires verification first using student ID and school email.',
        suggestions: language === 'en'
          ? ['Verify student ID', 'How to use Grade Inquiry?']
          : ['I-verify ang student ID', 'Paano ang Grade Inquiry?']
      })
    }

    const apiKey = process.env.GOOGLE_GENAI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing GOOGLE_GENAI_API_KEY' })
    }

    const systemPrompt = buildSystemPrompt(language)
    const contextBlock = JSON.stringify({
      role: context.isStudent ? 'student' : context.isGuest ? 'guest' : 'staff',
      activeFlow: context.activeServiceLock || '',
      step: context.conversationStep || 'root',
      verified: isIdentityVerified
    })

    const userPrompt = [
      'User message:',
      message,
      '',
      'Portal context:',
      contextBlock,
      '',
      'Respond with short helpful guidance and include 2-4 practical suggestions.'
    ].join('\n')

    const reply = await callGemini(apiKey, systemPrompt, userPrompt)
    const safeReply = reply || (
      language === 'tl'
        ? 'Paki-linaw pa ang tanong mo at tutulungan kita gamit ang available portal services.'
        : language === 'hil'
          ? 'Palihog klaruha pa ang pamangkot mo kag buligan ta ikaw gamit ang available portal services.'
          : 'Please clarify your request and I will guide you using the available portal services.'
    )

    return res.status(200).json({
      source: 'llm',
      requiresVerification: false,
      reply: safeReply
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Unable to generate fallback response at this time.'
    })
  }
}
