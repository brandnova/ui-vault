import { useState, useEffect, useRef } from "react"
import {
  Filter,
  Grid,
  X,
  Play,
  Calendar,
  Tag,
  Moon,
  Sun,
  ChevronDown,
  Search,
  Heart,
  Share2,
  Download,
  Eye,
  Camera,
  MapPin,
  Star,
  Zap,
  List,
} from "lucide-react"

const PhotoGalleryPage = () => {
  const [activeTab, setActiveTab] = useState("photos")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [darkMode, setDarkMode] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [likedItems, setLikedItems] = useState(new Set())
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false) // Not used in current logic, but kept for potential future use
  const [showStats, setShowStats] = useState(true)
  const scrollRef = useRef(null) // Not used in current logic, but kept for potential future use

  // Enhanced media data with more metadata
  const mediaData = {
    photos: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
        title: "Mountain Landscape",
        category: "landscape",
        date: "2024",
        type: "photo",
        location: "Swiss Alps",
        camera: "Canon EOS R5",
        views: 1240,
        featured: true,
        tags: ["mountain", "landscape", "nature", "alps"],
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop",
        title: "Forest Path",
        category: "nature",
        date: "2024",
        type: "photo",
        location: "Pacific Northwest",
        camera: "Sony A7R IV",
        views: 890,
        featured: false,
        tags: ["forest", "path", "trees", "green"],
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop",
        title: "Ocean Waves",
        category: "landscape",
        date: "2023",
        type: "photo",
        location: "Big Sur, CA",
        camera: "Nikon D850",
        views: 2100,
        featured: true,
        tags: ["ocean", "waves", "sunset", "coast"],
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop",
        title: "City Portrait",
        category: "portrait",
        date: "2024",
        type: "photo",
        location: "New York City",
        camera: "Canon EOS R6",
        views: 1560,
        featured: false,
        tags: ["portrait", "urban", "street", "city"],
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop",
        title: "Professional Headshot",
        category: "portrait",
        date: "2023",
        type: "photo",
        location: "Studio",
        camera: "Canon EOS R5",
        views: 980,
        featured: false,
        tags: ["headshot", "professional", "studio"],
      },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&auto=format&fit=crop",
        title: "Urban Architecture",
        category: "architecture",
        date: "2024",
        type: "photo",
        location: "Tokyo",
        camera: "Sony A7R V",
        views: 1890,
        featured: true,
        tags: ["architecture", "urban", "modern", "building"],
      },
      {
        id: 7,
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop",
        title: "Misty Mountains",
        category: "landscape",
        date: "2023",
        type: "photo",
        location: "Scotland",
        camera: "Fujifilm X-T5",
        views: 1440,
        featured: false,
        tags: ["mountains", "mist", "moody", "highlands"],
      },
      {
        id: 8,
        src: "https://images.unsplash.com/photo-1544077960-604201fe74bc?w=800&auto=format&fit=crop",
        title: "Fashion Portrait",
        category: "portrait",
        date: "2024",
        type: "photo",
        location: "Milan",
        camera: "Canon EOS R5",
        views: 2250,
        featured: true,
        tags: ["fashion", "portrait", "editorial", "style"],
      },
      {
        id: 17,
        src: "https://images.unsplash.com/photo-150185414080-9e51b24848de?w=800&auto=format&fit=crop",
        title: "Green Valley",
        category: "nature",
        date: "2024",
        type: "photo",
        location: "Dolomites",
        camera: "Nikon Z7 II",
        views: 1100,
        featured: false,
        tags: ["valley", "nature", "green", "mountains"],
      },
      {
        id: 18,
        src: "https://images.unsplash.com/photo-1517487881553-21492579880e?w=800&auto=format&fit=crop",
        title: "Abstract Cityscape",
        category: "architecture",
        date: "2023",
        type: "photo",
        location: "Dubai",
        camera: "DJI Mavic 3",
        views: 1950,
        featured: true,
        tags: ["abstract", "city", "modern", "drone"],
      },
      {
        id: 21,
        src: "https://images.unsplash.com/photo-1518098268026-c8649c18773f?w=800&auto=format&fit=crop",
        title: "Desert Dunes",
        category: "landscape",
        date: "2024",
        type: "photo",
        location: "Sahara",
        camera: "Sony A7 III",
        views: 950,
        featured: false,
        tags: ["desert", "dunes", "sand", "hot"],
      },
      {
        id: 22,
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
        title: "Tropical Beach",
        category: "nature",
        date: "2023",
        type: "photo",
        location: "Maldives",
        camera: "Canon EOS R",
        views: 2800,
        featured: true,
        tags: ["beach", "tropical", "ocean", "paradise"],
      },
      {
        id: 23,
        src: "https://images.unsplash.com/photo-1523049673857-ab6a1dd54317?w=800&auto=format&fit=crop",
        title: "Street Art",
        category: "urban",
        date: "2024",
        type: "photo",
        location: "Berlin",
        camera: "Fujifilm X-T4",
        views: 1120,
        featured: false,
        tags: ["street", "art", "graffiti", "urban"],
      },
      {
        id: 24,
        src: "https://images.unsplash.com/photo-1508921912186-1d1a45fa2723?w=800&auto=format&fit=crop",
        title: "Wildlife Close-up",
        category: "nature",
        date: "2023",
        type: "photo",
        location: "Serengeti",
        camera: "Nikon Z9",
        views: 1700,
        featured: true,
        tags: ["wildlife", "animal", "nature", "safari"],
      },
    ],
    videos: [
      {
        id: 9,
        src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop",
        title: "Cinematic Reel",
        category: "cinematic",
        date: "2024",
        type: "video",
        duration: "2:30",
        location: "Los Angeles",
        camera: "RED Komodo",
        views: 3400,
        featured: true,
        tags: ["cinematic", "reel", "showreel", "film"],
      },
      {
        id: 10,
        src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
        title: "Documentary Short",
        category: "documentary",
        date: "2023",
        type: "video",
        duration: "5:45",
        location: "Berlin",
        camera: "Sony FX6",
        views: 1890,
        featured: false,
        tags: ["documentary", "story", "narrative", "history"],
      },
      {
        id: 11,
        src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop",
        title: "Music Video",
        category: "music",
        date: "2024",
        type: "video",
        duration: "3:20",
        location: "Nashville",
        camera: "Canon C70",
        views: 5600,
        featured: true,
        tags: ["music", "video", "creative", "performance"],
      },
      {
        id: 12,
        src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop",
        title: "Commercial Ad",
        category: "commercial",
        date: "2024",
        type: "video",
        duration: "1:15",
        location: "London",
        camera: "ARRI Alexa Mini",
        views: 2890,
        featured: false,
        tags: ["commercial", "advertising", "brand", "product"],
      },
      {
        id: 19,
        src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&auto=format&fit=crop",
        title: "Travel Vlog",
        category: "documentary",
        date: "2023",
        type: "video",
        duration: "8:00",
        location: "Bali",
        camera: "GoPro Hero 11",
        views: 2100,
        featured: false,
        tags: ["travel", "vlog", "adventure", "explore"],
      },
      {
        id: 25,
        src: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&auto=format&fit=crop",
        title: "Drone Footage",
        category: "cinematic",
        date: "2024",
        type: "video",
        duration: "1:45",
        location: "Iceland",
        camera: "DJI Air 2S",
        views: 2900,
        featured: true,
        tags: ["drone", "aerial", "landscape", "cinematic"],
      },
      {
        id: 26,
        src: "https://images.unsplash.com/photo-1504384764586-bb4be8f4533c?w=800&auto=format&fit=crop",
        title: "Tech Review",
        category: "commercial",
        date: "2023",
        type: "video",
        duration: "6:10",
        location: "San Francisco",
        camera: "Sony ZV-1",
        views: 1500,
        featured: false,
        tags: ["tech", "review", "product", "gadget"],
      },
    ],
    projects: [
      {
        id: 13,
        src: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&auto=format&fit=crop",
        title: "Brand Campaign",
        category: "commercial",
        date: "2024",
        type: "project",
        location: "Multiple",
        camera: "Various",
        views: 4200,
        featured: true,
        tags: ["brand", "campaign", "commercial", "marketing"],
      },
      {
        id: 14,
        src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop",
        title: "Editorial Series",
        category: "editorial",
        date: "2023",
        type: "project",
        location: "Paris",
        camera: "Leica Q2",
        views: 1650,
        featured: false,
        tags: ["editorial", "series", "magazine", "fashion"],
      },
      {
        id: 15,
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
        title: "Wedding Collection",
        category: "wedding",
        date: "2024",
        type: "project",
        location: "Tuscany",
        camera: "Canon EOS R6 Mark II",
        views: 3100,
        featured: true,
        tags: ["wedding", "collection", "romance", "event"],
      },
      {
        id: 16,
        src: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=800&auto=format&fit=crop",
        title: "Art Exhibition",
        category: "fine-art",
        date: "2023",
        type: "project",
        location: "New York",
        camera: "Hasselblad X2D",
        views: 2400,
        featured: false,
        tags: ["art", "exhibition", "gallery", "creative"],
      },
      {
        id: 20,
        src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
        title: "Product Launch",
        category: "commercial",
        date: "2024",
        type: "project",
        location: "San Francisco",
        camera: "Sony A1",
        views: 3800,
        featured: true,
        tags: ["product", "launch", "tech", "marketing"],
      },
      {
        id: 27,
        src: "https://images.unsplash.com/photo-1504384764586-bb4be8f4533c?w=800&auto=format&fit=crop",
        title: "Architectural Portfolio",
        category: "architecture",
        date: "2024",
        type: "project",
        location: "Global",
        camera: "Various",
        views: 2700,
        featured: false,
        tags: ["architecture", "design", "portfolio", "building"],
      },
      {
        id: 28,
        src: "https://images.unsplash.com/photo-1504384764586-bb4be8f4533c?w=800&auto=format&fit=crop",
        title: "Food Photography Series",
        category: "editorial",
        date: "2023",
        type: "project",
        location: "Paris",
        camera: "Canon EOS R5",
        views: 1900,
        featured: true,
        tags: ["food", "photography", "culinary", "editorial"],
      },
    ],
  }

  const categories = {
    photos: ["all", "landscape", "portrait", "nature", "architecture", "urban"],
    videos: ["all", "cinematic", "documentary", "music", "commercial"],
    projects: ["all", "commercial", "editorial", "wedding", "fine-art", "architecture"],
  }

  const currentMedia = mediaData[activeTab]
  const currentCategories = categories[activeTab]

  const filteredMedia = currentMedia.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
    const dateMatch = selectedDate === "all" || item.date === selectedDate
    const searchMatch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return categoryMatch && dateMatch && searchMatch
  })

  const featuredMedia = currentMedia.filter((item) => item.featured)
  const totalViews = currentMedia.reduce((sum, item) => sum + item.views, 0)
  const totalItems = currentMedia.length

  useEffect(() => {
    setSelectedCategory("all")
    setSelectedDate("all")
    setSearchQuery("")
  }, [activeTab])

  const openLightbox = (media) => {
    setSelectedMedia(media)
    setCurrentImageIndex(filteredMedia.findIndex((item) => item.id === media.id))
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedMedia(null)
    document.body.style.overflow = "unset"
  }

  const navigateImage = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % filteredMedia.length
        : (currentImageIndex - 1 + filteredMedia.length) % filteredMedia.length
    setCurrentImageIndex(newIndex)
    setSelectedMedia(filteredMedia[newIndex])
  }

  const toggleLike = (id, e) => {
    e.stopPropagation()
    const newLikedItems = new Set(likedItems)
    if (newLikedItems.has(id)) {
      newLikedItems.delete(id)
    } else {
      newLikedItems.add(id)
    }
    setLikedItems(newLikedItems)
  }

  const handleShare = (media, e) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: media.title,
        text: `Check out this amazing ${media.type}: ${media.title}`,
        url: window.location.href,
      })
    }
  }

  // Keyboard navigation effect - MOVED INSIDE COMPONENT
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedMedia) {
        if (e.key === "Escape") {
          closeLightbox()
        } else if (e.key === "ArrowLeft") {
          navigateImage("prev")
        } else if (e.key === "ArrowRight") {
          navigateImage("next")
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedMedia, currentImageIndex, filteredMedia])

  const MediaTile = ({ media, index }) => (
    <div
      className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10 ${
        viewMode === "masonry" ? "aspect-auto" : "aspect-square"
      } ${media.featured ? "ring-2 ring-purple-500/50" : ""}`}
      onClick={() => openLightbox(media)}
      style={{
        animationDelay: `${index * 0.05}s`, // Faster animation delay
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      <img
        src={media.src || "/placeholder.svg"}
        alt={media.title}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
        loading="lazy"
      />

      {/* Overlay for details on hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
        {/* Top badges and actions */}
        <div className="flex justify-between items-start">
          <div className="flex gap-2 flex-wrap">
            {media.featured && (
              <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </div>
            )}
            {media.type === "video" && (
              <div className="bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Play className="w-3 h-3 fill-current" />
                {media.duration}
              </div>
            )}
            {media.type === "project" && (
              <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Grid className="w-3 h-3" />
                Series
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={(e) => toggleLike(media.id, e)}
              className={`p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200 ${
                likedItems.has(media.id) ? "text-red-400" : ""
              }`}
            >
              <Heart className={`w-4 h-4 ${likedItems.has(media.id) ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={(e) => handleShare(media, e)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom info */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-bold text-lg">{media.title}</h3>

          <div className="flex flex-wrap gap-2">
            {media.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-white/90 text-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{media.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{media.views.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Camera className="w-3 h-3" />
              <span className="text-xs">{media.camera.split(" ")[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const StatsCard = ({ icon: Icon, label, value, color }) => (
    <div
      className={`bg-gray-800 p-4 rounded-xl text-white transform hover:scale-105 transition-transform duration-200 border border-gray-700`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-6 h-6 ${color}`} />
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm opacity-90">{label}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode ? "dark bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Premium Header with glassmorphism */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Creative Studio</div>
                </div>
              </div>

              {/* Navigation with pill design */}
              <nav className="hidden sm:flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                {["photos", "videos", "projects"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                      {mediaData[tab].length}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-md text-gray-900 dark:text-white"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 hidden sm:flex">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    viewMode === "grid" ? "bg-white dark:bg-gray-700 shadow-md" : ""
                  }`}
                >
                  <Grid className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    viewMode === "list" ? "bg-white dark:bg-gray-700 shadow-md" : ""
                  }`}
                >
                  <List className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  showFilters
                    ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <div className="relative w-5 h-5">
                  <Sun
                    className={`w-5 h-5 absolute transition-all duration-300 ${darkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`}
                  />
                  <Moon
                    className={`w-5 h-5 absolute transition-all duration-300 ${darkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="sm:hidden mt-4 bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex justify-around">
            {["photos", "videos", "projects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          {/* Enhanced Filters */}
          {showFilters && (
            <div className="mt-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white/70 dark:bg-gray-700/70 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white backdrop-blur-md focus:ring-2 focus:ring-purple-500 w-full"
                  >
                    {currentCategories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-white/70 dark:bg-gray-700/70 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white backdrop-blur-md focus:ring-2 focus:ring-purple-500 w-full"
                  >
                    <option value="all">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 sm:hidden">
                  <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/70 dark:bg-gray-700/70 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white backdrop-blur-md focus:ring-2 focus:ring-purple-500 w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Statistics Dashboard */}
      {showStats && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatsCard icon={Camera} label="Total Works" value={totalItems} color="text-purple-400" />
            <StatsCard icon={Eye} label="Total Views" value={totalViews.toLocaleString()} color="text-teal-400" />
            <StatsCard icon={Star} label="Featured" value={featuredMedia.length} color="text-yellow-400" />
            <StatsCard icon={Heart} label="Liked" value={likedItems.size} color="text-red-400" />
          </div>
        </div>
      )}

      {/* Enhanced Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredMedia.map((media, index) => (
            <MediaTile key={media.id} media={media} index={index} />
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">No items found</div>
            <div className="text-gray-400 dark:text-gray-500 text-sm">Try adjusting your filters or search terms</div>
          </div>
        )}
      </main>

      {/* Enhanced Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Navigation */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm">
                  {currentImageIndex + 1} of {filteredMedia.length}
                </div>
                {selectedMedia.featured && (
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleLike(selectedMedia.id, e)}
                  className={`p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 ${
                    likedItems.has(selectedMedia.id) ? "text-red-400" : ""
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedItems.has(selectedMedia.id) ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={(e) => handleShare(selectedMedia, e)}
                  className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200">
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-3 rounded-full bg-black/50 text-white hover:bg-red-500 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation arrows */}
            {filteredMedia.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage("prev")}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 z-10 hidden sm:block"
                >
                  <ChevronDown className="w-6 h-6 transform rotate-90" />
                </button>
                <button
                  onClick={() => navigateImage("next")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 z-10 hidden sm:block"
                >
                  <ChevronDown className="w-6 h-6 transform -rotate-90" />
                </button>
              </>
            )}

            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative">
                <img
                  src={selectedMedia.src || "/placeholder.svg"}
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />

                {/* Play button overlay for videos */}
                {selectedMedia.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 transform hover:scale-110">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6 bg-gray-900 border-t border-gray-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedMedia.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedMedia.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/10 text-white text-sm px-3 py-1 rounded-full backdrop-blur-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedMedia.type === "video" && selectedMedia.duration && (
                    <div className="flex items-center gap-2 text-white bg-teal-500 px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0">
                      <Play className="w-4 h-4 fill-current" />
                      <span>{selectedMedia.duration}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-gray-400 text-xs">Location</div>
                      <div>{selectedMedia.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Camera className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-gray-400 text-xs">Camera</div>
                      <div>{selectedMedia.camera}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-gray-400 text-xs">Views</div>
                      <div>{selectedMedia.views.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-gray-400 text-xs">Year</div>
                      <div>{selectedMedia.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard navigation hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm bg-black/30 backdrop-blur-md px-4 py-2 rounded-full hidden sm:block">
            Use ← → keys to navigate • ESC to close
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowStats(!showStats)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center z-30"
      >
        <Zap className="w-6 h-6" />
      </button>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default PhotoGalleryPage
