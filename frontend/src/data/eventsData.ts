// Optimized: Direct TypeScript export (fastest, type-safe, zero runtime parsing)
// This approach is faster than CSV parsing as it's compiled at build time

export interface EventItem {
  event_name: string;
  start: string; // ISO format
  end: string;   // ISO format
  venue: string;
  description: string;
  event_profile?: string;
  audience?: string[];
}

const events: EventItem[] = [
  {
    "event_name": "11th International Yoga Day Celebrations",
    "start": "2025/06/21",
    "end": "2025/06/21",
    "venue": "Felicity Ground",
    "description": "The event aims to promote physical, mental, and emotional well-being among students and staff through the practice of yoga. It will follow the Common Yoga Protocol (CYP) prescribed by the Ministry and is designed to be accessible to all participants, regardless of prior yoga experience.\nThe session will include a guided practice of yogasanas, breathing techniques (Pranayama), meditation, and a brief interactive segment. We also plan to provide light refreshments to all attendees post-session.",
    "audience": [
      "internal"
    ],
    "event_profile": "/carousel_images/yoga.jpg"
  },
  {
    "event_name": "Career Guidance at ZPHS, Gachibowli",
    "start": "2025/03/15",
    "end": "2025/03/15",
    "venue": "other",
    "description": "The National Service Scheme (NSS) team from IIIT Hyderabad conducted an informative career guidance session at Zilla Parishad High School (ZPHS), Gachibowli, emphasizing ethical AI usage for academic purposes. The event aimed to help students make informed career decisions while integrating Artificial Intelligence (AI) responsibly into their studies and conducted Q&A Session.",
    "audience": [
      "ug2"
    ],
    "event_profile": "/carousel_images/teach1.jpg"
  },
  {
    "event_name": "Women's Day- Relay Rumble",
    "start": "2025/03/10",
    "end": "2025/03/11",
    "venue": "Felicity Ground, KRB Auditorium",
    "description": "The event begins with an inspiring talk by an esteemed woman speaker, addressing the crowd on resilience, leadership, and breaking barriers which is followed by a relay-race event. It is a one-team v/s one-team event. Teams compete in an exciting relay race featuring a mix of speed, balance, and coordination challenges like the Sack Race, BackBall Balance, and Lemon Race and ending in a human Tic-Tac-Toe game.",
    "audience": [
      "faculty",
      "staff",
      "pg",
      "ug4",
      "ug3",
      "ug2",
      "ug1"
    ],
    "event_profile": ""
  },
  {
    "event_name": "Blood Donation Camp",
    "start": "2025/01/26",
    "end": "2025/01/26",
    "venue": "Himalaya 101, Himalaya 102, Himalaya 103, Himalaya 104",
    "description": "On the occasion of Republic Day 2025, the National Service Scheme (NSS) organized a Blood Donation Drive in collaboration with Osmania Medical Hospital. The event aimed to support patients in need by encouraging the IIIT-H community to contribute to this life-saving cause.\n\nWith enthusiastic participation from students, faculty, and staff, the drive successfully collected numerous units of blood, showing the strong social responsibility within the IIIT Hyderabad community. The medical team from Osmania Medical Hospital ensured a safe and seamless donation process, making it an impactful and meaningful event.",
    "audience": [
      "ug1",
      "ug2",
      "ug3",
      "ug4",
      "pg",
      "staff",
      "faculty"
    ],
    "event_profile": ""
  },
  {
    "event_name": "Orphanage Visit",
    "start": "2024/11/16",
    "end": "2024/11/16",
    "venue": "other",
    "description": "On the occasion of Children’s Day, a meaningful visit is being planned to the Tapasvi Foundation Orphanage Home to honor and celebrate the innocence and potential of every child. This initiative aims to spread joy and emphasize the importance of community care and compassion.\n\nThe visit will begin with warm introductions, followed by engaging activities such as interactive games to create an atmosphere of excitement and happiness. Volunteers will distribute gifts, including books and educational supplies, symbolizing support for the children’s growth and learning.\n\nThe day will conclude with encouraging speeches and the distribution of fruits to the children, reflecting a heartfelt commitment to uplifting young minds.\n\nThis visit holds great importance as it seeks to reinforce the values of empathy and responsibility towards the underprivileged. It aims to highlight the need to nurture every child’s potential and remind everyone of their collective role in creating a brighter future for all children.",
    "audience": [
      "ug2",
      "ug3"
    ],
    "event_profile": "/carousel_images/orphan.jpg"
  },
  {
    "event_name": "Shramdaan",
    "start": "2024/10/02",
    "end": "2024/10/02",
    "venue": "Felicity Ground",
    "description": "On October 2nd, as apart of Gandhi Jayanthi celebrations and Swachtha Hi Seva hai campaign, we plan to celebrate by a yoga session in the morning from 8 am 5o 9 pm followed a road cleaning.",
    "audience": [
      "ug1",
      "ug2",
      "ug3",
      "ug4",
      "pg"
    ],
    "event_profile": "/carousel_images/shram.jpg"
  },
  {
    "event_name": "Blood donation camp",
    "start": "2024/08/15",
    "end": "2024/08/15",
    "venue": "Himalaya 104, Himalaya 103, Himalaya 101, Himalaya 102",
    "description": "Each year, on Independence Day and Republic Day, NSS collaborates with Osmania Medical Hospital for a life-saving blood donation camp. This event blends patriotism and community well-being as NSS volunteers and medical professionals unite in service. The donated blood, a symbol of unity and sacrifice, saves countless lives. We take pride in our collective impact and look forward to continuing this tradition, celebrating our nation's glory, and fostering a compassionate society.",
    "audience": [
      "ug1",
      "ug3",
      "ug4",
      "ug2",
      "pg",
      "staff",
      "faculty"
    ],
    "event_profile": ""
  },
  {
    "event_name": "SOHA Exhibition",
    "start": "2024/08/03",
    "end": "2024/08/03",
    "venue": "No Venue",
    "description": "A talk and poster presentation by BSG organization for DSG based on Environmental Issues",
    "audience": [
      "ug1"
    ],
    "event_profile": ""
  },
  {
    "event_name": "Batch Tree Plantation",
    "start": "2024/08/03",
    "end": "2024/08/04",
    "venue": "other",
    "description": "A symbolic batch tree is planted, symbolizing unity and growth as a part of UG1 induction. To celebrate the new batch's arrival, additional trees are planted. This tradition signifies the start of their journey, promoting a commitment to sustainability and a greener campus.",
    "audience": [
      "ug1"
    ],
    "event_profile": "/carousel_images/tree.jpg"
  }
];

export default events;
