import React from 'react';
import { Heart, Leaf, Calendar, BookOpen, Handshake } from 'lucide-react';

interface Event {
  id: number;
  url: string;
  title: string;
  date: string;
  description: string;
  imagePosition: 'left' | 'right';
  icon: React.ReactNode;
  category: string;
  backgroundImage: string;
  stats: {
    participants: string;
    audience: string;
    impact: string;
  };
}

const FlagshipEvents = () => {
  const events: Event[] = [
    {
      id: 1,
      url: '/events/blood-donation-camp',
      title: "Blood Donation Camp",
      date: "26/01/2025",
      description: "On the occasion of Republic Day 2025, the National Service Scheme (NSS) organized a Blood Donation Drive in collaboration with Osmania Medical Hospital. The event aimed to support patients in need by encouraging the IIIT-H community to contribute to this life-saving cause.\n\nWith enthusiastic participation from students, faculty, and staff, the drive successfully collected numerous units of blood, showing the strong social responsibility within the IIIT Hyderabad community. The medical team from Osmania Medical Hospital ensured a safe and seamless donation process, making it an impactful and meaningful event.",
      imagePosition: 'left',
      icon: <Heart className="w-16 h-16 text-red-500" />,
      category: 'Health & Wellness',
      backgroundImage: 'https://life.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3DXimHNrJZNnbQGaswLzFukg_poster_Blood_Donation_Camp_nss.png&w=3840&q=75',
      stats: {
        participants: '300+',
        audience: 'Open to All',
        impact: '120+ Units'
      }
    },
    {
      id: 2,
      url: '/events/orphanage-visit',
      title: "Orphanage Visit",
      date: "16/11/2024",
      description: "On the occasion of Children’s Day, a meaningful visit was planned to the Tapasvi Foundation Orphanage Home to honor and celebrate the innocence and potential of every child. Volunteers led interactive games, distributed books and educational supplies, and shared encouraging talks, aiming to spread joy and reinforce community care and compassion.",
      imagePosition: 'right',
      icon: <Handshake className="w-16 h-16 text-blue-500" />,
      category: 'Community Service',
      backgroundImage: 'https://life.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D684fkoNxWs9RPZnHDewJq9_IMG-20231116-WA0099.jpg&w=3840&q=75',
      stats: {
        participants: '60+',
        audience: 'Internal',
        impact: '40+ Children'
      }
    },
    {
      id: 3,
      url: '/events/batch-tree-plantation',
      title: "Batch Tree Plantation",
      date: "03/08/2024 - 04/08/2024",
      description: "A symbolic batch tree is planted during UG1 induction, and additional saplings are planted to celebrate the new batch's arrival. This tradition emphasizes unity, growth, and a commitment to sustainability for a greener campus.",
      imagePosition: 'left',
      icon: <Leaf className="w-16 h-16 text-green-500" />,
      category: 'Environment',
      backgroundImage: '/carousel_images/4.jpg',
      stats: {
        participants: '120+',
        audience: 'Freshers',
        impact: '50+ Trees'
      }
    }
  ];

  const renderEventCard = (event: Event) => (
    <a 
      key={event.id} href={event.url}
      className={`
        grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16 
        modern-card group overflow-hidden
        ${event.imagePosition === 'right' ? 'lg:grid-flow-col-dense' : ''}
      `}
    >
      {/* Image Section */}
      <div className={`
        relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px] rounded-2xl 
        bg-cover bg-center
        ${event.imagePosition === 'right' ? 'lg:col-start-2' : ''}
        group-hover:scale-105 transition-all duration-500 overflow-hidden
      `}
      style={{ backgroundImage: `url(${event.backgroundImage})` }}
      >
        {/* Blur overlay that removes on hover */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] group-hover:backdrop-blur-none group-hover:bg-black/10 transition-all duration-500 rounded-2xl" />
        
        {/* Indian Flag Border */}
        <div className="indian-flag-border absolute top-0 left-0 w-full h-2 rounded-t-2xl z-20" />
        
        {/* Category badge */}
        <div className="absolute top-6 left-6 px-4 py-2 bg-indigo-900/90 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-lg z-20 group-hover:bg-indigo-800/95 transition-all duration-500">
          {event.category}
        </div>
        
        {/* Bottom gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />
      </div>

      {/* Content Section */}
      <div className={`
        space-y-6 p-4
        ${event.imagePosition === 'right' ? 'lg:col-start-1' : ''}
      `}>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-primary">
            <Calendar className="w-6 h-6 text-orange-600" />
            <span className="font-bold uppercase tracking-wide text-sm bg-orange-100 px-3 py-1 rounded-full">
              {event.date}
            </span>
          </div>
          
          <h3 className="heading-primary text-3xl md:text-4xl text-primary">
            {event.title}
          </h3>
        </div>
        
        <p className="text-lg leading-relaxed text-gray-700">
          {event.description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a href={event.url} className="btn-base bg-indigo-800 text-white hover:bg-indigo-900 transition-all duration-300 inline-flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span>Learn More</span>
          </a>
        </div>

        {/* Impact stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="text-center p-3 md:p-4 bg-orange-50 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-colors">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-1">{event.stats.participants}</div>
            <div className="text-xs md:text-sm font-medium text-orange-700">Participants</div>
          </div>
          <div className="text-center p-3 md:p-4 bg-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-colors">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mb-1">{event.stats.audience}</div>
            <div className="text-xs md:text-sm font-medium text-blue-700">Audience</div>
          </div>
          <div className="text-center p-3 md:p-4 bg-green-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-colors">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600 mb-1">{event.stats.impact}</div>
            <div className="text-xs md:text-sm font-medium text-green-700">Impact</div>
          </div>
        </div>
      </div>
    </a>
  );

  return (
    <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white via-orange-50 to-green-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="indian-flag-border w-32 h-2 mx-auto mb-8 rounded-full" />
          
          <h1 className="text-4xl md:text-6xl text-blue-800 mb-6 font-bold">
            Flagship Events
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            Our signature initiatives that define the NSS spirit - where <span className="font-bold text-orange-500">service meets impact</span>, 
            and young hearts create lasting change in communities across <span className="font-bold text-green-600">Bharat</span>.
          </p>
          
          {/* Mission Statement */}
          <div className="max-w-2xl mx-auto p-6 bg-white backdrop-blur-sm rounded-2xl border-2 border-blue-200 shadow-lg">
            <p className="text-lg font-medium text-blue-800 mb-2">
              &quot;सेवा परमो धर्मः&quot;
            </p>
            <p className="text-gray-600">
              Service is the highest virtue - Ancient Indian Wisdom
            </p>
          </div>
        </header>

        {/* Events Container */}
        <div className="space-y-12">
          {events.map(renderEventCard)}
        </div>

        {/* Statistics Overview */}
        {/* <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-slide-up">
          <div className="modern-card text-center group hover:scale-105 transition-all duration-300 p-4 lg:p-6">
            <div className="text-4xl lg:text-5xl mb-4 group-hover:animate-bounce-gentle"><Award className="w-16 h-16 lg:w-20 lg:h-20 mx-auto text-orange-500" /></div>
            <h3 className="heading-secondary text-xl lg:text-2xl text-orange-600 mb-2">Certified</h3>
            <p className="text-sm lg:text-base text-gray-600">Certified initiatives recognized at national level</p>
          </div>
          
          <div className="modern-card text-center group hover:scale-105 transition-all duration-300 p-4 lg:p-6">
            <div className="text-4xl lg:text-5xl mb-4 group-hover:animate-bounce-gentle"><Handshake className="w-16 h-16 lg:w-20 lg:h-20 mx-auto text-blue-500" /></div>
            <h3 className="heading-secondary text-xl lg:text-2xl text-blue-600 mb-2">Partnership</h3>
            <p className="text-sm lg:text-base text-gray-600">Collaborating with leading NGOs and government bodies</p>
          </div>
          
          <div className="modern-card text-center group hover:scale-105 transition-all duration-300 p-4 lg:p-6 sm:col-span-2 lg:col-span-1">
            <div className="text-4xl lg:text-5xl mb-4 group-hover:animate-bounce-gentle"><Star className="w-16 h-16 lg:w-20 lg:h-20 mx-auto text-green-500" /></div>
            <h3 className="heading-secondary text-xl lg:text-2xl text-green-600 mb-2">Impact</h3>
            <p className="text-sm lg:text-base text-gray-600">Measurable change in thousands of lives annually</p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FlagshipEvents;