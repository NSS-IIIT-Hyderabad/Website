db = db.getSiblingDB('nss_db');

// Create collections
db.createCollection('members');
db.createCollection('events');
db.createCollection('testimonials');
db.createCollection('projects');
db.createCollection('sessions');
db.createCollection('admins');

// Create indexes for performance
db.members.createIndex({ "email": 1 }, { unique: true });
db.members.createIndex({ "rollNumber": 1 }, { unique: true });
db.members.createIndex({ "createdAt": 1 });

db.events.createIndex({ "event_name": 1 });
db.events.createIndex({ "start": 1 });

db.testimonials.createIndex({ "name": 1 });

db.projects.createIndex({ "name": 1 });
db.projects.createIndex({ "createdAt": 1 });

db.sessions.createIndex({ "userId": 1 });
db.sessions.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

db.admins.createIndex({ "memberId": 1 }, { unique: true, sparse: true });
db.admins.createIndex({ "email": 1 }, { unique: true, sparse: true });
db.admins.createIndex({ "rollNumber": 1 }, { unique: true, sparse: true });
db.admins.createIndex({ "grantedAt": 1 });

print("Database initialized successfully!");
print("Collections created: members, events, testimonials, projects, sessions, admins");
print("Indexes created for performance optimization");
