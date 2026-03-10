import { db } from './src/firebase/config.js';
import { addDoc, collection } from 'firebase/firestore';
import { COLLECTIONS } from './src/assets/constants.js';

const sampleInstructorDocuments = [
  {
    subjectLabel: 'DM103 - BSIS 3A',
    url: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    uploaderEmail: 'dev.instructor@bcc.edu.ph',
    uploaderName: 'DEVELOPER, INSTRUCTOR T.'
  },
  {
    subjectLabel: 'DM103 - BSIS 3F',
    url: 'https://drive.google.com/file/d/1jN5fN8k2y3wP0ZQWv5L6Xq9kYjBq7qRk/view?usp=sharing',
    uploaderEmail: 'dev.instructor@bcc.edu.ph',
    uploaderName: 'DEVELOPER, INSTRUCTOR T.'
  },
  {
    subjectLabel: 'IT201 - Network Security Lab',
    url: 'https://drive.google.com/file/d/1o7S4nH2m8KfQvV8x2tP4rD6cM9nJ1aBq/view?usp=sharing',
    uploaderEmail: 'antonio.reyes@school.edu.ph',
    uploaderName: 'REYES, ANTONIO B.'
  },
  {
    subjectLabel: 'CS301 - AI Project Guide',
    url: 'https://docs.google.com/document/d/1Nw6j9k0l3p4q5r6s7t8u9v0w1x2y3z4/edit?usp=sharing',
    uploaderEmail: 'maria.delacruz@school.edu.ph',
    uploaderName: 'DELA CRUZ, MARIA ELENA R.'
  },
  {
    subjectLabel: 'LIS202 - Digital Libraries References',
    url: 'https://docs.google.com/presentation/d/1f8m2h9k5w0p3z6r1q4x7v8c9b2n5m1/edit?usp=sharing',
    uploaderEmail: 'carmen.garcia@school.edu.ph',
    uploaderName: 'GARCIA, CARMEN D.'
  },
  {
    subjectLabel: 'SE204 - Software Engineering Milestones',
    url: 'https://docs.google.com/spreadsheets/d/1A2b3C4d5E6f7G8h9I0jK1lM2nO3pQ4r5s6t7u8v9w0/edit?usp=sharing',
    uploaderEmail: 'jose.martinez@school.edu.ph',
    uploaderName: 'MARTINEZ, JOSE L.'
  }
];

async function seedInstructorDocuments() {
  try {
    console.log('Seeding instructor document links...');

    const ref = collection(db, COLLECTIONS.INSTRUCTOR_DOCUMENTS);
    for (const item of sampleInstructorDocuments) {
      await addDoc(ref, {
        subjectLabel: String(item.subjectLabel || '').trim(),
        url: String(item.url || '').trim(),
        uploaderEmail: String(item.uploaderEmail || '').trim().toLowerCase(),
        uploaderName: String(item.uploaderName || '').trim() || 'Instructor',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    console.log(`Successfully seeded ${sampleInstructorDocuments.length} instructor document links`);
  } catch (error) {
    console.error('Error seeding instructor document links:', error);
  }
}

if (process.argv[2] === '--run') {
  seedInstructorDocuments();
}

export { seedInstructorDocuments, sampleInstructorDocuments };
