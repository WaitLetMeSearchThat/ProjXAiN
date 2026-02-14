import { db } from './src/firebase/config.js';
import { writeBatch, doc } from 'firebase/firestore';
import { COLLECTIONS, PROGRAM_CODES, YEAR_LEVELS, SECTIONS, STUDENT_STATUS } from './src/assets/constants.js';

const sampleStudents = [
 
  {
    studentId: '21_1234',
    fullName: 'DELA CRUZ, JUAN P.',
    lastName: 'DELA CRUZ',
    firstName: 'JUAN',
    middleName: 'P.',
    extensionName: '',
    email: 'juan.delacruz@school.edu.ph',
    program: PROGRAM_CODES.BSCS,
    yearLevel: YEAR_LEVELS.FIRST_YEAR,
    section: 'A',
    status: STUDENT_STATUS.REGULAR,
    isEnrolled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentId: '21-1235',
    fullName: 'SANTOS, MARIA L.',
    lastName: 'SANTOS',
    firstName: 'MARIA',
    middleName: 'L.',
    extensionName: '',
    email: 'maria.santos@school.edu.ph',
    program: PROGRAM_CODES.BSIS,
    yearLevel: YEAR_LEVELS.SECOND_YEAR,
    section: 'B',
    status: STUDENT_STATUS.REGULAR,
    isEnrolled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentId: '21-1236',
    fullName: 'REYES, PEDRO JR.',
    lastName: 'REYES',
    firstName: 'PEDRO',
    middleName: '',
    extensionName: 'JR.',
    email: 'pedro.reyes@school.edu.ph',
    program: PROGRAM_CODES.BSIT,
    yearLevel: YEAR_LEVELS.THIRD_YEAR,
    section: 'C',
    status: STUDENT_STATUS.REGULAR,
    isEnrolled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentId: '21-1237',
    fullName: 'GARCIA, ANA M.',
    lastName: 'GARCIA',
    firstName: 'ANA',
    middleName: 'M.',
    extensionName: '',
    email: 'ana.garcia@school.edu.ph',
    program: PROGRAM_CODES.BLIS,
    yearLevel: YEAR_LEVELS.FOURTH_YEAR,
    section: 'A',
    status: STUDENT_STATUS.REGULAR,
    isEnrolled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentId: '21-1238',
    fullName: 'MARTINEZ, CARLOS R.',
    lastName: 'MARTINEZ',
    firstName: 'CARLOS',
    middleName: 'R.',
    extensionName: '',
    email: 'carlos.martinez@school.edu.ph',
    program: PROGRAM_CODES.BSCS,
    yearLevel: YEAR_LEVELS.SECOND_YEAR,
    section: 'D',
    status: STUDENT_STATUS.REGULAR,
    isEnrolled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentId: '21-1239',
    fullName: 'LOPEZ, ELENA F.',
    lastName: 'LOPEZ',
    firstName: 'ELENA',
    middleName: 'F.',
    extensionName: '',
    email: 'elena.lopez@school.edu.ph',
    program: PROGRAM_CODES.BSIS,
    yearLevel: YEAR_LEVELS.FIRST_YEAR,
    section: 'E',
    status: STUDENT_STATUS.REGULAR,
    isEnrolled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentId: '21-1240',
    fullName: 'FERNANDEZ, MIGUEL A.',
    lastName: 'FERNANDEZ',
    firstName: 'MIGUEL',
    middleName: 'A.',
    extensionName: '',
    email: 'miguel.fernandez@school.edu.ph',
    program: PROGRAM_CODES.BSIT,
    yearLevel: YEAR_LEVELS.SECOND_YEAR,
    section: 'B',
    status: STUDENT_STATUS.IRREGULAR,
    isEnrolled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentId: '21-1241',
    fullName: 'GONZALEZ, ISABEL C.',
    lastName: 'GONZALEZ',
    firstName: 'ISABEL',
    middleName: 'C.',
    extensionName: '',
    email: 'isabel.gonzalez@school.edu.ph',
    program: PROGRAM_CODES.BLIS,
    yearLevel: YEAR_LEVELS.THIRD_YEAR,
    section: 'C',
    status: STUDENT_STATUS.REGULAR,
    isEnrolled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentId: '21-1242',
    fullName: 'HERNANDEZ, DAVID L.',
    lastName: 'HERNANDEZ',
    firstName: 'DAVID',
    middleName: 'L.',
    extensionName: '',
    email: 'david.hernandez@school.edu.ph',
    program: PROGRAM_CODES.BSCS,
    yearLevel: YEAR_LEVELS.FOURTH_YEAR,
    section: 'F',
    status: STUDENT_STATUS.REGULAR,
    isEnrolled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentId: '21-1243',
    fullName: 'PEREZ, SOFIA T.',
    lastName: 'PEREZ',
    firstName: 'SOFIA',
    middleName: 'T.',
    extensionName: '',
    email: 'sofia.perez@school.edu.ph',
    program: PROGRAM_CODES.BSIS,
    yearLevel: YEAR_LEVELS.THIRD_YEAR,
    section: 'A',
    status: STUDENT_STATUS.REGULAR,
    isEnrolled: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentId: 'dev_student',
    fullName: 'DEVELOPER, STUDENT T.',
    lastName: 'DEVELOPER',
    firstName: 'STUDENT',
    middleName: 'T.',
    extensionName: '',
    email: 'dev.student@bcc.edu.ph',
    program: PROGRAM_CODES.BSCS,
    yearLevel: YEAR_LEVELS.FOURTH_YEAR,
    section: 'A',
    status: STUDENT_STATUS.REGULAR,
    isEnrolled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedStudents() {
  try {
    console.log('Seeding students...');

    const batch = writeBatch(db);

    for (const student of sampleStudents) {
      const docRef = doc(db, COLLECTIONS.STUDENTS, student.studentId);
      batch.set(docRef, {
        ...student,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await batch.commit();
    console.log(`Successfully seeded ${sampleStudents.length} students`);
  } catch (error) {
    console.error('Error seeding students:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedStudents();
}

export { seedStudents, sampleStudents };
