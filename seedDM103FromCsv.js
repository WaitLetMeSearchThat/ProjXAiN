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

const DEFAULT_CSV_PATH = './data/dm103-final.csv';
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

const pickFinalGrade = (row) => {
  const adj97 = toNumber(row.INTERNAL_ADJUSTMENT_97);
  const adj95 = toNumber(row.INTERNAL_ADJUSTMENT_95);
  const adj8993 = toNumber(row.INTERNAL_ADJUSTMENT_89_93);
  const pass = toNumber(row.FINAL_PASS_INDICATOR);

  if (adj97) return 97;
  if (adj95) return 95;
  if (adj8993) return 91;
  return pass ? 75 : 70;
};

const mapRowToGrade = (row) => {
  const studentId = String(row.ID_NUMBER || '').trim();
  const studentName = String(row.STUDENT_NAME || '').trim();
  const programYearSection = String(row.SECTION || '').trim();
  const finalGrade = pickFinalGrade(row);
  const remarks = finalGrade >= 75 ? GRADE_REMARKS.PASSED : GRADE_REMARKS.FAILED;

  return {
    [GRADE_FIELDS.STUDENT_ID]: studentId,
    studentIdNormalized: normalizeStudentId(studentId),
    studentName,
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
    updatedAt: new Date(),
    dm103: {
      section: programYearSection,
      idNumber: studentId,
      studentName,
      mainFolderSubmission: toNumber(row.MAIN_FOLDER_SUBMISSION),
      lateFolderSubmission: toNumber(row.LATE_FOLDER_SUBMISSION),
      teamProject: toNumber(row.TEAM_PROJECT),
      individualWork: toNumber(row.INDIVIDUAL_WORK),
      technicalComplexity: toNumber(row.TECHNICAL_COMPLEXITY),
      professionalFilename: toNumber(row.PROFESSIONAL_FILENAME),
      finalVersionEvidence: toNumber(row.FINAL_VERSION_EVIDENCE),
      multipleFiles: toNumber(row.MULTIPLE_FILES),
      codeSubmission: toNumber(row.CODE_SUBMISSION),
      pdfFormat: toNumber(row.PDF_FORMAT),
      onTime: toNumber(row.ON_TIME),
      latePenaltyApplied: toNumber(row.LATE_PENALTY_APPLIED),
      internalAdjustment97: toNumber(row.INTERNAL_ADJUSTMENT_97),
      internalAdjustment95: toNumber(row.INTERNAL_ADJUSTMENT_95),
      internalAdjustment8993: toNumber(row.INTERNAL_ADJUSTMENT_89_93),
      finalPassIndicator: toNumber(row.FINAL_PASS_INDICATOR),
      projectTitle: String(row.PROJECT_TITLE || '').trim(),
      statusNotes: String(row.STATUS_NOTES || '').trim()
    }
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

async function upsertDm103Subject() {
  const subjectsRef = collection(db, COLLECTIONS.SUBJECTS);
  const snapshot = await getDocs(query(subjectsRef, where('code', 'in', ['DM 103', 'DM103'])));
  const payload = {
    code: SUBJECT_CODE_RAW,
    title: CURRENT_SUBJECT?.TITLE || 'Business Process Management (Using Oracle)',
    units: CURRENT_SUBJECT?.UNITS ?? 3,
    program: CURRENT_SUBJECT?.PROGRAM || 'BSIS',
    yearLevel: CURRENT_SUBJECT?.YEAR_LEVEL || '3',
    section: CURRENT_SUBJECT?.SECTION || 'F',
    isActive: true,
    updatedAt: new Date()
  };

  if (snapshot.empty) {
    const docRef = doc(subjectsRef);
    const batch = writeBatch(db);
    batch.set(docRef, { ...payload, id: docRef.id, createdAt: new Date() });
    await batch.commit();
    return 1;
  }

  const batch = writeBatch(db);
  snapshot.forEach((docSnap) => {
    batch.update(docSnap.ref, payload);
  });
  await batch.commit();
  return snapshot.size;
}

async function seedDm103FromCsv(filePath) {
  try {
    console.log(`Reading DM103 CSV: ${filePath}`);
    const rows = parseCsvRows(filePath);
    const grades = rows.map(mapRowToGrade).filter((row) => row.studentId);

    console.log(`Found ${grades.length} rows. Deleting existing DM103 grades...`);
    const deletedCount = await deleteExistingDm103Grades();
    console.log(`Deleted ${deletedCount} existing DM103 grade records.`);

    console.log('Upserting DM103 subject...');
    const subjectUpdates = await upsertDm103Subject();
    console.log(`Updated ${subjectUpdates} DM103 subject record(s).`);

    console.log('Writing new DM103 grades...');
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
    console.log(`Successfully seeded ${grades.length} DM103 grades.`);
  } catch (error) {
    console.error('Error seeding DM103 grades:', error);
  }
}

if (process.argv[2] === '--run') {
  const filePath = process.argv[3] || DEFAULT_CSV_PATH;
  seedDm103FromCsv(filePath);
}

export { seedDm103FromCsv };
