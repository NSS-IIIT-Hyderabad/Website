// Optimized: Direct TypeScript export (fastest, type-safe, zero runtime parsing)
// For easier editing by non-developers, consider a build-time CSV-to-TS generator instead

export interface WorkHistoryItem {
  role: string;
  team: string;
  start: string;
  end: string | null;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  batch: string;
  department: string;
  photoUrl: string;
  phone: string;
  linkedin: string;
  github: string;
  bio: string;
  achievements: string[];
  interests: string[];
  workHistory: WorkHistoryItem[];
}

const members: Member[] = [
  {
    "id": "aakanksha.vulugonda@research.iiit.ac.in",
    "name": "Vulugonda Aakanksha",
    "email": "aakanksha.vulugonda@research.iiit.ac.in",
    "rollNumber": "2025115003",
    "batch": "ug2k25",
    "department": "CHD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating content that inspires and informs communities. Committed to showcasing NSS's impact through creative social media strategies.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "aditya.pavani@students.iiit.ac.in",
    "name": "Penumalla Aditya Pavani",
    "email": "aditya.pavani@students.iiit.ac.in",
    "rollNumber": "2021101133",
    "batch": "ug2k21",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating visual content and designs for NSS activities. Passionate about using design to communicate social messages effectively.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2022-01",
        "end": "2023-01"
      }
    ]
  },
  {
    "id": "aditya.vadali@research.iiit.ac.in",
    "name": "Aditya Subbaraya Sri Chandramouli Vadali",
    "email": "aditya.vadali@research.iiit.ac.in",
    "rollNumber": "2023111009",
    "batch": "ug2k23",
    "department": "CSD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating visual content and designs for NSS activities. Passionate about using design to communicate social messages effectively.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2024-01",
        "end": "2025-01"
      }
    ]
  },
  {
    "id": "akshat.sharma@research.iiit.ac.in",
    "name": "Akshat Sharma",
    "email": "akshat.sharma@research.iiit.ac.in",
    "rollNumber": "2024115008",
    "batch": "ug2k24",
    "department": "CHD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Contributing to seamless event execution behind the scenes. Detail-oriented logistics team member committed to operational excellence.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "anvithraj.basani@students.iiit.ac.in",
    "name": "Anvithraj Reddy Basani",
    "email": "anvithraj.basani@students.iiit.ac.in",
    "rollNumber": "2023101023",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Supporting event organization and ensuring smooth operations. Dedicated to making NSS events successful, impactful, and memorable.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2024-01",
        "end": null
      }
    ]
  },
  {
    "id": "avinash.muthoju@students.iiit.ac.in",
    "name": "Muthoju Avinash",
    "email": "avinash.muthoju@students.iiit.ac.in",
    "rollNumber": "2025101033",
    "batch": "ug2k25",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating content that inspires and informs communities. Committed to showcasing NSS's impact through creative social media strategies.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "bakaram.charan@students.iiit.ac.in",
    "name": "Bakaram Sai Charan",
    "email": "bakaram.charan@students.iiit.ac.in",
    "rollNumber": "2023101044",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Bridging teams and aligning efforts towards common goals. Currently Coordinator, passionate about creating synergy in social work.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2024-01",
        "end": "2025-01"
      },
      {
        "role": "Coordinator",
        "team": "NSS Core",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "balakumar.velayutham@students.iiit.ac.in",
    "name": "Balakumar Velayutham",
    "email": "balakumar.velayutham@students.iiit.ac.in",
    "rollNumber": "2021101039",
    "batch": "ug2k21",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Assisting in logistics coordination for NSS activities. Passionate about the behind-the-scenes work that makes community events shine.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2022-01",
        "end": "2023-01"
      }
    ]
  },
  {
    "id": "chanda.kumar@students.iiit.ac.in",
    "name": "Chanda Akshay Kumar",
    "email": "chanda.kumar@students.iiit.ac.in",
    "rollNumber": "2024102014",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Building tech solutions that make a difference. Enthusiastic developer committed to coding for community development and innovation.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Tech Team Member",
        "team": "Tech",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "chandrahas.n@students.iiit.ac.in",
    "name": "Chandrahas Nandibhatla",
    "email": "chandrahas.n@students.iiit.ac.in",
    "rollNumber": "2025102044",
    "batch": "ug2k25",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Ensuring every detail is handled for successful events. Dedicated team player focused on flawless execution of NSS initiatives.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "dileepkumar.adari@students.iiit.ac.in",
    "name": "Adari Dileepkumar",
    "email": "dileepkumar.adari@students.iiit.ac.in",
    "rollNumber": "2022101007",
    "batch": "ug2k22",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Managing NSS's digital presence and community engagement. Dedicated to amplifying our social impact through strategic communication.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2023-01",
        "end": "2024-01"
      },
      {
        "role": "Social Media Team Head",
        "team": "Social",
        "start": "2024-01",
        "end": "2025-01"
      }
    ]
  },
  {
    "id": "divijat.somani@students.iiit.ac.in",
    "name": "Divijat Somani",
    "email": "divijat.somani@students.iiit.ac.in",
    "rollNumber": "2025102040",
    "batch": "ug2k25",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Designing with purpose and impact in mind. Passionate about visual storytelling for community initiatives and social awareness.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "harshit.goyal@students.iiit.ac.in",
    "name": "Harshit Goyal",
    "email": "harshit.goyal@students.iiit.ac.in",
    "rollNumber": "2023102054",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating eye-catching content that drives engagement. Committed to design excellence in service of meaningful social good.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2024-01",
        "end": "2025-01"
      }
    ]
  },
  {
    "id": "hemanthkumar.m@students.iiit.ac.in",
    "name": "Madathanapalli Hemanth Kumar",
    "email": "hemanthkumar.m@students.iiit.ac.in",
    "rollNumber": "2024101113",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Digital strategist expanding NSS's footprint. Believer in the power of social media for meaningful change.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2025-01",
        "end": "2025-01"
      },
      {
        "role": "Social Media Team Head",
        "team": "Social",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "ishant.mahajan@students.iiit.ac.in",
    "name": "Ishant Mahajan",
    "email": "ishant.mahajan@students.iiit.ac.in",
    "rollNumber": "2025102058",
    "batch": "ug2k25",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Contributing to seamless event execution behind the scenes. Detail-oriented logistics team member committed to operational excellence.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "jaswanthreddy.k@students.iiit.ac.in",
    "name": "Konapalli Jaswanth Reddy",
    "email": "jaswanthreddy.k@students.iiit.ac.in",
    "rollNumber": "2023101025",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Bridging teams and aligning efforts towards common goals. Currently Coordinator, passionate about creating synergy in social work.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2024-01",
        "end": "2025-01"
      },
      {
        "role": "Coordinator",
        "team": "NSS Core",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "jeevesh.madala@students.iiit.ac.in",
    "name": "Madala Venkata Renu Jeevesh",
    "email": "jeevesh.madala@students.iiit.ac.in",
    "rollNumber": "2022102009",
    "batch": "ug2k22",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Driving strategic initiatives and team coordination. Currently serving as Coordinator, focused on scaling NSS's community impact.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2023-01",
        "end": "2024-01"
      },
      {
        "role": "Coordinator",
        "team": "NSS Core",
        "start": "2024-01",
        "end": "2025-01"
      }
    ]
  },
  {
    "id": "jetty.sairam@students.iiit.ac.in",
    "name": "Jetty Jithendra Sai Ram",
    "email": "jetty.sairam@students.iiit.ac.in",
    "rollNumber": "2024101102",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating content that inspires and informs communities. Committed to showcasing NSS's impact through creative social media strategies.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "kandhivanam.bhavagna@students.iiit.ac.in",
    "name": "Kandhivanam Bhavagna",
    "email": "kandhivanam.bhavagna@students.iiit.ac.in",
    "rollNumber": "2025101065",
    "batch": "ug2k25",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Ensuring every detail is handled for successful events. Dedicated team player focused on flawless execution of NSS initiatives.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "kanishka.sagili@students.iiit.ac.in",
    "name": "Sagili Kanishka",
    "email": "kanishka.sagili@students.iiit.ac.in",
    "rollNumber": "2025101099",
    "batch": "ug2k25",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Amplifying NSS's voice through strategic social media. Passionate about digital storytelling and fostering community building online.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "kattagani.haasini@research.iiit.ac.in",
    "name": "Kattagani Haasini",
    "email": "kattagani.haasini@research.iiit.ac.in",
    "rollNumber": "2025113008",
    "batch": "ug2k25",
    "department": "CND",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Amplifying NSS's voice through strategic social media. Passionate about digital storytelling and fostering community building online.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "kavuri.hruday@research.iiit.ac.in",
    "name": "Kavuri Vivek Hruday",
    "email": "kavuri.hruday@research.iiit.ac.in",
    "rollNumber": "2022114012",
    "batch": "ug2k22",
    "department": "CLD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Leading design strategy to amplify NSS's message. Currently Design Head, believer in the power of aesthetics to create impact.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2023-01",
        "end": "2024-01"
      },
      {
        "role": "Design Team Head",
        "team": "Design",
        "start": "2024-01",
        "end": "2025-01"
      }
    ]
  },
  {
    "id": "koluguri.reddy@students.iiit.ac.in",
    "name": "Koluguri Sri Rama Rathan Reddy",
    "email": "koluguri.reddy@students.iiit.ac.in",
    "rollNumber": "2022102072",
    "batch": "ug2k22",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Leading operational excellence across NSS. Turning ambitious plans into perfectly executed community events.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2023-01",
        "end": "2024-01"
      },
      {
        "role": "Logistics Team Head",
        "team": "Logistics",
        "start": "2024-01",
        "end": "2025-01"
      }
    ]
  },
  {
    "id": "kuvam.pahuja@students.iiit.ac.in",
    "name": "Kuvam Pahuja",
    "email": "kuvam.pahuja@students.iiit.ac.in",
    "rollNumber": "2022101030",
    "batch": "ug2k22",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Crafting compelling content for NSS's digital channels. Enthusiastic about building online communities that care and take action.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2023-01",
        "end": "2024-01"
      }
    ]
  },
  {
    "id": "maddhipatla.devi@students.iiit.ac.in",
    "name": "Maddhipatla Sowjanya Devi",
    "email": "maddhipatla.devi@students.iiit.ac.in",
    "rollNumber": "2024101066",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Operations maestro streamlining NSS initiatives. Dedicated to making every event run like a well-oiled machine.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": "2025-01"
      },
      {
        "role": "Logistics Team Head",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "manitej.sriram@students.iiit.ac.in",
    "name": "Sriram Mani Tej",
    "email": "manitej.sriram@students.iiit.ac.in",
    "rollNumber": "2023101022",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Tech Lead with a mission to modernize community service through innovative digital solutions.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2024-01",
        "end": "2025-01"
      },
      {
        "role": "Tech Team Head",
        "team": "Tech",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "navneet.gupta@research.iiit.ac.in",
    "name": "Navneet Kumar Gupta",
    "email": "navneet.gupta@research.iiit.ac.in",
    "rollNumber": "2024111030",
    "batch": "ug2k24",
    "department": "CSD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Contributing to seamless event execution behind the scenes. Detail-oriented logistics team member committed to operational excellence.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "neharika.rajesh@research.iiit.ac.in",
    "name": "Neharika Rajesh",
    "email": "neharika.rajesh@research.iiit.ac.in",
    "rollNumber": "2024113023",
    "batch": "ug2k24",
    "department": "CND",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Tech team member bringing fresh perspectives. Always learning and applying new technologies to create social good.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Tech Team Member",
        "team": "Tech",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "nemani.dedeepya@students.iiit.ac.in",
    "name": "Nemani Rajasri Satya Dedeepya",
    "email": "nemani.dedeepya@students.iiit.ac.in",
    "rollNumber": "2023101128",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Amplifying NSS's voice through strategic social media. Passionate about digital storytelling and fostering community building online.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2024-01",
        "end": "2025-01"
      }
    ]
  },
  {
    "id": "nethavath.praveen@students.iiit.ac.in",
    "name": "Nethavath Praveen",
    "email": "nethavath.praveen@students.iiit.ac.in",
    "rollNumber": "2023102013",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Engaging audiences and growing NSS's online presence. Dedicated to making social work resonate powerfully in the digital space.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2024-01",
        "end": null
      }
    ]
  },
  {
    "id": "nethi.padmanjali@students.iiit.ac.in",
    "name": "N Padmanjali",
    "email": "nethi.padmanjali@students.iiit.ac.in",
    "rollNumber": "2024102047",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "--",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating visual content and designs for NSS activities. Passionate about using design to communicate social messages effectively.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "nikhita.ravi@research.iiit.ac.in",
    "name": "Nikhita Anjani Ravi",
    "email": "nikhita.ravi@research.iiit.ac.in",
    "rollNumber": "2024114003",
    "batch": "ug2k24",
    "department": "CLD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating eye-catching content that drives engagement. Committed to design excellence in service of meaningful social good.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "pashya.chervith@students.iiit.ac.in",
    "name": "Pashya Chervith Reddy",
    "email": "pashya.chervith@students.iiit.ac.in",
    "rollNumber": "2024101076",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Engaging audiences and growing NSS's online presence. Dedicated to making social work resonate powerfully in the digital space.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "poreddy.reddy@research.iiit.ac.in",
    "name": "Poreddy Srivatsav Reddy",
    "email": "poreddy.reddy@research.iiit.ac.in",
    "rollNumber": "2025121016",
    "batch": "le2k25",
    "department": "LCD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Developing digital tools for NSS initiatives. Passionate about using programming skills to solve real-world community problems.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Tech Team Member",
        "team": "Tech",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "pranathi.giri@students.iiit.ac.in",
    "name": "Giri Pranathi",
    "email": "pranathi.giri@students.iiit.ac.in",
    "rollNumber": "2025101028",
    "batch": "ug2k25",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Designing with purpose and impact in mind. Passionate about visual storytelling for community initiatives and social awareness.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "pranathi.koppolu@students.iiit.ac.in",
    "name": "Koppolu Pranathi Sindhu",
    "email": "pranathi.koppolu@students.iiit.ac.in",
    "rollNumber": "2024101106",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Assisting in logistics coordination for NSS activities. Passionate about the behind-the-scenes work that makes community events shine.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "pratishtha.saxena@research.iiit.ac.in",
    "name": "Pratishtha Saxena",
    "email": "pratishtha.saxena@research.iiit.ac.in",
    "rollNumber": "2022113008",
    "batch": "ug2k22",
    "department": "CND",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Engaging audiences and growing NSS's online presence. Dedicated to making social work resonate powerfully in the digital space.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2023-01",
        "end": "2024-01"
      }
    ]
  },
  {
    "id": "prisha.kumar@students.iiit.ac.in",
    "name": "Prisha Kumar",
    "email": "prisha.kumar@students.iiit.ac.in",
    "rollNumber": "2021101075",
    "batch": "ug2k21",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating eye-catching content that drives engagement. Committed to design excellence in service of meaningful social good.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Head",
        "team": "Design",
        "start": "2023-01",
        "end": "2024-01"
      },
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2022-01",
        "end": "2023-01"
      }
    ]
  },
  {
    "id": "radheshyam.modampuri@students.iiit.ac.in",
    "name": "Modampuri Radheshyam",
    "email": "radheshyam.modampuri@students.iiit.ac.in",
    "rollNumber": "2023102032",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Contributing to seamless event execution behind the scenes. Detail-oriented logistics team member committed to operational excellence.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "rithik.palla@students.iiit.ac.in",
    "name": "Rithik Reddy Palla",
    "email": "rithik.palla@students.iiit.ac.in",
    "rollNumber": "2024102005",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "--",
    "linkedin": "-",
    "github": "-",
    "bio": "Spearheading tech development for NSS projects. Bridging the gap between technology and community service.",
    "achievements": ["Coordinated 8+ successful events"],
    "interests": [],
    "workHistory": [
      {
        "role": "Tech Team Member",
        "team": "Tech",
        "start": "2025-01",
        "end": "2025-01"
      },
      {
        "role": "Tech Team Head",
        "team": "Tech",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "sai.nikhita@students.iiit.ac.in",
    "name": "Obbineni Sai Nikhita",
    "email": "sai.nikhita@students.iiit.ac.in",
    "rollNumber": "2021101040",
    "batch": "ug2k21",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Crafting compelling content for NSS's digital channels. Enthusiastic about building online communities that care and take action.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Coordinator",
        "team": "NSS Core",
        "start": "2023-01",
        "end": "2024-01"
      },
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2022-01",
        "end": "2023-01"
      }
    ]
  },
  {
    "id": "saloni.goyal@research.iiit.ac.in",
    "name": "Saloni Goyal",
    "email": "saloni.goyal@research.iiit.ac.in",
    "rollNumber": "2023115001",
    "batch": "ug2k23",
    "department": "CHD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Assisting in logistics coordination for NSS activities. Passionate about the behind-the-scenes work that makes community events shine.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2024-01",
        "end": "2025-01"
      }
    ]
  },
  {
    "id": "sangameshwar.sale@students.iiit.ac.in",
    "name": "Sale Sangameshwar",
    "email": "sangameshwar.sale@students.iiit.ac.in",
    "rollNumber": "2024102017",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Developing digital tools for NSS initiatives. Passionate about using programming skills to solve real-world community problems.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Tech Team Member",
        "team": "Tech",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "shivam.mittal@students.iiit.ac.in",
    "name": "Shivam Mittal",
    "email": "shivam.mittal@students.iiit.ac.in",
    "rollNumber": "2022101105",
    "batch": "ug2k22",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Ensuring every detail is handled for successful events. Dedicated team player focused on flawless execution of NSS initiatives.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2023-01",
        "end": "2024-01"
      }
    ]
  },
  {
    "id": "sindhuja.babu@students.iiit.ac.in",
    "name": "Sindhuja Babu",
    "email": "sindhuja.babu@students.iiit.ac.in",
    "rollNumber": "2024102055",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating visual content and designs for NSS activities. Passionate about using design to communicate social messages effectively.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "srihari.bandarupalli@research.iiit.ac.in",
    "name": "Srihari Bandarupalli",
    "email": "srihari.bandarupalli@research.iiit.ac.in",
    "rollNumber": "2021112006",
    "batch": "ug2k21",
    "department": "ECE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Contributing to seamless event execution behind the scenes. Detail-oriented logistics team member committed to operational excellence.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Coordinator",
        "team": "NSS Core",
        "start": "2023-01",
        "end": "2024-01"
      },
      {
        "role": "Logistics Team",
        "team": "Logistics",
        "start": "2022-01",
        "end": "2023-01"
      }
    ]
  },
  {
    "id": "srihitha.mallepally@students.iiit.ac.in",
    "name": "Srihitha Mallepally",
    "email": "srihitha.mallepally@students.iiit.ac.in",
    "rollNumber": "2021101043",
    "batch": "ug2k21",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Crafting compelling content for NSS's digital channels. Enthusiastic about building online communities that care and take action.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2022-01",
        "end": "2023-01"
      }
    ]
  },
  {
    "id": "subhasree.sahoo@students.iiit.ac.in",
    "name": "Subhasree Subhalaxmi Sahoo",
    "email": "subhasree.sahoo@students.iiit.ac.in",
    "rollNumber": "2025101030",
    "batch": "ug2k25",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Supporting event organization and ensuring smooth operations. Dedicated to making NSS events successful, impactful, and memorable.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "sudheer.chatla@students.iiit.ac.in",
    "name": "Chatla Sudheer",
    "email": "sudheer.chatla@students.iiit.ac.in",
    "rollNumber": "2023101012",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creative director shaping NSS's visual language. Using design thinking to solve community challenges.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2024-01",
        "end": "2025-01"
      },
      {
        "role": "Design Team Head",
        "team": "Design",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "sukasi.manidhar@students.iiit.ac.in",
    "name": "Sukasi Manidhar",
    "email": "sukasi.manidhar@students.iiit.ac.in",
    "rollNumber": "2023101067",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Driving strategic initiatives and team coordination. Currently serving as Coordinator, focused on scaling NSS's community impact.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2024-01",
        "end": "2025-01"
      },
      {
        "role": "Social Media Team Head",
        "team": "Social",
        "start": "2025-01",
        "end": "2025-01"
      },
      {
        "role": "Coordinator",
        "team": "NSS Core",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "sukeerthi.kattamuri@students.iiit.ac.in",
    "name": "Sukeerthi Kattamuri",
    "email": "sukeerthi.kattamuri@students.iiit.ac.in",
    "rollNumber": "2024102074",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Transforming ideas into compelling visual narratives. Dedicated to making social work visually appealing and accessible.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2025-01",
        "end": "2025-01"
      },
      {
        "role": "Design Team Head",
        "team": "Design",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "t.goud@research.iiit.ac.in",
    "name": "T Lokesh Goud",
    "email": "t.goud@research.iiit.ac.in",
    "rollNumber": "2023115007",
    "batch": "ug2k23",
    "department": "CHD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Operations maestro streamlining NSS initiatives. Dedicated to making every event run like a well-oiled machine.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2024-01",
        "end": "2025-01"
      },
      {
        "role": "Logistics Team Head",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "t.ravindra@students.iiit.ac.in",
    "name": "T Ravindra",
    "email": "t.ravindra@students.iiit.ac.in",
    "rollNumber": "2021102025",
    "batch": "ug2k21",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Assisting in logistics coordination for NSS activities. Passionate about the behind-the-scenes work that makes community events shine.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2022-01",
        "end": "2023-01"
      }
    ]
  },
  {
    "id": "tharani.perumalla@research.iiit.ac.in",
    "name": "Perumalla Tharani Theertha",
    "email": "tharani.perumalla@research.iiit.ac.in",
    "rollNumber": "2024115010",
    "batch": "ug2k24",
    "department": "CHD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Contributing code and creativity to NSS projects. Excited about the powerful intersection of technology and social impact.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Tech Team Member",
        "team": "Tech",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "vastava.kurumeti@students.iiit.ac.in",
    "name": "Kurumeti Sri Sai Nikhil Sri Vastava",
    "email": "vastava.kurumeti@students.iiit.ac.in",
    "rollNumber": "2023101100",
    "batch": "ug2k23",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Managing NSS's digital presence and community engagement. Dedicated to amplifying our social impact through strategic communication.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2025-01",
        "end": "2025-01"
      },
      {
        "role": "Social Media Team Head",
        "team": "Social",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "veda.nivas@students.iiit.ac.in",
    "name": "Neeruddula Veda Nivas Chowdary",
    "email": "veda.nivas@students.iiit.ac.in",
    "rollNumber": "2021101037",
    "batch": "ug2k21",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Ensuring every detail is handled for successful events. Dedicated team player focused on flawless execution of NSS initiatives.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2022-01",
        "end": "2023-01"
      }
    ]
  },
  {
    "id": "veena.ramadas@research.iiit.ac.in",
    "name": "Veena Vadakkathmana Ramadas",
    "email": "veena.ramadas@research.iiit.ac.in",
    "rollNumber": "2024117008",
    "batch": "ug2k24",
    "department": "CGD",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Contributing to technical projects and supporting NSS's digital infrastructure. Eager to apply technical skills for meaningful social causes.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Tech Team Member",
        "team": "Tech",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "venkata.kesav@students.iiit.ac.in",
    "name": "Venkata Kesav Venna",
    "email": "venkata.kesav@students.iiit.ac.in",
    "rollNumber": "2021101036",
    "batch": "ug2k21",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Creating content that inspires and informs communities. Committed to showcasing NSS's impact through creative social media strategies.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Social Media Team Member",
        "team": "Social",
        "start": "2022-01",
        "end": "2023-01"
      }
    ]
  },
  {
    "id": "venkata.venkamsetty@students.iiit.ac.in",
    "name": "Venkamsetty Venkata Jahnavi",
    "email": "venkata.venkamsetty@students.iiit.ac.in",
    "rollNumber": "2022101118",
    "batch": "ug2k22",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Ensuring every detail is handled for successful events. Dedicated team player focused on flawless execution of NSS initiatives.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2023-01",
        "end": "2025-01"
      }
    ]
  },
  {
    "id": "vineelsaireddy.s@students.iiit.ac.in",
    "name": "Somannagari Vineel Sai Reddy",
    "email": "vineelsaireddy.s@students.iiit.ac.in",
    "rollNumber": "2024101009",
    "batch": "ug2k24",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Supporting the operational backbone of NSS events. Enthusiastic volunteer making sure social initiatives run smoothly and effectively.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "vuddagiri.anukruthi@students.iiit.ac.in",
    "name": "Vuddagiri Anukruthi",
    "email": "vuddagiri.anukruthi@students.iiit.ac.in",
    "rollNumber": "2025102028",
    "batch": "ug2k25",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Supporting event organization and ensuring smooth operations. Dedicated to making NSS events successful, impactful, and memorable.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Logistics Team Member",
        "team": "Logistics",
        "start": "2025-01",
        "end": null
      }
    ]
  },
  {
    "id": "vysishtya.karanam@students.iiit.ac.in",
    "name": "Karanam Vysishtya",
    "email": "vysishtya.karanam@students.iiit.ac.in",
    "rollNumber": "2022102044",
    "batch": "ug2k22",
    "department": "CSE",
    "photoUrl": "-",
    "phone": "-",
    "linkedin": "-",
    "github": "-",
    "bio": "Bridging teams and aligning efforts towards common goals. Currently Coordinator, passionate about creating synergy in social work.",
    "achievements": [],
    "interests": [],
    "workHistory": [
      {
        "role": "Design Team Member",
        "team": "Design",
        "start": "2023-01",
        "end": "2024-01"
      },
      {
        "role": "Coordinator",
        "team": "NSS Core",
        "start": "2024-01",
        "end": "2025-01"
      }
    ]
  }
];
  // {
  //   id: "akshay.chanda@students.iiit.ac.in",
  //   name: "Akshay Chanda",
  //   email: "akshay.chanda@students.iiit.ac.in",
  //   rollNumber: "2024102014",
  //   year: "2nd Year",
  //   department: "ECE",
  //   photoUrl: "/favicon.ico",
  //   phone: "+91 9603806807",
  //   linkedin: "https://linkedin.com/in/akshaychanda",
  //   github: "https://github.com/akshaychanda",
  //   bio: "Passionate about building communities and fostering innovation.",
  //   achievements: [
  //     "Led team to win National Hackathon 2024",
  //     "Published research paper on AI/ML",
  //     "Organized 10+ technical workshops",
  //   ],
  //   interests: ["Machine Learning", "Web Development", "Community Building"],
  //   isAdmin: false,
  //   workHistory: [
  //     { role: "President", team: "NSS Core", start: "2024-06", end: null },
  //     { role: "Vice President", team: "NSS Core", start: "2023-06", end: "2024-05" },
  //     { role: "Technical Lead", team: "TECH", start: "2022-08", end: "2023-05" },
  //     { role: "Member", team: "TECH", start: "2022-01", end: "2022-07" },
  //   ],
  // },
  // {
  //   id: "sangameshwar.sale@students.iiit.ac.in",
  //   name: "Sangameshwar Sale",
  //   email: "sangameshwar.sale@students.iiit.ac.in",
  //   rollNumber: "2024102015",
  //   year: "3rd Year",
  //   department: "ECE",
  //   photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s",
  //   phone: "+91 98765 43211",
  //   linkedin: "https://linkedin.com/in/sangameshwarsale",
  //   github: "https://github.com/sangameshwarsale",
  //   bio: "Tech enthusiast and problem solver. Currently serving as Vice President.",
  //   achievements: ["Winner of State-level Coding Competition", "Intern at leading tech company"],
  //   interests: ["Competitive Programming", "IoT", "Robotics"],
  //   isAdmin: true,
  //   workHistory: [
  //     { role: "Vice President", team: "NSS Core", start: "2024-06", end: null },
  //     { role: "Secretary", team: "NSS Core", start: "2023-06", end: "2024-05" },
  //     { role: "Member", team: "TECH", start: "2023-01", end: "2023-05" },
  //   ],
  // },
  // {
  //   id: "aditi.sharma@students.iiit.ac.in",
  //   name: "Aditi Sharma",
  //   email: "aditi.sharma@students.iiit.ac.in",
  //   rollNumber: "2024102016",
  //   year: "3rd Year",
  //   department: "CSE",
  //   photoUrl: "/favicon.ico",
  //   phone: "+91 98765 43212",
  //   linkedin: "https://linkedin.com/in/aditisharma",
  //   github: "https://github.com/aditisharma",
  //   bio: "Organizing events and managing teams is my forte. Currently serving as Secretary.",
  //   achievements: ["Coordinated 5+ major college events"],
  //   interests: ["Event Management", "Public Speaking"],
  //   isAdmin: true,
  //   workHistory: [
  //     { role: "Secretary", team: "NSS Core", start: "2024-01", end: null },
  //     { role: "Event Coordinator", team: "LOGISTICS", start: "2023-06", end: "2023-12" },
  //     { role: "Volunteer", team: "LOGISTICS", start: "2023-01", end: "2023-05" },
  //   ],
  // },
  // {
  //   id: "rahul.verma@students.iiit.ac.in",
  //   name: "Rahul Verma",
  //   email: "rahul.verma@students.iiit.ac.in",
  //   rollNumber: "2024102017",
  //   year: "2nd Year",
  //   department: "CSE",
  //   photoUrl: "/favicon.ico",
  //   phone: "+91 98765 43213",
  //   linkedin: "https://linkedin.com/in/rahulverma",
  //   github: "https://github.com/rahulverma",
  //   bio: "Numbers and finance enthusiast. Currently serving as Treasurer.",
  //   achievements: ["Managed club budget efficiently"],
  //   interests: ["Finance", "Data Analysis"],
  //   isAdmin: true,
  //   workHistory: [
  //     { role: "Treasurer", team: "NSS Core", start: "2024-06", end: null },
  //    // { role: "Member", team: "NSS Core", start: "2024-01", end: "2024-05" },
  //   ],
  // },
  // {
  //   id: "priya.singh@students.iiit.ac.in",
  //   name: "Priya Singh",
  //   email: "priya.singh@students.iiit.ac.in",
  //   rollNumber: "2024102018",
  //   year: "4th Year",
  //   department: "CSE",
  //   photoUrl: "/favicon.ico",
  //   phone: "+91 98765 43214",
  //   linkedin: "https://linkedin.com/in/priyasingh",
  //   github: "https://github.com/priyasingh",
  //   bio: "Full-stack developer with a passion for open source. Currently Technical Lead.",
  //   achievements: ["Contributed to 10+ open source projects", "Mentored 20+ students"],
  //   interests: ["Web Development", "Open Source", "Mentoring"],
  //   isAdmin: false,
  //   workHistory: [
  //     { role: "Technical Lead", team: "TECH", start: "2023-08", end: null },
  //     { role: "Senior Developer", team: "TECH", start: "2022-08", end: "2023-07" },
  //     { role: "Developer", team: "TECH", start: "2022-01", end: "2022-07" },
  //   ],
  // },
  // {
  //   id: "neha.patel@students.iiit.ac.in",
  //   name: "Neha Patel",
  //   email: "neha.patel@students.iiit.ac.in",
  //   rollNumber: "2024102019",
  //   year: "3rd Year",
  //   department: "CSE",
  //   photoUrl: "/favicon.ico",
  //   phone: "+91 98765 43215",
  //   linkedin: "https://linkedin.com/in/nehapatel",
  //   github: "https://github.com/nehapatel",
  //   bio: "Creating beautiful and functional designs. Currently Design Head.",
  //   achievements: ["Designed UI for 5+ club projects"],
  //   interests: ["UI/UX Design", "Graphic Design"],
  //   isAdmin: false,
  //   workHistory: [
  //     { role: "Design Head", team: "DESIGN", start: "2024-06", end: null },
  //     { role: "Designer", team: "DESIGN", start: "2023-08", end: "2024-05" },
  //     { role: "Member", team: "DESIGN", start: "2023-01", end: "2023-07" },
  //   ],
  // },
  // {
  //   id: "vikram.reddy@students.iiit.ac.in",
  //   name: "Vikram Reddy",
  //   email: "vikram.reddy@students.iiit.ac.in",
  //   rollNumber: "2024102020",
  //   year: "2nd Year",
  //   department: "ECE",
  //   photoUrl: "/favicon.ico",
  //   phone: "+91 98765 43216",
  //   linkedin: "https://linkedin.com/in/vikramreddy",
  //   github: "https://github.com/vikramreddy",
  //   bio: "Spreading the word about tech and innovation. Currently Marketing Head.",
  //   achievements: ["Increased club social media engagement by 200%"],
  //   interests: ["Marketing", "Social Media", "Content Creation"],
  //   isAdmin: false,
  //   workHistory: [
  //     { role: "Marketing Head", team: "CONTENT", start: "2024-08", end: null },
  //     { role: "Content Creator", team: "CONTENT", start: "2024-01", end: "2024-07" },
  //   ],
  // },
  // {
  //   id: "rithik.palla@students.iiit.ac.in",
  //   name: "Rithik Palla",
  //   email: "rithik.palla@students.iiit.ac.in",
  //   rollNumber: "2024102021",
  //   year: "2nd Year",
  //   department: "CSE",
  //   photoUrl: "/favicon.ico",
  //   phone: "+91 98765 43217",
  //   linkedin: "https://linkedin.com/in/rithikpalla",
  //   github: "https://github.com/rithikpalla",
  //   bio: "Making events memorable and impactful. Currently Event Coordinator.",
  //   achievements: ["Coordinated 8+ successful events"],
  //   interests: ["Event Planning", "Team Coordination"],
  //   isAdmin: true,
  //   workHistory: [
  //     { role: "TECH HEAD", team: "TECH", start: "2024-06", end: null },
  //     { role: "Volunteer", team: "LOGISTICS", start: "2024-01", end: "2024-05" },
  //   ],
  // },
  // {
  //   id: "ananya.reddy@alumni.iiit.ac.in",
  //   name: "Ananya Reddy",
  //   email: "ananya.reddy@alumni.iiit.ac.in",
  //   rollNumber: "2021102045",
  //   year: "Alumni",
  //   department: "CSE",
  //   photoUrl: "/favicon.ico",
  //   phone: "+91 98765 43220",
  //   linkedin: "https://linkedin.com/in/ananyareddy",
  //   github: "https://github.com/ananyareddy",
  //   bio: "Former President of NSS (2023-2024). Now working as a Software Engineer.",
  //   achievements: [
  //     "Increased club membership by 150%",
  //     "Organized first-ever State-level Tech Summit",
  //     "Established partnerships with 5+ tech companies",
  //   ],
  //   interests: ["Leadership", "Community Service", "Technology"],
  //   isAdmin: false,
  //   workHistory: [
  //     { role: "President", team: "NSS Core", start: "2023-06", end: "2024-05" },
  //     { role: "Vice President", team: "NSS Core", start: "2022-06", end: "2023-05" },
  //     { role: "Technical Lead", team: "TECH", start: "2021-08", end: "2022-05" },
  //     { role: "Member", team: "TECH", start: "2021-01", end: "2021-07" },
  //   ],
  // },
  // {
  //   id: "karthik.iyer@alumni.iiit.ac.in",
  //   name: "Karthik Iyer",
  //   email: "karthik.iyer@alumni.iiit.ac.in",
  //   rollNumber: "2020102033",
  //   year: "Alumni",
  //   department: "CSE",
  //   photoUrl: "/favicon.ico",
  //   phone: "+91 98765 43221",
  //   linkedin: "https://linkedin.com/in/karthikiyer",
  //   github: "https://github.com/karthikiyer",
  //   bio: "Former Design Head. Created the visual identity of NSS. Currently a UX Designer at a startup.",
  //   achievements: [
  //     "Redesigned club website and branding",
  //     "Won Best Design Award at Techfest 2022",
  //   ],
  //   interests: ["UI/UX Design", "Branding", "Animation"],
  //   isAdmin: false,
  //   workHistory: [
  //     { role: "Design Head", team: "DESIGN", start: "2022-01", end: "2023-05" },
  //     { role: "Designer", team: "DESIGN", start: "2021-01", end: "2021-12" },
  //     { role: "Member", team: "CONTENT", start: "2020-08", end: "2020-12" },
  //   ],
  // }


export default members;