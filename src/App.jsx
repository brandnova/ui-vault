import React, { useState, useRef, useEffect } from 'react';
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
  const [logoImage, setLogoImage] = useState(null);
  const appRef = useRef(null);

  // Showcase mode exit handlers
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showcaseMode && e.key === 'Escape') {
        setShowcaseMode(false);
      }
    };

    const handleDoubleClick = (e) => {
      if (showcaseMode) {
        // Only exit on double-click if not clicking on interactive elements
        const isInteractiveElement = e.target.closest('button, input, select, textarea, a, [role="button"]');
        if (!isInteractiveElement) {
          setShowcaseMode(false);
        }
      }
    };

    const handleContextMenu = (e) => {
      if (showcaseMode) {
        e.preventDefault();
        setShowcaseMode(false);
      }
    };

    if (showcaseMode) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('dblclick', handleDoubleClick);
      document.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('dblclick', handleDoubleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [showcaseMode]);

  // Pre-load logo image on component mount
  React.useEffect(() => {
    const loadLogo = async () => {
      const img = new Image();
      
      const logoPaths = [
        '/src/assets/logo.png',
        './src/assets/logo.png',
        '../assets/logo.png',
        './assets/logo.png',
        '/assets/logo.png',
        'assets/logo.png'
      ];

      for (const path of logoPaths) {
        try {
          // Try to fetch and convert to base64
          const response = await fetch(path);
          if (response.ok) {
            const blob = await response.blob();
            const base64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
            
            img.onload = () => setLogoImage(img);
            img.src = base64;
            break;
          }
        } catch (error) {
          // Try direct path as fallback
          try {
            img.onload = () => setLogoImage(img);
            img.onerror = () => console.warn(`Failed to load logo from: ${path}`);
            img.src = path;
            break;
          } catch (directError) {
            console.warn(`Failed to load logo from: ${path}`);
          }
        }
      }
    };

    loadLogo();
  }, []);

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

  // Enhanced Screenshot Capture Function with Better Branding and Styling
  const captureScreenshot = async () => {
    if (!appRef.current) return;
    
    try {
      // Show loading state
      const loadingToast = document.createElement('div');
      loadingToast.textContent = 'Capturing screenshot...';
      loadingToast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-family: Inter, system-ui, sans-serif;
        backdrop-filter: blur(10px);
      `;
      document.body.appendChild(loadingToast);

      // Temporarily hide floating controls for clean screenshot
      const floatingControls = document.querySelector('.fixed.bottom-6.right-6');
      if (floatingControls) {
        floatingControls.style.display = 'none';
      }

      // Wait a bit for any animations to settle
      await new Promise(resolve => setTimeout(resolve, 500));

      // Enhanced html2canvas options for better capture
      const canvas = await html2canvas(appRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: window.innerWidth,
        height: window.innerHeight,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (element) => {
          // Ignore elements that might cause issues
          return element.classList?.contains('fixed') && 
                 element.classList?.contains('bottom-6') && 
                 element.classList?.contains('right-6');
        },
        onclone: (clonedDoc) => {
          // Process cloned document to ensure all styles are applied
          const clonedElements = clonedDoc.querySelectorAll('*');
          clonedElements.forEach(el => {
            // Force hardware acceleration styles to be visible
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.transform && computedStyle.transform !== 'none') {
              el.style.transform = computedStyle.transform;
            }
            if (computedStyle.backdropFilter && computedStyle.backdropFilter !== 'none') {
              // Convert backdrop-filter to a semi-transparent overlay for better capture
              el.style.backdropFilter = 'none';
              el.style.background = computedStyle.background || 'rgba(255, 255, 255, 0.1)';
            }
          });
        }
      });

      // Restore floating controls
      if (floatingControls) {
        floatingControls.style.display = 'block';
      }

      // Create enhanced styled canvas with prominent branding
      const styledCanvas = document.createElement('canvas');
      const ctx = styledCanvas.getContext('2d');
      
      // Enhanced dimensions for better branding space
      const padding = 50;
      const borderRadius = 24;
      const brandingHeight = 100; // Increased branding area
      styledCanvas.width = canvas.width + (padding * 2);
      styledCanvas.height = canvas.height + (padding * 2) + brandingHeight;
      
      // Create sophisticated gradient background with blur effect
      const gradient = ctx.createRadialGradient(
        styledCanvas.width / 2, styledCanvas.height / 2, 0,
        styledCanvas.width / 2, styledCanvas.height / 2, Math.max(styledCanvas.width, styledCanvas.height) / 2
      );
      gradient.addColorStop(0, '#0f0f23');
      gradient.addColorStop(0.3, '#1a1a2e');
      gradient.addColorStop(0.7, '#16213e');
      gradient.addColorStop(1, '#0a0a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, styledCanvas.width, styledCanvas.height);
      
      // Add noise texture for premium feel
      const imageData = ctx.getImageData(0, 0, styledCanvas.width, styledCanvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));     // Red
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // Green
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // Blue
      }
      ctx.putImageData(imageData, 0, 0);
      
      // Add geometric pattern overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < styledCanvas.width; i += 60) {
        for (let j = 0; j < styledCanvas.height; j += 60) {
          ctx.beginPath();
          ctx.arc(i, j, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(i, j);
          ctx.lineTo(i + 20, j + 20);
          ctx.stroke();
        }
      }
      
      // Enhanced rounded rectangle function
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
      
      // Draw multiple shadow layers for depth
      const shadowOffsets = [
        { x: 0, y: 8, blur: 25, color: 'rgba(0, 0, 0, 0.4)' },
        { x: 0, y: 4, blur: 15, color: 'rgba(0, 0, 0, 0.3)' },
        { x: 0, y: 2, blur: 8, color: 'rgba(0, 0, 0, 0.2)' }
      ];
      
      shadowOffsets.forEach(shadow => {
        ctx.fillStyle = shadow.color;
        drawRoundedRect(
          padding + shadow.x, 
          padding + shadow.y, 
          canvas.width, 
          canvas.height, 
          borderRadius
        );
        ctx.fill();
      });
      
      // Clip for rounded corners and draw screenshot
      ctx.save();
      drawRoundedRect(padding, padding, canvas.width, canvas.height, borderRadius);
      ctx.clip();
      ctx.drawImage(canvas, padding, padding);
      ctx.restore();
      
      // Add sophisticated border with gradient
      const borderGradient = ctx.createLinearGradient(0, 0, styledCanvas.width, styledCanvas.height);
      borderGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      borderGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      borderGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
      ctx.strokeStyle = borderGradient;
      ctx.lineWidth = 2;
      drawRoundedRect(padding, padding, canvas.width, canvas.height, borderRadius);
      ctx.stroke();
      
      // Enhanced branding section
      const brandingY = styledCanvas.height - brandingHeight / 2;
      const currentInterfaceItem = interfaces[getCurrentInterfaceIndex()];
      
      // Draw branding background with blur effect simulation
      const brandingBg = ctx.createLinearGradient(0, styledCanvas.height - brandingHeight, 0, styledCanvas.height);
      brandingBg.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      brandingBg.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
      ctx.fillStyle = brandingBg;
      ctx.fillRect(0, styledCanvas.height - brandingHeight, styledCanvas.width, brandingHeight);
      
      // Add branding border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, styledCanvas.height - brandingHeight);
      ctx.lineTo(styledCanvas.width, styledCanvas.height - brandingHeight);
      ctx.stroke();
      
      // Function to draw the logo (using pre-loaded image or fallback)
      const drawLogoImage = (x, y, size) => {
        if (logoImage && logoImage.complete) {
          // Draw the actual logo image with proper scaling
          ctx.save();
          
          // Create clipping circle for logo if needed
          ctx.beginPath();
          ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
          ctx.clip();
          
          // Draw logo maintaining aspect ratio
          const aspectRatio = logoImage.width / logoImage.height;
          let drawWidth = size;
          let drawHeight = size;
          let drawX = x;
          let drawY = y;
          
          if (aspectRatio > 1) {
            drawHeight = size / aspectRatio;
            drawY = y + (size - drawHeight) / 2;
          } else {
            drawWidth = size * aspectRatio;
            drawX = x + (size - drawWidth) / 2;
          }
          
          ctx.drawImage(logoImage, drawX, drawY, drawWidth, drawHeight);
          ctx.restore();
        } else {
          // Fallback: Create custom logo using canvas
          ctx.save();
          
          // Logo background circle
          const logoGradient = ctx.createRadialGradient(x + size/2, y + size/2, 0, x + size/2, y + size/2, size/2);
          logoGradient.addColorStop(0, '#4F46E5');
          logoGradient.addColorStop(0.7, '#7C3AED');
          logoGradient.addColorStop(1, '#2563EB');
          
          ctx.fillStyle = logoGradient;
          ctx.beginPath();
          ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
          ctx.fill();
          
          // Logo icon (stylized 'BN')
          ctx.fillStyle = 'white';
          ctx.font = `bold ${size * 0.4}px Inter, system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('BN', x + size/2, y + size/2);
          
          ctx.restore();
        }
      };
      
      // Draw logo (made bigger to match text prominence)
      const logoSize = 100;
      drawLogoImage(padding, brandingY - logoSize/2, logoSize);
      
      // Enhanced brand text (adjusted positioning for bigger logo)
      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px Inter, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('BRAND NOVA', padding + logoSize + 20, brandingY - 8);
      
      // Add interface title
      if (currentInterfaceItem) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '16px Inter, system-ui, sans-serif';
        ctx.fillText(currentInterfaceItem.title, padding + logoSize + 20, brandingY + 18);
      }
      
      // Right side branding
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 18px Inter, system-ui, sans-serif';
      ctx.fillText('UI Design Showcase', styledCanvas.width - padding, brandingY - 8);
      
      // Add timestamp
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '14px Inter, system-ui, sans-serif';
      const timestamp = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      ctx.fillText(timestamp, styledCanvas.width - padding, brandingY + 18);
      
      // Add decorative elements
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padding + logoSize + 200, brandingY - 20);
      ctx.lineTo(styledCanvas.width - padding - 200, brandingY - 20);
      ctx.stroke();
      
      // Remove loading toast
      document.body.removeChild(loadingToast);
      
      // Download the enhanced screenshot
      downloadCanvas(styledCanvas);
      
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      // Remove loading toast if it exists
      const loadingToast = document.querySelector('div');
      if (loadingToast && loadingToast.textContent === 'Capturing screenshot...') {
        document.body.removeChild(loadingToast);
      }
      alert('Screenshot capture failed. Please try again.');
    }
  };

  // Helper function to download canvas
  const downloadCanvas = (canvas) => {
    const link = document.createElement('a');
    const currentInterfaceItem = interfaces[getCurrentInterfaceIndex()];
    const filename = currentInterfaceItem 
      ? `brand-nova-${currentInterfaceItem.id}-${Date.now()}.png`
      : `brand-nova-ui-showcase-${Date.now()}.png`;
    
    link.download = filename;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    
    // Show success notification
    const successToast = document.createElement('div');
    successToast.textContent = 'Screenshot saved successfully!';
    successToast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(34, 197, 94, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: Inter, system-ui, sans-serif;
      backdrop-filter: blur(10px);
    `;
    document.body.appendChild(successToast);
    
    setTimeout(() => {
      document.body.removeChild(successToast);
    }, 3000);
    
    console.log('Enhanced screenshot captured successfully!');
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