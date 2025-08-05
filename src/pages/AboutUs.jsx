import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronDown, Moon, Sun, Menu, X, ExternalLink, MapPin, Users, Calendar, Award, Mail, Phone } from "lucide-react";

// Theme Context
const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return { isDark, toggleTheme };
};

// Mobile Navigation
const MobileNav = ({ isOpen, onClose, isDark }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className={`fixed right-0 top-0 h-full w-64 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-xl`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Menu</h3>
          <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-4">
          {['About', 'Team', 'Journey', 'Careers', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`block py-2 px-4 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
              {item}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

// Header with Navigation
const Header = ({ isDark, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? `${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg` 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg ${isDark ? 'bg-indigo-500' : 'bg-indigo-600'} flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">TC</span>
              </div>
              <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>TechCorp</span>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {['About', 'Team', 'Journey', 'Careers', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isDark={isDark} />
    </>
  );
};

// Dropdown Component
const Dropdown = ({ label, options, onSelect, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
          isDark 
            ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        {selected}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg border z-10 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-2 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Filter Tabs Component
const FilterTabs = ({ activeTab, onTabChange, isDark }) => {
  const tabs = ['All', 'Founders', 'Engineering', 'Design', 'Marketing'];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === tab
              ? `${isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'} shadow-lg`
              : `${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// Icon Components
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const DribbbleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 5.507c1.112 1.121 1.803 2.658 1.889 4.364-.348-.074-3.833-.763-7.286-.349.148-.357.29-.714.424-1.076 3.634-1.497 5.407-3.636 5.973-4.939zm-1.502-1.51c-.498 1.204-2.128 3.226-5.576 4.555-1.726-3.173-3.632-5.878-3.918-6.243 1.314-.511 2.75-.792 4.243-.792 1.98 0 3.78.647 5.251 1.48zm-8.471-.629c.253.34 2.122 3.063 3.872 6.169-4.881 1.298-9.188 1.275-9.667 1.268-.641-2.895.304-5.549 1.563-7.437zm-.363 8.894c.537.006 5.38.033 10.685-1.407.582 1.136 1.031 2.342 1.298 3.596-5.464 2.318-11.766.901-14.168-1.705-.016-.126-.025-.254-.025-.384.001-1.515.4-2.933 1.095-4.166.48.008 4.451.041 9.115-1.934zm11.794 2.515c-.225-1.309-.74-2.572-1.409-3.751 3.193-.507 6.006.324 6.337.436-.425 1.829-1.413 3.501-2.928 4.735-.001-.473-.001-.946 0-1.42z" />
  </svg>
);

// Data
const placeholderImage = (width, height, text = '') => 
  `https://via.placeholder.com/${width}x${height}.png/6366f1/ffffff?text=${encodeURIComponent(text)}`;

const founders = [
  {
    id: 1,
    name: "Alex Chen",
    title: "CEO & Co-founder",
    department: "Founders",
    bio: "Former product lead at Google with 10+ years of experience in scaling tech products. Passionate about building products that make a real difference.",
    image: placeholderImage(400, 400, "Alex C"),
    location: "San Francisco, CA",
    joinedDate: "June 2020",
    socialLinks: [
      { name: "Twitter", url: "#", icon: TwitterIcon },
      { name: "LinkedIn", url: "#", icon: LinkedInIcon },
    ],
    skills: ["Product Strategy", "Leadership", "Growth"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "CTO & Co-founder",
    department: "Founders",
    bio: "Ex-engineering director at Amazon, specializing in cloud infrastructure and AI systems. Loves solving complex technical challenges.",
    image: placeholderImage(400, 400, "Sarah J"),
    location: "Seattle, WA",
    joinedDate: "June 2020",
    socialLinks: [
      { name: "Twitter", url: "#", icon: TwitterIcon },
      { name: "GitHub", url: "#", icon: GitHubIcon },
    ],
    skills: ["Cloud Architecture", "AI/ML", "Team Building"]
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    title: "CPO & Co-founder",
    department: "Founders",
    bio: "Design leader from Airbnb, focused on creating intuitive user experiences. Believes great design should be invisible.",
    image: placeholderImage(400, 400, "Michael R"),
    location: "Austin, TX",
    joinedDate: "June 2020",
    socialLinks: [
      { name: "Dribbble", url: "#", icon: DribbbleIcon },
      { name: "LinkedIn", url: "#", icon: LinkedInIcon },
    ],
    skills: ["UX Design", "Design Systems", "User Research"]
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "Senior Software Engineer",
    department: "Engineering",
    bio: "Full-stack developer with expertise in React and Node.js. Previously at Stripe, building scalable payment systems.",
    image: placeholderImage(400, 400, "Emily D"),
    location: "New York, NY",
    joinedDate: "March 2021",
    socialLinks: [
      { name: "GitHub", url: "#", icon: GitHubIcon },
      { name: "LinkedIn", url: "#", icon: LinkedInIcon },
    ],
    skills: ["React", "Node.js", "PostgreSQL"]
  },
  {
    id: 5,
    name: "James Wilson",
    title: "Head of Marketing",
    department: "Marketing",
    bio: "Growth marketing expert with a track record of scaling B2B SaaS companies from startup to IPO.",
    image: placeholderImage(400, 400, "James W"),
    location: "Denver, CO",
    joinedDate: "January 2022",
    socialLinks: [
      { name: "Twitter", url: "#", icon: TwitterIcon },
      { name: "LinkedIn", url: "#", icon: LinkedInIcon },
    ],
    skills: ["Growth Marketing", "SEO", "Analytics"]
  },
  {
    id: 6,
    name: "Lisa Chen",
    title: "Senior UX Designer",
    department: "Design",
    bio: "User experience designer passionate about accessibility and inclusive design. Previously at Figma.",
    image: placeholderImage(400, 400, "Lisa C"),
    location: "Los Angeles, CA",
    joinedDate: "August 2021",
    socialLinks: [
      { name: "Dribbble", url: "#", icon: DribbbleIcon },
      { name: "LinkedIn", url: "#", icon: LinkedInIcon },
    ],
    skills: ["UI/UX Design", "Accessibility", "Prototyping"]
  }
];

const milestones = [
  {
    id: 1,
    date: "June 2020",
    title: "Company founded",
    description: "Started in a small garage with just 3 people and a big vision to transform how businesses operate.",
    icon: "🚀",
    category: "Foundation"
  },
  {
    id: 2,
    date: "January 2021",
    title: "Seed funding round",
    description: "Raised $2M from top-tier investors including Sequoia Capital and Y Combinator to build our first product.",
    icon: "💰",
    category: "Funding"
  },
  {
    id: 3,
    date: "August 2021",
    title: "First product launch",
    description: "Released our MVP to early adopters with overwhelmingly positive reception and 500+ signups in the first week.",
    icon: "🎯",
    category: "Product"
  },
  {
    id: 4,
    date: "May 2022",
    title: "Series A funding",
    description: "Secured $15M led by Andreessen Horowitz to expand our team and accelerate product development.",
    icon: "📈",
    category: "Funding"
  },
  {
    id: 5,
    date: "December 2022",
    title: "Global expansion",
    description: "Opened offices in London and Singapore, establishing our presence in European and Asian markets.",
    icon: "🌍",
    category: "Growth"
  },
  {
    id: 6,
    date: "Present",
    title: "Scaling globally",
    description: "Now serving 10,000+ customers in 25 countries with 50+ employees across 4 continents.",
    icon: "🏆",
    category: "Achievement"
  },
];

const teamStats = [
  { id: 1, value: "50+", label: "Team members", icon: Users },
  { id: 2, value: "25", label: "Countries", icon: MapPin },
  { id: 3, value: "42%", label: "Women", icon: Award },
  { id: 4, value: "15", label: "Languages spoken", icon: Calendar },
];

const AboutUs = () => {
  const { isDark, toggleTheme } = useTheme();
  const [inViewElements, setInViewElements] = useState({});
  const [activeTeamFilter, setActiveTeamFilter] = useState('All');
  const [selectedMilestoneCategory, setSelectedMilestoneCategory] = useState('All');
  const [showAllTeam, setShowAllTeam] = useState(false);

  // Filter team members based on active filter
  const filteredTeamMembers = founders.filter(member => 
    activeTeamFilter === 'All' || member.department === activeTeamFilter
  );

  const displayedTeamMembers = showAllTeam ? filteredTeamMembers : filteredTeamMembers.slice(0, 3);

  // Filter milestones based on selected category
  const milestoneCategories = ['All', ...new Set(milestones.map(m => m.category))];
  const filteredMilestones = milestones.filter(milestone =>
    selectedMilestoneCategory === 'All' || milestone.category === selectedMilestoneCategory
  );

  // Custom hook for intersection observer
  const useAnimatedSection = (id) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
    
    useEffect(() => {
      if (inView) {
        setInViewElements(prev => ({ ...prev, [id]: true }));
      }
    }, [inView, id]);
    
    return { ref };
  };

  const themeClasses = {
    bg: isDark ? 'bg-gray-900' : 'bg-white',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    card: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    cardHover: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    section: isDark ? 'bg-gray-800' : 'bg-gray-50',
  };

  return (
    <div className={`${themeClasses.bg} transition-colors duration-300`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className={`relative pt-24 pb-20 overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`${
                inViewElements['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-1000 ease-out`}
              ref={useAnimatedSection('hero').ref}
            >
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${themeClasses.text}`}>
                Building the future, <span className="text-indigo-500">together</span>
              </h1>
              <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${themeClasses.textSecondary}`}>
                We're on a mission to transform how businesses operate through
                innovative technology and human-centered design.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <button className="group px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <span className="flex items-center justify-center">
                    Join our journey
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className={`px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                } hover:shadow-lg`}>
                  Learn more
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {teamStats.map((stat, index) => (
                  <div
                    key={stat.id}
                    className={`${
                      inViewElements['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    } transition-all duration-700 ease-out p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-white/20'}`}
                    style={{ transitionDelay: `${index * 100 + 500}ms` }}
                  >
                    <stat.icon className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                    <p className={`text-2xl font-bold ${themeClasses.text}`}>{stat.value}</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Background decorations */}
          <div className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-indigo-400/30 animate-pulse" />
          <div className="absolute bottom-1/3 right-12 w-6 h-6 rounded-full bg-purple-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-blue-400/30 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className={`py-20 ${themeClasses.bg}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.text}`}>
              Meet our amazing team
            </h2>
            <p className={`${themeClasses.textSecondary} max-w-2xl mx-auto text-lg`}>
              Talented individuals from around the world, united by a shared vision
              and passion for innovation.
            </p>
          </div>

          <FilterTabs 
            activeTab={activeTeamFilter} 
            onTabChange={setActiveTeamFilter} 
            isDark={isDark} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedTeamMembers.map((member, index) => {
              const { ref } = useAnimatedSection(`member-${member.id}`);
              
              return (
                <div
                  key={member.id}
                  ref={ref}
                  className={`group ${themeClasses.card} rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                    inViewElements[`member-${member.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <MapPin className="w-4 h-4" />
                        <span>{member.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className={`text-xl font-semibold ${themeClasses.text}`}>{member.name}</h3>
                        <p className="text-indigo-500 font-medium text-sm">{member.title}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        {member.department}
                      </span>
                    </div>
                    
                    <p className={`${themeClasses.textSecondary} mb-4 text-sm leading-relaxed`}>{member.bio}</p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill) => (
                          <span key={skill} className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        {member.socialLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.url}
                            className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-indigo-400 hover:bg-gray-700' : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-100'}`}
                            aria-label={link.name}
                          >
                            <link.icon />
                          </a>
                        ))}
                      </div>
                      <div className={`text-xs ${themeClasses.textSecondary} flex items-center`}>
                        <Calendar className="w-3 h-3 mr-1" />
                        {member.joinedDate}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTeamMembers.length > 3 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllTeam(!showAllTeam)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                } shadow-lg hover:shadow-xl`}
              >
                {showAllTeam ? 'Show Less' : `View All ${filteredTeamMembers.length} Members`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section id="journey" className={`py-20 ${themeClasses.section}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.text}`}>
              Our journey so far
            </h2>
            <p className={`${themeClasses.textSecondary} max-w-2xl mx-auto text-lg mb-8`}>
              From humble beginnings to shaping the future of our industry.
            </p>
            
            <div className="max-w-xs mx-auto">
              <Dropdown
                label="Filter by category"
                options={milestoneCategories}
                onSelect={setSelectedMilestoneCategory}
                isDark={isDark}
              />
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />

            {filteredMilestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const { ref } = useAnimatedSection(`milestone-${milestone.id}`);
              
              return (
                <div
                  key={milestone.id}
                  ref={ref}
                  className={`relative mb-12 md:flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
                >
                  {/* Date and Category */}
                  <div
                    className={`md:w-1/2 ${isEven ? "md:pr-12 text-right" : "md:pl-12"} mb-6 md:mb-0 ${
                      inViewElements[`milestone-${milestone.id}`] ? 'opacity-100 translate-x-0' : isEven ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'
                    } transition-all duration-500 ease-out`}
                  >
                    <div className="inline-block">
                      <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg mb-2">
                        <div className="font-semibold">{milestone.date}</div>
                      </div>
                      <div className={`text-sm ${themeClasses.textSecondary}`}>
                        {milestone.category}
                      </div>
                    </div>
                  </div>

                  {/* Milestone card */}
                  <div
                    className={`md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"} ${
                      inViewElements[`milestone-${milestone.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    } transition-all duration-500 ease-out delay-100`}
                  >
                    <div className={`${themeClasses.card} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 group`}>
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{milestone.icon}</span>
                        <h3 className={`text-xl font-semibold ${themeClasses.text} group-hover:text-indigo-500 transition-colors`}>
                          {milestone.title}
                        </h3>
                      </div>
                      <p className={`${themeClasses.textSecondary} leading-relaxed`}>{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className={`hidden md:block absolute left-1/2 top-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 ${
                    isDark ? 'bg-gray-900 border-indigo-500' : 'bg-white border-indigo-600'
                  } shadow-lg`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className={`py-20 ${themeClasses.bg}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.text}`}>
              Our culture & values
            </h2>
            <p className={`${themeClasses.textSecondary} max-w-2xl mx-auto text-lg`}>
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🚀",
                title: "Innovation First",
                description: "We constantly push boundaries and explore new possibilities to stay ahead of the curve."
              },
              {
                icon: "🤝",
                title: "Collaboration",
                description: "We believe the best ideas come from diverse perspectives working together towards a common goal."
              },
              {
                icon: "🎯",
                title: "Excellence",
                description: "We're committed to delivering the highest quality in everything we do, no shortcuts or compromises."
              },
              {
                icon: "🌱",
                title: "Growth Mindset",
                description: "We embrace challenges as opportunities to learn and grow both individually and as a team."
              },
              {
                icon: "💙",
                title: "Empathy",
                description: "We put ourselves in our customers' shoes and design solutions that truly serve their needs."
              },
              {
                icon: "🌍",
                title: "Global Impact",
                description: "We think globally and act responsibly, considering the broader impact of our decisions."
              }
            ].map((value, index) => {
              const { ref } = useAnimatedSection(`value-${index}`);
              
              return (
                <div
                  key={index}
                  ref={ref}
                  className={`${themeClasses.card} p-6 rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 ${
                    inViewElements[`value-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${themeClasses.text} group-hover:text-indigo-500 transition-colors`}>
                    {value.title}
                  </h3>
                  <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Team photo with overlay stats */}
          <div
            className={`relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-10 ${
              inViewElements['team-photo'] ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-500`}
            ref={useAnimatedSection('team-photo').ref}
          >
            <img
              src={placeholderImage(1200, 500, "Team Photo")}
              alt="Our team working together"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
              <div className="p-8 text-white w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                  <div>
                    <p className="text-lg mb-2 opacity-90">Remote-first culture</p>
                    <h3 className="text-2xl md:text-3xl font-bold">One global mission</h3>
                  </div>
                  <button className="mt-4 md:mt-0 px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
                    View all photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & CTA Section */}
      <section id="contact" className={`py-20 ${isDark ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900' : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600'} text-white relative overflow-hidden`}>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center ${
              inViewElements['cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } transition-all duration-500`}
            ref={useAnimatedSection('cta').ref}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to join our journey?
            </h2>
            <p className="text-indigo-100 mb-12 text-lg md:text-xl max-w-2xl mx-auto">
              We're always looking for passionate people to join our team and help
              shape the future. Let's build something amazing together.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Mail,
                  title: "Get in touch",
                  description: "Have questions? We'd love to hear from you.",
                  action: "Send us an email",
                  href: "mailto:hello@techcorp.com"
                },
                {
                  icon: Users,
                  title: "Join our team",
                  description: "Explore career opportunities with us.",
                  action: "View open positions",
                  href: "#careers"
                },
                {
                  icon: Phone,
                  title: "Schedule a call",
                  description: "Let's discuss how we can work together.",
                  action: "Book a meeting",
                  href: "#contact"
                }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-indigo-100 mb-4 text-sm">{item.description}</p>
                  <a href={item.href} className="text-white hover:text-indigo-200 font-medium text-sm underline underline-offset-4 hover:no-underline transition-all">
                    {item.action}
                  </a>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="group px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <span className="flex items-center justify-center">
                  View open positions
                  <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                Contact us
              </button>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-white/5 animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '2s' }} />
      </section>

      {/* Footer */}
      <footer className={`${themeClasses.bg} ${isDark ? 'border-gray-800' : 'border-gray-200'} border-t`}>
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-8 h-8 rounded-lg ${isDark ? 'bg-indigo-500' : 'bg-indigo-600'} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">TC</span>
                </div>
                <span className={`font-bold text-lg ${themeClasses.text}`}>TechCorp</span>
              </div>
              <p className={`${themeClasses.textSecondary} mb-4 max-w-md`}>
                Building the future through innovative technology and human-centered design. 
                Join us on our mission to transform how businesses operate.
              </p>
              <div className="flex space-x-4">
                {[TwitterIcon, LinkedInIcon, GitHubIcon, DribbbleIcon].map((Icon, index) => (
                  <a key={index} href="#" className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${themeClasses.text}`}>Company</h4>
              <ul className="space-y-2">
                {['About', 'Team', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className={`${themeClasses.textSecondary} hover:text-indigo-500 transition-colors text-sm`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${themeClasses.text}`}>Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item) => (
                  <li key={item}>
                    <a href="#" className={`${themeClasses.textSecondary} hover:text-indigo-500 transition-colors text-sm`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={`border-t pt-8 mt-8 text-center ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <p className={`${themeClasses.textSecondary} text-sm`}>
              © 2024 TechCorp. All rights reserved. Made with ❤️ by our amazing team.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;