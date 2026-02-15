import { db } from './src/firebase/config.js';
import { writeBatch, doc } from 'firebase/firestore';

const TICKETS_COLLECTION = 'gradeInquiryTickets';

const normalizeStudentId = (value) => String(value || '').replace(/\s+/g, '').toUpperCase();

const now = Date.now();

const sampleTickets = [
  {
    id: 'seed_tkt_cog_001',
    ticketId: 'TKT-SEED-COG-001',
    service: 'Certificate of Grades',
    studentId: '21-1234',
    status: 'Submitted',
    processNote: 'Submitted. Waiting for registrar verification.',
    details: {
      requestType: 'New Request',
      priority: 'Normal',
      purpose: 'Scholarship renewal requirement',
      contact: 'juan.delacruz@school.edu.ph',
      comment: 'Need an official certificate with registrar signature.',
      notes: 'Please process before Friday.'
    },
    createdAtMillis: now - 1000 * 60 * 60 * 24 * 2,
    createdByUid: 'dev_student',
    createdByEmail: 'dev.student@bcc.edu.ph',
    createdByName: 'DEVELOPER, STUDENT T.'
  },
  {
    id: 'seed_tkt_tor_002',
    ticketId: 'TKT-SEED-TOR-002',
    service: 'Transcript of Records (TOR)',
    studentId: '21-1235',
    status: 'In Review',
    processNote: 'Registrar is validating student clearance and fee status.',
    details: {
      requestType: 'Follow-up',
      priority: 'High',
      purpose: 'Transfer application',
      contact: 'maria.santos@school.edu.ph',
      comment: 'Requesting TOR for transfer credentials.',
      notes: 'Reference prior request from last month.'
    },
    createdAtMillis: now - 1000 * 60 * 60 * 24,
    createdByUid: '21-1235',
    createdByEmail: 'maria.santos@school.edu.ph',
    createdByName: 'SANTOS, MARIA L.'
  },
  {
    id: 'seed_tkt_assess_003',
    ticketId: 'TKT-SEED-ASSESS-003',
    service: 'Grade Assessment',
    studentId: '21-1236',
    status: 'Submitted',
    processNote: 'Submitted. Waiting for registrar verification.',
    details: {
      requestType: 'Correction',
      priority: 'Normal',
      purpose: 'Assessment for possible grade discrepancy',
      contact: 'pedro.reyes@school.edu.ph',
      comment: 'Please assess final grade in DM 103 due to mismatch with class record.',
      notes: 'Attached proof will be sent via email.'
    },
    createdAtMillis: now - 1000 * 60 * 60 * 6,
    createdByUid: '21-1236',
    createdByEmail: 'pedro.reyes@school.edu.ph',
    createdByName: 'REYES, PEDRO JR.'
  }
];

async function seedGradeInquiryTickets() {
  try {
    console.log('Seeding grade inquiry ticket collection...');

    const batch = writeBatch(db);

    for (const ticket of sampleTickets) {
      const docRef = doc(db, TICKETS_COLLECTION, ticket.id);
      batch.set(docRef, {
        ticketId: ticket.ticketId,
        service: ticket.service,
        studentId: ticket.studentId,
        studentIdNormalized: normalizeStudentId(ticket.studentId),
        status: ticket.status,
        processNote: ticket.processNote,
        details: ticket.details,
        createdAt: new Date(ticket.createdAtMillis),
        createdAtMillis: ticket.createdAtMillis,
        createdByUid: ticket.createdByUid,
        createdByEmail: ticket.createdByEmail,
        createdByName: ticket.createdByName
      });
    }

    await batch.commit();
    console.log(`Successfully seeded ${sampleTickets.length} grade inquiry tickets`);
  } catch (error) {
    console.error('Error seeding grade inquiry tickets:', error);
  }
}

if (process.argv[2] === '--run') {
  seedGradeInquiryTickets();
}

export { seedGradeInquiryTickets, sampleTickets };
