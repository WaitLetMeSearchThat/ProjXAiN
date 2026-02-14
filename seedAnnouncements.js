import { db } from './src/firebase/config.js';
import { writeBatch, doc, collection } from 'firebase/firestore';
import { COLLECTIONS } from './src/assets/constants.js';

const sampleAnnouncements = [
  {
    title: 'Launching of the Bacolod City College TechnoHub',
    content:
      'BCC announced the launch of the TechnoHub, a new facility dedicated to fostering innovation, creativity, and technological advancement among students.',
    date: new Date('2025-10-09'),
    author: 'Bacolod City College',
    type: 'Facilities',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "CHED reviews REAP projects, BCC's Innovation Hub earns praise",
    content:
      'CHED IAS conducted a monitoring visit and documentation activity on BCC’s Innovation Hub (REAP under CHED GALP) on October 23, 2025.',
    date: new Date('2025-10-23'),
    author: 'Bacolod City College',
    type: 'Institutional',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "We're not here to be faultfinders: CHED evaluates BCC for institutional growth",
    content:
      'CHED NIR, with OIQAG, conducted evaluation and inspection at BCC as part of recognition renewal on September 11, 2025.',
    date: new Date('2025-09-11'),
    author: 'Bacolod City College',
    type: 'Institutional',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'BCC hosts Lao PDR delegates for International Exchange Program Talks',
    content:
      'BCC hosted delegates from the Lao PDR for talks on a proposed international exchange program on December 15, 2025.',
    date: new Date('2025-12-15'),
    author: 'Bacolod City College',
    type: 'Events',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'BCC launches PDL Starlit Wish Program; unveils Christmas Wish Tree',
    content:
      'BCC launched the “Unwrap Hope: PDL Starlit Wish Program” and unveiled the Christmas Wish Tree on November 21, 2025.',
    date: new Date('2025-11-21'),
    author: 'Bacolod City College',
    type: 'Community',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "1,716.96 tons of waste cleared in BCC's International Clean-Up Drive",
    content:
      'More than 500 students collected 1,716.96 tons of waste in a single day on September 20, 2025, during the International Clean-Up Drive.',
    date: new Date('2025-09-20'),
    author: 'Bacolod City College',
    type: 'Community',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Registrar's Office contact for grade inquiries",
    content:
      "For academic records and document requests, contact the Registrar's Office at registrar@bacolodcitycollege.edu.ph or (034) 707-0980. Office hours: Monday–Friday, 8:00 AM–5:00 PM.",
    date: new Date(),
    author: "Registrar's Office",
    type: 'Support',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedAnnouncements() {
  try {
    console.log('Seeding announcements...');

    const batch = writeBatch(db);

    for (const announcement of sampleAnnouncements) {
      const docRef = doc(collection(db, COLLECTIONS.ANNOUNCEMENTS));
      batch.set(docRef, { ...announcement, id: docRef.id });
    }

    await batch.commit();
    console.log(`Successfully seeded ${sampleAnnouncements.length} announcements`);
  } catch (error) {
    console.error('Error seeding announcements:', error);
  }
}

// CLI execution
if (process.argv[2] === '--run') {
  seedAnnouncements();
}

export { seedAnnouncements, sampleAnnouncements };
