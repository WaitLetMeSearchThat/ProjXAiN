import { db } from './src/firebase/config.js';
import { writeBatch, doc } from 'firebase/firestore';
import { COLLECTIONS, INSTRUCTOR_FIELDS } from './src/assets/constants.js';

const sampleInstructors = [
  {
    [INSTRUCTOR_FIELDS.INSTRUCTOR_ID]: 'INST-001',
    [INSTRUCTOR_FIELDS.FULL_NAME]: 'SANTIAGO, FELICIANO L. JR',
    [INSTRUCTOR_FIELDS.LAST_NAME]: 'SANTIAGO',
    [INSTRUCTOR_FIELDS.FIRST_NAME]: 'FELICIANO',
    [INSTRUCTOR_FIELDS.MIDDLE_NAME]: 'L',
    [INSTRUCTOR_FIELDS.EXTENSION]: 'JR',
    [INSTRUCTOR_FIELDS.QUALIFICATIONS]: 'MSIT',
    [INSTRUCTOR_FIELDS.DEPARTMENT]: 'Information Systems',
    [INSTRUCTOR_FIELDS.EMAIL]: 'feliciano.santiago@school.edu.ph',
    [INSTRUCTOR_FIELDS.EMPLOYMENT_STATUS]: 'Full-time',
    [INSTRUCTOR_FIELDS.SPECIALIZATION]: 'Database Management',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    [INSTRUCTOR_FIELDS.INSTRUCTOR_ID]: 'INST-002',
    [INSTRUCTOR_FIELDS.FULL_NAME]: 'DELA CRUZ, MARIA ELENA R.',
    [INSTRUCTOR_FIELDS.LAST_NAME]: 'DELA CRUZ',
    [INSTRUCTOR_FIELDS.FIRST_NAME]: 'MARIA ELENA',
    [INSTRUCTOR_FIELDS.MIDDLE_NAME]: 'R',
    [INSTRUCTOR_FIELDS.EXTENSION]: '',
    [INSTRUCTOR_FIELDS.QUALIFICATIONS]: 'PhD Computer Science',
    [INSTRUCTOR_FIELDS.DEPARTMENT]: 'Computer Science',
    [INSTRUCTOR_FIELDS.EMAIL]: 'maria.delacruz@school.edu.ph',
    [INSTRUCTOR_FIELDS.EMPLOYMENT_STATUS]: 'Full-time',
    [INSTRUCTOR_FIELDS.SPECIALIZATION]: 'Artificial Intelligence',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    [INSTRUCTOR_FIELDS.INSTRUCTOR_ID]: 'INST-003',
    [INSTRUCTOR_FIELDS.FULL_NAME]: 'REYES, ANTONIO B.',
    [INSTRUCTOR_FIELDS.LAST_NAME]: 'REYES',
    [INSTRUCTOR_FIELDS.FIRST_NAME]: 'ANTONIO',
    [INSTRUCTOR_FIELDS.MIDDLE_NAME]: 'B',
    [INSTRUCTOR_FIELDS.EXTENSION]: '',
    [INSTRUCTOR_FIELDS.QUALIFICATIONS]: 'MS Information Technology',
    [INSTRUCTOR_FIELDS.DEPARTMENT]: 'Information Technology',
    [INSTRUCTOR_FIELDS.EMAIL]: 'antonio.reyes@school.edu.ph',
    [INSTRUCTOR_FIELDS.EMPLOYMENT_STATUS]: 'Part-time',
    [INSTRUCTOR_FIELDS.SPECIALIZATION]: 'Network Security',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    [INSTRUCTOR_FIELDS.INSTRUCTOR_ID]: 'INST-004',
    [INSTRUCTOR_FIELDS.FULL_NAME]: 'GARCIA, CARMEN D.',
    [INSTRUCTOR_FIELDS.LAST_NAME]: 'GARCIA',
    [INSTRUCTOR_FIELDS.FIRST_NAME]: 'CARMEN',
    [INSTRUCTOR_FIELDS.MIDDLE_NAME]: 'D',
    [INSTRUCTOR_FIELDS.EXTENSION]: '',
    [INSTRUCTOR_FIELDS.QUALIFICATIONS]: 'MLIS',
    [INSTRUCTOR_FIELDS.DEPARTMENT]: 'Library and Information Science',
    [INSTRUCTOR_FIELDS.EMAIL]: 'carmen.garcia@school.edu.ph',
    [INSTRUCTOR_FIELDS.EMPLOYMENT_STATUS]: 'Full-time',
    [INSTRUCTOR_FIELDS.SPECIALIZATION]: 'Digital Libraries',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    [INSTRUCTOR_FIELDS.INSTRUCTOR_ID]: 'INST-005',
    [INSTRUCTOR_FIELDS.FULL_NAME]: 'MARTINEZ, JOSE L.',
    [INSTRUCTOR_FIELDS.LAST_NAME]: 'MARTINEZ',
    [INSTRUCTOR_FIELDS.FIRST_NAME]: 'JOSE',
    [INSTRUCTOR_FIELDS.MIDDLE_NAME]: 'L',
    [INSTRUCTOR_FIELDS.EXTENSION]: '',
    [INSTRUCTOR_FIELDS.QUALIFICATIONS]: 'MS Computer Science',
    [INSTRUCTOR_FIELDS.DEPARTMENT]: 'Computer Science',
    [INSTRUCTOR_FIELDS.EMAIL]: 'jose.martinez@school.edu.ph',
    [INSTRUCTOR_FIELDS.EMPLOYMENT_STATUS]: 'Full-time',
    [INSTRUCTOR_FIELDS.SPECIALIZATION]: 'Software Engineering',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    [INSTRUCTOR_FIELDS.INSTRUCTOR_ID]: 'dev_instructor',
    [INSTRUCTOR_FIELDS.FULL_NAME]: 'DEVELOPER, INSTRUCTOR T.',
    [INSTRUCTOR_FIELDS.LAST_NAME]: 'DEVELOPER',
    [INSTRUCTOR_FIELDS.FIRST_NAME]: 'INSTRUCTOR',
    [INSTRUCTOR_FIELDS.MIDDLE_NAME]: 'T',
    [INSTRUCTOR_FIELDS.EXTENSION]: '',
    [INSTRUCTOR_FIELDS.QUALIFICATIONS]: 'MIT',
    [INSTRUCTOR_FIELDS.DEPARTMENT]: 'Information Systems',
    [INSTRUCTOR_FIELDS.EMAIL]: 'dev.instructor@bcc.edu.ph',
    [INSTRUCTOR_FIELDS.EMPLOYMENT_STATUS]: 'Full-time',
    [INSTRUCTOR_FIELDS.SPECIALIZATION]: 'System Testing',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    [INSTRUCTOR_FIELDS.INSTRUCTOR_ID]: 'DRmpYaPuqoOOKpy8YwbHQfRL8M03',
    [INSTRUCTOR_FIELDS.FULL_NAME]: 'INSTRUCTOR, DR.',
    [INSTRUCTOR_FIELDS.LAST_NAME]: 'INSTRUCTOR',
    [INSTRUCTOR_FIELDS.FIRST_NAME]: 'DR',
    [INSTRUCTOR_FIELDS.MIDDLE_NAME]: '',
    [INSTRUCTOR_FIELDS.EXTENSION]: '',
    [INSTRUCTOR_FIELDS.QUALIFICATIONS]: 'PhD',
    [INSTRUCTOR_FIELDS.DEPARTMENT]: 'Computer Science',
    [INSTRUCTOR_FIELDS.EMAIL]: 'instructor.dr@bcc.edu.ph',
    [INSTRUCTOR_FIELDS.EMPLOYMENT_STATUS]: 'Full-time',
    [INSTRUCTOR_FIELDS.SPECIALIZATION]: 'General Computing',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedInstructors() {
  try {
    console.log('Seeding instructors...');

    const batch = writeBatch(db);

    for (const instructor of sampleInstructors) {
      const docRef = doc(db, COLLECTIONS.INSTRUCTORS, instructor.instructorId);
      batch.set(docRef, instructor);
    }

    await batch.commit();
    console.log(`Successfully seeded ${sampleInstructors.length} instructors`);
  } catch (error) {
    console.error('Error seeding instructors:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedInstructors();
}

export { seedInstructors, sampleInstructors };
