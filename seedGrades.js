import { db } from './src/firebase/config.js';
import { writeBatch, doc } from 'firebase/firestore';
import { COLLECTIONS, GRADE_FIELDS, gradeUtils, SEMESTERS } from './src/assets/constants.js';
import { sampleStudents } from './seedStudents.js';
import { sampleSubjects } from './seedSubjects.js';
import { sampleInstructors } from './seedInstructors.js';

const sampleGrades = [];
const normalizeStudentId = (value) => String(value || '').replace(/\s+/g, '').toUpperCase();

// Seed a deterministic sample grade for student 21-1234 with email
const sampleStudent = sampleStudents.find((s) => s.studentId === '21-1234');
const sampleSubject = sampleSubjects[0];
const sampleInstructor = sampleInstructors[0];
if (sampleStudent && sampleSubject && sampleInstructor) {
  const midterm = 85;
  const finalTerm = 88;
  const finalGrade = gradeUtils.computeFinalGrade(midterm, finalTerm);
  const remarks = gradeUtils.getRemarks(finalGrade);

  const gradeRecord = {
    [GRADE_FIELDS.STUDENT_ID]: sampleStudent.studentId,
    studentName: sampleStudent.fullName,
    [GRADE_FIELDS.SUBJECT_CODE]: sampleSubject.code,
    [GRADE_FIELDS.SUBJECT_TITLE]: sampleSubject.title,
    [GRADE_FIELDS.INSTRUCTOR_ID]: sampleInstructor.instructorId,
    [GRADE_FIELDS.ACADEMIC_YEAR]: '2025-2026',
    [GRADE_FIELDS.SEMESTER]: SEMESTERS.FIRST,
    [GRADE_FIELDS.PROGRAM_YR_SEC]: `${sampleStudent.program} ${sampleStudent.yearLevel}-${sampleStudent.section}`,
    [GRADE_FIELDS.MIDTERM_GRADE]: midterm,
    [GRADE_FIELDS.FINAL_TERM_GRADE]: finalTerm,
    [GRADE_FIELDS.FINAL_GRADE]: finalGrade,
    [GRADE_FIELDS.REMARKS]: remarks,
    studentIdNormalized: normalizeStudentId(sampleStudent.studentId),
    [GRADE_FIELDS.DATE_ENCODED]: new Date(),
    [GRADE_FIELDS.DATE_MODIFIED]: new Date(),
    [GRADE_FIELDS.ENCODED_BY]: sampleInstructor.instructorId
  };

  const gradeId = `${sampleStudent.studentId}_${sampleSubject.code.replace(/\s+/g, '')}`;
  sampleGrades.push({ id: gradeId, data: gradeRecord });
}

// Helper to generate a random grade between min and max
const randomGrade = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

// Generate grades for each student
for (const student of sampleStudents) {
  // Assign 3-6 random subjects to each student
  const numberOfSubjects = Math.floor(Math.random() * 4) + 3;
  const shuffledSubjects = [...sampleSubjects].sort(() => 0.5 - Math.random());
  const selectedSubjects = shuffledSubjects.slice(0, numberOfSubjects);

  for (const subject of selectedSubjects) {
    const instructor = sampleInstructors[Math.floor(Math.random() * sampleInstructors.length)];
    
    // Generate scores
    const midterm = randomGrade(70, 98);
    const finalTerm = randomGrade(70, 98);
    const finalGrade = gradeUtils.computeFinalGrade(midterm, finalTerm);
    const remarks = gradeUtils.getRemarks(finalGrade);

    // Create grade record using constants
    const gradeRecord = {
      [GRADE_FIELDS.STUDENT_ID]: student.studentId,
      studentName: student.fullName,
      [GRADE_FIELDS.SUBJECT_CODE]: subject.code,
      [GRADE_FIELDS.SUBJECT_TITLE]: subject.title,
      [GRADE_FIELDS.INSTRUCTOR_ID]: instructor.instructorId,
      [GRADE_FIELDS.ACADEMIC_YEAR]: '2025-2026',
      [GRADE_FIELDS.SEMESTER]: SEMESTERS.FIRST,
      [GRADE_FIELDS.PROGRAM_YR_SEC]: `${student.program} ${student.yearLevel}-${student.section}`,
      [GRADE_FIELDS.MIDTERM_GRADE]: midterm,
      [GRADE_FIELDS.FINAL_TERM_GRADE]: finalTerm,
      [GRADE_FIELDS.FINAL_GRADE]: finalGrade,
      [GRADE_FIELDS.REMARKS]: remarks,
      studentIdNormalized: normalizeStudentId(student.studentId),
      [GRADE_FIELDS.DATE_ENCODED]: new Date(),
      [GRADE_FIELDS.DATE_MODIFIED]: new Date(),
      [GRADE_FIELDS.ENCODED_BY]: instructor.instructorId
    };

    // Create a deterministic ID for idempotency: studentId_subjectCode
    // Sanitize subject code for ID usage (remove spaces)
    const gradeId = `${student.studentId}_${subject.code.replace(/\s+/g, '')}`;

    sampleGrades.push({
      id: gradeId,
      data: gradeRecord
    });
  }
}

async function seedGrades() {
  try {
    console.log('Seeding grades...');

    // Process in batches of 500 (Firestore limit)
    const batchSize = 500;
    const batches = [];
    
    for (let i = 0; i < sampleGrades.length; i += batchSize) {
      const batch = writeBatch(db);
      const chunk = sampleGrades.slice(i, i + batchSize);
      
      chunk.forEach(item => {
        const docRef = doc(db, COLLECTIONS.GRADES, item.id);
        batch.set(docRef, item.data);
      });
      
      batches.push(batch.commit());
    }

    await Promise.all(batches);
    console.log(`Successfully seeded ${sampleGrades.length} grades`);
  } catch (error) {
    console.error('Error seeding grades:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedGrades();
}

export { seedGrades, sampleGrades };
