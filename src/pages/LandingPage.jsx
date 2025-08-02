import { useState, useEffect, useRef } from 'react';
import { FiTrendingUp, FiBarChart2, FiDatabase, FiShield, FiZap, FiCheck, FiChevronDown, FiChevronUp, FiUsers, FiGlobe, FiClock } from 'react-icons/fi';
import { FaChartLine, FaRegLightbulb, FaShieldAlt } from 'react-icons/fa';
import { RiAiGenerate } from 'react-icons/ri';

export default function LandingPage() {
  const [animatedText, setAnimatedText] = useState('');
  const [activeFeature, setActiveFeature] = useState(0);
  const [query, setQuery] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('trends');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sample market data for the demo
  const marketData = {
    trends: [
      { name: 'E-commerce', value: '+12.4%', change: '↑ 2.1%', icon: <FiTrendingUp className="text-green-400" /> },
      { name: 'Healthcare', value: '+8.7%', change: '↑ 1.3%', icon: <FiTrendingUp className="text-green-400" /> },
      { name: 'FinTech', value: '+15.2%', change: '↑ 3.4%', icon: <FiTrendingUp className="text-green-400" /> },
      { name: 'Energy', value: '-2.3%', change: '↓ 0.8%', icon: <FiTrendingUp className="text-red-400 transform rotate-180" /> }
    ],
    sectors: [
      { name: 'Technology', growth: '18.2%', risk: 'Medium', opportunity: 'High' },
      { name: 'Manufacturing', growth: '6.7%', risk: 'High', opportunity: 'Medium' },
      { name: 'Consumer Goods', growth: '9.1%', risk: 'Low', opportunity: 'High' },
      { name: 'Financial Services', growth: '14.5%', risk: 'Medium', opportunity: 'Very High' }
    ],
    predictions: [
      { metric: 'Q3 Revenue', prediction: '$4.2M', confidence: '89%', range: '$3.8M - $4.6M' },
      { metric: 'Customer Growth', prediction: '+23%', confidence: '92%', range: '+18% - +28%' },
      { metric: 'Market Share', prediction: '14.7%', confidence: '85%', range: '13.2% - 16.1%' }
    ]
  };

  const features = [
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Market Predictions",
      description: "Accurate forecasts with 95% confidence intervals",
      stats: "Used by 82% of Fortune 500 companies",
      detail: "Our models analyze over 1,200 economic indicators to deliver precise market forecasts."
    },
    {
      icon: <RiAiGenerate className="w-6 h-6" />,
      title: "AI Recommendations",
      description: "Actionable insights tailored to your business",
      stats: "Generates 3-5x more actionable insights than competitors",
      detail: "Proprietary algorithms identify hidden opportunities in your data."
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Risk Analysis",
      description: "Comprehensive risk assessment models",
      stats: "Reduces unexpected risks by 67% on average",
      detail: "Real-time monitoring of 50+ risk factors across all business areas."
    }
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$0",
      description: "For individuals exploring AI",
      features: ["100 predictions/month", "Basic analytics", "Email support", "3 data sources"],
      cta: "Get Started",
      popular: false,
      users: "1 user"
    },
    {
      name: "Professional",
      price: "$299",
      description: "For growing businesses",
      features: ["10,000 predictions/month", "Advanced analytics", "Priority support", "API access", "15 data sources", "Custom dashboards"],
      cta: "Start Free Trial",
      popular: true,
      users: "Up to 5 users"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: ["Unlimited predictions", "Dedicated infrastructure", "24/7 support", "Custom models", "SLAs", "Unlimited data sources", "On-prem options"],
      cta: "Contact Sales",
      popular: false,
      users: "Unlimited users"
    }
  ];

  const headlines = [
    "Predict market trends with 92% accuracy",
    "Analyze customer behavior in real-time",
    "Optimize business strategy with AI",
    "Forecast revenue with confidence"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Director of Analytics, TechCorp",
      content: "FuturisAI helped us identify a 23% growth opportunity in an emerging market we had completely overlooked. The insights paid for the platform in the first quarter.",
      stats: "↑ 23% revenue growth"
    },
    {
      name: "Michael Chen",
      title: "CFO, Global Retail Inc",
      content: "The risk analysis features saved us from making a $2M mistake last year. We've since integrated FuturisAI into all our strategic planning processes.",
      stats: "↓ 67% unexpected risks"
    },
    {
      name: "Emma Rodriguez",
      title: "VP Product, Finova",
      content: "Our product team uses FuturisAI daily to spot trends before competitors. It's become our unfair advantage in the market.",
      stats: "3.2x faster market response"
    }
  ];

  const integrations = [
    { name: "Salesforce", icon: "SF" },
    { name: "Google Analytics", icon: "GA" },
    { name: "Shopify", icon: "SP" },
    { name: "QuickBooks", icon: "QB" },
    { name: "HubSpot", icon: "HS" },
    { name: "Zapier", icon: "ZP" }
  ];

  useEffect(() => {
    // Animated headline effect
    let currentHeadline = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const headline = headlines[currentHeadline];
      
      if (isDeleting) {
        setAnimatedText(headline.substring(0, currentChar - 1));
        currentChar--;
      } else {
        setAnimatedText(headline.substring(0, currentChar + 1));
        currentChar++;
      }

      if (!isDeleting && currentChar === headline.length) {
        typingSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentHeadline = (currentHeadline + 1) % headlines.length;
        typingSpeed = 100;
      } else {
        typingSpeed = isDeleting ? 50 : 100;
      }

      setTimeout(type, typingSpeed);
    };

    type();

    // Feature carousel
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    // Testimonial carousel
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiZap className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-xl font-bold ${isDarkMode ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600'}`}>
              FuturisAI
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center space-x-1 ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}
              >
                <span>Products</span>
                {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {isDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                  <div className="py-1">
                    <a href="#" className={`block px-4 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Market Intelligence</a>
                    <a href="#" className={`block px-4 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Customer Insights</a>
                    <a href="#" className={`block px-4 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Risk Analyzer</a>
                    <a href="#" className={`block px-4 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>All Products</a>
                  </div>
                </div>
              )}
            </div>
            <a href="#features" className={isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}>Features</a>
            <a href="#pricing" className={isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}>Pricing</a>
            <a href="#demo" className={isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}>Demo</a>
            <a href="#" className={isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}>Resources</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90' : 'bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:opacity-90'}`}>
              Sign Up Free
            </button>
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4 py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
            <div className="flex flex-col space-y-3 px-4">
              <a href="#" className="py-2 border-b border-gray-700">Products</a>
              <a href="#features" className="py-2 border-b border-gray-700">Features</a>
              <a href="#pricing" className="py-2 border-b border-gray-700">Pricing</a>
              <a href="#demo" className="py-2 border-b border-gray-700">Demo</a>
              <a href="#" className="py-2">Resources</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className={`container mx-auto px-6 py-16 md:py-24 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl my-6 mx-4 md:mx-0`}>
        <div className="max-w-5xl mx-auto">
          <div className={`inline-block px-3 py-1 rounded-full ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} text-sm font-medium mb-6`}>
            Trusted by 8,000+ businesses worldwide
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className={`bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}>
              {animatedText}
            </span>
            <span className={`ml-2 inline-block w-2 h-12 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} animate-pulse`}></span>
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
            FuturisAI leverages cutting-edge machine learning to transform your data into actionable business intelligence with 92% prediction accuracy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className={`px-8 py-3 rounded-md font-medium ${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90' : 'bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:opacity-90'}`}>
              Get Started Free
            </button>
            <button className={`px-8 py-3 rounded-md font-medium ${isDarkMode ? 'border border-gray-700 hover:bg-gray-800' : 'border border-gray-300 hover:bg-gray-100'}`}>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.7L10 6.4l3.7-3.7 1.4 1.4L11.4 7.8l3.7 3.7-1.4 1.4L10 9.2l-3.7 3.7-1.4-1.4 3.7-3.7L4.9 4.1l1.4-1.4z"></path>
                </svg>
                <span>Watch Demo (2 min)</span>
              </div>
            </button>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className={`p-1 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <img 
                    key={item}
                    src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}0.jpg`}
                    className="w-10 h-10 rounded-full border-2 border-gray-900"
                    alt="User"
                  />
                ))}
              </div>
            </div>
            <div className="ml-4 text-left">
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Join 8,000+ data-driven teams</div>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm">4.9/5 from 1,200+ reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="container mx-auto px-6 py-8">
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>TRUSTED BY INNOVATIVE TEAMS WORLDWIDE</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Forbes', 'TechCrunch', 'Wired', 'Bloomberg', 'Harvard Business Review'].map((logo) => (
              <div key={logo} className={`text-xl font-bold ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section id="demo" className="container mx-auto px-6 py-16 md:py-24">
        <div className={`max-w-5xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-2xl font-bold mb-2">Market Intelligence Demo</h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>See FuturisAI in action with real market data</p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask FuturisAI to predict market trends for Q3 2024..."
                  className={`w-full ${isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} rounded-lg px-5 py-4 pr-16 focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-600'}`}
                />
                <button
                  type="submit"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} p-2 rounded-md transition-colors`}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </form>
            
            {isSubmitted ? (
              <div className={`rounded-lg p-6 animate-pulse ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'}`}>
                      <RiAiGenerate className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className={`h-4 rounded w-3/4 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                    <div className={`h-4 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                    <div className={`h-4 rounded w-5/6 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'}`}>
                      <RiAiGenerate className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Try asking me something like: "Predict the retail market trends for Q3 2024 based on current economic indicators" or "Analyze customer sentiment from our latest product launch"
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <div className="flex border-b mb-6">
                <button
                  onClick={() => setActiveTab('trends')}
                  className={`px-4 py-2 font-medium ${activeTab === 'trends' ? (isDarkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : (isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')}`}
                >
                  Market Trends
                </button>
                <button
                  onClick={() => setActiveTab('sectors')}
                  className={`px-4 py-2 font-medium ${activeTab === 'sectors' ? (isDarkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : (isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')}`}
                >
                  Sector Analysis
                </button>
                <button
                  onClick={() => setActiveTab('predictions')}
                  className={`px-4 py-2 font-medium ${activeTab === 'predictions' ? (isDarkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : (isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')}`}
                >
                  Predictions
                </button>
              </div>
              
              {activeTab === 'trends' && (
                <div className="grid md:grid-cols-2 gap-4">
                  {marketData.trends.map((trend, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} transition-colors`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{trend.name}</h3>
                          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Quarterly growth</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-lg font-bold ${trend.value.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{trend.value}</span>
                          <span className={`ml-2 text-sm ${trend.value.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{trend.change}</span>
                        </div>
                      </div>
                      <div className="mt-4 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${trend.value.startsWith('+') ? 'bg-green-400' : 'bg-red-400'}`} 
                          style={{ width: `${Math.abs(parseFloat(trend.value)) * 5}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'sectors' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>Sector</th>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>Growth</th>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>Risk</th>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>Opportunity</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      {marketData.sectors.map((sector, index) => (
                        <tr key={index} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                          <td className="px-4 py-3 whitespace-nowrap font-medium">{sector.name}</td>
                          <td className={`px-4 py-3 whitespace-nowrap ${parseFloat(sector.growth) > 10 ? 'text-green-400' : 'text-yellow-400'}`}>{sector.growth}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              sector.risk === 'High' ? (isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-800') :
                              sector.risk === 'Medium' ? (isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800') :
                              (isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800')
                            }`}>
                              {sector.risk}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              sector.opportunity === 'High' ? (isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800') :
                              sector.opportunity === 'Very High' ? (isDarkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-800') :
                              (isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800')
                            }`}>
                              {sector.opportunity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'predictions' && (
                <div className="grid md:grid-cols-3 gap-4">
                  {marketData.predictions.map((prediction, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} transition-colors`}
                    >
                      <h3 className="font-medium">{prediction.metric}</h3>
                      <div className="mt-2 flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-bold">{prediction.prediction}</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{prediction.range}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                          {prediction.confidence} confidence
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full" 
                            style={{ width: `${parseInt(prediction.confidence)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Business Intelligence</h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            FuturisAI delivers insights that drive growth and innovation
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`rounded-xl p-8 border ${activeFeature === index ? (isDarkMode ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-blue-600 shadow-lg shadow-blue-600/20') : (isDarkMode ? 'border-gray-700' : 'border-gray-200')} ${isDarkMode ? 'bg-gray-800 hover:border-blue-400' : 'bg-white hover:border-blue-500'} transition-all duration-500`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${activeFeature === index ? (isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white') : (isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-gray-100 text-blue-600')} transition-colors`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
              <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{feature.stats}</p>
            </div>
          ))}
        </div>
        
        <div className={`max-w-3xl mx-auto p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h3 className="text-xl font-bold mb-2">{features[activeFeature].title}</h3>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{features[activeFeature].detail}</p>
          <div className="mt-4 flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} mr-3`}>
              <FiCheck className="w-4 h-4" />
            </div>
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Included in all paid plans</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-16 md:py-24 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Data-Driven Teams</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of businesses transforming their strategy with AI
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative h-64">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${activeTestimonial === index ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg h-full`}>
                    <div className="flex items-start">
                      <img 
                        src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index+1}.jpg`}
                        className="w-12 h-12 rounded-full mr-4"
                        alt={testimonial.name}
                      />
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.title}</div>
                        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial.content}"</p>
                        <div className={`px-3 py-1 rounded-full inline-flex items-center ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                          <FiTrendingUp className="mr-1" />
                          <span className="text-sm font-medium">{testimonial.stats}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${activeTestimonial === index ? (isDarkMode ? 'bg-blue-400' : 'bg-blue-600') : (isDarkMode ? 'bg-gray-600' : 'bg-gray-400')}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Integrations</h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Connect with your existing tools and workflows
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {integrations.map((integration, index) => (
            <div 
              key={index}
              className={`p-6 rounded-xl flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-gray-100 text-blue-600'} mb-3 text-lg font-bold`}>
                {integration.icon}
              </div>
              <span className="font-medium">{integration.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className={`px-6 py-3 rounded-md font-medium ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
            View all 50+ integrations
          </button>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`py-16 md:py-24 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Choose the plan that fits your needs
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className={`p-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
              <div className="flex">
                <button className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} font-medium`}>
                  Monthly
                </button>
                <button className={`px-4 py-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-700'} font-medium`}>
                  Yearly (Save 20%)
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`relative rounded-xl p-8 ${tier.popular ? (isDarkMode ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-blue-600 shadow-lg shadow-blue-600/20') : (isDarkMode ? 'border-gray-700' : 'border-gray-300')} ${isDarkMode ? 'bg-gray-800/80 hover:border-blue-400' : 'bg-white hover:border-blue-500'} border transition-colors`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tier.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== "$0" && <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>/month</span>}
                </div>
                <div className={`flex items-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <FiUsers className="mr-2" />
                  <span>{tier.users}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheck className={`flex-shrink-0 mt-1 mr-2 ${tier.popular ? 'text-blue-500' : (isDarkMode ? 'text-blue-400' : 'text-blue-600')}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 rounded-md font-medium ${tier.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90' : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')} transition-all`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
          
          <div className={`max-w-2xl mx-auto mt-12 p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <h3 className="text-xl font-bold mb-2">Need something more?</h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We offer custom solutions for enterprises with complex needs.</p>
            <button className={`px-6 py-2 rounded-md font-medium ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
              Contact our sales team
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                question: "How accurate are FuturisAI's predictions?",
                answer: "Our models achieve an average accuracy of 92% across all market sectors, with some specialized models reaching 96% accuracy for specific industries. Accuracy varies by data quality and market volatility."
              },
              {
                question: "What data sources does FuturisAI use?",
                answer: "We integrate with over 50 first-party data sources including market indices, economic indicators, and proprietary datasets. You can also connect your own data through our API or direct integrations."
              },
              {
                question: "How long does implementation take?",
                answer: "Most teams are operational within 1-2 days. Our Starter and Professional plans require no setup, while Enterprise implementations typically take 2-4 weeks depending on custom requirements."
              },
              {
                question: "Is my data secure with FuturisAI?",
                answer: "Yes, we use bank-grade 256-bit encryption, regular third-party audits, and are SOC 2 Type II compliant. Data never leaves your region unless explicitly configured to do so."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <button
                  className={`w-full px-6 py-4 text-left flex justify-between items-center ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
                  onClick={() => {
                    const element = document.getElementById(`faq-${index}`);
                    element.classList.toggle('hidden');
                  }}
                >
                  <span className="font-medium">{item.question}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div id={`faq-${index}`} className="hidden px-6 pb-4">
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-20 md:py-32 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6 text-center">
          <div className={`max-w-4xl mx-auto rounded-2xl p-12 ${isDarkMode ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-gray-800' : 'bg-gradient-to-r from-blue-100 to-purple-100 border border-gray-200'}`}>
            <FiZap className={`w-12 h-12 mx-auto mb-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of businesses already using FuturisAI to stay ahead of the competition.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className={`px-8 py-3 rounded-md font-medium ${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90' : 'bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:opacity-90'}`}>
                Get Started Free
              </button>
              <button className={`px-8 py-3 rounded-md font-medium ${isDarkMode ? 'border border-gray-700 hover:bg-gray-800' : 'border border-gray-300 hover:bg-gray-100'}`}>
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FiZap className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className="text-xl font-bold">FuturisAI</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                The most accurate AI-powered market intelligence platform.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'Facebook', 'YouTube'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={`font-medium mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Integrations', 'Roadmap'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`font-medium mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Resources</h3>
              <ul className="space-y-2">
                {['Documentation', 'API Reference', 'Guides', 'Blog'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`font-medium mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Company</h3>
              <ul className="space-y-2">
                {['About', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`font-medium mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Legal</h3>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Security', 'GDPR'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center`}>
            <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mb-4 md:mb-0`}>
              © {new Date().getFullYear()} FuturisAI. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Terms of Service
              </a>
              <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}