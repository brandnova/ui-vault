import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Play,
  Plus,
  Info,
  X,
  Moon,
  Sun,
  Menu,
  Home,
  Film,
  Tv,
  List,
  Star,
  Clock,
  User
} from 'lucide-react';

const StreamingPlatform = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [activeCategory, setActiveCategory] = useState('home');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sample content data
  const contentCategories = [
    {
      id: 'trending',
      title: 'Trending Now',
      content: [
        { id: 1, title: 'Edge of Tomorrow', type: 'movie', year: 2023, rating: 'PG-13', duration: '1h 58m', genre: 'Sci-Fi/Action', thumbnail: '/placeholder-movie1.jpg', featured: true },
        { id: 2, title: 'The Last Kingdom', type: 'series', year: 2022, rating: 'TV-MA', seasons: 5, genre: 'Historical Drama', thumbnail: '/placeholder-movie2.jpg' },
        { id: 3, title: 'Midnight Special', type: 'movie', year: 2024, rating: 'PG-13', duration: '1h 45m', genre: 'Sci-Fi/Thriller', thumbnail: '/placeholder-movie3.jpg' },
        { id: 4, title: 'Arcane', type: 'series', year: 2021, rating: 'TV-14', seasons: 2, genre: 'Animation/Action', thumbnail: '/placeholder-movie4.jpg' },
        { id: 5, title: 'The Irishman', type: 'movie', year: 2023, rating: 'R', duration: '3h 29m', genre: 'Crime/Drama', thumbnail: '/placeholder-movie5.jpg' },
        { id: 6, title: 'Stranger Things', type: 'series', year: 2022, rating: 'TV-14', seasons: 4, genre: 'Sci-Fi/Horror', thumbnail: '/placeholder-movie6.jpg' },
      ]
    },
    {
      id: 'originals',
      title: 'StreamVibe Originals',
      content: [
        { id: 7, title: 'Dark Matter', type: 'series', year: 2023, rating: 'TV-MA', seasons: 1, genre: 'Sci-Fi/Mystery', thumbnail: '/placeholder-movie7.jpg' },
        { id: 8, title: 'The Crown Jewel', type: 'movie', year: 2024, rating: 'PG-13', duration: '2h 12m', genre: 'Action/Thriller', thumbnail: '/placeholder-movie8.jpg', featured: true },
        { id: 9, title: 'Mind Games', type: 'series', year: 2023, rating: 'TV-14', seasons: 3, genre: 'Drama/Psychological', thumbnail: '/placeholder-movie9.jpg' },
      ]
    },
    {
      id: 'action',
      title: 'Action & Adventure',
      content: [
        { id: 10, title: 'Extraction 2', type: 'movie', year: 2023, rating: 'R', duration: '2h 3m', genre: 'Action/Thriller', thumbnail: '/placeholder-movie10.jpg' },
        { id: 11, title: 'John Wick 4', type: 'movie', year: 2023, rating: 'R', duration: '2h 49m', genre: 'Action/Crime', thumbnail: '/placeholder-movie11.jpg' },
        { id: 12, title: 'The Mandalorian', type: 'series', year: 2023, rating: 'TV-14', seasons: 3, genre: 'Sci-Fi/Action', thumbnail: '/placeholder-movie12.jpg' },
      ]
    },
    {
      id: 'comedy',
      title: 'Comedies',
      content: [
        { id: 13, title: 'No Hard Feelings', type: 'movie', year: 2023, rating: 'R', duration: '1h 43m', genre: 'Comedy/Romance', thumbnail: '/placeholder-movie13.jpg' },
        { id: 14, title: 'Ted Lasso', type: 'series', year: 2023, rating: 'TV-MA', seasons: 3, genre: 'Comedy/Sports', thumbnail: '/placeholder-movie14.jpg' },
        { id: 15, title: 'The Office', type: 'series', year: 2020, rating: 'TV-14', seasons: 9, genre: 'Comedy/Mockumentary', thumbnail: '/placeholder-movie15.jpg' },
      ]
    }
  ];

  // Navigation items
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'movies', icon: Film, label: 'Movies' },
    { id: 'series', icon: Tv, label: 'TV Shows' },
    { id: 'my-list', icon: List, label: 'My List' },
  ];

  // Profile menu items
  const profileMenuItems = [
    { id: 'account', label: 'Account' },
    { id: 'help', label: 'Help Center' },
    { id: 'signout', label: 'Sign Out' },
  ];

  // Handle scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close content modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedContent && !event.target.closest('.content-modal')) {
        setSelectedContent(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedContent]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const formatContentInfo = (content) => {
    if (content.type === 'movie') {
      return `${content.year} • ${content.rating} • ${content.duration}`;
    } else {
      return `${content.year} • ${content.rating} • ${content.seasons} Season${content.seasons > 1 ? 's' : ''}`;
    }
  };

  const themeClasses = darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-200`}>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Navbar */}
      <header className={`fixed top-0 w-full z-30 transition-all duration-300 ${scrolled ? (darkMode ? 'bg-gray-900/95' : 'bg-white/95 backdrop-blur-sm') : 'bg-transparent'} ${darkMode ? 'border-gray-800' : 'border-gray-200'} border-b`}>
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Left side - Logo and Nav items */}
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <h1 className="text-red-600 font-bold text-2xl">StreamVibe</h1>
            
            <nav className="hidden lg:flex space-x-6 ml-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`flex items-center space-x-1 ${activeCategory === item.id ? 'font-semibold' : 'font-medium opacity-80 hover:opacity-100'}`}
                  onClick={() => setActiveCategory(item.id)}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {searchOpen ? (
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  className={`w-full pl-10 pr-4 py-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-red-500`}
                  autoFocus
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-1"
              >
                <Search size={24} />
              </button>
            )}
            
            <button className="hidden md:block p-1 relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            
            <button 
              onClick={toggleTheme}
              className="hidden md:block p-1"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-1"
              >
                <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white">
                  <User size={18} />
                </div>
                <ChevronDown size={16} className={`hidden lg:block transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {profileMenuOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} z-50`}>
                  <div className="py-1">
                    {profileMenuItems.map(item => (
                      <button
                        key={item.id}
                        className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed left-0 top-0 h-full w-64 ${darkMode ? 'bg-gray-900' : 'bg-white'} z-50 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">StreamVibe</h2>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-6">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center px-6 py-3 text-left ${activeCategory === item.id ? 'bg-red-600 text-white' : darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              onClick={() => {
                setActiveCategory(item.id);
                setMobileMenuOpen(false);
              }}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button 
            onClick={toggleTheme}
            className="flex items-center w-full px-4 py-2 text-left"
          >
            {darkMode ? <Sun size={20} className="mr-3" /> : <Moon size={20} className="mr-3" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="pt-20 pb-10">
        {/* Hero banner - Only shown on home */}
        {activeCategory === 'home' && (
          <div className="relative">
            <div className={`w-full h-96 md:h-screen max-h-[80vh] bg-gradient-to-r ${darkMode ? 'from-gray-800 to-gray-900' : 'from-gray-200 to-gray-300'}`}>
              {/* Placeholder for hero banner image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">Edge of Tomorrow</h2>
                  <p className="text-lg md:text-xl mb-6">A soldier fighting aliens gets to relive the same day over and over, becoming better skilled with each reset.</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium">
                      <Play size={20} className="mr-2" />
                      Play Now
                    </button>
                    <button className="flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-md font-medium backdrop-blur-sm">
                      <Info size={20} className="mr-2" />
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
          </div>
        )}

        {/* Content rows */}
        <div className="mt-6 px-4 space-y-8">
          {contentCategories.map(category => (
            <div key={category.id} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">{category.title}</h2>
              
              <div className="relative">
                <div className="overflow-x-auto pb-4 scrollbar-hide">
                  <div className="flex space-x-4">
                    {category.content.map(item => (
                      <div 
                        key={item.id}
                        className="flex-none w-48 md:w-56 lg:w-64 transition-transform hover:scale-105 cursor-pointer"
                        onClick={() => setSelectedContent(item)}
                      >
                        <div className={`aspect-video rounded-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                          {/* Placeholder for thumbnail */}
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-xs text-gray-400">Thumbnail: {item.title}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <h3 className="font-medium line-clamp-1">{item.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{formatContentInfo(item)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Content detail modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className={`content-modal w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-xl`}>
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 p-1 rounded-full bg-black/50 hover:bg-black/70"
              onClick={() => setSelectedContent(null)}
            >
              <X size={24} />
            </button>
            
            {/* Content header */}
            <div className={`h-64 md:h-96 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} relative`}>
              {/* Placeholder for backdrop image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg">Backdrop: {selectedContent.title}</span>
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              {/* Content info */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h2 className="text-3xl font-bold">{selectedContent.title}</h2>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className="text-green-500 font-medium">98% Match</span>
                  <span>{selectedContent.rating}</span>
                  <span>{selectedContent.type === 'movie' ? selectedContent.duration : `${selectedContent.seasons} Season${selectedContent.seasons > 1 ? 's' : ''}`}</span>
                  <span className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>HD</span>
                </div>
              </div>
            </div>
            
            {/* Content details */}
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <button className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium">
                  <Play size={20} className="mr-2" />
                  Play
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium">
                  <Plus size={20} className="mr-2" />
                  My List
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium">
                  <Info size={20} className="mr-2" />
                  Trailer
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <p className="mb-4">
                    {selectedContent.title} is a {selectedContent.genre.toLowerCase()} {selectedContent.type} about... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  
                  <div className="space-y-2">
                    <p><span className="text-gray-500">Cast:</span> Actor One, Actor Two, Actor Three</p>
                    <p><span className="text-gray-500">Genres:</span> {selectedContent.genre}</p>
                    <p><span className="text-gray-500">This {selectedContent.type} is:</span> Exciting, Suspenseful, Action-packed</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">More Like This</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {contentCategories[0].content.slice(0, 3).map(item => (
                        <div 
                          key={item.id}
                          className="aspect-video rounded bg-gray-800 cursor-pointer"
                          onClick={() => setSelectedContent(item)}
                        >
                          {/* Mini thumbnail */}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-500">Release year:</span> {selectedContent.year}</p>
                      <p><span className="text-gray-500">Rating:</span> {selectedContent.rating}</p>
                      {selectedContent.type === 'series' && (
                        <p><span className="text-gray-500">Seasons:</span> {selectedContent.seasons}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamingPlatform;