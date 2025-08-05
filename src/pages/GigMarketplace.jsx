import { useState, useMemo, useEffect } from "react"
import { Search, Star, Heart, Filter, Menu, X, ChevronLeft, ChevronRight, Zap, Clock, Shield, Award, MapPin, Eye, TrendingUp, Users } from "lucide-react"

// Enhanced Mock Data with additional realistic features
const MOCK_GIGS = [
  {
    id: "1",
    title: "AI-Powered Logo Design & Brand Identity",
    description: "Next-gen logo design using AI assistance and human creativity. Complete brand package with style guide.",
    category: "Graphic Design",
    price: 75,
    originalPrice: 125,
    rating: 4.9,
    reviews: 340,
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=240&fit=crop",
    freelancer: { 
      name: "Sarah Chen", 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face", 
      rating: 4.9,
      level: "Top Rated",
      responseTime: "1 hour",
      location: "San Francisco, CA"
    },
    deliveryTime: "2 days",
    featured: true,
    urgent: false,
    views: 1247,
    inQueue: 3,
    tags: ["AI-Assisted", "Brand Guide", "Unlimited Revisions"],
    completedOrders: 892
  },
  {
    id: "2",
    title: "Full-Stack Web App with AI Integration",
    description: "Modern web applications with React, Node.js, and AI features. Cloud deployment included.",
    category: "Web Development",
    price: 850,
    originalPrice: 1200,
    rating: 5.0,
    reviews: 127,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=240&fit=crop",
    freelancer: { 
      name: "Marcus Johnson", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face", 
      rating: 5.0,
      level: "Pro",
      responseTime: "30 min",
      location: "Austin, TX"
    },
    deliveryTime: "5 days",
    featured: true,
    urgent: true,
    views: 2156,
    inQueue: 1,
    tags: ["AI Integration", "Cloud Deploy", "Mobile Ready"],
    completedOrders: 234
  },
  {
    id: "3",
    title: "Advanced SEO with AI Analytics",
    description: "Comprehensive SEO strategy using AI-powered analytics and competitor intelligence.",
    category: "Digital Marketing",
    price: 195,
    originalPrice: 250,
    rating: 4.8,
    reviews: 89,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
    freelancer: { 
      name: "Emma Rodriguez", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face", 
      rating: 4.8,
      level: "Top Rated",
      responseTime: "2 hours",
      location: "Miami, FL"
    },
    deliveryTime: "4 days",
    featured: false,
    urgent: false,
    views: 876,
    inQueue: 5,
    tags: ["AI Analytics", "Competitor Intel", "Growth Hacking"],
    completedOrders: 445
  },
  {
    id: "4",
    title: "AI-Enhanced Content Creation",
    description: "SEO-optimized articles with AI research assistance and human editorial touch.",
    category: "Writing & Translation",
    price: 45,
    originalPrice: 65,
    rating: 4.9,
    reviews: 203,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=240&fit=crop",
    freelancer: { 
      name: "Alex Thompson", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face", 
      rating: 4.9,
      level: "Pro",
      responseTime: "15 min",
      location: "London, UK"
    },
    deliveryTime: "1 day",
    featured: false,
    urgent: true,
    views: 1534,
    inQueue: 2,
    tags: ["AI Research", "SEO Optimized", "Fast Delivery"],
    completedOrders: 1203
  },
  {
    id: "5",
    title: "Cinematic Video Editing with VFX",
    description: "Professional video editing with advanced VFX, color grading, and motion graphics.",
    category: "Video & Animation",
    price: 150,
    originalPrice: 200,
    rating: 4.9,
    reviews: 156,
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=240&fit=crop",
    freelancer: { 
      name: "Jordan Kim", 
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face", 
      rating: 4.9,
      level: "Top Rated",
      responseTime: "45 min",
      location: "Los Angeles, CA"
    },
    deliveryTime: "3 days",
    featured: true,
    urgent: false,
    views: 967,
    inQueue: 4,
    tags: ["4K Ready", "VFX Included", "Color Grading"],
    completedOrders: 567
  },
  {
    id: "6",
    title: "Social Media Growth Automation",
    description: "Automated social media management with AI-driven content scheduling and analytics.",
    category: "Digital Marketing",
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviews: 78,
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=240&fit=crop",
    freelancer: { 
      name: "Lisa Park", 
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face", 
      rating: 4.7,
      level: "Pro",
      responseTime: "1 hour",
      location: "Seattle, WA"
    },
    deliveryTime: "2 days",
    featured: false,
    urgent: false,
    views: 654,
    inQueue: 7,
    tags: ["Automation", "AI Content", "Analytics"],
    completedOrders: 312
  }
]

const CATEGORIES = [
  { id: "all", name: "All", count: MOCK_GIGS.length, icon: "🎯" },
  { id: "graphic", name: "Design", count: MOCK_GIGS.filter(g => g.category === "Graphic Design").length, icon: "🎨" },
  { id: "web", name: "Development", count: MOCK_GIGS.filter(g => g.category === "Web Development").length, icon: "💻" },
  { id: "marketing", name: "Marketing", count: MOCK_GIGS.filter(g => g.category === "Digital Marketing").length, icon: "📈" },
  { id: "writing", name: "Writing", count: MOCK_GIGS.filter(g => g.category === "Writing & Translation").length, icon: "✍️" },
  { id: "video", name: "Video", count: MOCK_GIGS.filter(g => g.category === "Video & Animation").length, icon: "🎬" },
]

const ITEMS_PER_PAGE = 9

function GigMarketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [favorites, setFavorites] = useState(new Set())
  const [sortBy, setSortBy] = useState("featured")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [hoveredGig, setHoveredGig] = useState(null)

  // Simulate live user activity
  const [onlineUsers, setOnlineUsers] = useState(1247)
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 10) - 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const filteredGigs = useMemo(() => {
    let filtered = MOCK_GIGS

    if (activeCategory !== "all") {
      const categoryName = CATEGORIES.find(c => c.id === activeCategory)?.name
      const categoryMap = {
        "Design": "Graphic Design",
        "Development": "Web Development", 
        "Marketing": "Digital Marketing",
        "Writing": "Writing & Translation",
        "Video": "Video & Animation"
      }
      filtered = filtered.filter((gig) => gig.category === (categoryMap[categoryName] || categoryName))
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (gig) =>
          gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gig.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gig.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price
        case "price-high": return b.price - a.price
        case "rating": return b.rating - a.rating
        case "reviews": return b.reviews - a.reviews
        case "delivery": return parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
        default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating
      }
    })

    return filtered
  }, [searchTerm, activeCategory, sortBy])

  const totalPages = Math.ceil(filteredGigs.length / ITEMS_PER_PAGE)
  const paginatedGigs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredGigs.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredGigs, currentPage])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const toggleFavorite = (gigId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(gigId)) {
      newFavorites.delete(gigId)
    } else {
      newFavorites.add(gigId)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Futuristic Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ⚡ GigFlow
              </div>
              <nav className="hidden lg:flex space-x-6">
                <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium text-sm">Explore</a>
                <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium text-sm">AI Tools</a>
                <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium text-sm">Become Pro</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-1 text-xs text-cyan-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{onlineUsers.toLocaleString()} online</span>
              </div>
              <div className="hidden md:flex space-x-2">
                <button className="px-3 py-1.5 text-slate-300 hover:text-cyan-400 font-medium transition-colors text-sm">
                  Sign In
                </button>
                <button className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-200 font-medium shadow-lg text-sm">
                  Join Pro
                </button>
              </div>
              <button 
                className="lg:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/80 backdrop-blur-md border-t border-cyan-500/20 py-4">
            <div className="container mx-auto px-4 space-y-3">
              <a href="#" className="block text-slate-300 hover:text-cyan-400 font-medium text-sm">Explore</a>
              <a href="#" className="block text-slate-300 hover:text-cyan-400 font-medium text-sm">AI Tools</a>
              <a href="#" className="block text-slate-300 hover:text-cyan-400 font-medium text-sm">Become Pro</a>
              <div className="flex space-x-2 pt-3 border-t border-slate-700">
                <button className="px-3 py-1.5 text-slate-300 hover:text-cyan-400 font-medium text-sm">Sign In</button>
                <button className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium text-sm">Join Pro</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Compact Hero Search */}
      <section className="bg-gradient-to-r from-purple-900/50 via-slate-800/50 to-cyan-900/50 text-white py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Find 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mx-2">
              AI-Enhanced
            </span>
            Services
          </h1>
          <p className="text-sm sm:text-lg mb-6 max-w-2xl mx-auto text-slate-300">
            Next-generation freelance marketplace powered by AI
          </p>
          
          <div className={`relative max-w-2xl mx-auto transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
            <div className="flex bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/30">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search AI services..."
                  className="w-full py-3 pl-12 pr-4 bg-transparent text-white placeholder-slate-400 focus:outline-none text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <button className="px-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 transition-all duration-200 font-semibold">
                <Zap size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
          {/* Compact Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-slate-700/50 p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Filters</h2>
                <Filter size={16} className="text-slate-400" />
              </div>
              
              {/* Compact Categories */}
              <div className="mb-4">
                <h3 className="font-semibold text-slate-300 mb-3 text-sm">Categories</h3>
                <div className="space-y-1">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id)
                        setCurrentPage(1)
                      }}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-200 flex justify-between items-center text-sm
                        ${activeCategory === category.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-300"
                        }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </span>
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Sort */}
              <div>
                <h3 className="font-semibold text-slate-300 mb-3 text-sm">Sort by</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 bg-white/5 border border-slate-600 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                >
                  <option value="featured">⭐ Featured</option>
                  <option value="price-low">💰 Price: Low</option>
                  <option value="price-high">💎 Price: High</option>
                  <option value="rating">🏆 Best Rating</option>
                  <option value="delivery">⚡ Fastest</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Compact Gig Grid */}
          <section className="lg:col-span-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {CATEGORIES.find(c => c.id === activeCategory)?.name} Services
                  {searchTerm && (
                    <span className="text-cyan-400"> for "{searchTerm}"</span>
                  )}
                </h2>
                <p className="text-slate-400 mt-1 text-sm">
                  {filteredGigs.length} AI-enhanced services available
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-cyan-500 text-white" : "bg-white/5 text-slate-400 hover:text-slate-300"}`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-cyan-500 text-white" : "bg-white/5 text-slate-400 hover:text-slate-300"}`}
                >
                  <div className="w-4 h-4 flex flex-col space-y-1">
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                  </div>
                </button>
              </div>
            </div>

            {paginatedGigs.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No services found</h3>
                <p className="text-slate-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" 
                : "space-y-4"
              }>
                {paginatedGigs.map((gig) => (
                  <div
                    key={gig.id}
                    className={`bg-white/5 backdrop-blur-md rounded-xl hover:bg-white/10 transition-all duration-300 overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 group cursor-pointer relative
                      ${viewMode === "list" ? "flex" : ""}
                    `}
                    onMouseEnter={() => setHoveredGig(gig.id)}
                    onMouseLeave={() => setHoveredGig(null)}
                  >
                    {/* Glow effect */}
                    {hoveredGig === gig.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl -z-10"></div>
                    )}
                    
                    <div className={`relative ${viewMode === "list" ? "w-40 flex-shrink-0" : ""}`}>
                      <img
                        src={gig.imageUrl}
                        alt={gig.title}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300
                          ${viewMode === "list" ? "w-full h-full" : "w-full h-32 sm:h-40"}
                        `}
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {gig.featured && (
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-0.5 rounded-full text-xs font-bold flex items-center">
                            <Zap size={10} className="mr-1" />
                            Featured
                          </div>
                        )}
                        {gig.urgent && (
                          <div className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
                            Urgent
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(gig.id)
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                      >
                        <Heart 
                          size={14} 
                          className={favorites.has(gig.id) ? "text-red-400 fill-current" : "text-white"}
                        />
                      </button>

                      <div className="absolute bottom-2 right-2 flex items-center space-x-1 text-xs text-white bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                        <Eye size={10} />
                        <span>{gig.views}</span>
                      </div>
                    </div>
                    
                    <div className={`p-4 flex-1 ${viewMode === "list" ? "flex flex-col justify-between" : ""}`}>
                      <div>
                        <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors text-sm sm:text-base">
                          {gig.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mb-3 line-clamp-2">
                          {gig.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {gig.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-white">{gig.rating}</span>
                            <span className="text-xs text-slate-400">({gig.reviews})</span>
                          </div>
                          <div className="text-right">
                            {gig.originalPrice > gig.price && (
                              <div className="text-xs text-slate-500 line-through">
                                ${gig.originalPrice}
                              </div>
                            )}
                            <div className="text-lg font-bold text-white">
                              ${gig.price}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                          <div className="flex items-center space-x-2">
                            <img
                              src={gig.freelancer.avatar}
                              alt={gig.freelancer.name}
                              className="w-6 h-6 rounded-full object-cover border border-cyan-500/30"
                            />
                            <div>
                              <div className="text-xs font-medium text-white">
                                {gig.freelancer.name}
                              </div>
                              <div className="text-xs text-cyan-400 flex items-center">
                                <Shield size={8} className="mr-1" />
                                {gig.freelancer.level}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-400 flex items-center">
                              <Clock size={8} className="mr-1" />
                              {gig.deliveryTime}
                            </div>
                            <div className="text-xs text-green-400">
                              {gig.inQueue} in queue
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Compact Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-1 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white/5 border border-slate-600 text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm
                        ${currentPage === page
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                          : "bg-white/5 border border-slate-600 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white/5 border border-slate-600 text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Live Stats Bar */}
        <div className="mt-8 bg-white/5 backdrop-blur-md rounded-xl border border-slate-700/50 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-1 text-cyan-400 mb-1">
                <Users size={16} />
                <span className="font-bold text-lg">{onlineUsers.toLocaleString()}</span>
              </div>
              <span className="text-xs text-slate-400">Online Now</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-1 text-green-400 mb-1">
                <TrendingUp size={16} />
                <span className="font-bold text-lg">2,847</span>
              </div>
              <span className="text-xs text-slate-400">Orders Today</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-1 text-purple-400 mb-1">
                <Award size={16} />
                <span className="font-bold text-lg">4.9★</span>
              </div>
              <span className="text-xs text-slate-400">Avg Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                <Zap size={16} />
                <span className="font-bold text-lg">24h</span>
              </div>
              <span className="text-xs text-slate-400">Avg Delivery</span>
            </div>
          </div>
        </div>
      </main>

      {/* Compact Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-slate-700/50 text-slate-300 py-8 mt-12">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">Company</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">Support</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Help</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Safety</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">Community</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">AI Tools</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">Legal</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              ⚡ GigFlow
            </div>
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <span>© {new Date().getFullYear()} GigFlow. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default GigMarketplace