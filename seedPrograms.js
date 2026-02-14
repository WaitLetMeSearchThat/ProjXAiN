import { db } from './src/firebase/config.js';
import { writeBatch, doc } from 'firebase/firestore';
import { COLLECTIONS, PROGRAM_CODES } from './src/assets/constants.js';

const samplePrograms = [
  {
    code: PROGRAM_CODES.BSIS,
    title: 'Bachelor of Science in Information Systems',
    departmentId: 'dept_is',
    years: 4,
    description: 'Focuses on the design and implementation of information systems.',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: PROGRAM_CODES.BSCS,
    title: 'Bachelor of Science in Computer Science',
    departmentId: 'dept_cs',
    years: 4,
    description: 'Focuses on the concepts and theories of computer science and software engineering.',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: PROGRAM_CODES.BSIT,
    title: 'Bachelor of Science in Information Technology',
    departmentId: 'dept_it',
    years: 4,
    description: 'Focuses on the utilization of computers and computer software to manage information.',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: PROGRAM_CODES.BLIS,
    title: 'Bachelor of Library and Information Science',
    departmentId: 'dept_lis',
    years: 4,
    description: 'Focuses on the management of libraries and information centers.',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedPrograms() {
  try {
    console.log('Seeding programs...');

    const batch = writeBatch(db);

    for (const program of samplePrograms) {
      const docRef = doc(db, COLLECTIONS.PROGRAMS, program.code);
      batch.set(docRef, program);
    }

    await batch.commit();
    console.log(`Successfully seeded ${samplePrograms.length} programs`);
  } catch (error) {
    console.error('Error seeding programs:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedPrograms();
}

export { seedPrograms, samplePrograms };