import { useState, useEffect, useRef } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Database,
  Globe,
  Smartphone,
  Star,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Send,
  MapPin,
  Phone,
  Calendar,
  Award,
  Users,
  Coffee,
  ChevronUp,
} from "lucide-react"

const Portfolio = () => {
  const [currentProject, setCurrentProject] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [scrollY, setScrollY] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  // Removed visibleSections state as section animations are removed for html-to-image compatibility
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const fullText = "Full-Stack Developer & Digital Architect "
  const carouselRef = useRef(null)

  // Scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      setScrollProgress((window.scrollY / totalHeight) * 100)
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Removed Intersection observer for section animations for html-to-image compatibility
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         setVisibleSections(prev => new Set(prev).add(entry.target.id));
  //       }
  //     });
  //   }, { threshold: 0.1 });

  //   document.querySelectorAll('section, footer').forEach(element => {
  //     observer.observe(element);
  //   });

  //   return () => observer.disconnect();
  // }, []);

  // Enhanced typing effect with proper cleanup
  useEffect(() => {
    let index = 0
    let isDeleting = false
    let currentText = ""
    let timeoutId

    const type = () => {
      clearTimeout(timeoutId)

      if (index <= fullText.length && !isDeleting) {
        currentText = fullText.slice(0, index)
        index++
        if (index > fullText.length) {
          isDeleting = true
          timeoutId = setTimeout(type, 2000)
          return
        }
      } else if (isDeleting) {
        currentText = currentText.slice(0, -1)
        if (currentText.length === 0) {
          isDeleting = false
          index = 0
        }
      }

      setTypedText(currentText)
      // Removed pulse animation from cursor for html-to-image compatibility
      timeoutId = setTimeout(type, isDeleting ? 50 : 100)
    }

    type()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [fullText])

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80
      const elementPosition = element.offsetTop - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Touch handling for carousel
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setCurrentProject((prev) => (prev + 1) % projects.length)
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
    }
  }

  // Enhanced form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    alert("Thank you! I'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const theme = {
    bg: isDarkMode ? "bg-gray-900" : "bg-gray-50",
    cardBg: isDarkMode ? "bg-gray-800" : "bg-white",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    accent: "text-blue-500",
  }

  const skills = [
    { name: "React & Next.js", level: 95, icon: <Code className="w-5 h-5" /> },
    { name: "Node.js & Express", level: 90, icon: <Database className="w-5 h-5" /> },
    { name: "Python & Django", level: 88, icon: <Globe className="w-5 h-5" /> },
    { name: "Mobile Development", level: 85, icon: <Smartphone className="w-5 h-5" /> },
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack marketplace with real-time features",
      image: "/placeholder.svg?w=400&h=250&q=e-commerce platform",
      tech: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "AI Analytics Dashboard",
      description: "ML-powered business intelligence platform",
      image: "/placeholder.svg?w=400&h=250&q=AI analytics dashboard",
      tech: ["Python", "TensorFlow", "React"],
      link: "#",
    },
    {
      title: "Social Media App",
      description: "Real-time social platform with messaging",
      image: "/placeholder.svg?w=400&h=250&q=social media app",
      tech: ["React Native", "Firebase"],
      link: "#",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechStart Inc.",
      content: "Exceptional work quality and delivered ahead of schedule.",
      avatar: "/placeholder.svg?w=60&h=60&q=person avatar",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder, GrowthLab",
      content: "The best freelancer I've worked with in 10 years.",
      avatar: "/placeholder.svg?w=60&h=60&q=person avatar",
      rating: 5,
    },
  ]

  const stats = [
    { icon: <Award className="w-6 h-6" />, value: "50+", label: "Projects Completed" },
    { icon: <Users className="w-6 h-6" />, value: "30+", label: "Happy Clients" },
    { icon: <Coffee className="w-6 h-6" />, value: "1000+", label: "Cups of Coffee" },
    { icon: <Calendar className="w-6 h-6" />, value: "5+", label: "Years Experience" },
  ]

  const services = [
    { title: "Web Development", desc: "Modern, responsive websites", price: "From $2,500" },
    { title: "Mobile Apps", desc: "Native & cross-platform apps", price: "From $5,000" },
    { title: "API Development", desc: "Scalable backend solutions", price: "From $1,500" },
    { title: "Consulting", desc: "Technical architecture advice", price: "$150/hour" },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text}`}>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Modern Floating Navbar */}
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          scrollY > 100 ? "w-[calc(100%-2rem)] md:w-auto" : "w-[calc(100%-2rem)] md:w-auto"
        }`}
      >
        <div
          className={`${isDarkMode ? "bg-gray-900/95" : "bg-white/95"} rounded-2xl border ${theme.border} shadow-xl px-4 py-3 md:px-6`}
        >
          <div className="flex justify-between items-center">
            {/* Changed gradient text to solid color for html-to-image compatibility */}
            <div className="text-xl font-bold text-blue-500 md:hidden">Alex Rivera</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("home")} className="hover:text-blue-500 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection("about")} className="hover:text-blue-500 transition-colors">
                About
              </button>
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
                  className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === "services" && (
                  <div
                    className={`absolute top-full mt-2 w-64 ${theme.cardBg} rounded-xl border ${theme.border} shadow-xl p-2`}
                  >
                    {services.map((service, index) => (
                      <div key={index} className="p-3 hover:bg-blue-500/10 rounded-lg cursor-pointer">
                        <div className="font-medium">{service.title}</div>
                        <div className={`text-sm ${theme.textSecondary}`}>{service.desc}</div>
                        <div className="text-blue-500 text-sm font-medium">{service.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => scrollToSection("projects")} className="hover:text-blue-500 transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-blue-500 transition-colors">
                Contact
              </button>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${theme.cardBg} border ${theme.border} hover:bg-blue-500/10 transition-colors`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button onClick={toggleTheme} className={`p-2 rounded-lg ${theme.cardBg} border ${theme.border}`}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${theme.cardBg} border ${theme.border}`}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-left py-2 hover:text-blue-500 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left py-2 hover:text-blue-500 transition-colors"
                >
                  About
                </button>
                {/* Services dropdown for mobile */}
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
                    className="flex items-center justify-between w-full text-left py-2 hover:text-blue-500 transition-colors"
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeDropdown === "services" && (
                    <div className={`mt-2 w-full ${theme.cardBg} rounded-lg border ${theme.border} shadow-md p-2`}>
                      {services.map((service, index) => (
                        <div key={index} className="p-3 hover:bg-blue-500/10 rounded-lg cursor-pointer">
                          <div className="font-medium">{service.title}</div>
                          <div className={`text-sm ${theme.textSecondary}`}>{service.desc}</div>
                          <div className="text-blue-500 text-sm font-medium">{service.price}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-left py-2 hover:text-blue-500 transition-colors"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left py-2 hover:text-blue-500 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {/* Removed section animation for html-to-image compatibility */}
      <section id="home" className={`min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6`}>
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-lg"
            />
          </div>

          {/* Changed gradient text to solid color for html-to-image compatibility */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-600">Alex Rivera</h1>

          <div className="text-lg md:text-2xl font-light mb-6 h-8 flex items-center justify-center">
            <span className="border-r-2 border-blue-500 pr-2">
              {typedText}
              {/* Removed animate-pulse from cursor for html-to-image compatibility */}
              <span>|</span>
            </span>
          </div>

          <p className={`text-lg ${theme.textSecondary} mb-8 max-w-2xl mx-auto`}>
            I craft exceptional digital experiences that drive business growth. From concept to deployment, I deliver
            premium solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`${theme.cardBg} border ${theme.border} px-8 py-3 rounded-full font-medium hover:bg-blue-500/10 transition-all duration-300`}
            >
              View My Work
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${theme.cardBg} border ${theme.border} rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <div className="text-blue-500 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className={`text-sm ${theme.textSecondary}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      {/* Removed section animation for html-to-image compatibility */}
      <section id="about" className={`py-16 px-4 sm:px-6`}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Changed gradient text to solid color for html-to-image compatibility */}
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600">About Me</h2>
              <p className={`${theme.textSecondary} mb-6 leading-relaxed`}>
                With over 5 years of experience in full-stack development, I specialize in creating scalable,
                user-friendly applications that solve real business problems. I'm passionate about clean code, modern
                architectures, and delivering exceptional user experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                {["React", "Node.js", "Python", "TypeScript", "AWS", "MongoDB"].map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-blue-500">{skill.icon}</div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-blue-500 font-medium">{skill.level}%</span>
                    </div>
                    <div className={`h-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full overflow-hidden`}>
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* Removed section animation for html-to-image compatibility */}
      <section id="projects" className={`py-16 px-4 sm:px-6`}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            {/* Changed gradient text to solid color for html-to-image compatibility */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Featured Projects</h2>
            <p className={`${theme.textSecondary} max-w-2xl mx-auto`}>
              A showcase of recent projects that demonstrate my expertise in full-stack development
            </p>
          </div>

          {/* Project Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className={`${theme.cardBg} border ${theme.border} rounded-2xl overflow-hidden shadow-lg`}>
              <div
                ref={carouselRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentProject * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {projects.map((project, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2">
                      <div className="relative group">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center space-x-2">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Live</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-6 md:p-8">
                        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                        <p className={`${theme.textSecondary} mb-4`}>{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm border border-blue-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${theme.cardBg} border ${theme.border} p-2 rounded-full hover:bg-blue-500/10 transition-all z-10`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentProject((prev) => (prev + 1) % projects.length)}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${theme.cardBg} border ${theme.border} p-2 rounded-full hover:bg-blue-500/10 transition-all z-10`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentProject
                      ? "bg-blue-500 w-6"
                      : `${isDarkMode ? "bg-gray-600" : "bg-gray-300"} hover:bg-gray-500`
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            {/* Changed gradient text to solid color for html-to-image compatibility */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">What Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${theme.cardBg} border ${theme.border} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`${theme.textSecondary} mb-4 italic`}>"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className={`text-sm ${theme.textSecondary}`}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* Removed section animation for html-to-image compatibility */}
      <section id="contact" className={`py-16 px-4 sm:px-6`}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            {/* Changed gradient text to solid color for html-to-image compatibility */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Let's Work Together</h2>
            <p className={`${theme.textSecondary}`}>
              Ready to bring your project to life? Get in touch and let's discuss your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>alex.rivera@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <a
                  href="#"
                  className={`${theme.cardBg} border ${theme.border} p-3 rounded-full hover:bg-blue-500/10 transition-all`}
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`${theme.cardBg} border ${theme.border} p-3 rounded-full hover:bg-blue-500/10 transition-all`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`${theme.cardBg} border ${theme.border} p-3 rounded-full hover:bg-blue-500/10 transition-all`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${theme.cardBg} border ${theme.border} rounded-xl p-6`}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${theme.border} ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${theme.border} ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${theme.border} ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Back to top button */}
      {scrollY > 300 && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full ${theme.cardBg} border ${theme.border} shadow-lg hover:bg-blue-500/10 transition-all z-50`}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      {/* Removed section animation for html-to-image compatibility */}
      <footer id="footer" className={`py-8 border-t ${theme.border}`}>
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className={theme.textSecondary}>© 2025 Alex Rivera. Crafting exceptional digital experiences.</p>
        </div>
      </footer>
    </div>
  )
}

export default Portfolio
