import React, { useState, useMemo } from "react"
import {
  Search,
  Briefcase,
  DollarSign,
  MapPin,
  Star,
  Bell,
  UserCircle,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Bookmark,
  Send,
  LayoutDashboard,
  Save,
  FileText,
  MessageSquare,
  Code,
  Filter,
  Zap,
} from "lucide-react"

// --- Mock Data ---
const JOB_CATEGORIES = [
  { id: "all", name: "All Categories", icon: Briefcase },
  { id: "development", name: "Development", icon: Code },
  { id: "design", name: "Design", icon: Star },
  { id: "marketing", name: "Marketing", icon: Send },
  { id: "writing", name: "Writing", icon: FileText },
  { id: "support", name: "Customer Support", icon: MessageSquare },
]

const MOCK_JOBS = [
  {
    id: "j1",
    title: "Senior Frontend Developer (React)",
    company: "InnovateTech",
    location: "Remote (Worldwide)",
    payRate: "$120k - $150k / year",
    category: "development",
    description: "We are looking for a highly skilled Senior Frontend Developer with extensive experience in React.js and modern web technologies.",
    posted: "2 days ago",
    urgent: true,
  },
  {
    id: "j2",
    title: "Product Designer (UI/UX)",
    company: "CreativeFlow",
    location: "Remote (Europe)",
    payRate: "$80k - $100k / year",
    category: "design",
    description: "Join our design team to create intuitive and beautiful user interfaces for our suite of products.",
    posted: "5 days ago",
    urgent: false,
  },
  {
    id: "j3",
    title: "Digital Marketing Specialist",
    company: "GrowthGenius",
    location: "Remote (North America)",
    payRate: "$60k - $75k / year",
    category: "marketing",
    description: "We need a passionate Digital Marketing Specialist to manage our online campaigns, SEO, and social media presence.",
    posted: "1 week ago",
    urgent: false,
  },
  {
    id: "j4",
    title: "Technical Writer",
    company: "DocuWrite",
    location: "Remote (Anywhere)",
    payRate: "$45 - $60 / hour",
    category: "writing",
    description: "Produce high-quality technical documentation, user manuals, and API guides.",
    posted: "3 days ago",
    urgent: false,
  },
  {
    id: "j5",
    title: "Customer Support Representative",
    company: "HelpDesk Pro",
    location: "Remote (Asia/Pacific)",
    payRate: "$25 - $35 / hour",
    category: "support",
    description: "Provide excellent customer service and technical support to our users.",
    posted: "4 days ago",
    urgent: false,
  },
  {
    id: "j6",
    title: "Fullstack Engineer (Node.js/Vue.js)",
    company: "CodeCrafters",
    location: "Remote (Worldwide)",
    payRate: "$100k - $130k / year",
    category: "development",
    description: "Develop and maintain both frontend and backend components of our applications.",
    posted: "1 day ago",
    urgent: true,
  },
  {
    id: "j7",
    title: "Data Analyst",
    company: "InsightOps",
    location: "Remote (US Only)",
    payRate: "$70k - $90k / year",
    category: "data",
    description: "Analyze large datasets to uncover insights and support data-driven decisions across teams.",
    posted: "6 days ago",
    urgent: false,
  },
  {
    id: "j8",
    title: "DevOps Engineer",
    company: "PipelineLogic",
    location: "Remote (Europe Preferred)",
    payRate: "$110k - $140k / year",
    category: "development",
    description: "Maintain and improve CI/CD pipelines, monitoring systems, and infrastructure scalability.",
    posted: "1 day ago",
    urgent: true,
  },
  {
    id: "j9",
    title: "Content Strategist",
    company: "BrandVerse",
    location: "Remote (Anywhere)",
    payRate: "$50k - $70k / year",
    category: "marketing",
    description: "Create content strategies that align with brand goals and boost customer engagement.",
    posted: "5 days ago",
    urgent: false,
  },
  {
    id: "j10",
    title: "QA Engineer (Automation)",
    company: "BugHunter Inc.",
    location: "Remote (India Preferred)",
    payRate: "$30 - $50 / hour",
    category: "development",
    description: "Write automated tests and ensure product quality throughout the development lifecycle.",
    posted: "3 days ago",
    urgent: false,
  },
  {
    id: "j11",
    title: "Motion Graphics Designer",
    company: "PixelMotion",
    location: "Remote (Worldwide)",
    payRate: "$40 - $60 / hour",
    category: "design",
    description: "Create dynamic and engaging motion graphics for marketing videos and product demos.",
    posted: "2 days ago",
    urgent: false,
  },
  {
    id: "j12",
    title: "AI/ML Engineer",
    company: "NeuroWorks",
    location: "Remote (US/EU)",
    payRate: "$140k - $170k / year",
    category: "development",
    description: "Design and implement machine learning models for cutting-edge AI applications.",
    posted: "2 days ago",
    urgent: true,
  },
  {
    id: "j13",
    title: "Email Marketing Manager",
    company: "InboxHero",
    location: "Remote (Anywhere)",
    payRate: "$60k - $80k / year",
    category: "marketing",
    description: "Develop and execute email campaigns to engage and retain users.",
    posted: "1 week ago",
    urgent: false,
  },
  {
    id: "j14",
    title: "Virtual Assistant",
    company: "RemoteExec",
    location: "Remote (Worldwide)",
    payRate: "$15 - $25 / hour",
    category: "support",
    description: "Provide administrative support, manage calendars, and handle communications.",
    posted: "5 days ago",
    urgent: false,
  },
  {
    id: "j15",
    title: "Mobile Developer (Flutter)",
    company: "AppForge",
    location: "Remote (Worldwide)",
    payRate: "$90k - $120k / year",
    category: "development",
    description: "Build cross-platform mobile apps using Flutter and Dart.",
    posted: "3 days ago",
    urgent: true,
  },
  {
    id: "j16",
    title: "Copywriter",
    company: "WriteRight",
    location: "Remote (Anywhere)",
    payRate: "$35 - $55 / hour",
    category: "writing",
    description: "Craft compelling copy for ads, websites, and marketing materials.",
    posted: "6 days ago",
    urgent: false,
  },
  {
    id: "j17",
    title: "Sales Development Representative (SDR)",
    company: "LeadBoost",
    location: "Remote (US Only)",
    payRate: "$50k base + commission",
    category: "sales",
    description: "Identify prospects, perform outreach, and qualify leads for the sales team.",
    posted: "2 days ago",
    urgent: false,
  },
  {
    id: "j18",
    title: "Localization Specialist (Japanese/English)",
    company: "GlobaLingo",
    location: "Remote (Japan Preferred)",
    payRate: "$30 - $45 / hour",
    category: "writing",
    description: "Translate and localize product content and documentation for the Japanese market.",
    posted: "4 days ago",
    urgent: true,
  },
  {
    id: "j19",
    title: "Security Analyst",
    company: "CyberSentinel",
    location: "Remote (Anywhere)",
    payRate: "$100k - $130k / year",
    category: "development",
    description: "Monitor and protect systems from cyber threats, and conduct vulnerability assessments.",
    posted: "2 days ago",
    urgent: true,
  },
  {
    id: "j20",
    title: "Community Manager",
    company: "ForumForce",
    location: "Remote (Anywhere)",
    payRate: "$45k - $60k / year",
    category: "marketing",
    description: "Engage with users, moderate discussions, and build a vibrant online community.",
    posted: "5 days ago",
    urgent: false,
  },
];

