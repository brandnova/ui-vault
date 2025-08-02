import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

// Import your page components
import AboutUs from './pages/AboutUs';
import CryptoWallet from './pages/CryptoWallet';
import FreelanceRateCalculator from './pages/FreelanceRateCalculator';
import HotelBookingInterface from './pages/HotelBookingInterface';
import JSONFormatter from './pages/JSONFormatter';
import LandingPage from './pages/LandingPage';
import LuxuryProductPage from './pages/LuxuryProductPage';
import Portfolio from './pages/Portfolio';
import TaskFlowDashboard from './pages/TaskFlowDashboard';
import TradingDashboard from './pages/TradingDashboard';
import UUIDGenerator from './pages/UUIDGenerator';

// Import our new components
import HomePage from './components/HomePage';
import FloatingControls from './components/FloatingControls';

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [showcaseMode, setShowcaseMode] = useState(false);
  const appRef = useRef(null);

  // Interface Registry - Maps your component files to metadata
  const interfaces = [
    {
      id: 'about-us',
      component: AboutUs,
      title: 'About Us Page'
    },
    {
      id: 'crypto-wallet',
      component: CryptoWallet,
      title: 'Crypto Wallet'
    },
    {
      id: 'freelance-rate-calculator',
      component: FreelanceRateCalculator,
      title: 'Freelance Rate Calculator'
    },
    {
      id: 'hotel-booking-interface',
      component: HotelBookingInterface,
      title: 'Hotel Booking Interface'
    },
    {
      id: 'json-formatter',
      component: JSONFormatter,
      title: 'JSON Formatter'
    },
    {
      id: 'landing-page',
      component: LandingPage,
      title: 'Landing Page'
    },
    {
      id: 'luxury-product-page',
      component: LuxuryProductPage,
      title: 'Luxury Product Page'
    },
    {
      id: 'portfolio',
      component: Portfolio,
      title: 'Portfolio'
    },
    {
      id: 'task-flow-dashboard',
      component: TaskFlowDashboard,
      title: 'Task Flow Dashboard'
    },
    {
      id: 'trading-dashboard',
      component: TradingDashboard,
      title: 'Trading Dashboard'
    },
    {
      id: 'uuid-generator',
      component: UUIDGenerator,
      title: 'UUID Generator'
    }
  ];

  // Navigation Functions
  const navigate = (route) => {
    setCurrentRoute(route);
    // Reset showcase mode when navigating
    setShowcaseMode(false);
  };

  const getCurrentInterfaceIndex = () => {
    const match = currentRoute.match(/\/interface\/(.+)/);
    if (!match) return -1;
    return interfaces.findIndex(i => i.id === match[1]);
  };

  const navigateToPrevious = () => {
    const currentIndex = getCurrentInterfaceIndex();
    if (currentIndex > 0) {
      navigate(`/interface/${interfaces[currentIndex - 1].id}`);
    }
  };

  const navigateToNext = () => {
    const currentIndex = getCurrentInterfaceIndex();
    if (currentIndex < interfaces.length - 1) {
      navigate(`/interface/${interfaces[currentIndex + 1].id}`);
    }
  };

  // Screenshot Capture Function with Enhanced Branding and Styling
  const captureScreenshot = async () => {
    if (!appRef.current) return;
    
    try {
      // Temporarily hide floating controls for clean screenshot
      const floatingControls = document.querySelector('.fixed.bottom-6.right-6');
      const showcaseHint = document.querySelector('.fixed.top-4.right-4');
      if (floatingControls) floatingControls.style.display = 'none';
      if (showcaseHint) showcaseHint.style.display = 'none';

      // Enhanced html2canvas options for better capture
      const canvas = await html2canvas(appRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: window.innerWidth,
        height: window.innerHeight,
        scrollX: 0,
        scrollY: 0,
        // Enhanced options for better element capture
        foreignObjectRendering: true,
        removeContainer: true,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // Fix for missing icons and styles in cloned document
          const clonedBody = clonedDoc.body;
          
          // Ensure all fonts are loaded
          clonedBody.style.fontFamily = 'Inter, system-ui, -apple-system, sans-serif';
          
          // Fix SVG icons that might not render
          const svgElements = clonedBody.querySelectorAll('svg');
          svgElements.forEach(svg => {
            svg.style.display = 'inline-block';
            svg.style.verticalAlign = 'middle';
          });
          
          // Ensure backdrop blur effects are visible
          const blurElements = clonedBody.querySelectorAll('[class*="backdrop-blur"]');
          blurElements.forEach(element => {
            element.style.backdropFilter = 'blur(12px)';
            element.style.webkitBackdropFilter = 'blur(12px)';
          });
        }
      });

      // Restore floating controls
      if (floatingControls) floatingControls.style.display = 'block';
      if (showcaseHint) showcaseHint.style.display = 'block';

      // Create enhanced styled canvas with prominent branding
      const styledCanvas = document.createElement('canvas');
      const ctx = styledCanvas.getContext('2d');
      
      // Increased padding and branding space
      const padding = 60;
      const brandingHeight = 100;
      const borderRadius = 24;
      
      styledCanvas.width = canvas.width + (padding * 2);
      styledCanvas.height = canvas.height + (padding * 2) + brandingHeight;
      
      // Create sophisticated gradient background
      const gradient = ctx.createLinearGradient(0, 0, styledCanvas.width, styledCanvas.height);
      gradient.addColorStop(0, '#0a0a0f');
      gradient.addColorStop(0.3, '#1a1a2e');
      gradient.addColorStop(0.7, '#16213e');
      gradient.addColorStop(1, '#0f0f23');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, styledCanvas.width, styledCanvas.height);
      
      // Add animated-style dots pattern
      ctx.fillStyle = 'rgba(139, 92, 246, 0.06)'; // Purple dots
      for (let i = 0; i < styledCanvas.width; i += 60) {
        for (let j = 0; j < styledCanvas.height; j += 60) {
          ctx.beginPath();
          ctx.arc(i, j, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      
      // Add subtle geometric pattern
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < styledCanvas.width; i += 120) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 60, styledCanvas.height);
        ctx.stroke();
      }
      
      // Draw multiple shadow layers for depth
      const drawRoundedRect = (x, y, width, height, radius) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      };
      
      // Multiple shadow layers for depth
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      drawRoundedRect(padding + 8, padding + 8, canvas.width, canvas.height, borderRadius);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      drawRoundedRect(padding + 4, padding + 4, canvas.width, canvas.height, borderRadius);
      ctx.fill();
      
      // Clip for rounded corners and draw screenshot
      ctx.save();
      drawRoundedRect(padding, padding, canvas.width, canvas.height, borderRadius);
      ctx.clip();
      ctx.drawImage(canvas, padding, padding);
      ctx.restore();
      
      // Add premium border with gradient
      const borderGradient = ctx.createLinearGradient(padding, padding, padding + canvas.width, padding + canvas.height);
      borderGradient.addColorStop(0, 'rgba(139, 92, 246, 0.6)');
      borderGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.6)');
      borderGradient.addColorStop(1, 'rgba(139, 92, 246, 0.6)');
      
      ctx.strokeStyle = borderGradient;
      ctx.lineWidth = 3;
      drawRoundedRect(padding, padding, canvas.width, canvas.height, borderRadius);
      ctx.stroke();
      
      // Enhanced branding section
      const brandingY = styledCanvas.height - brandingHeight/2;
      const logoSize = 40; // Larger logo
      
      // Branding background with blur effect simulation
      const brandingBg = ctx.createLinearGradient(0, styledCanvas.height - brandingHeight, 0, styledCanvas.height);
      brandingBg.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
      brandingBg.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
      ctx.fillStyle = brandingBg;
      ctx.fillRect(0, styledCanvas.height - brandingHeight, styledCanvas.width, brandingHeight);
      
      // Decorative line above branding
      const lineGradient = ctx.createLinearGradient(padding, 0, styledCanvas.width - padding, 0);
      lineGradient.addColorStop(0, 'rgba(139, 92, 246, 0)');
      lineGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.8)');
      lineGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padding, styledCanvas.height - brandingHeight);
      ctx.lineTo(styledCanvas.width - padding, styledCanvas.height - brandingHeight);
      ctx.stroke();
      
      // Try to load and draw logo
      const logoImg = new Image();
      logoImg.onload = () => {
        // Draw logo with subtle glow effect
        ctx.shadowColor = 'rgba(139, 92, 246, 0.5)';
        ctx.shadowBlur = 10;
        ctx.drawImage(logoImg, padding, brandingY - logoSize/2, logoSize, logoSize);
        ctx.shadowBlur = 0;
        
        // Main brand text - larger and more prominent
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Inter, system-ui, sans-serif';
        ctx.fillText('BRAND NOVA', padding + logoSize + 20, brandingY + 8);
        
        // Subtitle
        ctx.fillStyle = 'rgba(139, 92, 246, 0.9)';
        ctx.font = '16px Inter, system-ui, sans-serif';
        ctx.fillText('UI Design Showcase', padding + logoSize + 20, brandingY - 12);
        
        // Right side branding
        const currentInterfaceItem = interfaces[getCurrentInterfaceIndex()];
        const interfaceTitle = currentInterfaceItem ? currentInterfaceItem.title : 'UI Showcase';
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '18px Inter, system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(interfaceTitle, styledCanvas.width - padding, brandingY - 8);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '14px Inter, system-ui, sans-serif';
        const date = new Date().toLocaleDateString();
        ctx.fillText(date, styledCanvas.width - padding, brandingY + 15);
        
        // Reset text alignment
        ctx.textAlign = 'left';
        
        // Download the styled screenshot
        downloadCanvas(styledCanvas);
      };
      
      logoImg.onerror = () => {
        // Enhanced fallback without logo
        // Brand icon placeholder
        ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
        ctx.fillRect(padding, brandingY - logoSize/2, logoSize, logoSize);
        
        ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
        ctx.font = 'bold 24px Inter, system-ui, sans-serif';
        ctx.fillText('BN', padding + logoSize/2 - 15, brandingY + 8);
        
        // Main brand text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Inter, system-ui, sans-serif';
        ctx.fillText('BRAND NOVA', padding + logoSize + 20, brandingY + 8);
        
        ctx.fillStyle = 'rgba(139, 92, 246, 0.9)';
        ctx.font = '16px Inter, system-ui, sans-serif';
        ctx.fillText('UI Design Showcase', padding + logoSize + 20, brandingY - 12);
        
        // Right side info
        const currentInterfaceItem = interfaces[getCurrentInterfaceIndex()];
        const interfaceTitle = currentInterfaceItem ? currentInterfaceItem.title : 'UI Showcase';
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '18px Inter, system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(interfaceTitle, styledCanvas.width - padding, brandingY - 8);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '14px Inter, system-ui, sans-serif';
        const date = new Date().toLocaleDateString();
        ctx.fillText(date, styledCanvas.width - padding, brandingY + 15);
        
        ctx.textAlign = 'left';
        
        downloadCanvas(styledCanvas);
      };
      
      // Try multiple logo paths
      logoImg.src = '/src/assets/logo.png';
      
      // Fallback timeout
      setTimeout(() => {
        if (!logoImg.complete) {
          logoImg.onerror();
        }
      }, 2000);
      
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      alert('Screenshot capture failed. Please try again.');
    }
  };

  // Route Rendering
  const renderCurrentRoute = () => {
    if (currentRoute === '/') {
      return <HomePage onNavigate={navigate} />;
    }

    const match = currentRoute.match(/\/interface\/(.+)/);
    if (match) {
      const interfaceData = interfaces.find(i => i.id === match[1]);
      if (interfaceData) {
        const InterfaceComponent = interfaceData.component;
        return <InterfaceComponent />;
      }
    }

    // 404 fallback - redirect to home
    return <HomePage onNavigate={navigate} />;
  };

  const currentInterfaceIndex = getCurrentInterfaceIndex();
  const canGoPrevious = currentInterfaceIndex > 0;
  const canGoNext = currentInterfaceIndex < interfaces.length - 1;

  return (
    <div ref={appRef} className="min-h-screen">
      {/* Render Current Route */}
      {renderCurrentRoute()}
      
      {/* Floating Controls */}
      <FloatingControls
        currentInterface={currentInterfaceIndex + 1}
        totalInterfaces={interfaces.length}
        onNavigate={navigate}
        onPrevious={navigateToPrevious}
        onNext={navigateToNext}
        showcaseMode={showcaseMode}
        onToggleShowcase={() => setShowcaseMode(!showcaseMode)}
        onCapture={captureScreenshot}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />
      
      {/* Global Styles for Showcase Mode */}
      {showcaseMode && (
        <style jsx global>{`
          * {
            cursor: none !important;
          }
        `}</style>
      )}
    </div>
  );
};

export default App;