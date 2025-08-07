import React, { useState, useMemo } from 'react';
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
  Globe,
  Stethoscope,
  FileText,
  Image,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid,
  List,
  PiggyBank,
  Video,
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
    'uuid-generator': Hash,
    'doctor-booking-app': Stethoscope,
    'forex-trading-dashboard': BarChart3,
    'gig-marketplace': Briefcase,
    'blog-landing-page' : FileText,
    'remote-job-platform': Globe,
    'photo-gallery-page': Image,
    'prime-trust-bank': PiggyBank,
    'banking-user-dashboard': Layout,
    'banking-admin-dashboard': Layout,
    'streaming-platform': Video,
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
    thumbnail: null
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
  },
  {
    id: 'doctor-booking-app',
    title: 'Doctor Booking App',
    description: 'User-friendly interface for booking doctor appointments with calendar integration.',
    category: 'Healthcare',
    tags: ['Healthcare', 'Booking', 'Appointments'],
    gradient: 'bg-gradient-to-br from-green-600 to-teal-600',
    thumbnail: null
  },
  {
    id: 'forex-trading-dashboard',
    title: 'Forex Trading Dashboard',
    description: 'Advanced forex trading dashboard with live currency pair tracking and analytics.',
    category: 'Fintech',
    tags: ['Forex', 'Trading', 'Finance'],
    gradient: 'bg-gradient-to-br from-blue-700 to-indigo-700',
    thumbnail: null
  },
  {
    id: 'gig-marketplace',
    title: 'Gig Marketplace',
    description: 'Dynamic marketplace interface for freelancers to showcase and sell their services.',
    category: 'Marketplace',
    tags: ['Marketplace', 'Freelance', 'Services'],
    gradient: 'bg-gradient-to-br from-purple-600 to-pink-600',
    thumbnail: null
  },
  {
    id: 'blog-landing-page',
    title: 'Blog Landing Page',
    description: 'Content management landing page for reading, creating, editing, and publishing blog posts.',
    category: 'Content Management',
    tags: ['Blog', 'CMS', 'Content', 'Publishing'],
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    thumbnail: null
  },
  {
    id: 'remote-job-platform',
    title: 'Remote Job Platform',
    description: 'Comprehensive platform for finding and applying to remote job opportunities.',
    category: 'Job Board',
    tags: ['Remote', 'Jobs', 'Platform'],
    gradient: 'bg-gradient-to-br from-gray-700 to-gray-800',
    thumbnail: null
  },
  {
    id: 'photo-gallery-page',
    title: 'Photo Gallery Page',
    description: 'Visually stunning photo gallery interface with smooth transitions and hover effects.',
    category: 'Gallery',
    tags: ['Gallery', 'Photos', 'Visual'],
    gradient: 'bg-gradient-to-br from-pink-500 to-red-500',
    thumbnail: null
  },
  {
    id: 'prime-trust-bank',
    title: 'Prime Trust Bank',
    description: 'Banking interface with admin and user dashboard, account management, transactions, and financial services.',
    category: 'Banking',
    tags: ['Banking', 'Finance', 'Account Management'],
    gradient: 'bg-gradient-to-br from-blue-800 to-blue-900',
    thumbnail: null
  },
  {
    id: 'banking-user-dashboard',
    title: 'Banking User Dashboard',
    description: 'User-friendly banking dashboard for managing accounts, transactions, and financial insights.',
    category: 'Banking',
    tags: ['Banking', 'Dashboard', 'Finance'],
    gradient: 'bg-gradient-to-br from-green-700 to-green-800',
    thumbnail: null
  },
  {
    id: 'banking-admin-dashboard',
    title: 'Banking Admin Dashboard',
    description: 'Comprehensive admin dashboard for managing banking operations, user accounts, and transactions.',
    category: 'Banking',
    tags: ['Banking', 'Admin', 'Dashboard'],
    gradient: 'bg-gradient-to-br from-purple-700 to-purple-800',
    thumbnail: null
  },
  {
    id: 'streaming-platform',
    title: 'Streaming Platform',
    description: 'Modern streaming platform interface with video playback, user profiles, and content discovery.',
    category: 'Entertainment',
    tags: ['Streaming', 'Video', 'Platform'],
    gradient: 'bg-gradient-to-br from-red-600 to-red-700',
    thumbnail: null
  },
];