const RemoteJobPlatform = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [activeDashboardTab, setActiveDashboardTab] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [hoveredJob, setHoveredJob] = useState(null)

  const themeClasses = isDarkMode 
    ? "bg-slate-950 text-slate-100" 
    : "bg-slate-50 text-slate-900"
  
  const cardClasses = isDarkMode 
    ? "bg-slate-900 border-slate-800 hover:border-cyan-500/50" 
    : "bg-white border-slate-200 hover:border-cyan-400/50"
  
  const inputClasses = isDarkMode
    ? "bg-slate-800 text-slate-100 border-slate-700 focus:border-cyan-400"
    : "bg-white text-slate-900 border-slate-300 focus:border-cyan-500"
  
  const buttonPrimaryClasses = "bg-cyan-600 text-white hover:bg-cyan-500 active:scale-95 transition-all duration-150 shadow-lg hover:shadow-cyan-500/25"
  
  const buttonSecondaryClasses = isDarkMode 
    ? "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 active:scale-95 transition-all duration-150"
    : "border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 active:scale-95 transition-all duration-150"

  const filteredJobs = useMemo(() => {
    let jobs = MOCK_JOBS
    if (selectedCategory !== "all") {
      jobs = jobs.filter((job) => job.category === selectedCategory)
    }
    if (searchTerm) {
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    return jobs
  }, [searchTerm, selectedCategory])

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn)
    if (isLoggedIn) {
      setActiveDashboardTab("dashboard")
      setIsSidebarOpen(false)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const JobCard = ({ job, onApply, onSave, compact = false }) => (
    <div 
      className={`relative p-4 rounded-lg border ${cardClasses} shadow-sm hover:shadow-lg transition-all duration-200 group ${compact ? 'bg-opacity-50 backdrop-blur-sm' : ''}`}
      onMouseEnter={() => setHoveredJob(job.id)}
      onMouseLeave={() => setHoveredJob(null)}
    >
      {job.urgent && (
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Zap size={12} />
          Urgent
        </div>
      )}
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-cyan-400 transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-slate-500 font-medium">{job.company}</p>
        </div>
        <button 
          onClick={() => onSave(job.id)}
          className={`p-1.5 rounded-md ${buttonSecondaryClasses} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
        >
          <Bookmark size={16} />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign size={14} />
          <span className="font-medium">{job.payRate}</span>
        </div>
      </div>

      {!compact && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {job.description}
        </p>
      )}

      <div className="flex gap-2">
        <button 
          onClick={() => onApply(job.id)} 
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${buttonPrimaryClasses}`}
        >
          Apply Now
        </button>
        <button 
          onClick={() => onSave(job.id)} 
          className={`px-4 py-2 rounded-md text-sm font-medium ${buttonSecondaryClasses} lg:hidden`}
        >
          Save
        </button>
      </div>
    </div>
  )

  const LandingPage = () => (
    <div className={`min-h-screen ${themeClasses}`}>
      {/* Compact Header */}
      <header className="sticky top-0 z-50 bg-opacity-80 backdrop-blur-lg border-b border-slate-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <div className="text-xl font-bold text-cyan-400">RemoteFlow</div>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-md ${buttonSecondaryClasses}`}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={handleLoginToggle} className={`px-4 py-2 rounded-md text-sm font-medium ${buttonSecondaryClasses}`}>
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Compact Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Next <span className="text-cyan-400">Remote Role</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Connect with top remote opportunities from companies worldwide. Your next career move is just a search away.
          </p>

          {/* Compact Search Interface */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${inputClasses} transition-all duration-200`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg ${buttonSecondaryClasses} min-w-[140px] justify-between`}
              >
                <Filter size={18} />
                <span className="text-sm">
                  {JOB_CATEGORIES.find((cat) => cat.id === selectedCategory)?.name}
                </span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showCategoryDropdown && (
                <div className={`absolute top-full mt-2 w-full rounded-lg border ${cardClasses} shadow-xl z-20`}>
                  {JOB_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setShowCategoryDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-800 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                        selectedCategory === category.id ? 'bg-cyan-900/30 text-cyan-400' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {React.createElement(category.icon, { size: 16 })}
                        {category.name}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 text-sm text-slate-500 mb-8">
            <div className="text-center">
              <div className="font-semibold text-lg text-cyan-400">{MOCK_JOBS.length}+</div>
              <div>Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg text-cyan-400">50+</div>
              <div>Companies</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg text-cyan-400">100%</div>
              <div>Remote</div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Jobs Grid */}
      <section className="py-8 px-4 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "all" ? "Latest Jobs" : `${JOB_CATEGORIES.find(cat => cat.id === selectedCategory)?.name} Jobs`}
            </h2>
            <div className="text-sm text-slate-500">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={(id) => console.log(`Applying for ${id}`)}
                onSave={(id) => console.log(`Saving ${id}`)}
              />
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-500 mb-4">No jobs found matching your criteria</div>
              <button 
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium ${buttonSecondaryClasses}`}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Compact Footer */}
      <footer className="py-6 px-4 border-t border-slate-800 mt-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center">
              <Briefcase size={14} className="text-white" />
            </div>
            <span className="font-semibold text-cyan-400">RemoteFlow</span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} RemoteFlow. Connecting talent worldwide.
          </p>
        </div>
      </footer>
    </div>
  )

  const Dashboard = () => (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      {/* Compact Top Bar */}
      <header className={`flex items-center justify-between p-4 border-b border-slate-800 bg-opacity-80 backdrop-blur-lg`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-800"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Briefcase size={16} className="text-white" />
            </div>
            <div className="text-xl font-bold text-cyan-400">RemoteFlow</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-md ${buttonSecondaryClasses} relative`}>
            <Bell size={18} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
          </button>
          <button onClick={toggleTheme} className={`p-2 rounded-md ${buttonSecondaryClasses}`}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className={`p-2 rounded-md ${buttonSecondaryClasses}`}>
            <UserCircle size={18} />
          </button>
          <button
            onClick={handleLoginToggle}
            className={`px-3 py-2 rounded-md text-sm font-medium ${buttonSecondaryClasses} hidden sm:inline-flex`}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Compact Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 ${cardClasses} border-r shadow-xl md:relative md:translate-x-0 transition-transform duration-200 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex md:flex-col`}>
          <div className="p-4 flex-1">
            <nav className="space-y-1">
              {[
                { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                { id: "saved", label: "Saved Jobs", icon: Save },
                { id: "applications", label: "Applications", icon: FileText },
                { id: "messages", label: "Messages", icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveDashboardTab(tab.id)
                    setIsSidebarOpen(false)
                  }}
                  className={`flex items-center w-full px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ${
                    activeDashboardTab === tab.id
                      ? "bg-cyan-900/30 text-cyan-400 border-r-2 border-cyan-400"
                      : "hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  {React.createElement(tab.icon, { size: 18, className: "mr-3" })}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-slate-800">
            <button
              onClick={handleLoginToggle}
              className={`w-full px-3 py-2.5 rounded-md text-sm font-medium ${buttonSecondaryClasses} flex items-center justify-center`}
            >
              <UserCircle size={18} className="mr-2" /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {activeDashboardTab === "dashboard" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <div className="text-sm text-slate-500">
                  {filteredJobs.length} jobs available
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={(id) => console.log(`Applying for ${id}`)}
                    onSave={(id) => console.log(`Saving ${id}`)}
                  />
                ))}
              </div>
              
              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500">No jobs found matching your criteria.</p>
                </div>
              )}
            </div>
          )}

          {activeDashboardTab === "saved" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Saved Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {MOCK_JOBS.slice(0, 2).map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={(id) => console.log(`Applying for ${id}`)}
                    onSave={(id) => console.log(`Unsaving ${id}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeDashboardTab === "applications" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">My Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {MOCK_JOBS.slice(2, 4).map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={(id) => console.log(`View application for ${id}`)}
                    onSave={(id) => console.log(`Withdraw application for ${id}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeDashboardTab === "messages" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Messages</h2>
              <div className={`p-6 rounded-lg border ${cardClasses} text-center`}>
                <MessageSquare size={48} className="mx-auto mb-4 text-slate-400" />
                <p className="text-slate-500">No new messages</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )

  return isLoggedIn ? <Dashboard /> : <LandingPage />
}

export default RemoteJobPlatform