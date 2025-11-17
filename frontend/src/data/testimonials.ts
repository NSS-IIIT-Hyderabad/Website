// data/testimonials.ts

export type Testimonial = {
  name: string;
  title: string;
  period?: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Dileep Kumar Adari",
    title: "Social Media Head",
    period: "(2023 - 2025)",
    quote:
      "This platform made it so easy to connect with others. I felt supported and inspired every step of the way.",
  },
  {
    name: "Sai Nikitha Obbineni",
    title: "Coordinator",
    period: "(2022 - 2024)",
    quote:
      "I've organized several events before, but this was by far the smoothest and most rewarding experience.",
  },
  {
    name: "Srihari Bandarupalli",
    title: "Coordinator",
    period: "(2022 - 2024)",
    quote:
      "I was blown away by the enthusiasm of the participants. The tools provided here helped me guide them effortlessly.",
  },
  {
    name: "Sri Rama Rathan Reddy Koluguri",
    title: "Logistics Head",
    period: "(2023 - 2025)",
    quote:
      "Joining this initiative was one of the best decisions I’ve made. It pushed me out of my comfort zone and taught me so much.",
  },
  {
    name: "Venkata Renu Jeevesh Madala",
    title: "Coordinator",
    period: "(2023 - 2025)",
    quote:
      "The collaboration was seamless, and the support from everyone involved made a huge difference.",
  },
  {
    name: "Aditya Pavani Penumalla",
    title: "Design Head",
    period: "(2022 - 2024)",
    quote:
      "I loved how well-structured everything was. I could focus on my work without worrying about logistics.",
  },
];
//  instead of this data later we will fetch data from backend and also that part of code will be in folder GraphQL_Q&M
// for events members and testimonials etc