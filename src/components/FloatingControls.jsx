import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Camera, Eye, EyeOff } from 'lucide-react';

const FloatingControls = ({ 
  currentInterface, 
  totalInterfaces, 
  onNavigate, 
  onPrevious, 
  onNext, 
  showcaseMode, 
  onToggleShowcase,
  onCapture,
  canGoPrevious,
  canGoNext
}) => {
  // Keyboard shortcuts and mobile touch handling
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger shortcuts if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch (e.key.toLowerCase()) {
        case 'h':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onToggleShowcase();
          }
          break;
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onCapture();
          }
          break;
        case 'arrowleft':
          if (canGoPrevious) onPrevious();
          break;
        case 'arrowright':
          if (canGoNext) onNext();
          break;
        case 'escape':
          if (showcaseMode) onToggleShowcase();
          break;
      }
    };

    const handleRightClick = (e) => {
      if (showcaseMode) {
        e.preventDefault();
        onToggleShowcase();
      }
    };

    // Mobile touch handling for showcase mode exit
    let touchCount = 0;
    let touchTimer = null;

    const handleTouchStart = (e) => {
      if (!showcaseMode) return;
      
      touchCount++;
      
      if (touchCount === 1) {
        touchTimer = setTimeout(() => {
          touchCount = 0;
        }, 500); // Reset after 500ms if no second tap
      } else if (touchCount === 2) {
        // Double tap detected
        clearTimeout(touchTimer);
        touchCount = 0;
        e.preventDefault();
        onToggleShowcase();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('touchstart', handleTouchStart);
      if (touchTimer) clearTimeout(touchTimer);
    };
  }, [showcaseMode, onToggleShowcase, onCapture, onPrevious, onNext, canGoPrevious, canGoNext]);

  // Hide all controls completely in showcase mode
  if (showcaseMode) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20">
        <div className="flex items-center space-x-3">
          {/* Home Button */}
          <button
            onClick={() => onNavigate('/')}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 text-white hover:text-purple-300 group"
            title="Back to Home"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Navigation Controls - Only show when viewing an interface */}
          {currentInterface > 0 && (
            <>
              <div className="w-px h-6 bg-white/20"></div>
              
              {/* Previous Button */}
              <button
                onClick={onPrevious}
                disabled={!canGoPrevious}
                className={`p-3 rounded-xl transition-all duration-200 group ${
                  canGoPrevious 
                    ? 'bg-white/10 hover:bg-white/20 text-white hover:text-purple-300' 
                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
                title={canGoPrevious ? "Previous Interface" : "No previous interface"}
              >
                <ChevronLeft className={`w-5 h-5 ${canGoPrevious ? 'group-hover:scale-110' : ''} transition-transform`} />
              </button>
              
              {/* Next Button */}
              <button
                onClick={onNext}
                disabled={!canGoNext}
                className={`p-3 rounded-xl transition-all duration-200 group ${
                  canGoNext 
                    ? 'bg-white/10 hover:bg-white/20 text-white hover:text-purple-300' 
                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
                title={canGoNext ? "Next Interface" : "No next interface"}
              >
                <ChevronRight className={`w-5 h-5 ${canGoNext ? 'group-hover:scale-110' : ''} transition-transform`} />
              </button>
            </>
          )}
          
          <div className="w-px h-6 bg-white/20"></div>
          
          {/* Showcase Mode Toggle */}
          <button
            onClick={onToggleShowcase}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 text-white hover:text-purple-300 group"
            title="Toggle Showcase Mode (Ctrl+H) - Exit: Right-click, ESC, or double-tap on mobile"
          >
            {showcaseMode ? (
              <EyeOff className="w-5 h-5 group-hover:scale-110 transition-transform" />
            ) : (
              <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>
          
          {/* Screenshot Button */}
          <button
            onClick={onCapture}
            className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl transition-all duration-200 text-white group shadow-lg hover:shadow-purple-500/25"
            title="Capture Screenshot (Ctrl+S)"
          >
            <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        {/* Interface Counter + Keyboard Shortcuts Info */}
        {currentInterface > 0 && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="text-xs text-gray-400 text-center font-medium mb-2">
              Interface {currentInterface} of {totalInterfaces}
            </div>
            
            {/* Progress Bar */}
            <div className="mb-3 bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentInterface / totalInterfaces) * 100}%` }}
              ></div>
            </div>
            
            {/* Shortcuts */}
            <div className="text-xs text-gray-500 space-y-1">
              <div>Arrow keys: Navigate</div>
              <div>Ctrl+H: Hide controls</div>
              <div>Ctrl+S: Screenshot</div>
              <div className="pt-1 border-t border-white/10">
                <div className="font-medium text-gray-400 mb-1">Exit Showcase Mode:</div>
                <div>Desktop: Right-click or ESC</div>
                <div>Mobile: Double-tap screen</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingControls;