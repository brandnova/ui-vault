import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Users, Clock, Check, ChevronLeft, ChevronRight, Star, 
  Moon, Sun, Menu, X, Phone, Mail, MapPin as Location, Wifi, Car, 
  Coffee, Tv, Shield, CreditCard, Gift, Heart, Share2, Bell, Settings,
  Home, Search, User, LogOut, CheckCircle2, Sparkles, Zap, Award
} from 'lucide-react';

const HotelBookingInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDates, setSelectedDates] = useState({ checkIn: null, checkOut: null });
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedRooms, setSavedRooms] = useState(new Set());

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Ocean View',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop'
      ],
      amenities: ['Ocean View', 'King Bed', 'Free WiFi', 'Mini Bar', 'Balcony', 'Room Service'],
      rating: 4.8,
      reviews: 156,
      size: '45 m²',
      maxGuests: 3,
      badges: ['Popular', 'Best Value'],
      description: 'Wake up to breathtaking ocean views in our most popular room featuring a private balcony and premium amenities.'
    },
    {
      id: 2,
      name: 'Premium Suite',
      price: 459,
      originalPrice: 559,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop'
      ],
      amenities: ['City View', '2 Bedrooms', 'Kitchen', 'Balcony', 'Living Room', 'Premium WiFi'],
      rating: 4.9,
      reviews: 89,
      size: '85 m²',
      maxGuests: 6,
      badges: ['Luxury', 'Family Friendly'],
      description: 'Spacious suite perfect for families or extended stays with full kitchen and separate living area.'
    },
    {
      id: 3,
      name: 'Classic Double',
      price: 189,
      originalPrice: 229,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop'
      ],
      amenities: ['Garden View', 'Queen Bed', 'Work Desk', 'Coffee Maker', 'Free WiFi', 'Safe'],
      rating: 4.6,
      reviews: 203,
      size: '28 m²',
      maxGuests: 2,
      badges: ['Budget Friendly', 'Business'],
      description: 'Comfortable and well-appointed room ideal for business travelers or couples seeking quality accommodation.'
    }
  ];

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const toggleSavedRoom = (roomId) => {
    setSavedRooms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roomId)) {
        newSet.delete(roomId);
        addNotification('Room removed from favorites', 'info');
      } else {
        newSet.add(roomId);
        addNotification('Room added to favorites', 'success');
      }
      return newSet;
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateSelected = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const checkIn = selectedDates.checkIn;
    const checkOut = selectedDates.checkOut;
    
    if (!checkIn) return false;
    if (!checkOut) return date.toDateString() === checkIn.toDateString();
    
    return date >= checkIn && date <= checkOut;
  };

  const isDateInRange = (day) => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date > selectedDates.checkIn && date < selectedDates.checkOut;
  };

  const handleDateClick = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (!selectedDates.checkIn || selectingCheckOut) {
      if (!selectedDates.checkIn) {
        setSelectedDates({ checkIn: date, checkOut: null });
        setSelectingCheckOut(true);
        addNotification('Check-in date selected', 'success');
      } else {
        if (date > selectedDates.checkIn) {
          setSelectedDates(prev => ({ ...prev, checkOut: date }));
          setSelectingCheckOut(false);
          addNotification('Check-out date selected', 'success');
          setTimeout(() => setIsDatePickerOpen(false), 300);
        } else {
          setSelectedDates({ checkIn: date, checkOut: null });
        }
      }
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const today = new Date();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isPast = date < today.setHours(0, 0, 0, 0);
      const isSelected = isDateSelected(day);
      const isInRange = isDateInRange(day);
      
      days.push(
        <motion.button
          key={day}
          onClick={() => !isPast && handleDateClick(day)}
          disabled={isPast}
          className={`h-10 w-10 rounded-xl text-sm font-medium transition-all duration-200 relative ${
            isPast 
              ? `text-gray-300 cursor-not-allowed ${darkMode ? 'text-gray-600' : ''}` 
              : isSelected
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
              : isInRange
              ? `bg-blue-100 text-blue-600 ${darkMode ? 'bg-blue-900/30 text-blue-400' : ''}`
              : `hover:bg-gray-100 text-gray-700 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : ''}`
          }`}
          whileHover={!isPast ? { scale: 1.05, y: -2 } : {}}
          whileTap={!isPast ? { scale: 0.95 } : {}}
        >
          {day}
          {isSelected && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}
        </motion.button>
      );
    }

    return days;
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
        if (currentStep === 4) {
          setIsBookingComplete(true);
          addNotification('Booking confirmed successfully!', 'success');
        }
      }, 800);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculateNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const diffTime = selectedDates.checkOut - selectedDates.checkIn;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateSubtotal = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * calculateNights();
  };

  const calculateTaxes = () => {
    return Math.round(calculateSubtotal() * 0.12);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxes();
  };

  const stepVariants = {
    enter: { opacity: 0, x: 50, scale: 0.95 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.95 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const themeClasses = darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50';
  const cardClasses = darkMode 
    ? 'bg-gray-800 border-gray-700 text-white' 
    : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -50, x: 50 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm ${
              notification.type === 'success' ? 'bg-green-500/90 text-white' :
              notification.type === 'error' ? 'bg-red-500/90 text-white' :
              'bg-blue-500/90 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === 'success' && <CheckCircle2 size={16} />}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${
          darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Home className="text-white" size={20} />
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                LuxeStay
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-1">
                {['Home', 'Rooms', 'About', 'Contact'].map((item) => (
                  <motion.button
                    key={item}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </nav>
              
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-3 rounded-xl transition-all ${
                    darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
                
                <motion.button
                  className="relative p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </motion.button>
                
                <motion.button
                  className={`p-3 rounded-xl transition-all ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <User size={18} />
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className={`md:hidden p-2 rounded-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="px-4 py-4 space-y-2">
                {['Home', 'Rooms', 'About', 'Contact'].map((item) => (
                  <motion.button
                    key={item}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.button>
                ))}
                <div className="flex items-center gap-3 pt-4">
                  <motion.button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-3 rounded-xl transition-all ${
                      darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.button>
                  <motion.button
                    className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    <User size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.h1 
            className={`text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Book Your Perfect Stay
          </motion.h1>
          <motion.p 
            className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Experience luxury and comfort like never before
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="flex items-center justify-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { step: 1, icon: Calendar, label: 'Dates' },
            { step: 2, icon: MapPin, label: 'Room' },
            { step: 3, icon: Users, label: 'Details' },
            { step: 4, icon: CreditCard, label: 'Payment' },
            { step: 5, icon: CheckCircle2, label: 'Complete' }
          ].map(({ step, icon: Icon, label }, index) => (
            <React.Fragment key={step}>
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-all duration-300 ${
                    step <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                      : darkMode 
                      ? 'bg-gray-700 text-gray-400' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  animate={{ 
                    scale: step === currentStep ? 1.1 : 1,
                    rotate: step < currentStep ? 360 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step < currentStep ? <Check size={16} /> : <Icon size={16} />}
                </motion.div>
                <span className={`text-xs font-medium ${
                  step <= currentStep 
                    ? darkMode ? 'text-white' : 'text-gray-900'
                    : darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {label}
                </span>
              </motion.div>
              {index < 4 && (
                <motion.div 
                  className={`w-16 h-1 mx-4 rounded-full transition-all duration-500 ${
                    step < currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                  variants={itemVariants}
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className={`rounded-3xl shadow-2xl p-8 backdrop-blur-sm border transition-all duration-500 ${cardClasses}`}
          layout
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                className="flex items-center justify-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                    Processing...
                  </span>
                </div>
              </motion.div>
            )}

            {!isLoading && currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, type: "spring" }}
              >
                <motion.h2 
                  className={`text-3xl font-bold mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Calendar className="mr-4 text-blue-500" size={32} />
                  When would you like to stay?
                </motion.h2>
                
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Check-in & Check-out Dates
                    </label>
                    <motion.button
                      onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                      className={`w-full p-6 border-2 rounded-2xl transition-all duration-300 text-left group ${
                        isDatePickerOpen 
                          ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10' 
                          : darkMode
                          ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Check-in
                          </div>
                          <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {formatDate(selectedDates.checkIn)}
                          </div>
                        </div>
                        <motion.div 
                          className="px-4"
                          animate={{ x: isDatePickerOpen ? 5 : 0 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <ChevronRight className="text-white" size={16} />
                          </div>
                        </motion.div>
                        <div className="flex-1">
                          <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Check-out
                          </div>
                          <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {formatDate(selectedDates.checkOut)}
                          </div>
                        </div>
                      </div>
                      {selectedDates.checkIn && selectedDates.checkOut && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-gray-200 text-center"
                        >
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            <Clock size={14} />
                            {calculateNights()} nights
                          </span>
                        </motion.div>
                      )}
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Guests
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { key: 'adults', label: 'Adults', min: 1 },
                        { key: 'children', label: 'Children', min: 0 }
                      ].map(({ key, label, min }) => (
                        <motion.div
                          key={key}
                          className={`p-4 border-2 rounded-2xl transition-all ${
                            darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {label}
                          </div>
                          <div className="flex items-center justify-center gap-4">
                            <motion.button
                              onClick={() => setGuests(prev => ({ 
                                ...prev, 
                                [key]: Math.max(min, prev[key] - 1) 
                              }))}
                              className={`w-10 h-10 rounded-full transition-all ${
                                guests[key] === min 
                                  ? darkMode ? 'bg-gray-600 text-gray-500' : 'bg-gray-100 text-gray-400'
                                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                              }`}
                              disabled={guests[key] === min}
                              whileHover={guests[key] > min ? { scale: 1.1 } : {}}
                              whileTap={guests[key] > min ? { scale: 0.9 } : {}}
                            >
                              -
                            </motion.button>
                            <motion.span 
                              className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
                              key={guests[key]}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                            >
                              {guests[key]}
                            </motion.span>
                            <motion.button
                              onClick={() => setGuests(prev => ({ 
                                ...prev, 
                                [key]: prev[key] + 1 
                              }))}
                              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              +
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isDatePickerOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      className={`border-2 rounded-2xl p-6 mb-8 backdrop-blur-sm ${
                        darkMode ? 'bg-gray-800/50 border-gray-600' : 'bg-white/80 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <motion.button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                          className={`p-3 rounded-xl transition-all ${
                            darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                          }`}
                          whileHover={{ scale: 1.1, x: -2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeft size={20} />
                        </motion.button>
                        <motion.h3 
                          className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
                          key={currentMonth.getMonth()}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </motion.h3>
                        <motion.button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                          className={`p-3 rounded-xl transition-all ${
                            darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                          }`}
                          whileHover={{ scale: 1.1, x: 2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronRight size={20} />
                        </motion.button>
                      </div>
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                          <div key={day} className={`h-10 flex items-center justify-center text-sm font-semibold ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {renderCalendar()}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {!isLoading && currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, type: "spring" }}
              >
                <motion.h2 
                  className={`text-3xl font-bold mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <MapPin className="mr-4 text-blue-500" size={32} />
                  Choose Your Perfect Room
                </motion.h2>
                
                <div className="space-y-6">
                  {rooms.map((room, index) => (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setSelectedRoom(room);
                        addNotification(`${room.name} selected`, 'success');
                      }}
                      onMouseEnter={() => setHoveredRoom(room.id)}
                      onMouseLeave={() => setHoveredRoom(null)}
                      className={`relative border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group ${
                        selectedRoom?.id === room.id 
                          ? 'border-blue-500 shadow-2xl shadow-blue-500/20 scale-[1.02]' 
                          : darkMode 
                          ? 'border-gray-600 hover:border-gray-500 hover:shadow-xl' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                      }`}
                      whileHover={{ y: -5 }}
                    >
                      {selectedRoom?.id === room.id && (
                        <motion.div
                          className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Check size={16} className="inline mr-1" />
                          Selected
                        </motion.div>
                      )}
                      
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavedRoom(room.id);
                        }}
                        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all ${
                          savedRooms.has(room.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/80 text-gray-600 hover:bg-white'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={16} className={savedRooms.has(room.id) ? 'fill-current' : ''} />
                      </motion.button>

                      <div className="flex flex-col lg:flex-row">
                        <div className="relative lg:w-80 h-64 lg:h-auto overflow-hidden">
                          <motion.img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                          />
                          <div className="absolute bottom-4 left-4 flex gap-2">
                            {room.badges.map((badge, idx) => (
                              <motion.span
                                key={badge}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                                  badge === 'Popular' ? 'bg-orange-500/90 text-white' :
                                  badge === 'Luxury' ? 'bg-purple-500/90 text-white' :
                                  badge === 'Best Value' ? 'bg-green-500/90 text-white' :
                                  'bg-blue-500/90 text-white'
                                }`}
                              >
                                {badge}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {room.name}
                              </h3>
                              <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {room.description}
                              </p>
                              <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1">
                                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {room.rating}
                                  </span>
                                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    ({room.reviews} reviews)
                                  </span>
                                </div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {room.size} • Up to {room.maxGuests} guests
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-lg line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                  ${room.originalPrice}
                                </span>
                                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                                  25% OFF
                                </span>
                              </div>
                              <div className="text-3xl font-bold text-blue-600 mb-1">
                                ${room.price}
                              </div>
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                per night
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                            {room.amenities.map((amenity, idx) => (
                              <motion.div
                                key={amenity}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + idx * 0.05 }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {amenity === 'WiFi' || amenity === 'Free WiFi' || amenity === 'Premium WiFi' ? <Wifi size={14} /> :
                                 amenity === 'Parking' ? <Car size={14} /> :
                                 amenity === 'Coffee Maker' ? <Coffee size={14} /> :
                                 amenity === 'TV' ? <Tv size={14} /> :
                                 <Check size={14} />}
                                {amenity}
                              </motion.div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <motion.button
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Share2 size={16} />
                              Share
                            </motion.button>
                            
                            {calculateNights() > 0 && (
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`text-right ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                              >
                                <div className="text-sm">Total for {calculateNights()} nights</div>
                                <div className="text-xl font-bold text-blue-600">
                                  ${room.price * calculateNights()}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {!isLoading && currentStep === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, type: "spring" }}
              >
                <motion.h2 
                  className={`text-3xl font-bold mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Users className="mr-4 text-blue-500" size={32} />
                  Guest Information
                </motion.h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'firstName', label: 'First Name', type: 'text', icon: User },
                        { key: 'lastName', label: 'Last Name', type: 'text', icon: User },
                        { key: 'email', label: 'Email Address', type: 'email', icon: Mail },
                        { key: 'phone', label: 'Phone Number', type: 'tel', icon: Phone }
                      ].map(({ key, label, type, icon: Icon }, index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {label}
                          </label>
                          <div className="relative">
                            <Icon className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} size={18} />
                            <motion.input
                              type={type}
                              value={personalInfo[key]}
                              onChange={(e) => setPersonalInfo(prev => ({ ...prev, [key]: e.target.value }))}
                              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-200 ${
                                darkMode 
                                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:bg-gray-600' 
                                  : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                              } focus:ring-2 focus:ring-blue-500/20`}
                              placeholder={`Enter your ${label.toLowerCase()}`}
                              whileFocus={{ scale: 1.02 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Special Requests
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Additional Notes
                      </label>
                      <motion.textarea
                        value={personalInfo.specialRequests}
                        onChange={(e) => setPersonalInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
                        rows={4}
                        className={`w-full p-4 border-2 rounded-xl transition-all duration-200 resize-none ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:bg-gray-600' 
                            : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                        } focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Any special requests or preferences..."
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6"
                    >
                      <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Booking Summary
                      </h4>
                      <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        {selectedRoom && (
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Room:</span>
                              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {selectedRoom.name}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Dates:</span>
                              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {formatDate(selectedDates.checkIn)} - {formatDate(selectedDates.checkOut)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Guests:</span>
                              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {guests.adults} adults, {guests.children} children
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Nights:</span>
                              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {calculateNights()}
                              </span>
                            </div>
                            <div className="border-t pt-3 mt-3">
                              <div className="flex justify-between text-lg font-bold">
                                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Total:</span>
                                <span className="text-blue-600">${calculateSubtotal()}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {!isLoading && currentStep === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, type: "spring" }}
              >
                <motion.h2 
                  className={`text-3xl font-bold mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <CreditCard className="mr-4 text-blue-500" size={32} />
                  Secure Payment
                </motion.h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="text-green-500" size={20} />
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Your payment is secured with 256-bit SSL encryption
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { key: 'cardNumber', label: 'Card Number', type: 'text', placeholder: '1234 5678 9012 3456' },
                        { key: 'cardName', label: 'Cardholder Name', type: 'text', placeholder: 'John Doe' }
                      ].map(({ key, label, type, placeholder }, index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {label}
                          </label>
                          <motion.input
                            type={type}
                            value={paymentInfo[key]}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, [key]: e.target.value }))}
                            className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:bg-gray-600' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                            } focus:ring-2 focus:ring-blue-500/20`}
                            placeholder={placeholder}
                            whileFocus={{ scale: 1.02 }}
                          />
                        </motion.div>
                      ))}
                      
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { key: 'expiryDate', label: 'Expiry Date', placeholder: 'MM/YY' },
                          { key: 'cvv', label: 'CVV', placeholder: '123' }
                        ].map(({ key, label, placeholder }, index) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {label}
                            </label>
                            <motion.input
                              type="text"
                              value={paymentInfo[key]}
                              onChange={(e) => setPaymentInfo(prev => ({ ...prev, [key]: e.target.value }))}
                              className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${
                                darkMode 
                                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:bg-gray-600' 
                                  : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                              } focus:ring-2 focus:ring-blue-500/20`}
                              placeholder={placeholder}
                              whileFocus={{ scale: 1.02 }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Booking Summary
                      </h3>
                      
                      {selectedRoom && (
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <img
                              src={selectedRoom.image}
                              alt={selectedRoom.name}
                              className="w-20 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {selectedRoom.name}
                              </h4>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {formatDate(selectedDates.checkIn)} - {formatDate(selectedDates.checkOut)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                ${selectedRoom.price} x {calculateNights()} nights
                              </span>
                              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                ${calculateSubtotal()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                Taxes & Fees
                              </span>
                              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                ${calculateTaxes()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                Discount
                              </span>
                              <span className="text-green-500 font-medium">
                                -${selectedRoom.originalPrice * calculateNights() - calculateSubtotal()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between text-lg font-bold">
                              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                              <span className="text-blue-600">${calculateTotal()}</span>
                            </div>
                          </div>
                          
                          <motion.div
                            className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                              darkMode ? 'bg-gray-600' : 'bg-blue-50'
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Gift className="text-blue-500" size={20} />
                            <div>
                              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                You're saving ${selectedRoom.originalPrice * calculateNights() - calculateSubtotal()}
                              </p>
                              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Special discount applied to your booking
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    
                    <motion.div
                      className={`mt-6 p-4 rounded-xl ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-2 border-gray-300 focus:ring-blue-500"
                        />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          I agree to the terms and conditions and privacy policy
                        </span>
                      </label>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {!isLoading && currentStep === 5 && (
              <motion.div
                key="step5"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, type: "spring" }}
                className="text-center py-12"
              >
                <motion.div
                  className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Check className="text-white" size={48} />
                </motion.div>
                
                <motion.h2 
                  className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Booking Confirmed!
                </motion.h2>
                
                <motion.p
                  className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Thank you for choosing LuxeStay
                </motion.p>
                
                <motion.div
                  className={`p-6 rounded-2xl max-w-md mx-auto mb-8 text-left ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="text-yellow-500" size={24} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Booking Details
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Confirmation #:</span>
                      <span className={`font-mono font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {Math.random().toString(36).substring(2, 10).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Room:</span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedRoom?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Dates:</span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {formatDate(selectedDates.checkIn)} - {formatDate(selectedDates.checkOut)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Guests:</span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {guests.adults} adults, {guests.children} children
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Total Paid:</span>
                      <span className="text-green-500 font-bold">${calculateTotal()}</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button
                    className={`px-6 py-4 rounded-xl transition-all flex items-center gap-2 ${
                      darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 size={18} />
                    Share Booking
                  </motion.button>
                  <motion.button
                    className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Home size={18} />
                    Back to Home
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 5 && !isLoading && (
            <motion.div
              className="flex justify-between mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 ${
                  currentStep === 1 
                    ? darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
                whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
              >
                <ChevronLeft size={18} />
                Back
              </motion.button>
              
              <motion.button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!selectedDates.checkIn || !selectedDates.checkOut)) ||
                  (currentStep === 2 && !selectedRoom) ||
                  (currentStep === 3 && (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phone)) ||
                  (currentStep === 4 && (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv))
                }
                className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 ${
                  (currentStep === 1 && (!selectedDates.checkIn || !selectedDates.checkOut)) ||
                  (currentStep === 2 && !selectedRoom) ||
                  (currentStep === 3 && (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phone)) ||
                  (currentStep === 4 && (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv))
                    ? darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                }`}
                whileHover={
                  ((currentStep === 1 && (!selectedDates.checkIn || !selectedDates.checkOut)) ||
                  (currentStep === 2 && !selectedRoom) ||
                  (currentStep === 3 && (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phone)) ||
                  (currentStep === 4 && (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv)))
                    ? {}
                    : { scale: 1.05 }
                }
                whileTap={
                  !((currentStep === 1 && (!selectedDates.checkIn || !selectedDates.checkOut)) ||
                  (currentStep === 2 && !selectedRoom) ||
                  (currentStep === 3 && (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phone)) ||
                  (currentStep === 4 && (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv)))
                    ? { scale: 0.95 }
                    : {}
                }
              >
                {currentStep === 4 ? 'Confirm Booking' : 'Continue'}
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer 
        className={`py-8 border-t transition-all duration-500 ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                LuxeStay
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Experience luxury and comfort like never before at our premium hotels worldwide.
              </p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h3>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {['Home', 'Rooms', 'About Us', 'Contact'].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                  >
                    <a href="#" className="hover:underline">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact
              </h3>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="flex items-center gap-2">
                  <Phone size={14} />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} />
                  info@luxestay.com
                </li>
                <li className="flex items-center gap-2">
                  <Location size={14} />
                  123 Luxury Ave, Suite 100
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Newsletter
              </h3>
              <div className="flex gap-2">
                <motion.input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
          <div className={`mt-8 pt-8 border-t text-sm text-center ${
            darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-600'
          }`}>
            © {new Date().getFullYear()} LuxeStay. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default HotelBookingInterface;