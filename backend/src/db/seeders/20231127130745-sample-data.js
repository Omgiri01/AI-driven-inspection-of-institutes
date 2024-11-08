const db = require('../models');
const Users = db.users;

const Inspections = db.inspections;

const Notifications = db.notifications;

const Institutes = db.institutes;

const InspectionsData = [
  {
    scheduled_date: new Date('2023-11-01T09:00:00'),

    completion_date: new Date('2023-11-02T17:00:00'),

    // type code here for "relation_one" field

    report: 'Inspection completed successfully. No major issues found.',

    // type code here for "relation_one" field
  },

  {
    scheduled_date: new Date('2023-11-05T10:00:00'),

    completion_date: new Date('2023-11-06T15:00:00'),

    // type code here for "relation_one" field

    report: 'Minor compliance issues noted. Recommendations provided.',

    // type code here for "relation_one" field
  },

  {
    scheduled_date: new Date('2023-11-10T11:00:00'),

    completion_date: new Date('2023-11-11T16:00:00'),

    // type code here for "relation_one" field

    report: 'Facilities require maintenance. Follow-up inspection needed.',

    // type code here for "relation_one" field
  },

  {
    scheduled_date: new Date('2023-11-15T09:30:00'),

    completion_date: new Date('2023-11-16T14:30:00'),

    // type code here for "relation_one" field

    report: 'Inspection passed with excellent compliance.',

    // type code here for "relation_one" field
  },
];

const NotificationsData = [
  {
    message: 'New inspection scheduled for Greenwood Institute.',

    sent_at: new Date('2023-10-25T08:00:00'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    message: 'Inspection report available for Riverside College.',

    sent_at: new Date('2023-10-30T09:00:00'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    message: 'Compliance issues detected at Hilltop University.',

    sent_at: new Date('2023-11-01T10:00:00'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    message: 'Follow-up inspection required for Lakeside Academy.',

    sent_at: new Date('2023-11-05T11:00:00'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const InstitutesData = [
  {
    name: 'Greenwood Institute',
  },

  {
    name: 'Riverside College',
  },

  {
    name: 'Hilltop University',
  },

  {
    name: 'Lakeside Academy',
  },
];

// Similar logic for "relation_many"

async function associateUserWithInstitute() {
  const relatedInstitute0 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setInstitute) {
    await User0.setInstitute(relatedInstitute0);
  }

  const relatedInstitute1 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setInstitute) {
    await User1.setInstitute(relatedInstitute1);
  }

  const relatedInstitute2 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setInstitute) {
    await User2.setInstitute(relatedInstitute2);
  }

  const relatedInstitute3 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setInstitute) {
    await User3.setInstitute(relatedInstitute3);
  }
}

async function associateInspectionWithInspector() {
  const relatedInspector0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Inspection0 = await Inspections.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Inspection0?.setInspector) {
    await Inspection0.setInspector(relatedInspector0);
  }

  const relatedInspector1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Inspection1 = await Inspections.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Inspection1?.setInspector) {
    await Inspection1.setInspector(relatedInspector1);
  }

  const relatedInspector2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Inspection2 = await Inspections.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Inspection2?.setInspector) {
    await Inspection2.setInspector(relatedInspector2);
  }

  const relatedInspector3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Inspection3 = await Inspections.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Inspection3?.setInspector) {
    await Inspection3.setInspector(relatedInspector3);
  }
}

async function associateInspectionWithInstitute() {
  const relatedInstitute0 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const Inspection0 = await Inspections.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Inspection0?.setInstitute) {
    await Inspection0.setInstitute(relatedInstitute0);
  }

  const relatedInstitute1 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const Inspection1 = await Inspections.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Inspection1?.setInstitute) {
    await Inspection1.setInstitute(relatedInstitute1);
  }

  const relatedInstitute2 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const Inspection2 = await Inspections.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Inspection2?.setInstitute) {
    await Inspection2.setInstitute(relatedInstitute2);
  }

  const relatedInstitute3 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const Inspection3 = await Inspections.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Inspection3?.setInstitute) {
    await Inspection3.setInstitute(relatedInstitute3);
  }
}

async function associateNotificationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setUser) {
    await Notification0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setUser) {
    await Notification1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setUser) {
    await Notification2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification3 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Notification3?.setUser) {
    await Notification3.setUser(relatedUser3);
  }
}

async function associateNotificationWithInstitute() {
  const relatedInstitute0 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setInstitute) {
    await Notification0.setInstitute(relatedInstitute0);
  }

  const relatedInstitute1 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setInstitute) {
    await Notification1.setInstitute(relatedInstitute1);
  }

  const relatedInstitute2 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setInstitute) {
    await Notification2.setInstitute(relatedInstitute2);
  }

  const relatedInstitute3 = await Institutes.findOne({
    offset: Math.floor(Math.random() * (await Institutes.count())),
  });
  const Notification3 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Notification3?.setInstitute) {
    await Notification3.setInstitute(relatedInstitute3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Inspections.bulkCreate(InspectionsData);

    await Notifications.bulkCreate(NotificationsData);

    await Institutes.bulkCreate(InstitutesData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithInstitute(),

      await associateInspectionWithInspector(),

      await associateInspectionWithInstitute(),

      await associateNotificationWithUser(),

      await associateNotificationWithInstitute(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('inspections', null, {});

    await queryInterface.bulkDelete('notifications', null, {});

    await queryInterface.bulkDelete('institutes', null, {});
  },
};
