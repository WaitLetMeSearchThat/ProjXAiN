import { db } from './src/firebase/config.js';
import { collection, addDoc } from 'firebase/firestore';
import { COLLECTIONS } from './src/assets/constants.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'seedCollection.json'), 'utf8'));

async function seedProspectus() {
  try {
    console.log('Seeding prospectus...');

    const prospectusCollection = collection(db, COLLECTIONS.PROSPECTUS);

    for (const item of seedData.prospectus) {
      await addDoc(prospectusCollection, {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`Added prospectus item for ${item.subject}`);
    }

    console.log('Prospectus seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding prospectus:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedProspectus();
}

export { seedProspectus };
