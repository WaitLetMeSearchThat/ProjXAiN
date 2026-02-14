import { db } from './src/firebase/config.js';
import { writeBatch, doc } from 'firebase/firestore';
import { COLLECTIONS } from './src/assets/constants.js';
import XLSX from 'xlsx';

const gradeFiles = [
  'C:/Users/COMPUTER/Downloads/(AY2025-26, 1st Sem) BSIS 1B, PROG 1(1).xlsx',
  'C:/Users/COMPUTER/Downloads/(AY2025-26, 1st Sem) BSIS 1C, PROG 1(1).xlsx',
  'C:/Users/COMPUTER/Downloads/(AY2025-26, 1st Sem) BSIS 1D, PROG 1(1).xlsx',
  'C:/Users/COMPUTER/Downloads/(AY2025-26, 1st Sem) BSIS 3F, DM 103(1)(1).xlsx'
];

const normalizeStudentId = (value) => String(value || '').replace(/\s+/g, '').toUpperCase();

function extractMeta(rows, headerIndex) {
  const metaRows = rows.slice(0, Math.max(0, headerIndex));
  return {
    subjectCode: findValue(metaRows, 'Subject Code:'),
    subjectTitle: findValue(metaRows, 'Subject Title:'),
    instructor: findValue(metaRows, 'Instructor:'),
    academicYear: findValue(metaRows, 'AY:'),
    semester: findValue(metaRows, 'Sem:'),
    programYearSection: findValue(metaRows, 'Prog/Yr/Sec:')
  };
}

function findValue(rows, label) {
  const target = String(label || '').toLowerCase();
  for (const row of rows) {
    const cells = row.map(cell => String(cell || '').trim());
    const idx = cells.findIndex(cell => cell.toLowerCase() === target);
    if (idx !== -1) {
      for (let i = idx + 1; i < cells.length; i++) {
        if (cells[i]) return cells[i];
      }
    }
  }
  return '';
}

function detectHeaders(rows) {
  if (!rows.length) return { headers: [], headerIndex: 0 };

  let bestIndex = 0;
  let bestScore = 0;

  rows.forEach((row, index) => {
    const cells = row.map(cell => String(cell || '').trim()).filter(Boolean);
    if (!cells.length) return;
    const joined = cells.join(' ').toLowerCase();
    const score =
      cells.length +
      (joined.includes('student') ? 2 : 0) +
      (joined.includes('id') ? 2 : 0) +
      (joined.includes('name') ? 1 : 0) +
      (joined.includes('grade') ? 1 : 0);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  const headers = (rows[bestIndex] || []).map(cell => String(cell || '').trim());
  return { headers, headerIndex: bestIndex };
}

function normalizeKey(key) {
  return String(key || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function extractValue(record, keys) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== '') {
      return record[key];
    }
  }
  return '';
}

function toNumberOrString(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const num = Number(raw);
  return Number.isFinite(num) ? num : raw;
}

function parseGradeSheet(filePath) {
  const workbook = XLSX.readFile(filePath);
  const grades = [];

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' });
    const { headers, headerIndex } = detectHeaders(rows);
    const meta = extractMeta(rows, headerIndex);
    const dataRows = rows.slice(headerIndex + 1);
    const normalizedHeaders = headers.map((header, idx) => ({
      raw: header || `Column ${idx + 1}`,
      key: normalizeKey(header || `column${idx + 1}`)
    }));

    dataRows.forEach((row) => {
      const record = {};
      normalizedHeaders.forEach((header, idx) => {
        record[header.key] = row[idx];
      });

      const studentId = extractValue(record, [
        'studentid', 'studentno', 'studentnumber', 'idnumber', 'idno', 'id'
      ]);
      const studentName = extractValue(record, [
        'studentname', 'name', 'fullname', 'fullnamer'
      ]);
      const midtermGrade = extractValue(record, ['midtermgrade', 'midterm']);
      const finalTermGrade = extractValue(record, ['finaltermgrade', 'finalterm']);
      const finalGrade = extractValue(record, ['finalgrade', 'final', 'grade']);
      const remarks = extractValue(record, ['remarks', 'remark']);

      if (studentId || studentName || finalGrade || remarks) {
        grades.push({
          studentId: String(studentId || '').trim(),
          studentIdNormalized: normalizeStudentId(studentId),
          studentName: String(studentName || '').trim(),
          subjectCode: meta.subjectCode,
          subjectTitle: meta.subjectTitle,
          academicYear: meta.academicYear,
          semester: meta.semester,
          programYearSection: meta.programYearSection,
          instructor: meta.instructor,
          midtermGrade: toNumberOrString(midtermGrade),
          finalTermGrade: toNumberOrString(finalTermGrade),
          finalGrade: toNumberOrString(finalGrade),
          remarks: String(remarks || '').trim(),
          source: `${filePath} (${sheetName})`,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
  });

  return grades;
}

async function seedGradesFromFiles() {
  try {
    console.log('Seeding grades from Excel files...');
    const batch = writeBatch(db);
    let count = 0;

    for (const filePath of gradeFiles) {
      const grades = parseGradeSheet(filePath);
      grades.forEach((grade) => {
        const docRef = doc(db, COLLECTIONS.GRADES, `${grade.studentId}_${count + 1}`);
        batch.set(docRef, grade);
        count += 1;
      });
    }

    await batch.commit();
    console.log(`Successfully seeded ${count} grade records from files.`);
  } catch (error) {
    console.error('Error seeding grades from files:', error);
  }
}

if (process.argv[2] === '--run') {
  seedGradesFromFiles();
}

export { seedGradesFromFiles };
