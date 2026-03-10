import { db } from './src/firebase/config.js';
import { collection, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { COLLECTIONS } from './src/assets/constants.js';
import { defaultOfferings } from './src/firebase/classroomSeedData.js';

async function seedClassroomOfferings({ cleanup = false } = {}) {
  console.log('Seeding classroom offerings...');

  const offeringsRef = collection(db, COLLECTIONS.CLASSROOM_OFFERINGS);

  if (cleanup) {
    const snapshot = await getDocs(offeringsRef);
    if (!snapshot.empty) {
      const batch = writeBatch(db);
      snapshot.docs.forEach((docSnap) => {
        batch.delete(doc(db, COLLECTIONS.CLASSROOM_OFFERINGS, docSnap.id));
      });
      await batch.commit();
      console.log(`Deleted ${snapshot.size} existing offerings.`);
    }
  }

  const batch = writeBatch(db);
  defaultOfferings.forEach((offering) => {
    const ref = doc(db, COLLECTIONS.CLASSROOM_OFFERINGS, offering.id);
    batch.set(ref, {
      ...offering,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });
  await batch.commit();
  console.log(`Seeded ${defaultOfferings.length} offerings.`);
}

if (process.argv.includes('--run')) {
  const cleanup = process.argv.includes('--cleanup');
  seedClassroomOfferings({ cleanup }).catch((error) => {
    console.error('Error seeding classroom offerings:', error);
  });
}

export { seedClassroomOfferings };
