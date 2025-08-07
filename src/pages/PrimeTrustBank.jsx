import React, { useState, useEffect } from 'react';
import { Shield, CreditCard, TrendingUp, PiggyBank, ChevronDown, Check, Menu, X, Star, Lock, Smartphone, ArrowRight, Eye, EyeOff, ChevronUp, MessageCircle, Send, Minimize2, Phone, Mail, MapPin, Award, Users, DollarSign, Zap } from 'lucide-react';

const PrimeTrustBank = () => {
  const [activeTab, setActiveTab] = useState('save');
  const [openFaq, setOpenFaq] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'agent', text: 'Hi! I\'m Sarah from PrimeTrust Bank. How can I help you today?', time: '2:34 PM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Let me check our current rates and options for you.",
        "That's a great question! Our premium accounts offer several advantages including higher interest rates and no monthly fees.",
        "I can definitely assist you with opening a new account. Would you prefer to start online or schedule a call with one of our specialists?",
        "Our mobile app has won several awards for user experience. Would you like me to walk you through the key features?"
      ];
      
      const agentMessage = {
        id: chatMessages.length + 2,
        sender: 'agent',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setIsTyping(false);
      setChatMessages(prev => [...prev, agentMessage]);
    }, 2000);
  };

  const features = {
    save: {
      icon: <PiggyBank className="w-6 h-6" />,
      title: 'Premium Savings',
      description: 'High-yield savings with automated features and goal tracking.',
      benefits: ['4.25% APY', 'Auto round-ups', 'Goal rewards']
    },
    invest: {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Smart Investing',
      description: 'AI-managed portfolios with tax optimization and low fees.',
      benefits: ['0.20% fee', 'Tax optimization', 'Auto rebalancing']
    },
    borrow: {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Instant Credit',
      description: 'Personal loans and credit lines with instant approval.',
      benefits: ['From 3.99% APR', 'Instant approval', 'No hidden fees']
    }
  };

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Entrepreneur',
      content: 'PrimeTrust transformed my business banking. The AI insights are incredible.',
      rating: 5
    },
    {
      name: 'Michael Torres',
      role: 'Software Engineer',
      content: 'Best banking app I\'ve used. Lightning fast and beautifully designed.',
      rating: 5
    },
    {
      name: 'Jessica Liu',
      role: 'Financial Advisor',
      content: 'I recommend PrimeTrust to all my clients. Superior investment tools.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Is PrimeTrust Bank FDIC insured?',
      answer: 'Yes, all deposits are FDIC insured up to $250,000. We use enterprise-grade security with 256-bit encryption.'
    },
    {
      question: 'Are there monthly fees?',
      answer: 'No monthly fees, no minimum balance, no hidden charges. Banking should be transparent and accessible.'
    },
    {
      question: 'How fast are transfers?',
      answer: 'Instant between PrimeTrust accounts, same-day ACH, and free access to 60,000+ ATMs nationwide.'
    },
    {
      question: 'What makes your investment platform different?',
      answer: 'Our AI combines institutional research with personal risk assessment at 80% lower fees than traditional advisors.'
    }
  ];

  const quickStats = [
    { icon: <Users className="w-5 h-5" />, value: '3M+', label: 'Customers' },
    { icon: <DollarSign className="w-5 h-5" />, value: '$75B+', label: 'Assets' },
    { icon: <Star className="w-5 h-5" />, value: '4.9★', label: 'Rating' },
    { icon: <Award className="w-5 h-5" />, value: '#1', label: 'Digital Bank' }
  ];

  const themeClass = isDarkMode ? 'dark' : '';

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ${themeClass}`}>
      {/* Navigation */}
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
              <Shield className="h-7 w-7 text-blue-600" />
              <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">PrimeTrust Bank</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm font-medium transition-colors">Features</a>
              <a href="#security" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm font-medium transition-colors">Security</a>
              <a href="#reviews" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm font-medium transition-colors">Reviews</a>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
                Sign In
              </button>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-gray-100 dark:bg-gray-800 p-1.5 rounded-md text-gray-400 hover:text-gray-500 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-4 py-3 space-y-2">
              <a href="#features" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 py-2">Features</a>
              <a href="#security" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 py-2">Security</a>
              <a href="#reviews" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 py-2">Reviews</a>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium mt-2">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Banking that
                <span className="text-blue-600 block">adapts to you</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AI-powered banking with premium rates, zero fees, and insights that help you build wealth smarter.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-all hover:shadow-lg transform hover:-translate-y-0.5">
                  Open Account
                </button>
                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-md font-medium hover:border-blue-600 hover:text-blue-600 transition-colors">
                  Watch Demo
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Account Dashboard</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">Live</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Balance</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">$32,847.52</span>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-green-700 dark:text-green-400 font-medium text-sm">+$2,138 this month</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors">
                    Transfer
                  </button>
                  <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600 transition-colors">
                    Invest
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Everything you need in one platform
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Premium banking, intelligent investing, and flexible credit—all powered by AI insights.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {Object.keys(features).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                    activeTab === key
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {features[key].title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Feature Content */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                    {features[activeTab].icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {features[activeTab].title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {features[activeTab].description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {features[activeTab].benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-lg">
                      <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Performance</span>
                    <span className="text-sm text-green-600 dark:text-green-400">+15.2%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div className="h-2 bg-blue-600 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white">$15.2K</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Month</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white">$187K</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Year</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white">$2.4M</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Enterprise-grade security
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your money and data protected by the same security used by Fortune 500 companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">256-bit Encryption</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Military-grade AES-256 encryption protects all data in transit and at rest.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="bg-green-100 dark:bg-green-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">FDIC Insured</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Deposits protected up to $250,000 by the Federal Deposit Insurance Corporation.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Biometric Access</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Fingerprint, Face ID, and voice authentication for secure, convenient access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Trusted by 3+ million customers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic text-sm">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                >
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to experience premium banking?
              </h2>
              <p className="text-blue-100 mb-4">
                Join millions who trust PrimeTrust with their financial future.
              </p>
              <div className="space-y-2 text-blue-100 text-sm">
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  <span>No monthly fees or minimums</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  <span>FDIC insured up to $250K</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  <span>24/7 award-winning support</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Open Your Account</h3>
              <form className="space-y-3">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors text-sm"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors text-sm"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors text-sm"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors text-sm pr-10"
                      placeholder="Create Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Open Account - It's Free
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  FDIC insured • No fees • Takes 2 minutes
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="flex items-center mb-3">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="ml-2 font-bold">PrimeTrust Bank</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                AI-powered banking for the modern world.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Products</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Checking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Savings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Loans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Credit Cards</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Branch Finder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ATM Locator</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm">
              <div className="text-gray-400 mb-3 md:mb-0">
                © 2025 PrimeTrust Bank. All rights reserved. Member FDIC.
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>FDIC Insured</span>
                <span>Equal Housing Lender</span>
                <span>NMLS #789012</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              <p>
                PrimeTrust Bank is a trademark of PrimeTrust Financial Corp. Investment products are not FDIC insured. 
                Banking services provided by PrimeTrust Bank, Member FDIC. Investment services by PrimeTrust Securities LLC.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1 z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Live Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1 z-40"
        aria-label="Live chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Live Support</h4>
              <p className="text-green-100 text-sm">Typically responds in 2 minutes</p>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-green-100 hover:text-white transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none shadow-sm'
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {message.time}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-left mb-3">
                <div className="inline-block bg-white dark:bg-gray-700 px-3 py-2 rounded-lg rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <form onSubmit={handleChatSubmit} className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white text-sm"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Sarah - Customer Success
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-3 h-3" />
                <Mail className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Info Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-2 px-4 z-30 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>1-800-PRIME-99</span>
            </div>
            <div className="hidden md:flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Find Branch</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-green-400" />
              <span className="text-green-400">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeTrustBank;