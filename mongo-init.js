db = db.getSiblingDB('nss_db');

// Create collections
db.createCollection('members');
db.createCollection('events');
db.createCollection('testimonials');
db.createCollection('projects');
db.createCollection('sessions');

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

// Insert sample events
db.events.insertMany([
  {
    event_name: "11th International Yoga Day Celebrations",
    start: "2025/06/21",
    end: "2025/06/21",
    venue: "Felicity Ground",
    description: "The event aims to promote physical, mental, and emotional well-being among students and staff through the practice of yoga.",
    event_profile: "/carousel_images/2.png",
    audience: ["internal"]
  },
  {
    event_name: "Career Guidance at ZPHS, Gachibowli",
    start: "2025/03/15",
    end: "2025/03/15",
    venue: "ZPHS, Gachibowli",
    description: "Career guidance session emphasizing ethical AI usage for academic purposes.",
    event_profile: "/carousel_images/1.jpg",
    audience: ["ug2"]
  },
  {
    event_name: "Women's Day- Relay Rumble",
    start: "2025/03/10",
    end: "2025/03/11",
    venue: "Felicity Ground, KRB Auditorium",
    description: "An inspiring talk followed by a relay-race event with various skill challenges.",
    audience: ["faculty", "staff", "pg", "ug4", "ug3", "ug2", "ug1"]
  }
]);

// Insert sample testimonials
db.testimonials.insertMany([
  {
    name: "Dileep Kumar Adari",
    title: "Social Media Head",
    period: "(2023 - 2025)",
    quote: "Being part of NSS helped me contribute to so many meaningful activities—from plantation drives to blood donation events."
  },
  {
    name: "Sai Nikitha Obbineni",
    title: "Coordinator",
    period: "(2022 - 2024)",
    quote: "Whether it was visiting orphanages, interacting at old-age homes, or organising distributions, every experience felt purposeful."
  },
  {
    name: "Srihari Bandarupalli",
    title: "Coordinator",
    period: "(2022 - 2024)",
    quote: "Working on campus cleaning drives and welfare activities showed me how small efforts add up."
  },
  {
    name: "Sri Rama Rathan Reddy Koluguri",
    title: "Logistics Head",
    period: "(2023 - 2025)",
    quote: "Handling logistics for events taught me a lot. Knowing our effort made someone's day better made all the work worth it."
  },
  {
    name: "Venkata Renu Jeevesh Madala",
    title: "Coordinator",
    period: "(2023 - 2025)",
    quote: "From coordinating blood donation drives to helping during outreach programs, I enjoyed every moment with the team."
  },
  {
    name: "Aditya Pavani Penumalla",
    title: "Design Head",
    period: "(2022 - 2024)",
    quote: "Designing for NSS events felt meaningful because I knew it supported real impact on ground."
  }
]);

print("Database initialized successfully!");
print("Collections created: members, events, testimonials, projects, sessions");
print("Sample events and testimonials inserted");
print("Indexes created for performance optimization");
