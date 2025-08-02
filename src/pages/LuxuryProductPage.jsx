import React, { useState } from 'react';
import { 
  Star, Heart, Shield, Truck, ArrowRight, Plus, Minus, ChevronDown, 
  Search, ShoppingBag, User, Menu, MapPin, Clock, Award, RefreshCw,
  Share2, MessageCircle, ThumbsUp, ChevronLeft, ChevronRight
} from 'lucide-react';

const LuxuryProductPage = () => {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('9');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('New York, NY');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('reviews');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const colors = [
    { name: 'black', value: '#1a1a1a', label: 'Midnight Black' },
    { name: 'white', value: '#f8f9fa', label: 'Pure White' },
    { name: 'red', value: '#dc2626', label: 'Crimson Red' },
    { name: 'blue', value: '#2563eb', label: 'Ocean Blue' }
  ];

  const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];

  const locations = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 
    'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA'
  ];

  const productImages = {
    black: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center'
    ],
    white: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop&crop=center'
    ],
    red: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=600&h=600&fit=crop&crop=center'
    ],
    blue: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=600&fit=crop&crop=center'
    ]
  };

  const reviews = [
    {
      id: 1,
      name: "Alex Chen",
      rating: 5,
      date: "July 28, 2025",
      comment: "Absolutely love these! The quality is incredible and they're so comfortable. Worth every penny.",
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      name: "Jordan Smith",
      rating: 4,
      date: "July 25, 2025",
      comment: "Great sneakers, very stylish. Only complaint is they run slightly small, so size up!",
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      name: "Maya Johnson",
      rating: 5,
      date: "July 22, 2025",
      comment: "These are my new favorite shoes. The design is perfect and they go with everything.",
      helpful: 31,
      verified: true
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productImages[selectedColor].length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages[selectedColor].length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-black">LUXE</div>
              <div className="hidden md:flex space-x-6">
                <button className="text-gray-700 hover:text-black transition-colors font-medium">Men</button>
                <button className="text-gray-700 hover:text-black transition-colors font-medium">Women</button>
                <button className="text-gray-700 hover:text-black transition-colors font-medium">Kids</button>
                <button className="text-gray-700 hover:text-black transition-colors font-medium">Sale</button>
              </div>
            </div>
            
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span>Men</span>
          <ChevronRight className="w-4 h-4" />
          <span>Sneakers</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Urban Elite Pro</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Product Images */}
          <div className="space-y-4">
            <div 
              className="relative bg-gray-50 rounded-2xl aspect-square overflow-hidden cursor-zoom-in group"
              onMouseEnter={() => setImageZoom(true)}
              onMouseLeave={() => setImageZoom(false)}
            >
              <img 
                src={productImages[selectedColor][currentImageIndex]}
                alt="Premium Sneaker"
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  imageZoom ? 'scale-110' : 'scale-100'
                }`}
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {productImages[selectedColor].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                </button>
                <button className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all">
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {productImages[selectedColor].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold">
                  LIMITED EDITION
                </span>
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">4.8 (128 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Urban Elite Pro</h1>
              <p className="text-lg text-gray-600">Premium streetwear sneaker crafted for the modern urban explorer</p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold">$299.00</span>
                <span className="text-xl text-gray-500 line-through">$399.00</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">25% OFF</span>
              </div>
              <p className="text-sm text-gray-600">Or pay in 4 interest-free payments of $74.75</p>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold">Color: {colors.find(c => c.name === selectedColor)?.label}</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setCurrentImageIndex(0);
                    }}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name 
                        ? 'border-black scale-110' 
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Size: US {selectedSize}</h3>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-center rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-semibold text-sm">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 relative">
                <label className="font-semibold text-sm">Delivery to</label>
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-lg hover:border-gray-500 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedLocation}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowLocationDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors text-sm"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-sm">Free Express Delivery</p>
                  <p className="text-xs text-gray-600">Arrives tomorrow by 10 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-sm">Free Returns & Exchanges</p>
                  <p className="text-xs text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-semibold text-sm">Authenticity Guaranteed</p>
                  <p className="text-xs text-gray-600">100% authentic products</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Add to Cart - ${(299 * quantity).toFixed(2)}
              </button>
              <button className="w-full border-2 border-black text-black py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                <p className="text-xs font-semibold">2 Year Warranty</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-1 text-green-600" />
                <p className="text-xs font-semibold">Fast Shipping</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Award className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                <p className="text-xs font-semibold">Premium Quality</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16 border-t pt-16">
          <div className="flex space-x-8 border-b">
            {['reviews', 'details', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-semibold capitalize transition-colors ${
                  activeTab === tab 
                    ? 'border-b-2 border-black text-black' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Customer Reviews</h3>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Write a Review
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl font-bold">4.8</div>
                      <div>
                        <div className="flex mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-600">Based on 128 reviews</p>
                      </div>
                    </div>
                    
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm w-3">{rating}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${rating === 5 ? 70 : rating === 4 ? 25 : 5}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {rating === 5 ? '89' : rating === 4 ? '32' : '7'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold">{review.name}</span>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-gray-700">
                            <ThumbsUp className="w-4 h-4" />
                            <span>Helpful ({review.helpful})</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-gray-700">
                            <MessageCircle className="w-4 h-4" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      {showAllReviews ? 'Show Less' : 'Show All Reviews'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Product Details</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Features</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Premium leather and mesh construction</li>
                      <li>• Advanced cushioning technology</li>
                      <li>• Breathable lining with moisture-wicking properties</li>
                      <li>• Durable rubber outsole with superior grip</li>
                      <li>• Reinforced heel and toe for extra protection</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Specifications</h4>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span>12 oz</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span>Leather, Mesh, Rubber</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Origin:</span>
                        <span>Made in Vietnam</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Care Instructions:</span>
                        <span>Spot clean only</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Shipping & Returns</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Shipping Options</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">Express Delivery</p>
                          <p className="text-sm text-gray-600">1-2 business days</p>
                        </div>
                        <span className="font-semibold text-green-600">FREE</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">Standard Delivery</p>
                          <p className="text-sm text-gray-600">3-5 business days</p>
                        </div>
                        <span className="font-semibold text-green-600">FREE</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">Next Day Delivery</p>
                          <p className="text-sm text-gray-600">Order by 2 PM</p>
                        </div>
                        <span className="font-semibold">$15.99</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Return Policy</h4>
                    <div className="space-y-3 text-gray-700">
                      <p>• Free returns within 30 days of purchase</p>
                      <p>• Items must be unworn and in original packaging</p>
                      <p>• Return shipping is prepaid and free</p>
                      <p>• Refunds processed within 3-5 business days</p>
                      <p>• Exchange for different size or color available</p>
                      <p>• Original receipt or order number required</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t pt-16">
          <h3 className="text-2xl font-bold mb-8">You Might Also Like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="bg-gray-50 rounded-lg aspect-square mb-3 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${1542291026 + item}-7eec264c27ff?w=300&h=300&fit=crop&crop=center`}
                    alt={`Related product ${item}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-semibold mb-1">Urban Elite {item === 1 ? 'Runner' : item === 2 ? 'Classic' : item === 3 ? 'Sport' : 'Limited'}</h4>
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">(45)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">${249 + (item * 50)}</span>
                  {item === 2 && <span className="text-sm text-gray-500 line-through">$349</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Size Guide</h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">US Men's Sizing</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-2 text-left">US Size</th>
                          <th className="border border-gray-300 p-2 text-left">UK Size</th>
                          <th className="border border-gray-300 p-2 text-left">EU Size</th>
                          <th className="border border-gray-300 p-2 text-left">Foot Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizes.map((size, index) => (
                          <tr key={size}>
                            <td className="border border-gray-300 p-2">{size}</td>
                            <td className="border border-gray-300 p-2">{(parseFloat(size) - 0.5).toString()}</td>
                            <td className="border border-gray-300 p-2">{(parseFloat(size) + 32).toString()}</td>
                            <td className="border border-gray-300 p-2">{(25 + index * 0.8).toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">How to Measure Your Foot</h5>
                  <ol className="text-sm text-gray-700 space-y-1">
                    <li>1. Place your foot on a piece of paper</li>
                    <li>2. Mark the longest point of your foot</li>
                    <li>3. Measure the distance in centimeters</li>
                    <li>4. Add 0.5cm for comfort</li>
                    <li>5. Use the chart above to find your size</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Mobile Cart */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={productImages[selectedColor][currentImageIndex]}
              alt="Selected product"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold text-sm">Urban Elite Pro</p>
              <p className="text-xs text-gray-600">{colors.find(c => c.name === selectedColor)?.label} • US {selectedSize}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-bold">${(299 * quantity).toFixed(2)}</p>
              <p className="text-xs text-gray-600">Qty: {quantity}</p>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryProductPage;