import { useState, useEffect } from "react"
import { Search, Calendar, Clock, ArrowRight, Mail, Github, Twitter, Linkedin, Menu, X, BookOpen, Users, TrendingUp, Tag, Filter, ChevronLeft, ChevronRight, Eye, Heart, MessageCircle, Bookmark, Grid, List, SortAsc, SortDesc } from "lucide-react"

export default function BlogLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [email, setEmail] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const postsPerPage = 6

  const posts = [
    {
      id: 1,
      title: "The Art of Storytelling in the Digital Age",
      excerpt: "Discover how modern storytellers captivate audiences across digital platforms with compelling narratives that resonate in our fast-paced world.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Writing",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop",
      author: { name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" },
      featured: true,
      tags: ["storytelling", "digital marketing", "content creation"],
      views: 2847,
      likes: 156,
      comments: 23
    },
    {
      id: 2,
      title: "Mastering Markdown for Modern Bloggers",
      excerpt: "Learn the essential Markdown syntax and advanced techniques that will streamline your writing workflow and improve your content formatting.",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
      author: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" },
      featured: false,
      tags: ["markdown", "blogging", "productivity"],
      views: 1923,
      likes: 89,
      comments: 15
    },
    {
      id: 3,
      title: "SEO Fundamentals Every Content Creator Should Know",
      excerpt: "Unlock the secrets of search engine optimization with practical strategies that will boost your content's visibility and organic reach.",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      author: { name: "Maria Rodriguez", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" },
      featured: true,
      tags: ["seo", "marketing", "content strategy"],
      views: 3456,
      likes: 234,
      comments: 45
    },
    {
      id: 4,
      title: "My Journey into Full-Stack Web Development",
      excerpt: "A personal story of transitioning from design to full-stack development, including the challenges, victories, and lessons learned along the way.",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      author: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face" },
      featured: false,
      tags: ["web development", "career", "programming"],
      views: 2134,
      likes: 178,
      comments: 32
    },
    {
      id: 5,
      title: "The Future of AI in Content Creation",
      excerpt: "Explore how artificial intelligence is revolutionizing content creation while examining the balance between automation and human creativity.",
      date: "2024-01-05",
      readTime: "15 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      author: { name: "Emma Thompson", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face" },
      featured: true,
      tags: ["ai", "content creation", "future tech"],
      views: 4521,
      likes: 312,
      comments: 67
    },
    {
      id: 6,
      title: "Building Productive Writing Habits That Stick",
      excerpt: "Practical strategies and proven techniques for establishing a consistent writing routine that leads to long-term creative success.",
      date: "2024-01-03",
      readTime: "7 min read",
      category: "Writing",
      image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&h=400&fit=crop",
      author: { name: "Rachel Green", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face" },
      featured: false,
      tags: ["productivity", "writing habits", "creativity"],
      views: 1876,
      likes: 143,
      comments: 28
    },
    {
      id: 7,
      title: "Advanced CSS Grid Techniques for Modern Layouts",
      excerpt: "Master complex grid layouts with advanced CSS techniques that will elevate your web design skills to the next level.",
      date: "2024-01-01",
      readTime: "11 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      author: { name: "Tom Wilson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" },
      featured: false,
      tags: ["css", "grid", "web design"],
      views: 2643,
      likes: 198,
      comments: 41
    },
    {
      id: 8,
      title: "Digital Marketing Trends for 2024",
      excerpt: "Stay ahead of the curve with the latest digital marketing trends that will shape the industry in 2024 and beyond.",
      date: "2023-12-28",
      readTime: "9 min read",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
      author: { name: "Lisa Park", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face" },
      featured: true,
      tags: ["marketing", "trends", "digital strategy"],
      views: 3789,
      likes: 267,
      comments: 52
    },
    {
      id: 9,
      title: "Typography Best Practices for Web Design",
      excerpt: "Learn how to choose and implement typography that enhances readability and creates visual hierarchy in your web projects.",
      date: "2023-12-25",
      readTime: "8 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
      author: { name: "James Brown", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=50&h=50&fit=crop&crop=face" },
      featured: false,
      tags: ["typography", "design", "ux"],
      views: 1654,
      likes: 134,
      comments: 19
    },
    {
      id: 10,
      title: "React Hooks: A Complete Guide",
      excerpt: "Deep dive into React Hooks with practical examples and best practices for modern React development.",
      date: "2023-12-22",
      readTime: "14 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
      author: { name: "Amy Foster", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face" },
      featured: false,
      tags: ["react", "hooks", "javascript"],
      views: 2987,
      likes: 245,
      comments: 38
    },
    {
      id: 11,
      title: "Content Strategy for Growing Startups",
      excerpt: "Build a content strategy that scales with your startup and drives meaningful engagement with your target audience.",
      date: "2023-12-20",
      readTime: "10 min read",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      author: { name: "Michael Chang", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=50&h=50&fit=crop&crop=face" },
      featured: false,
      tags: ["content strategy", "startups", "growth"],
      views: 1743,
      likes: 167,
      comments: 24
    },
    {
      id: 12,
      title: "The Psychology of User Interface Design",
      excerpt: "Understand the psychological principles that make interfaces intuitive and engaging for users.",
      date: "2023-12-18",
      readTime: "13 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop",
      author: { name: "Sophie Turner", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face" },
      featured: true,
      tags: ["ui design", "psychology", "ux"],
      views: 3213,
      likes: 289,
      comments: 56
    },
    {
      id: 13,
      title: "JavaScript Performance Optimization Tips",
      excerpt: "Boost your JavaScript application performance with these proven optimization techniques and best practices.",
      date: "2023-12-15",
      readTime: "12 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop",
      author: { name: "Ryan Cooper", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50&h=50&fit=crop&crop=face" },
      featured: false,
      tags: ["javascript", "performance", "optimization"],
      views: 2456,
      likes: 201,
      comments: 33
    },
    {
      id: 14,
      title: "Building Brand Voice Through Content",
      excerpt: "Develop a consistent brand voice that resonates with your audience and builds lasting connections.",
      date: "2023-12-12",
      readTime: "9 min read",
      category: "Writing",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
      author: { name: "Nina Rodriguez", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=50&h=50&fit=crop&crop=face" },
      featured: false,
      tags: ["branding", "content", "voice"],
      views: 1834,
      likes: 156,
      comments: 21
    },
    {
      id: 15,
      title: "Mobile-First Design Principles",
      excerpt: "Learn how to design with mobile users in mind and create responsive experiences that work across all devices.",
      date: "2023-12-10",
      readTime: "11 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      author: { name: "Kevin Lee", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face" },
      featured: false,
      tags: ["mobile design", "responsive", "ux"],
      views: 2107,
      likes: 183,
      comments: 29
    }
  ]

  const categories = [
    { id: "all", name: "All", count: posts.length },
    { id: "technology", name: "Tech", count: posts.filter(p => p.category === "Technology").length },
    { id: "writing", name: "Writing", count: posts.filter(p => p.category === "Writing").length },
    { id: "marketing", name: "Marketing", count: posts.filter(p => p.category === "Marketing").length },
    { id: "design", name: "Design", count: posts.filter(p => p.category === "Design").length }
  ]

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category.toLowerCase() === selectedCategory
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    let aValue, bValue
    switch (sortBy) {
      case "date":
        aValue = new Date(a.date)
        bValue = new Date(b.date)
        break
      case "views":
        aValue = a.views
        bValue = b.views
        break
      case "likes":
        aValue = a.likes
        bValue = b.likes
        break
      default:
        aValue = new Date(a.date)
        bValue = new Date(b.date)
    }
    return sortOrder === "desc" ? bValue - aValue : aValue - bValue
  })

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const paginatedPosts = sortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const resetFilters = () => {
    setSelectedCategory("all")
    setSearchTerm("")
    setSortBy("date")
    setSortOrder("desc")
    setCurrentPage(1)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm, sortBy, sortOrder])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header - More Compact */}
      <header className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-cyan-400 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-gray-900" />
                </div>
                <span className="text-lg font-bold text-cyan-400">DevBlog</span>
              </div>
              <nav className="hidden md:flex space-x-4">
                <a href="#home" className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">Home</a>
                <a href="#posts" className="text-gray-300 hover:text-cyan-400 font-medium text-sm transition-colors">Posts</a>
                <a href="#about" className="text-gray-300 hover:text-cyan-400 font-medium text-sm transition-colors">About</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm w-40"
                />
              </div>
              <button
                className="md:hidden p-1.5 text-gray-300 hover:text-cyan-400"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 py-3">
            <div className="max-w-7xl mx-auto px-3 space-y-2">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
                />
              </div>
              <a href="#home" className="block text-cyan-400 hover:text-cyan-300 font-medium py-1">Home</a>
              <a href="#posts" className="block text-gray-300 hover:text-cyan-400 font-medium py-1">Posts</a>
              <a href="#about" className="block text-gray-300 hover:text-cyan-400 font-medium py-1">About</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Ultra Compact */}
      <section id="home" className="bg-gray-900 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Welcome to <span className="text-cyan-400">DevBlog</span>
            </h1>
            <p className="text-base text-gray-300 mb-4 max-w-xl mx-auto">
              Discover insights on web development, design, and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button 
                onClick={() => document.getElementById('posts').scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2 bg-cyan-400 text-gray-900 rounded-lg hover:bg-cyan-300 transition-colors font-semibold text-sm"
              >
                Explore Posts
              </button>
              <button 
                onClick={() => document.getElementById('newsletter').scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-colors font-semibold text-sm"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Inline Stats */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-6 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-gray-700">
              <div className="text-center">
                <div className="text-lg font-bold text-cyan-400">{posts.length}</div>
                <div className="text-xs text-gray-400">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-cyan-400">15K+</div>
                <div className="text-xs text-gray-400">Readers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-cyan-400">98%</div>
                <div className="text-xs text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts - Ultra Compact */}
      <section className="py-8 bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Featured</h2>
            <div className="w-12 h-0.5 bg-cyan-400"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.filter(post => post.featured).slice(0, 3).map((post) => (
              <article key={post.id} className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-400/50 transition-all">
                <div className="relative">
                  <img src={post.image} alt={post.title} className="w-full h-32 object-cover" />
                  <div className="absolute top-2 left-2">
                    <span className="bg-cyan-400 text-gray-900 px-2 py-0.5 rounded text-xs font-semibold">Featured</span>
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`p-1 rounded-full ${likedPosts.has(post.id) ? 'bg-red-500 text-white' : 'bg-gray-800/80 text-gray-300'} hover:scale-110 transition-all`}
                    >
                      <Heart size={12} />
                    </button>
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`p-1 rounded-full ${bookmarkedPosts.has(post.id) ? 'bg-cyan-500 text-white' : 'bg-gray-800/80 text-gray-300'} hover:scale-110 transition-all`}
                    >
                      <Bookmark size={12} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2 text-xs text-gray-400">
                    <span className="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">{post.category}</span>
                    <Clock size={10} />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye size={10} />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart size={10} />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-3 w-3 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts with Advanced Filters and Pagination */}
      <section id="posts" className="py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">All Articles</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-cyan-400 transition-colors"
              >
                <Filter size={16} />
              </button>
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? 'bg-cyan-400 text-gray-900' : 'bg-gray-800 text-gray-300'} hover:bg-cyan-400 hover:text-gray-900 transition-colors`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? 'bg-cyan-400 text-gray-900' : 'bg-gray-800 text-gray-300'} hover:bg-cyan-400 hover:text-gray-900 transition-colors`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-cyan-400 text-gray-900'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-xs text-gray-300 focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="date">Date</option>
                    <option value="views">Views</option>
                    <option value="likes">Likes</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                    className="p-1.5 bg-gray-700 border border-gray-600 rounded-lg hover:border-cyan-400 transition-colors"
                  >
                    {sortOrder === "desc" ? <SortDesc size={14} /> : <SortAsc size={14} />}
                  </button>
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-xs text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid/List View */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedPosts.map((post) => (
                <article key={post.id} className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-400/50 transition-all">
                  <div className="relative">
                    <img src={post.image} alt={post.title} className="w-full h-32 object-cover" />
                    {post.featured && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-cyan-400 text-gray-900 px-2 py-0.5 rounded text-xs font-semibold">Featured</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`p-1 rounded-full ${likedPosts.has(post.id) ? 'bg-red-500 text-white' : 'bg-gray-800/80 text-gray-300'} hover:scale-110 transition-all`}
                      >
                        <Heart size={12} />
                      </button>
                      <button
                        onClick={() => handleBookmark(post.id)}
                        className={`p-1 rounded-full ${bookmarkedPosts.has(post.id) ? 'bg-cyan-500 text-white' : 'bg-gray-800/80 text-gray-300'} hover:scale-110 transition-all`}
                      >
                        <Bookmark size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2 text-xs text-gray-400">
                      <span className="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">{post.category}</span>
                      <Calendar size={10} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <Clock size={10} />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye size={10} />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart size={10} />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={10} />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-3 w-3 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedPosts.map((post) => (
                <article key={post.id} className="group cursor-pointer bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-400/50 transition-all">
                  <div className="flex">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-l-lg" />
                      {post.featured && (
                        <div className="absolute top-1 left-1">
                          <span className="bg-cyan-400 text-gray-900 px-1.5 py-0.5 rounded text-xs font-semibold">Featured</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2 text-xs text-gray-400">
                          <span className="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">{post.category}</span>
                          <Calendar size={10} />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          <Clock size={10} />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Eye size={10} />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart size={10} />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle size={10} />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`p-1 rounded-full ${likedPosts.has(post.id) ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'} hover:scale-110 transition-all`}
                          >
                            <Heart size={12} />
                          </button>
                          <button
                            onClick={() => handleBookmark(post.id)}
                            className={`p-1 rounded-full ${bookmarkedPosts.has(post.id) ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'} hover:scale-110 transition-all`}
                          >
                            <Bookmark size={12} />
                          </button>
                          <ArrowRight className="h-4 w-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-cyan-400 text-gray-900'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    } else if (page === currentPage - 3 || page === currentPage + 3) {
                      return <span key={page} className="px-2 text-gray-500">...</span>
                    }
                    return null
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="text-sm text-gray-400">
                Showing {(currentPage - 1) * postsPerPage + 1}-{Math.min(currentPage * postsPerPage, sortedPosts.length)} of {sortedPosts.length} articles
              </div>
            </div>
          )}

          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search or category filter</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-cyan-400 text-gray-900 rounded-lg hover:bg-cyan-300 transition-colors font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section - More Compact */}
      <section id="newsletter" className="py-8 bg-gray-800">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <Mail className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-white mb-2">Stay Updated</h2>
            <p className="text-gray-300 mb-4 text-sm">Get the latest articles delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white text-sm"
              />
              <button
                onClick={() => {
                  if (email) {
                    alert("Thank you for subscribing!")
                    setEmail("")
                  }
                }}
                className="px-4 py-2 bg-cyan-400 text-gray-900 rounded-lg hover:bg-cyan-300 transition-colors font-semibold text-sm"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Ultra Compact */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-cyan-400 rounded-lg flex items-center justify-center">
                <BookOpen className="h-3.5 w-3.5 text-gray-900" />
              </div>
              <span className="text-lg font-bold text-cyan-400">DevBlog</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Home</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Posts</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">About</a>
            </div>
            
            <div className="flex items-center space-x-3">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-4 mt-4 text-center">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} DevBlog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}