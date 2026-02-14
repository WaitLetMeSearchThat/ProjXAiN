<template>
  <div class="learning-platform">
    <!-- Navigation Tabs -->
    <div class="tabs">
      <button 
        @click="activeTab = 'introduction'"
        :class="{ active: activeTab === 'introduction' }"
        class="tab-btn"
      >
        📚 Introduction
      </button>
      <button 
        @click="activeTab = 'interactive'"
        :class="{ active: activeTab === 'interactive' }"
        class="tab-btn"
      >
        💻 Interactive Lab
      </button>
      <button 
        @click="activeTab = 'advanced'"
        :class="{ active: activeTab === 'advanced' }"
        class="tab-btn"
      >
        ⚡ Advanced Topics
      </button>
      <button 
        @click="activeTab = 'quiz'"
        :class="{ active: activeTab === 'quiz' }"
        class="tab-btn"
      >
        🎯 Assessment Quiz
      </button>
    </div>

    <!-- Introduction Tab -->
    <div v-if="activeTab === 'introduction'" class="tab-content">
      <section class="hero">
        <h1>🚀 Complete Guide to HTML5 & CSS3</h1>
        <p class="subtitle">Master Modern Web Development Fundamentals</p>
        
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">100+</div>
            <div class="stat-label">Elements & Properties</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">30+</div>
            <div class="stat-label">Practical Examples</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">20</div>
            <div class="stat-label">Quiz Questions</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">Interactive</div>
            <div class="stat-label">Learning Lab</div>
          </div>
        </div>
      </section>

      <div class="content-grid">
        <!-- HTML Fundamentals -->
        <section class="topic-section">
          <div class="topic-header">
            <span class="topic-icon">📄</span>
            <h2>HTML5 Fundamentals</h2>
          </div>
          
          <div class="topic-content">
            <div class="concept-card">
              <h3>Document Structure</h3>
              <pre class="code-block"><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!-- Content goes here --&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            </div>

            <div class="concept-card">
              <h3>Semantic Elements</h3>
              <div class="semantic-grid">
                <div class="semantic-item">
                  <code>&lt;header&gt;</code>
                  <span>Page or section header</span>
                </div>
                <div class="semantic-item">
                  <code>&lt;nav&gt;</code>
                  <span>Navigation links</span>
                </div>
                <div class="semantic-item">
                  <code>&lt;main&gt;</code>
                  <span>Primary content</span>
                </div>
                <div class="semantic-item">
                  <code>&lt;article&gt;</code>
                  <span>Independent content</span>
                </div>
                <div class="semantic-item">
                  <code>&lt;section&gt;</code>
                  <span>Thematic grouping</span>
                </div>
                <div class="semantic-item">
                  <code>&lt;aside&gt;</code>
                  <span>Related content</span>
                </div>
                <div class="semantic-item">
                  <code>&lt;footer&gt;</code>
                  <span>Page or section footer</span>
                </div>
                <div class="semantic-item">
                  <code>&lt;figure&gt;</code>
                  <span>Images with captions</span>
                </div>
              </div>
            </div>

            <div class="concept-card">
              <h3>Essential HTML Tags</h3>
              <div class="tags-table">
                <div class="table-row header">
                  <div>Tag</div>
                  <div>Purpose</div>
                  <div>Example</div>
                </div>
                <div class="table-row">
                  <div><code>&lt;h1&gt;-&lt;h6&gt;</code></div>
                  <div>Headings</div>
                  <div><code>&lt;h1&gt;Main Title&lt;/h1&gt;</code></div>
                </div>
                <div class="table-row">
                  <div><code>&lt;p&gt;</code></div>
                  <div>Paragraphs</div>
                  <div><code>&lt;p&gt;Some text...&lt;/p&gt;</code></div>
                </div>
                <div class="table-row">
                  <div><code>&lt;a&gt;</code></div>
                  <div>Hyperlinks</div>
                  <div><code>&lt;a href="#"&gt;Link&lt;/a&gt;</code></div>
                </div>
                <div class="table-row">
                  <div><code>&lt;img&gt;</code></div>
                  <div>Images</div>
                  <div><code>&lt;img src="image.jpg" alt="description"&gt;</code></div>
                </div>
                <div class="table-row">
                  <div><code>&lt;ul&gt;/&lt;ol&gt;</code></div>
                  <div>Lists</div>
                  <div><code>&lt;li&gt;Item&lt;/li&gt;</code></div>
                </div>
                <div class="table-row">
                  <div><code>&lt;div&gt;</code></div>
                  <div>Container</div>
                  <div><code>&lt;div class="container"&gt;&lt;/div&gt;</code></div>
                </div>
                <div class="table-row">
                  <div><code>&lt;span&gt;</code></div>
                  <div>Inline container</div>
                  <div><code>&lt;span class="highlight"&gt;&lt;/span&gt;</code></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CSS Fundamentals -->
        <section class="topic-section">
          <div class="topic-header">
            <span class="topic-icon">🎨</span>
            <h2>CSS3 Fundamentals</h2>
          </div>

          <div class="topic-content">
            <div class="concept-card">
              <h3>CSS Syntax & Selectors</h3>
              <div class="syntax-example">
                <pre class="code-block"><code>selector {
  property: value;
  property: value;
}</code></pre>
                <div class="selector-types">
                  <h4>Selector Types:</h4>
                  <ul>
                    <li><strong>Element:</strong> <code>div { }</code></li>
                    <li><strong>Class:</strong> <code>.classname { }</code></li>
                    <li><strong>ID:</strong> <code>#idname { }</code></li>
                    <li><strong>Attribute:</strong> <code>[type="text"] { }</code></li>
                    <li><strong>Pseudo-class:</strong> <code>:hover { }</code></li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="concept-card">
              <h3>Box Model</h3>
              <div class="box-model-demo">
                <div class="box-model-visual">
                  <div class="margin">Margin</div>
                  <div class="border">Border</div>
                  <div class="padding">Padding</div>
                  <div class="content">Content</div>
                </div>
                <div class="box-model-code">
                  <pre><code>.element {
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 2px solid #333;
  margin: 30px;
}</code></pre>
                  <p class="formula">Total Width = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right</p>
                </div>
              </div>
            </div>

            <div class="concept-card">
              <h3>Flexbox & Grid</h3>
              <div class="layout-comparison">
                <div class="layout-option">
                  <h4>Flexbox (1D Layout)</h4>
                  <pre><code>.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}</code></pre>
                </div>
                <div class="layout-option">
                  <h4>CSS Grid (2D Layout)</h4>
                  <pre><code>.container {
  display: grid;
  grid-template-columns: 
    repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Interactive Lab Tab -->
    <div v-if="activeTab === 'interactive'" class="tab-content">
      <section class="lab-intro">
        <h2>💻 Interactive Code Lab</h2>
        <p>Write HTML and CSS code and see instant results!</p>
      </section>

      <div class="lab-container">
        <div class="code-panels">
          <!-- HTML Editor -->
          <div class="code-panel">
            <div class="panel-header">
              <h3>HTML Editor</h3>
              <div class="panel-actions">
                <button @click="insertTemplate('html')" class="action-btn">
                  Insert Template
                </button>
                <button @click="formatCode('html')" class="action-btn">
                  Format
                </button>
                <button @click="clearCode('html')" class="action-btn clear">
                  Clear
                </button>
              </div>
            </div>
            <textarea 
              v-model="htmlCode" 
              class="code-editor"
              placeholder="Write your HTML here..."
              @input="updatePreview"
            ></textarea>
            <div class="snippets">
              <h4>Quick Snippets:</h4>
              <div class="snippet-buttons">
                <button 
                  v-for="snippet in htmlSnippets" 
                  :key="snippet.name"
                  @click="insertSnippet(snippet, 'html')"
                  class="snippet-btn"
                >
                  {{ snippet.name }}
                </button>
              </div>
            </div>
          </div>

          <!-- CSS Editor -->
          <div class="code-panel">
            <div class="panel-header">
              <h3>CSS Editor</h3>
              <div class="panel-actions">
                <button @click="insertTemplate('css')" class="action-btn">
                  Insert Template
                </button>
                <button @click="formatCode('css')" class="action-btn">
                  Format
                </button>
                <button @click="clearCode('css')" class="action-btn clear">
                  Clear
                </button>
              </div>
            </div>
            <textarea 
              v-model="cssCode" 
              class="code-editor"
              placeholder="Write your CSS here..."
              @input="updatePreview"
            ></textarea>
            <div class="snippets">
              <h4>Quick Snippets:</h4>
              <div class="snippet-buttons">
                <button 
                  v-for="snippet in cssSnippets" 
                  :key="snippet.name"
                  @click="insertSnippet(snippet, 'css')"
                  class="snippet-btn"
                >
                  {{ snippet.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="preview-panel">
          <div class="panel-header">
            <h3>Live Preview</h3>
            <div class="panel-actions">
              <button @click="refreshPreview" class="action-btn">
                🔄 Refresh
              </button>
              <button @click="toggleDeviceView" class="action-btn">
                {{ deviceView === 'desktop' ? '📱 Mobile' : '🖥️ Desktop' }}
              </button>
            </div>
          </div>
          <div 
            class="preview-frame" 
            :class="deviceView"
            ref="previewFrame"
          >
            <iframe 
              :srcdoc="iframeContent" 
              class="iframe-preview"
            ></iframe>
          </div>
          <div class="console-output">
            <h4>Console Output:</h4>
            <div class="console-logs">
              <div 
                v-for="(log, index) in consoleLogs" 
                :key="index"
                class="log-entry"
                :class="log.type"
              >
                {{ log.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Topics Tab -->
    <div v-if="activeTab === 'advanced'" class="tab-content">
      <section class="advanced-intro">
        <h2>⚡ Advanced Web Development Topics</h2>
        <p>Take your skills to the next level with modern techniques</p>
      </section>

      <div class="advanced-grid">
        <!-- Responsive Design -->
        <div class="advanced-card">
          <div class="advanced-icon">📱</div>
          <h3>Responsive Design</h3>
          <ul>
            <li>Mobile-first approach</li>
            <li>Fluid grids</li>
            <li>Flexible images</li>
            <li>Media queries</li>
          </ul>
          <div class="code-example">
            <pre><code>/* Mobile-first media query */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}</code></pre>
          </div>
        </div>

        <!-- CSS Variables -->
        <div class="advanced-card">
          <div class="advanced-icon">🎯</div>
          <h3>CSS Custom Properties</h3>
          <ul>
            <li>Theme switching</li>
            <li>Dynamic values</li>
            <li>Scoped variables</li>
            <li>Fallback values</li>
          </ul>
          <div class="code-example">
            <pre><code>:root {
  --primary-color: #4f46e5;
  --spacing-unit: 1rem;
  --border-radius: 8px;
}

.element {
  color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
}</code></pre>
          </div>
        </div>

        <!-- Flexbox Deep Dive -->
        <div class="advanced-card">
          <div class="advanced-icon">↔️</div>
          <h3>Flexbox Mastery</h3>
          <ul>
            <li>Flex containers & items</li>
            <li>Alignment properties</li>
            <li>Order control</li>
            <li>Flex-grow/shrink/basis</li>
          </ul>
          <div class="code-example">
            <pre><code>.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  flex: 1 0 200px;
  order: 2;
}</code></pre>
          </div>
        </div>

        <!-- Grid Deep Dive -->
        <div class="advanced-card">
          <div class="advanced-icon">🔳</div>
          <h3>CSS Grid Layout</h3>
          <ul>
            <li>Grid template areas</li>
            <li>Auto-fit vs auto-fill</li>
            <li>Grid placement</li>
            <li>Named grid lines</li>
          </ul>
          <div class="code-example">
            <pre><code>.grid-container {
  display: grid;
  grid-template-columns: 
    [sidebar-start] 250px 
    [sidebar-end main-start] 1fr 
    [main-end];
  grid-template-rows: 
    [header] auto 
    [main] 1fr 
    [footer] auto;
  gap: 20px;
}</code></pre>
          </div>
        </div>

        <!-- Animations -->
        <div class="advanced-card">
          <div class="advanced-icon">✨</div>
          <h3>CSS Animations</h3>
          <ul>
            <li>Transitions</li>
            <li>Keyframes</li>
            <li>Transformations</li>
            <li>Performance optimization</li>
          </ul>
          <div class="code-example">
            <pre><code>@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.element {
  animation: slideIn 0.3s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(45deg) scale(1.1);
}</code></pre>
          </div>
        </div>

        <!-- Accessibility -->
        <div class="advanced-card">
          <div class="advanced-icon">♿</div>
          <h3>Web Accessibility</h3>
          <ul>
            <li>Semantic HTML</li>
            <li>ARIA attributes</li>
            <li>Keyboard navigation</li>
            <li>Screen reader compatibility</li>
          </ul>
          <div class="code-example">
            <pre><code>&lt;nav aria-label="Main navigation"&gt;
  &lt;ul role="menubar"&gt;
    &lt;li role="none"&gt;
      &lt;a href="#" role="menuitem"&gt;Home&lt;/a&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Quiz Tab -->
    <div v-if="activeTab === 'quiz'" class="tab-content">
      <section class="quiz-intro">
        <h2>🎯 HTML & CSS Assessment Quiz</h2>
        <div class="quiz-stats">
          <div class="stat">
            <span class="stat-value">{{ currentQuestion + 1 }}</span>
            <span class="stat-label">of {{ quizQuestions.length }}</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ score }}/{{ quizQuestions.length }}</span>
            <span class="stat-label">Score</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ timer }}</span>
            <span class="stat-label">seconds</span>
          </div>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }"
          ></div>
        </div>
      </section>

      <div class="quiz-container" v-if="!quizCompleted">
        <div class="question-card">
          <div class="question-header">
            <span class="question-number">Question {{ currentQuestion + 1 }}</span>
            <span class="question-difficulty" :class="currentQuestionObj.difficulty">
              {{ currentQuestionObj.difficulty }}
            </span>
          </div>
          
          <h3 class="question-text">{{ currentQuestionObj.question }}</h3>
          
          <div v-if="currentQuestionObj.codeSnippet" class="question-code">
            <pre><code>{{ currentQuestionObj.codeSnippet }}</code></pre>
          </div>

          <div class="options-grid">
            <div 
              v-for="(option, index) in currentQuestionObj.options" 
              :key="index"
              class="option-card"
              :class="{
                selected: selectedOption === index,
                correct: showResult && index === currentQuestionObj.correctAnswer,
                incorrect: showResult && selectedOption === index && index !== currentQuestionObj.correctAnswer
              }"
              @click="selectOption(index)"
            >
              <div class="option-letter">{{ String.fromCharCode(65 + index) }}</div>
              <div class="option-text">{{ option }}</div>
              <div v-if="showResult" class="option-feedback">
                <span v-if="index === currentQuestionObj.correctAnswer">✓ Correct</span>
                <span v-if="selectedOption === index && index !== currentQuestionObj.correctAnswer">✗ Incorrect</span>
              </div>
            </div>
          </div>

          <div class="question-explanation" v-if="showResult">
            <h4>📝 Explanation:</h4>
            <p>{{ currentQuestionObj.explanation }}</p>
          </div>

          <div class="quiz-controls">
            <button 
              @click="previousQuestion" 
              :disabled="currentQuestion === 0"
              class="control-btn"
            >
              ← Previous
            </button>
            
            <button 
              v-if="!showResult" 
              @click="submitAnswer"
              :disabled="selectedOption === null"
              class="control-btn submit"
            >
              Submit Answer
            </button>
            
            <button 
              v-else 
              @click="nextQuestion"
              class="control-btn next"
            >
              {{ currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question →' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Quiz Results -->
      <div v-if="quizCompleted" class="quiz-results">
        <div class="results-card">
          <div class="results-header">
            <h2>🎉 Quiz Completed!</h2>
            <div class="score-circle" :class="getScoreClass()">
              <div class="score-value">{{ score }}/{{ quizQuestions.length }}</div>
              <div class="score-percentage">{{ Math.round((score / quizQuestions.length) * 100) }}%</div>
            </div>
          </div>

          <div class="results-details">
            <div class="result-stat">
              <span class="stat-label">Time Taken</span>
              <span class="stat-value">{{ formatTime(timer) }}</span>
            </div>
            <div class="result-stat">
              <span class="stat-label">Correct Answers</span>
              <span class="stat-value">{{ score }}</span>
            </div>
            <div class="result-stat">
              <span class="stat-label">Incorrect Answers</span>
              <span class="stat-value">{{ quizQuestions.length - score }}</span>
            </div>
            <div class="result-stat">
              <span class="stat-label">Accuracy</span>
              <span class="stat-value">{{ Math.round((score / quizQuestions.length) * 100) }}%</span>
            </div>
          </div>

          <div class="results-breakdown">
            <h3>Questions Review</h3>
            <div class="questions-review">
              <div 
                v-for="(question, index) in quizQuestions" 
                :key="index"
                class="review-item"
                :class="userAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'"
              >
                <span class="review-number">Q{{ index + 1 }}</span>
                <span class="review-status">
                  {{ userAnswers[index] === question.correctAnswer ? '✓' : '✗' }}
                </span>
                <span class="review-text">{{ question.question.substring(0, 50) }}...</span>
                <button 
                  @click="reviewQuestion(index)"
                  class="review-btn"
                >
                  Review
                </button>
              </div>
            </div>
          </div>

          <div class="results-actions">
            <button @click="retakeQuiz" class="action-btn primary">
              🔄 Retake Quiz
            </button>
            <button @click="downloadResults" class="action-btn">
              📥 Download Results
            </button>
            <button @click="shareResults" class="action-btn">
              📤 Share Results
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtmlCssLearningPlatform',
  data() {
    return {
      activeTab: 'introduction',
      
      // Interactive Lab Data
      htmlCode: '',
      cssCode: '',
      deviceView: 'desktop',
      consoleLogs: [],
      
      // Quiz Data
      currentQuestion: 0,
      selectedOption: null,
      showResult: false,
      score: 0,
      timer: 0,
      quizCompleted: false,
      userAnswers: [],
      
      // HTML Snippets
      htmlSnippets: [
        { name: 'Basic Structure', code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>` },
        { name: 'Navigation', code: `<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>` },
        { name: 'Card Component', code: `<div class="card">
  <img src="https://via.placeholder.com/300" alt="Placeholder">
  <div class="card-content">
    <h3>Card Title</h3>
    <p>Card description goes here.</p>
    <button>Learn More</button>
  </div>
</div>` },
        { name: 'Form', code: `<form>
  <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <button type="submit">Submit</button>
</form>` }
      ],
      
      // CSS Snippets
      cssSnippets: [
        { name: 'Reset', code: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}` },
        { name: 'Flex Center', code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}` },
        { name: 'Grid Layout', code: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}` },
        { name: 'Button Style', code: `.btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
}` }
      ],

      // 20+ Quiz Questions
      quizQuestions: [
        {
          id: 1,
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
          ],
          correctAnswer: 0,
          explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.",
          difficulty: "easy",
          codeSnippet: null
        },
        {
          id: 2,
          question: "Which HTML element is used for the largest heading?",
          options: ["<h6>", "<heading>", "<h1>", "<head>"],
          correctAnswer: 2,
          explanation: "<h1> represents the most important heading, while <h6> represents the least important.",
          difficulty: "easy",
          codeSnippet: "<h1>Main Title</h1>\n<h2>Subheading</h2>"
        },
        {
          id: 3,
          question: "What is the correct HTML element for inserting a line break?",
          options: ["<break>", "<br>", "<lb>", "<newline>"],
          correctAnswer: 1,
          explanation: "The <br> tag inserts a single line break without starting a new paragraph.",
          difficulty: "easy",
          codeSnippet: "<p>First line<br>Second line</p>"
        },
        {
          id: 4,
          question: "What does CSS stand for?",
          options: [
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
          ],
          correctAnswer: 2,
          explanation: "CSS stands for Cascading Style Sheets, used for styling HTML elements.",
          difficulty: "easy",
          codeSnippet: null
        },
        {
          id: 5,
          question: "Which property is used to change the background color?",
          options: ["color", "bgcolor", "background-color", "bg-color"],
          correctAnswer: 2,
          explanation: "The 'background-color' property sets the background color of an element.",
          difficulty: "easy",
          codeSnippet: "body {\n  background-color: #f0f0f0;\n}"
        },
        {
          id: 6,
          question: "How do you select an element with id 'demo' in CSS?",
          options: [".demo", "#demo", "*demo", "demo"],
          correctAnswer: 1,
          explanation: "The '#' selector is used to select elements with a specific id.",
          difficulty: "easy",
          codeSnippet: "#demo {\n  color: red;\n}"
        },
        {
          id: 7,
          question: "Which HTML attribute specifies an alternate text for an image?",
          options: ["title", "src", "alt", "href"],
          correctAnswer: 2,
          explanation: "The 'alt' attribute provides alternative text for screen readers and when images fail to load.",
          difficulty: "medium",
          codeSnippet: '<img src="image.jpg" alt="Description of image">'
        },
        {
          id: 8,
          question: "Which property controls the text size?",
          options: ["text-style", "font-size", "text-size", "font-style"],
          correctAnswer: 1,
          explanation: "The 'font-size' property sets the size of the font.",
          difficulty: "easy",
          codeSnippet: "p {\n  font-size: 16px;\n}"
        },
        {
          id: 9,
          question: "What is the default display value for a <div> element?",
          options: ["inline", "block", "flex", "inline-block"],
          correctAnswer: 1,
          explanation: "<div> elements are block-level elements by default.",
          difficulty: "medium",
          codeSnippet: "div {\n  display: block;\n}"
        },
        {
          id: 10,
          question: "Which CSS property is used to change the font of an element?",
          options: ["font-family", "font-style", "font-weight", "text-font"],
          correctAnswer: 0,
          explanation: "The 'font-family' property specifies the font for an element.",
          difficulty: "easy",
          codeSnippet: "body {\n  font-family: Arial, sans-serif;\n}"
        },
        {
          id: 11,
          question: "How do you make a list that lists its items with bullets?",
          options: ["<ul>", "<ol>", "<dl>", "<list>"],
          correctAnswer: 0,
          explanation: "<ul> creates an unordered (bulleted) list, while <ol> creates an ordered (numbered) list.",
          difficulty: "easy",
          codeSnippet: "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>"
        },
        {
          id: 12,
          question: "What is the correct CSS syntax for making all paragraph text blue?",
          options: [
            "p {color: blue;}",
            "{p:color=blue;}",
            "p:color=blue;",
            "{p;color:blue;}"
          ],
          correctAnswer: 0,
          explanation: "CSS rules consist of a selector and a declaration block with property-value pairs.",
          difficulty: "easy",
          codeSnippet: "p {\n  color: blue;\n}"
        },
        {
          id: 13,
          question: "Which property is used to change the left margin of an element?",
          options: ["padding-left", "margin-left", "indent", "space-left"],
          correctAnswer: 1,
          explanation: "The 'margin-left' property sets the left margin of an element.",
          difficulty: "medium",
          codeSnippet: ".box {\n  margin-left: 20px;\n}"
        },
        {
          id: 14,
          question: "How do you select elements with class name 'test'?",
          options: ["test", "#test", ".test", "*test"],
          correctAnswer: 2,
          explanation: "The '.' selector is used to select elements with a specific class.",
          difficulty: "easy",
          codeSnippet: ".test {\n  border: 1px solid black;\n}"
        },
        {
          id: 15,
          question: "Which HTML element is used to define important text?",
          options: ["<important>", "<i>", "<strong>", "<b>"],
          correctAnswer: 2,
          explanation: "<strong> indicates that its contents have strong importance, while <b> is for stylistic bold.",
          difficulty: "medium",
          codeSnippet: "<p>This is <strong>very important</strong> text.</p>"
        },
        {
          id: 16,
          question: "Which CSS property controls the space between elements?",
          options: ["margin", "padding", "spacing", "gap"],
          correctAnswer: 3,
          explanation: "The 'gap' property explicitly controls spacing between grid or flex items.",
          difficulty: "hard",
          codeSnippet: ".container {\n  display: grid;\n  gap: 20px;\n}"
        },
        {
          id: 17,
          question: "What does the 'box-sizing: border-box' property do?",
          options: [
            "Includes padding and border in element's total width/height",
            "Excludes margin from element's total width/height",
            "Adds box shadow to element",
            "Creates a border around the element"
          ],
          correctAnswer: 0,
          explanation: "border-box includes padding and border in the element's total width and height.",
          difficulty: "hard",
          codeSnippet: "* {\n  box-sizing: border-box;\n}"
        },
        {
          id: 18,
          question: "Which CSS unit is relative to the font-size of the root element?",
          options: ["em", "rem", "px", "%"],
          correctAnswer: 1,
          explanation: "rem units are relative to the root element's font-size, while em is relative to parent.",
          difficulty: "hard",
          codeSnippet: "html {\n  font-size: 16px;\n}\n\n.element {\n  font-size: 1.5rem; /* 24px */\n}"
        },
        {
          id: 19,
          question: "What is the purpose of the HTML <meta> tag with name='viewport'?",
          options: [
            "To define the website's title",
            "To control page dimensions and scaling on mobile devices",
            "To link to external stylesheets",
            "To define character encoding"
          ],
          correctAnswer: 1,
          explanation: "The viewport meta tag controls how the webpage is displayed on mobile devices.",
          difficulty: "hard",
          codeSnippet: '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        },
        {
          id: 20,
          question: "Which CSS property creates a smooth transition between values?",
          options: ["animation", "transform", "transition", "keyframes"],
          correctAnswer: 2,
          explanation: "The 'transition' property enables smooth changes between CSS property values.",
          difficulty: "hard",
          codeSnippet: ".button {\n  transition: all 0.3s ease-in-out;\n}"
        },
        {
          id: 21,
          question: "What does z-index control in CSS?",
          options: [
            "The vertical stacking order of elements",
            "The horizontal position of elements",
            "The zoom level of elements",
            "The size of elements on the z-axis"
          ],
          correctAnswer: 0,
          explanation: "z-index controls the stacking order of positioned elements.",
          difficulty: "hard",
          codeSnippet: ".modal {\n  position: absolute;\n  z-index: 1000;\n}"
        },
        {
          id: 22,
          question: "Which HTML5 element represents a self-contained composition?",
          options: ["<section>", "<article>", "<div>", "<aside>"],
          correctAnswer: 1,
          explanation: "<article> represents a self-contained composition that could be distributed independently.",
          difficulty: "medium",
          codeSnippet: "<article>\n  <h2>Blog Post Title</h2>\n  <p>Content...</p>\n</article>"
        },
        {
          id: 23,
          question: "What is the purpose of CSS Grid's 'fr' unit?",
          options: [
            "Fixed ratio unit",
            "Fractional unit for distributing available space",
            "Font relative unit",
            "Frame unit for animations"
          ],
          correctAnswer: 1,
          explanation: "The 'fr' unit represents a fraction of the available space in the grid container.",
          difficulty: "hard",
          codeSnippet: ".grid {\n  grid-template-columns: 1fr 2fr 1fr;\n}"
        },
        {
          id: 24,
          question: "Which pseudo-class selects the first child of an element?",
          options: [":first", ":first-child", ":child-first", ":nth-child(1)"],
          correctAnswer: 1,
          explanation: ":first-child matches an element that is the first child of its parent.",
          difficulty: "medium",
          codeSnippet: "li:first-child {\n  font-weight: bold;\n}"
        }
      ]
    };
  },
  computed: {
    iframeContent() {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            ${this.cssCode}
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px;
              padding: 0;
            }
          </style>
        </head>
        <body>
          ${this.htmlCode || '<p>Start writing HTML to see the preview...</p>'}
          <script>
            // Console logging for preview
            console.log = function(message) {
              window.parent.postMessage({
                type: 'console',
                message: message
              }, '*');
            };
            console.error = function(message) {
              window.parent.postMessage({
                type: 'error',
                message: message
              }, '*');
            };
          <\/script>
        </body>
        </html>
      `;
    },
    currentQuestionObj() {
      return this.quizQuestions[this.currentQuestion];
    }
  },
  mounted() {
    // Start quiz timer
    this.startTimer();
    
    // Listen for iframe messages
    window.addEventListener('message', this.handleIframeMessage);
  },
  beforeUnmount() {
    // Cleanup
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    window.removeEventListener('message', this.handleIframeMessage);
  },
  methods: {
    // Interactive Lab Methods
    insertTemplate(type) {
      if (type === 'html') {
        this.htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Webpage</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="home">
      <h2>Home Section</h2>
      <p>This is the main content area.</p>
      <button class="btn">Click Me</button>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</body>
</html>`;
      } else {
        this.cssCode = `/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

header {
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

nav a {
  text-decoration: none;
  color: #4f46e5;
  font-weight: 600;
  transition: color 0.3s;
}

nav a:hover {
  color: #7c3aed;
}

main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
}

footer {
  text-align: center;
  padding: 2rem;
  color: white;
}`;
      }
      this.updatePreview();
    },
    
    formatCode(type) {
      if (type === 'html') {
        // Simple HTML formatting
        this.htmlCode = this.htmlCode
          .replace(/>\s+</g, '>\n<')
          .replace(/^\s+|\s+$/g, '');
      } else {
        // Simple CSS formatting
        this.cssCode = this.cssCode
          .replace(/\{/g, ' {\n  ')
          .replace(/\}/g, '\n}\n')
          .replace(/;/g, ';\n  ')
          .replace(/\n\s*\n/g, '\n');
      }
    },
    
    clearCode(type) {
      if (type === 'html') {
        this.htmlCode = '';
      } else {
        this.cssCode = '';
      }
      this.updatePreview();
    },
    
    insertSnippet(snippet, type) {
      if (type === 'html') {
        this.htmlCode += '\n' + snippet.code;
      } else {
        this.cssCode += '\n' + snippet.code;
      }
      this.updatePreview();
    },
    
    updatePreview() {
      this.consoleLogs.push({
        type: 'info',
        message: 'Preview updated at ' + new Date().toLocaleTimeString()
      });
    },
    
    refreshPreview() {
      this.consoleLogs.push({
        type: 'success',
        message: 'Preview refreshed'
      });
    },
    
    toggleDeviceView() {
      this.deviceView = this.deviceView === 'desktop' ? 'mobile' : 'desktop';
    },
    
    handleIframeMessage(event) {
      if (event.data.type === 'console') {
        this.consoleLogs.push({
          type: 'info',
          message: event.data.message
        });
      } else if (event.data.type === 'error') {
        this.consoleLogs.push({
          type: 'error',
          message: event.data.message
        });
      }
    },
    
    // Quiz Methods
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 1000);
    },
    
    selectOption(index) {
      if (!this.showResult) {
        this.selectedOption = index;
      }
    },
    
    submitAnswer() {
      this.showResult = true;
      this.userAnswers[this.currentQuestion] = this.selectedOption;
      
      if (this.selectedOption === this.currentQuestionObj.correctAnswer) {
        this.score++;
      }
    },
    
    nextQuestion() {
      if (this.currentQuestion < this.quizQuestions.length - 1) {
        this.currentQuestion++;
        this.selectedOption = null;
        this.showResult = false;
      } else {
        this.finishQuiz();
      }
    },
    
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        this.selectedOption = this.userAnswers[this.currentQuestion];
        this.showResult = true;
      }
    },
    
    finishQuiz() {
      this.quizCompleted = true;
      clearInterval(this.timerInterval);
    },
    
    retakeQuiz() {
      this.currentQuestion = 0;
      this.selectedOption = null;
      this.showResult = false;
      this.score = 0;
      this.timer = 0;
      this.quizCompleted = false;
      this.userAnswers = [];
      this.startTimer();
    },
    
    reviewQuestion(index) {
      this.currentQuestion = index;
      this.selectedOption = this.userAnswers[index];
      this.showResult = true;
      this.quizCompleted = false;
    },
    
    downloadResults() {
      const results = {
        score: this.score,
        total: this.quizQuestions.length,
        percentage: Math.round((this.score / this.quizQuestions.length) * 100),
        time: this.formatTime(this.timer),
        answers: this.userAnswers.map((answer, index) => ({
          question: this.quizQuestions[index].question,
          userAnswer: this.quizQuestions[index].options[answer],
          correctAnswer: this.quizQuestions[index].options[this.quizQuestions[index].correctAnswer],
          correct: answer === this.quizQuestions[index].correctAnswer
        }))
      };
      
      const dataStr = JSON.stringify(results, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'html-css-quiz-results.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    },
    
    shareResults() {
      const text = `I scored ${this.score}/${this.quizQuestions.length} (${Math.round((this.score/this.quizQuestions.length)*100)}%) on the HTML & CSS quiz! 🎯`;
      
      if (navigator.share) {
        navigator.share({
          title: 'HTML & CSS Quiz Results',
          text: text,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(text);
        alert('Results copied to clipboard!');
      }
    },
    
    getScoreClass() {
      const percentage = (this.score / this.quizQuestions.length) * 100;
      if (percentage >= 90) return 'excellent';
      if (percentage >= 70) return 'good';
      if (percentage >= 50) return 'average';
      return 'poor';
    },
    
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  }
};
</script>

<style scoped>
.learning-platform {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1rem;
}

/* Tabs Navigation */
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 1rem 2rem;
  border: none;
  background: white;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.tab-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.tab-btn.active {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
}

/* Common Tab Content */
.tab-content {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Introduction Tab Styles */
.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 20px;
  color: white;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.content-grid {
  display: grid;
  gap: 2rem;
}

.topic-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.topic-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.topic-icon {
  font-size: 2rem;
}

.topic-content {
  display: grid;
  gap: 2rem;
}

.concept-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1.5rem;
}

.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

.semantic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.semantic-item {
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
}

.semantic-item code {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4f46e5;
}

.tags-table {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;
}

.table-row.header {
  font-weight: bold;
  background: #f8fafc;
  border-radius: 8px 8px 0 0;
}

/* Box Model Demo */
.box-model-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1rem;
}

.box-model-visual {
  position: relative;
  height: 200px;
}

.box-model-visual > div {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
}

.margin {
  border: 2px dashed #ef4444;
  width: 100%;
  height: 100%;
  color: #ef4444;
}

.border {
  border: 2px solid #f59e0b;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  color: #f59e0b;
}

.padding {
  background: #dbeafe;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  color: #1d4ed8;
}

.content {
  background: #bbf7d0;
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  color: #065f46;
}

.formula {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  margin-top: 1rem;
}

/* Interactive Lab Styles */
.lab-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.code-panels {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.code-panel, .preview-panel {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.panel-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #7c3aed;
  transform: translateY(-2px);
}

.action-btn.clear {
  background: #ef4444;
}

.code-editor {
  width: 100%;
  height: 300px;
  padding: 1.5rem;
  border: none;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  background: #1e1e1e;
  color: #d4d4d4;
}

.snippets {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.snippet-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.snippet-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #4f46e5;
  background: white;
  color: #4f46e5;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.snippet-btn:hover {
  background: #4f46e5;
  color: white;
}

.preview-frame {
  height: 400px;
  border: none;
}

.preview-frame.desktop {
  width: 100%;
}

.preview-frame.mobile {
  width: 375px;
  margin: 0 auto;
  border-radius: 20px;
  border: 10px solid #333;
  overflow: hidden;
}

.iframe-preview {
  width: 100%;
  height: 100%;
  border: none;
}

.console-output {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.console-logs {
  max-height: 150px;
  overflow-y: auto;
  background: #1e1e1e;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.5rem;
}

.log-entry {
  padding: 0.5rem;
  border-bottom: 1px solid #333;
  font-family: monospace;
  font-size: 12px;
}

.log-entry.info {
  color: #60a5fa;
}

.log-entry.error {
  color: #f87171;
}

.log-entry.success {
  color: #34d399;
}

/* Advanced Topics Styles */
.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.advanced-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.advanced-card:hover {
  transform: translateY(-5px);
}

.advanced-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.advanced-card ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.advanced-card li {
  margin-bottom: 0.5rem;
}

.code-example {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Quiz Styles */
.quiz-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: #4f46e5;
}

.stat-label {
  font-size: 0.9rem;
  color: #6b7280;
}

.progress-bar {
  height: 10px;
  background: #e5e7eb;
  border-radius: 5px;
  overflow: hidden;
  margin: 2rem 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
  transition: width 0.3s ease;
}

.question-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  max-width: 800px;
  margin: 0 auto;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.question-number {
  font-weight: bold;
  color: #4f46e5;
}

.question-difficulty {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.question-difficulty.easy {
  background: #d1fae5;
  color: #065f46;
}

.question-difficulty.medium {
  background: #fef3c7;
  color: #92400e;
}

.question-difficulty.hard {
  background: #fee2e2;
  color: #991b1b;
}

.question-text {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.question-code {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1.5rem 0;
  overflow-x: auto;
}

.options-grid {
  display: grid;
  gap: 1rem;
  margin: 2rem 0;
}

.option-card {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.option-card:hover {
  border-color: #4f46e5;
  background: #f8fafc;
}

.option-card.selected {
  border-color: #4f46e5;
  background: #e0e7ff;
}

.option-card.correct {
  border-color: #10b981;
  background: #d1fae5;
}

.option-card.incorrect {
  border-color: #ef4444;
  background: #fee2e2;
}

.option-letter {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4f46e5;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  margin-right: 1rem;
}

.option-card.correct .option-letter {
  background: #10b981;
}

.option-card.incorrect .option-letter {
  background: #ef4444;
}

.option-feedback {
  margin-left: auto;
  font-weight: bold;
}

.option-card.correct .option-feedback {
  color: #10b981;
}

.option-card.incorrect .option-feedback {
  color: #ef4444;
}

.question-explanation {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 1.5rem;
}

.quiz-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.control-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn.submit {
  background: #4f46e5;
  color: white;
}

.control-btn.submit:hover:not(:disabled) {
  background: #7c3aed;
  transform: translateY(-2px);
}

.control-btn.next {
  background: #10b981;
  color: white;
}

.control-btn.next:hover {
  background: #34d399;
  transform: translateY(-2px);
}

/* Quiz Results */
.quiz-results {
  max-width: 800px;
  margin: 0 auto;
}

.results-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
}

.results-header {
  margin-bottom: 3rem;
}

.score-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  font-weight: bold;
}

.score-circle.excellent {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
}

.score-circle.good {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  color: white;
}

.score-circle.average {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: white;
}

.score-circle.poor {
  background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
  color: white;
}

.score-value {
  font-size: 2.5rem;
}

.score-percentage {
  font-size: 1rem;
  opacity: 0.9;
}

.results-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.result-stat {
  text-align: center;
}

.result-stat .stat-label {
  display: block;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.result-stat .stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4f46e5;
}

.questions-review {
  max-height: 300px;
  overflow-y: auto;
  margin: 2rem 0;
}

.review-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.review-item.correct {
  background: #f0fdf4;
}

.review-item.incorrect {
  background: #fef2f2;
}

.review-number {
  font-weight: bold;
  margin-right: 1rem;
  color: #4f46e5;
}

.review-status {
  margin-right: 1rem;
  font-size: 1.2rem;
}

.review-item.correct .review-status {
  color: #10b981;
}

.review-item.incorrect .review-status {
  color: #ef4444;
}

.review-text {
  flex: 1;
  text-align: left;
}

.review-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #4f46e5;
  background: white;
  color: #4f46e5;
  border-radius: 6px;
  cursor: pointer;
}

.review-btn:hover {
  background: #4f46e5;
  color: white;
}

.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.action-btn.primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .lab-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
  }
  
  .tab-btn {
    width: 100%;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .box-model-demo {
    grid-template-columns: 1fr;
  }
  
  .quiz-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .results-actions {
    flex-direction: column;
  }
  
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .panel-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>