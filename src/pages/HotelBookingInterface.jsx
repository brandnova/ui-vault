import React, { useState, useEffect } from 'react';
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
      days.push(<div key={`empty-${i}`} className="h-8 sm:h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isPast = date < today.setHours(0, 0, 0, 0);
      const isSelected = isDateSelected(day);
      const isInRange = isDateInRange(day);
      
      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateClick(day)}
          disabled={isPast}
          className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 relative ${
            isPast 
              ? `text-gray-300 cursor-not-allowed ${darkMode ? 'text-gray-600' : ''}` 
              : isSelected
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
              : isInRange
              ? `bg-blue-100 text-blue-600 ${darkMode ? 'bg-blue-900/30 text-blue-400' : ''}`
              : `hover:bg-gray-100 text-gray-700 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : ''}`
          }`}
        >
          {day}
        </button>
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

  const themeClasses = darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50';
  const cardClasses = darkMode 
    ? 'bg-gray-800 border-gray-700 text-white' 
    : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      {/* Notifications - Mobile Optimized */}
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`fixed top-2 left-2 right-2 sm:top-4 sm:right-4 sm:left-auto z-50 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-500/90 text-white' :
            notification.type === 'error' ? 'bg-red-500/90 text-white' :
            'bg-blue-500/90 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' && <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />}
            <span className="text-xs sm:text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      ))}

      {/* Navigation - Mobile Optimized */}
      <nav 
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${
          darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform duration-200">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Home className="text-white" size={16} />
              </div>
              <span className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                LuxeStay
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-1">
                {['Home', 'Rooms', 'About', 'Contact'].map((item) => (
                  <button
                    key={item}
                    className={`px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                      darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-3 rounded-xl transition-all hover:scale-110 ${
                    darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                
                <button
                  className="relative p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-110 transition-transform"
                >
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                <button
                  className={`p-3 rounded-xl transition-all hover:scale-110 ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <User size={18} />
                </button>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all ${
                  darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              
              <button
                className={`p-2 rounded-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden border-t transition-all duration-300 overflow-hidden ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <div className="px-3 py-3 space-y-1">
              {['Home', 'Rooms', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                    darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                  <User size={16} />
                </button>
                <button
                  className="relative p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                  <Bell size={16} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
            Book Your Perfect Stay
          </h1>
          <p className={`text-sm sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Experience luxury and comfort like never before
          </p>
        </div>

        {/* Progress Bar - Mobile Optimized */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto pb-2">
          <div className="flex items-center min-w-max px-4">
            {[
              { step: 1, icon: Calendar, label: 'Dates' },
              { step: 2, icon: MapPin, label: 'Room' },
              { step: 3, icon: Users, label: 'Details' },
              { step: 4, icon: CreditCard, label: 'Payment' },
              { step: 5, icon: CheckCircle2, label: 'Complete' }
            ].map(({ step, icon: Icon, label }, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium mb-1 sm:mb-2 transition-all duration-300 ${
                      step <= currentStep 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                        : darkMode 
                        ? 'bg-gray-700 text-gray-400' 
                        : 'bg-gray-200 text-gray-500'
                    } ${step === currentStep ? 'scale-110' : ''}`}
                  >
                    {step < currentStep ? <Check size={12} className="sm:w-4 sm:h-4" /> : <Icon size={12} className="sm:w-4 sm:h-4" />}
                  </div>
                  <span className={`text-xs font-medium ${
                    step <= currentStep 
                      ? darkMode ? 'text-white' : 'text-gray-900'
                      : darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                </div>
                {index < 4 && (
                  <div 
                    className={`w-8 sm:w-16 h-1 mx-2 sm:mx-4 rounded-full transition-all duration-500 ${
                      step < currentStep 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                        : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content - Mobile Optimized */}
        <div 
          className={`rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 backdrop-blur-sm border transition-all duration-500 ${cardClasses}`}
        >
          {isLoading && (
            <div className="flex items-center justify-center py-12 sm:py-20">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin" />
                <span className={`text-base sm:text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  Processing...
                </span>
              </div>
            </div>
          )}

          {!isLoading && currentStep === 1 && (
            <div key="step1">
              <h2 className={`text-xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Calendar className="mr-2 sm:mr-4 text-blue-500" size={24} />
                When would you like to stay?
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Check-in & Check-out Dates
                  </label>
                  <button
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className={`w-full p-4 sm:p-6 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 text-left group hover:scale-[1.02] hover:-translate-y-0.5 ${
                      isDatePickerOpen 
                        ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10' 
                        : darkMode
                        ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className={`text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Check-in
                        </div>
                        <div className={`text-sm sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {formatDate(selectedDates.checkIn)}
                        </div>
                      </div>
                      <div className={`px-2 sm:px-4 transition-transform ${isDatePickerOpen ? 'translate-x-1' : ''}`}>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <ChevronRight className="text-white" size={14} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Check-out
                        </div>
                        <div className={`text-sm sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {formatDate(selectedDates.checkOut)}
                        </div>
                      </div>
                    </div>
                    {selectedDates.checkIn && selectedDates.checkOut && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 text-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                          <Clock size={12} className="sm:w-4 sm:h-4" />
                          {calculateNights()} nights
                        </span>
                      </div>
                    )}
                  </button>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Guests
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { key: 'adults', label: 'Adults', min: 1 },
                      { key: 'children', label: 'Children', min: 0 }
                    ].map(({ key, label, min }) => (
                      <div
                        key={key}
                        className={`p-3 sm:p-4 border-2 rounded-xl sm:rounded-2xl transition-all hover:scale-[1.02] ${
                          darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {label}
                        </div>
                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                          <button
                            onClick={() => setGuests(prev => ({ 
                              ...prev, 
                              [key]: Math.max(min, prev[key] - 1) 
                            }))}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all text-sm sm:text-base ${
                              guests[key] === min 
                                ? darkMode ? 'bg-gray-600 text-gray-500' : 'bg-gray-100 text-gray-400'
                                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-110'
                            }`}
                            disabled={guests[key] === min}
                          >
                            -
                          </button>
                          <span className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {guests[key]}
                          </span>
                          <button
                            onClick={() => setGuests(prev => ({ 
                              ...prev, 
                              [key]: prev[key] + 1 
                            }))}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all hover:scale-110 text-sm sm:text-base"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {isDatePickerOpen && (
                <div
                  className={`border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-sm transition-all duration-300 ${
                    darkMode ? 'bg-gray-800/50 border-gray-600' : 'bg-white/80 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all hover:scale-110 ${
                        darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                    </button>
                    <h3 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all hover:scale-110 ${
                        darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className={`h-8 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-semibold ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {renderCalendar()}
                  </div>
                </div>
              )}
            </div>
          )}

          {!isLoading && currentStep === 2 && (
            <div key="step2">
              <h2 className={`text-xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <MapPin className="mr-2 sm:mr-4 text-blue-500" size={24} />
                Choose Your Perfect Room
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                {rooms.map((room, index) => (
                  <div
                    key={room.id}
                    onClick={() => {
                      setSelectedRoom(room);
                      addNotification(`${room.name} selected`, 'success');
                    }}
                    onMouseEnter={() => setHoveredRoom(room.id)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    className={`relative border-2 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group hover:-translate-y-1 ${
                      selectedRoom?.id === room.id 
                        ? 'border-blue-500 shadow-2xl shadow-blue-500/20 scale-[1.02]' 
                        : darkMode 
                        ? 'border-gray-600 hover:border-gray-500 hover:shadow-xl' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                    }`}
                  >
                    {selectedRoom?.id === room.id && (
                      <div
                        className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        <Check size={12} className="inline mr-1 sm:w-4 sm:h-4" />
                        Selected
                      </div>
                    )}
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSavedRoom(room.id);
                      }}
                      className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 ${
                        savedRooms.has(room.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/80 text-gray-600 hover:bg-white'
                      }`}
                    >
                      <Heart size={14} className={`sm:w-4 sm:h-4 ${savedRooms.has(room.id) ? 'fill-current' : ''}`} />
                    </button>

                    <div className="flex flex-col">
                      <div className="relative h-48 sm:h-64 lg:h-auto lg:w-80 overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex gap-1 sm:gap-2">
                          {room.badges.map((badge, idx) => (
                            <span
                              key={badge}
                              className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                                badge === 'Popular' ? 'bg-orange-500/90 text-white' :
                                badge === 'Luxury' ? 'bg-purple-500/90 text-white' :
                                badge === 'Best Value' ? 'bg-green-500/90 text-white' :
                                'bg-blue-500/90 text-white'
                              }`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-1 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3 sm:gap-0">
                          <div className="flex-1">
                            <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {room.name}
                            </h3>
                            <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {room.description}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                                <span className={`font-semibold text-sm sm:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {room.rating}
                                </span>
                                <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  ({room.reviews} reviews)
                                </span>
                              </div>
                              <div className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {room.size} • Up to {room.maxGuests} guests
                              </div>
                            </div>
                          </div>
                          <div className="text-right sm:text-right">
                            <div className="flex items-center justify-end gap-2 mb-1">
                              <span className={`text-sm sm:text-lg line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                ${room.originalPrice}
                              </span>
                              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                                25% OFF
                              </span>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                              ${room.price}
                            </div>
                            <div className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              per night
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                          {room.amenities.map((amenity, idx) => (
                            <div
                              key={amenity}
                              className={`flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm ${
                                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {amenity === 'WiFi' || amenity === 'Free WiFi' || amenity === 'Premium WiFi' ? <Wifi size={12} className="sm:w-4 sm:h-4" /> :
                               amenity === 'Parking' ? <Car size={12} className="sm:w-4 sm:h-4" /> :
                               amenity === 'Coffee Maker' ? <Coffee size={12} className="sm:w-4 sm:h-4" /> :
                               amenity === 'TV' ? <Tv size={12} className="sm:w-4 sm:h-4" /> :
                               <Check size={12} className="sm:w-4 sm:h-4" />}
                              <span className="truncate">{amenity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <button
                            className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                              darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            <Share2 size={14} className="sm:w-4 sm:h-4" />
                            Share
                          </button>
                          
                          {calculateNights() > 0 && (
                            <div className={`text-center sm:text-right ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <div className="text-xs sm:text-sm">Total for {calculateNights()} nights</div>
                              <div className="text-lg sm:text-xl font-bold text-blue-600">
                                ${room.price * calculateNights()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && currentStep === 3 && (
            <div key="step3">
              <h2 className={`text-xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Users className="mr-2 sm:mr-4 text-blue-500" size={24} />
                Guest Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Contact Details
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'firstName', label: 'First Name', type: 'text', icon: User },
                      { key: 'lastName', label: 'Last Name', type: 'text', icon: User },
                      { key: 'email', label: 'Email Address', type: 'email', icon: Mail },
                      { key: 'phone', label: 'Phone Number', type: 'tel', icon: Phone }
                    ].map(({ key, label, type, icon: Icon }, index) => (
                      <div key={key}>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {label}
                        </label>
                        <div className="relative">
                          <Icon className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} size={16} />
                          <input
                            type={type}
                            value={personalInfo[key]}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, [key]: e.target.value }))}
                            className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 rounded-xl transition-all duration-200 focus:scale-[1.02] ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:bg-gray-600' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                            } focus:ring-2 focus:ring-blue-500/20`}
                            placeholder={`Enter your ${label.toLowerCase()}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Special Requests
                  </h3>
                  <div className="mb-6">
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Additional Notes
                    </label>
                    <textarea
                      value={personalInfo.specialRequests}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
                      rows={4}
                      className={`w-full p-3 sm:p-4 border-2 rounded-xl transition-all duration-200 resize-none focus:scale-[1.02] ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:bg-gray-600' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                      } focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Any special requests or preferences..."
                    />
                  </div>

                  <div>
                    <h4 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Booking Summary
                    </h4>
                    <div className={`p-3 sm:p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      {selectedRoom && (
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex justify-between items-start">
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Room:</span>
                            <span className={`font-medium text-sm text-right ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {selectedRoom.name}
                            </span>
                          </div>
                          <div className="flex justify-between items-start">
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Dates:</span>
                            <span className={`font-medium text-sm text-right ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {formatDate(selectedDates.checkIn)} - {formatDate(selectedDates.checkOut)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Guests:</span>
                            <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {guests.adults} adults, {guests.children} children
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nights:</span>
                            <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {calculateNights()}
                            </span>
                          </div>
                          <div className="border-t pt-2 sm:pt-3 mt-2 sm:mt-3">
                            <div className="flex justify-between text-base sm:text-lg font-bold">
                              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Total:</span>
                              <span className="text-blue-600">${calculateSubtotal()}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isLoading && currentStep === 4 && (
            <div key="step4">
              <h2 className={`text-xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <CreditCard className="mr-2 sm:mr-4 text-blue-500" size={24} />
                Secure Payment
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <Shield className="text-green-500 sm:w-5 sm:h-5" size={16} />
                    <span className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Your payment is secured with 256-bit SSL encryption
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'cardNumber', label: 'Card Number', type: 'text', placeholder: '1234 5678 9012 3456' },
                      { key: 'cardName', label: 'Cardholder Name', type: 'text', placeholder: 'John Doe' }
                    ].map(({ key, label, type, placeholder }, index) => (
                      <div key={key}>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {label}
                        </label>
                        <input
                          type={type}
                          value={paymentInfo[key]}
                          onChange={(e) => setPaymentInfo(prev => ({ ...prev, [key]: e.target.value }))}
                          className={`w-full p-3 sm:p-4 border-2 rounded-xl transition-all duration-200 focus:scale-[1.02] ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:bg-gray-600' 
                              : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                          } focus:ring-2 focus:ring-blue-500/20`}
                          placeholder={placeholder}
                        />
                      </div>
                    ))}
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {[
                        { key: 'expiryDate', label: 'Expiry Date', placeholder: 'MM/YY' },
                        { key: 'cvv', label: 'CVV', placeholder: '123' }
                      ].map(({ key, label, placeholder }, index) => (
                        <div key={key}>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {label}
                          </label>
                          <input
                            type="text"
                            value={paymentInfo[key]}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, [key]: e.target.value }))}
                            className={`w-full p-3 sm:p-4 border-2 rounded-xl transition-all duration-200 focus:scale-[1.02] ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:bg-gray-600' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                            } focus:ring-2 focus:ring-blue-500/20`}
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Booking Summary
                    </h3>
                    
                    {selectedRoom && (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex gap-3 sm:gap-4">
                          <img
                            src={selectedRoom.image}
                            alt={selectedRoom.name}
                            className="w-16 h-12 sm:w-20 sm:h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className={`font-semibold text-sm sm:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {selectedRoom.name}
                            </h4>
                            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
                        
                        <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
                          <div className="flex justify-between text-base sm:text-lg font-bold">
                            <span className={darkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                            <span className="text-blue-600">${calculateTotal()}</span>
                          </div>
                        </div>
                        
                        <div
                          className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl flex items-center gap-2 sm:gap-3 ${
                            darkMode ? 'bg-gray-600' : 'bg-blue-50'
                          }`}
                        >
                          <Gift className="text-blue-500 flex-shrink-0 sm:w-5 sm:h-5" size={16} />
                          <div>
                            <p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              You're saving ${selectedRoom.originalPrice * calculateNights() - calculateSubtotal()}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              Special discount applied to your booking
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div
                    className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-gray-300 focus:ring-blue-500 mt-0.5 flex-shrink-0"
                      />
                      <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        I agree to the terms and conditions and privacy policy
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isLoading && currentStep === 5 && (
            <div key="step5" className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <Check className="text-white" size={32} />
              </div>
              
              <h2 className={`text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Booking Confirmed!
              </h2>
              
              <p className={`text-lg sm:text-xl mb-6 sm:mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Thank you for choosing LuxeStay
              </p>
              
              <div
                className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl max-w-md mx-auto mb-6 sm:mb-8 text-left ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Award className="text-yellow-500" size={20} />
                  <h3 className={`text-lg sm:text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Booking Details
                  </h3>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-start">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Confirmation #:</span>
                    <span className={`font-mono font-medium text-sm text-right ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Room:</span>
                    <span className={`font-medium text-sm text-right ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedRoom?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Dates:</span>
                    <span className={`font-medium text-sm text-right ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatDate(selectedDates.checkIn)} - {formatDate(selectedDates.checkOut)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Guests:</span>
                    <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {guests.adults} adults, {guests.children} children
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Paid:</span>
                    <span className="text-green-500 font-bold text-sm">${calculateTotal()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <button
                  className={`px-4 py-3 sm:px-6 sm:py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 ${
                    darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Share2 size={16} />
                  Share Booking
                </button>
                <button
                  className="px-4 py-3 sm:px-6 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Home size={16} />
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Mobile Optimized */}
          {currentStep < 5 && !isLoading && (
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-4 py-3 sm:px-6 sm:py-3 rounded-xl transition-all flex items-center justify-center gap-2 order-2 sm:order-1 ${
                  currentStep === 1 
                    ? darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600 hover:scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                <ChevronLeft size={16} />
                Back
              </button>
              
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!selectedDates.checkIn || !selectedDates.checkOut)) ||
                  (currentStep === 2 && !selectedRoom) ||
                  (currentStep === 3 && (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phone)) ||
                  (currentStep === 4 && (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv))
                }
                className={`px-4 py-3 sm:px-6 sm:py-3 rounded-xl transition-all flex items-center justify-center gap-2 order-1 sm:order-2 ${
                  (currentStep === 1 && (!selectedDates.checkIn || !selectedDates.checkOut)) ||
                  (currentStep === 2 && !selectedRoom) ||
                  (currentStep === 3 && (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phone)) ||
                  (currentStep === 4 && (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv))
                    ? darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {currentStep === 4 ? 'Confirm Booking' : 'Continue'}
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Mobile Optimized */}
      <footer 
        className={`py-6 sm:py-8 border-t transition-all duration-500 ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className={`text-lg font-semibold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                LuxeStay
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Experience luxury and comfort like never before at our premium hotels worldwide.
              </p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h3>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {['Home', 'Rooms', 'About Us', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:underline hover:translate-x-1 transition-transform inline-block">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact
              </h3>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="flex items-center gap-2">
                  <Phone size={12} className="flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={12} className="flex-shrink-0" />
                  <span>info@luxestay.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Location size={12} className="flex-shrink-0" />
                  <span>123 Luxury Ave, Suite 100</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Newsletter
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border transition-all focus:scale-[1.02] text-sm ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
                <button
                  className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 transition-transform text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className={`mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-xs sm:text-sm text-center ${
            darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-600'
          }`}>
            © {new Date().getFullYear()} LuxeStay. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HotelBookingInterface;