const HomePage = ({ onNavigate }) => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(interfaceData.map(item => item.category))].sort();
    return ['All', ...cats];
  }, []);

  // Filter and search logic
  const filteredData = useMemo(() => {
    return interfaceData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compact Card Component
  const InterfaceCard = ({ interfaceItem, compact = false }) => {
    const IconComponent = getIconForComponent(interfaceItem.id);
    
    if (compact) {
      return (
        <div 
          className="group cursor-pointer bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-200"
          onClick={() => onNavigate(`/interface/${interfaceItem.id}`)}
        >
          <div className="flex items-start gap-3">
            <div className={`${interfaceItem.gradient} p-2 rounded-lg flex-shrink-0`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
                  {interfaceItem.title}
                </h3>
                <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full whitespace-nowrap">
                  {interfaceItem.category}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                {interfaceItem.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {interfaceItem.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div 
        className="group cursor-pointer"
        onClick={() => onNavigate(`/interface/${interfaceItem.id}`)}
      >
        <div className="bg-white/8 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/12 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
          {/* Thumbnail Preview - Reduced height */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-32 mb-4 flex items-center justify-center overflow-hidden relative">
            {interfaceItem.thumbnail ? (
              <img 
                src={interfaceItem.thumbnail} 
                alt={interfaceItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            
            <div 
              className={`${interfaceItem.thumbnail ? 'hidden' : 'flex'} absolute inset-0 ${interfaceItem.gradient} opacity-30 items-center justify-center flex-col`}
            >
              <div className="relative z-10 text-center">
                <IconComponent className="w-10 h-10 text-white/70 mx-auto mb-2" />
                <div className="text-white/50 text-xs font-medium">{interfaceItem.title}</div>
              </div>
            </div>
          </div>
          
          {/* Interface Info - Reduced spacing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate pr-2">
                {interfaceItem.title}
              </h3>
              <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full whitespace-nowrap">
                {interfaceItem.category}
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
              {interfaceItem.description}
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {interfaceItem.tags.slice(0, 3).map((tag, tagIndex) => (
                <span key={tagIndex} className="text-xs text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-purple-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            BRAND NOVA UI Showcase
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
            Interface
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Design</span>
            <span className="block text-2xl mt-1">Portfolio</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm">
            A curated collection of modern, responsive interface designs crafted for visual impact and user experience.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search interfaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all text-sm"
            />
          </div>

          {/* Controls Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400" />
              <div className="flex gap-1 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {category}
                    {category !== 'All' && (
                      <span className="ml-1 opacity-70">
                        ({interfaceData.filter(item => item.category === category).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* Items per page */}
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-white/10 border border-white/20 rounded-lg text-white text-xs px-2 py-1 focus:outline-none focus:border-purple-400"
              >
                <option value={8} className="bg-gray-800">8 per page</option>
                <option value={12} className="bg-gray-800">12 per page</option>
                <option value={24} className="bg-gray-800">24 per page</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-purple-500' : 'hover:bg-white/10'} transition-all`}
                >
                  <Grid className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-purple-500' : 'hover:bg-white/10'} transition-all`}
                >
                  <List className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Compact Stats Section */}
          <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-1">{interfaceData.length}</div>
              <div className="text-gray-400 text-sm">Interfaces</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">
                {categories.length - 1}
              </div>
              <div className="text-gray-400 text-sm">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-gray-400 text-sm">Responsive</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">{filteredData.length}</div>
              <div className="text-gray-400 text-sm">Matching</div>
            </div>
          </div>

          {/* Results Info */}
          <div className="text-center text-sm text-gray-400">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} interfaces
            {searchTerm && (
              <span> for "{searchTerm}"</span>
            )}
            {selectedCategory !== 'All' && (
              <span> in {selectedCategory}</span>
            )}
          </div>
        </div>

        {/* Interface Grid/List */}
        {paginatedData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No interfaces found matching your criteria.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' 
              : 'space-y-2'
          }>
            {paginatedData.map((interfaceItem) => (
              <InterfaceCard 
                key={interfaceItem.id} 
                interfaceItem={interfaceItem} 
                compact={viewMode === 'list'}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              const isCurrentPage = page === currentPage;
              const shouldShow = page === 1 || page === totalPages || 
                               (page >= currentPage - 1 && page <= currentPage + 1);
              
              if (!shouldShow && page !== 2 && page !== totalPages - 1) {
                if (page === 2 && currentPage > 4) return <span key={page} className="text-gray-500">...</span>;
                if (page === totalPages - 1 && currentPage < totalPages - 3) return <span key={page} className="text-gray-500">...</span>;
                return null;
              }
              
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    isCurrentPage
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Compact Footer */}
        <div className="text-center mt-12 pb-8">
          <div className="text-gray-400 text-xs">
            Built with React • Tailwind CSS • Crafted with ❤️ by BRAND NOVA
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;