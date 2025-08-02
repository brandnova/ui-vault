import React from 'react';
import { 
  Sparkles, 
  Layout, 
  Calculator, 
  Wallet, 
  Hotel, 
  Code, 
  Briefcase, 
  User, 
  BarChart3, 
  TrendingUp, 
  Hash,
  Globe
} from 'lucide-react';

// Icon mapping for your components
const getIconForComponent = (id) => {
  const iconMap = {
    'about-us': User,
    'crypto-wallet': Wallet,
    'freelance-rate-calculator': Calculator,
    'hotel-booking-interface': Hotel,
    'json-formatter': Code,
    'landing-page': Globe,
    'luxury-product-page': Sparkles,
    'portfolio': Briefcase,
    'task-flow-dashboard': Layout,
    'trading-dashboard': TrendingUp,
    'uuid-generator': Hash
  };
  return iconMap[id] || Layout;
};

// Interface metadata with thumbnail support
const interfaceData = [
  {
    id: 'about-us',
    title: 'About Us Page',
    description: 'Professional company about page with team showcase and company values.',
    category: 'Corporate',
    tags: ['About', 'Team', 'Corporate'],
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    thumbnail: null // Add path like '/src/assets/thumbnails/about-us.png' when available
  },
  {
    id: 'crypto-wallet',
    title: 'Crypto Wallet',
    description: 'Modern cryptocurrency wallet interface with portfolio tracking.',
    category: 'Fintech',
    tags: ['Crypto', 'Wallet', 'Finance'],
    gradient: 'bg-gradient-to-br from-orange-500 to-yellow-500',
    thumbnail: null
  },
  {
    id: 'freelance-rate-calculator',
    title: 'Freelance Rate Calculator',
    description: 'Interactive calculator to help freelancers determine their hourly rates.',
    category: 'Tool',
    tags: ['Calculator', 'Freelance', 'Business'],
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
    thumbnail: null
  },
  {
    id: 'hotel-booking-interface',
    title: 'Hotel Booking Interface',
    description: 'Elegant hotel booking system with search and reservation features.',
    category: 'Booking',
    tags: ['Hotel', 'Booking', 'Travel'],
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
    thumbnail: null
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Clean JSON formatter and validator tool with syntax highlighting.',
    category: 'Developer Tool',
    tags: ['JSON', 'Formatter', 'Developer'],
    gradient: 'bg-gradient-to-br from-gray-600 to-gray-800',
    thumbnail: null
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'High-converting landing page design with modern aesthetics.',
    category: 'Marketing',
    tags: ['Landing', 'Marketing', 'Conversion'],
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    thumbnail: null
  },
  {
    id: 'luxury-product-page',
    title: 'Luxury Product Page',
    description: 'Premium product showcase with elegant design and smooth interactions.',
    category: 'E-commerce',
    tags: ['Luxury', 'Product', 'E-commerce'],
    gradient: 'bg-gradient-to-br from-rose-500 to-pink-500',
    thumbnail: null
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'Creative portfolio showcase with project galleries and case studies.',
    category: 'Portfolio',
    tags: ['Portfolio', 'Creative', 'Showcase'],
    gradient: 'bg-gradient-to-br from-violet-500 to-purple-500',
    thumbnail: null
  },
  {
    id: 'task-flow-dashboard',
    title: 'Task Flow Dashboard',
    description: 'Comprehensive task management dashboard with workflow visualization.',
    category: 'Dashboard',
    tags: ['Dashboard', 'Tasks', 'Productivity'],
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    thumbnail: null
  },
  {
    id: 'trading-dashboard',
    title: 'Trading Dashboard',
    description: 'Professional trading interface with real-time charts and analytics.',
    category: 'Fintech',
    tags: ['Trading', 'Finance', 'Analytics'],
    gradient: 'bg-gradient-to-br from-red-500 to-orange-500',
    thumbnail: null
  },
  {
    id: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Simple and efficient UUID generator tool with multiple format options.',
    category: 'Developer Tool',
    tags: ['UUID', 'Generator', 'Developer'],
    gradient: 'bg-gradient-to-br from-teal-500 to-cyan-500',
    thumbnail: null
  }
];

const HomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-500/20 text-purple-300 px-6 py-3 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-purple-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            UI Showcase Collection
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Interface
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Design</span>
            <br />Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A curated collection of modern, responsive interface designs crafted for visual impact and user engagement.
          </p>
        </div>

        {/* Interface Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interfaceData.map((interfaceItem) => {
            const IconComponent = getIconForComponent(interfaceItem.id);
            
            return (
              <div 
                key={interfaceItem.id}
                className="group cursor-pointer"
                onClick={() => onNavigate(`/interface/${interfaceItem.id}`)}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                  {/* Thumbnail Preview */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl h-48 mb-6 flex items-center justify-center overflow-hidden relative">
                    {interfaceItem.thumbnail ? (
                      // Show actual thumbnail if available
                      <img 
                        src={interfaceItem.thumbnail} 
                        alt={interfaceItem.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to icon if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    {/* Fallback icon display */}
                    <div 
                      className={`${interfaceItem.thumbnail ? 'hidden' : 'flex'} absolute inset-0 ${interfaceItem.gradient} opacity-30 items-center justify-center flex-col`}
                    >
                      <div className="relative z-10 text-center">
                        <IconComponent className="w-16 h-16 text-white/70 mx-auto mb-3" />
                        <div className="text-white/50 text-sm font-medium">{interfaceItem.title}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interface Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {interfaceItem.title}
                      </h3>
                      <span className="text-purple-400 text-sm font-medium bg-purple-500/20 px-3 py-1 rounded-full">
                        {interfaceItem.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {interfaceItem.description}
                    </p>
                    <div className="flex items-center space-x-2 pt-2">
                      {interfaceItem.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{interfaceData.length}</div>
            <div className="text-gray-400">Interface Designs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {[...new Set(interfaceData.map(i => i.category))].length}
            </div>
            <div className="text-gray-400">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400">Responsive</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 pb-12">
          <div className="text-gray-400 text-sm">
            Built with React • Tailwind CSS • Crafted with ❤️
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;