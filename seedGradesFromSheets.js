import { db } from './src/firebase/config.js';
import { writeBatch, doc, collection, getDocs, query, where } from 'firebase/firestore';
import XLSX from 'xlsx';
import {
  COLLECTIONS,
  GRADE_FIELDS,
  GRADE_REMARKS,
  SEMESTERS,
  CURRENT_SUBJECT,
  CURRENT_INSTRUCTOR
} from './src/assets/constants.js';

const DEFAULT_CSV_PATH = './data/dm103-grades.csv';
const SUBJECT_CODE_RAW = 'DM 103';
const SUBJECT_CODE_NORMALIZED = SUBJECT_CODE_RAW.replace(/\s+/g, '').toUpperCase();

const toNumber = (value) => {
  if (value === null || value === undefined) return 0;
  const raw = String(value).trim();
  if (!raw) return 0;
  const num = Number(raw);
  return Number.isFinite(num) ? num : 0;
};

const normalizeStudentId = (value) => String(value || '').replace(/\s+/g, '').toUpperCase();

// Map row to minimal grade record (only grades, section, and student id)
// New format: STUDENT_ID, STUDENT_NAME, GRADE, SECTION, STATUS
const mapRowToGrade = (row) => {
  const studentId = String(row.STUDENT_ID || '').trim();
  const studentName = String(row.STUDENT_NAME || '').trim();
  const programYearSection = String(row.SECTION || '').trim();
  const finalGrade = toNumber(row.GRADE);
  const status = String(row.STATUS || '').trim().toUpperCase();
  const remarks = status === 'PASS' ? GRADE_REMARKS.PASSED : GRADE_REMARKS.FAILED;

  // Return only the essential fields: grades, section, and student id
  return {
    [GRADE_FIELDS.STUDENT_ID]: studentId,
    studentIdNormalized: normalizeStudentId(studentId),
    [GRADE_FIELDS.SUBJECT_CODE]: SUBJECT_CODE_RAW,
    [GRADE_FIELDS.SUBJECT_TITLE]: CURRENT_SUBJECT?.TITLE || 'Business Process Management (Using Oracle)',
    [GRADE_FIELDS.INSTRUCTOR_ID]: CURRENT_INSTRUCTOR?.FULL_NAME || 'SANTIAGO, FELICIANO L. JR, MSIT',
    [GRADE_FIELDS.ACADEMIC_YEAR]: '2025-2026',
    [GRADE_FIELDS.SEMESTER]: SEMESTERS.FIRST,
    [GRADE_FIELDS.PROGRAM_YR_SEC]: programYearSection,
    [GRADE_FIELDS.MIDTERM_GRADE]: '',
    [GRADE_FIELDS.FINAL_TERM_GRADE]: '',
    [GRADE_FIELDS.FINAL_GRADE]: finalGrade,
    [GRADE_FIELDS.REMARKS]: remarks,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

const parseCsvRows = (filePath) => {
  const workbook = XLSX.readFile(filePath, { raw: false, defval: '' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet, { defval: '' });
};

const chunkArray = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

async function deleteExistingDm103Grades() {
  const gradesRef = collection(db, COLLECTIONS.GRADES);
  const queries = [
    query(gradesRef, where('subjectCode', '==', 'DM 103')),
    query(gradesRef, where('subjectCode', '==', 'DM103'))
  ];

  const docsToDelete = [];
  for (const q of queries) {
    const snapshot = await getDocs(q);
    snapshot.forEach((docSnap) => docsToDelete.push(docSnap));
  }

  const batches = chunkArray(docsToDelete, 450).map((chunk) => {
    const batch = writeBatch(db);
    chunk.forEach((docSnap) => batch.delete(docSnap.ref));
    return batch.commit();
  });

  await Promise.all(batches);
  return docsToDelete.length;
}

async function seedGradesFromSheets(filePath) {
  try {
    console.log(`Reading grades from: ${filePath}`);
    const rows = parseCsvRows(filePath);
    const grades = rows.map(mapRowToGrade).filter((row) => row.studentId);

    console.log(`Found ${grades.length} rows. Deleting existing DM103 grades...`);
    const deletedCount = await deleteExistingDm103Grades();
    console.log(`Deleted ${deletedCount} existing DM103 grade records.`);

    console.log('Writing new grades (grades, section, student id only)...');
    const batches = chunkArray(grades, 450).map((chunk) => {
      const batch = writeBatch(db);
      chunk.forEach((grade) => {
        const gradeId = `${grade.studentId}_${SUBJECT_CODE_NORMALIZED}`;
        const docRef = doc(db, COLLECTIONS.GRADES, gradeId);
        batch.set(docRef, grade);
      });
      return batch.commit();
    });

    await Promise.all(batches);
    console.log(`Successfully seeded ${grades.length} grades (grades, section, student id only).`);
  } catch (error) {
    console.error('Error seeding grades from sheets:', error);
  }
}

if (process.argv[2] === '--run') {
  const filePath = process.argv[3] || DEFAULT_CSV_PATH;
  seedGradesFromSheets(filePath);
}

export { seedGradesFromSheets };
