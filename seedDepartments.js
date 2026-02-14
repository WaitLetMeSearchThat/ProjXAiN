import { db } from './src/firebase/config.js';
import { writeBatch, doc } from 'firebase/firestore';
import { COLLECTIONS } from './src/assets/constants.js';

const sampleDepartments = [
  {
    id: 'dept_is',
    code: 'IS',
    name: 'Information Systems',
    description: 'Department of Information Systems',
    head: 'SANTIAGO, FELICIANO L. JR',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'dept_cs',
    code: 'CS',
    name: 'Computer Science',
    description: 'Department of Computer Science',
    head: 'DELA CRUZ, MARIA ELENA R.',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'dept_it',
    code: 'IT',
    name: 'Information Technology',
    description: 'Department of Information Technology',
    head: 'REYES, ANTONIO B.',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'dept_lis',
    code: 'LIS',
    name: 'Library and Information Science',
    description: 'Department of Library and Information Science',
    head: 'GARCIA, CARMEN D.',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDepartments() {
  try {
    console.log('Seeding departments...');

    const batch = writeBatch(db);

    for (const dept of sampleDepartments) {
      const docRef = doc(db, COLLECTIONS.DEPARTMENTS, dept.id);
      batch.set(docRef, dept);
    }

    await batch.commit();
    console.log(`Successfully seeded ${sampleDepartments.length} departments`);
  } catch (error) {
    console.error('Error seeding departments:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedDepartments();
}

export { seedDepartments, sampleDepartments };