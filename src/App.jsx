import { useState, useRef, useEffect } from "react"
import * as htmlToImage from "html-to-image"
import html2canvas from "html2canvas"
// Import your page components
import AboutUs from "./pages/AboutUs"
import CryptoWallet from "./pages/CryptoWallet"
import FreelanceRateCalculator from "./pages/FreelanceRateCalculator"
import HotelBookingInterface from "./pages/HotelBookingInterface"
import JSONFormatter from "./pages/JSONFormatter"
import LandingPage from "./pages/LandingPage"
import LuxuryProductPage from "./pages/LuxuryProductPage"
import Portfolio from "./pages/Portfolio"
import TaskFlowDashboard from "./pages/TaskFlowDashboard"
import TradingDashboard from "./pages/TradingDashboard"
import UUIDGenerator from "./pages/UUIDGenerator"
import DoctorBookingApp from "./pages/DoctorBookingApp"
import ForexTradingDashboard from "./pages/ForexTradingDashboard"
import GigMarketplace from "./pages/GigMarketplace"
import BlogLandingPage from "./pages/BlogLandingPage"
import RemoteJobPlatform from "./pages/RemoteJobPlatform"
import PhotoGalleryPage from "./pages/PhotoGalleryPage"

// Import components
import HomePage from "./components/HomePage"
import FloatingControls from "./components/FloatingControls"

// Import logo
import logoImage from "/logo.png"

const App = () => {
  const [currentRoute, setCurrentRoute] = useState("/")
  const [showcaseMode, setShowcaseMode] = useState(false)
  const [logoImg, setLogoImg] = useState(null)
  const appRef = useRef(null)

  // Showcase mode exit handlers
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showcaseMode && e.key === "Escape") {
        setShowcaseMode(false)
      }
    }

    const handleDoubleClick = (e) => {
      if (showcaseMode) {
        const isInteractiveElement = e.target.closest('button, input, select, textarea, a, [role="button"]')
        if (!isInteractiveElement) {
          setShowcaseMode(false)
        }
      }
    }

    const handleContextMenu = (e) => {
      if (showcaseMode) {
        e.preventDefault()
        setShowcaseMode(false)
      }
    }

    if (showcaseMode) {
      document.addEventListener("keydown", handleKeyPress)
      document.addEventListener("dblclick", handleDoubleClick)
      document.addEventListener("contextmenu", handleContextMenu)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      document.removeEventListener("dblclick", handleDoubleClick)
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [showcaseMode])

  // Load logo image
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      console.log("Logo loaded successfully:", logoImage)
      setLogoImg(img)
    }
    img.onerror = (error) => {
      console.warn("Failed to load logo:", error)
      setLogoImg(null)
    }
    img.src = logoImage
  }, [])

  // Interface Registry
  const interfaces = [
    { id: "about-us", component: AboutUs, title: "About Us Page" },
    { id: "crypto-wallet", component: CryptoWallet, title: "Crypto Wallet" },
    { id: "freelance-rate-calculator", component: FreelanceRateCalculator, title: "Freelance Rate Calculator" },
    { id: "hotel-booking-interface", component: HotelBookingInterface, title: "Hotel Booking Interface" },
    { id: "json-formatter", component: JSONFormatter, title: "JSON Formatter" },
    { id: "landing-page", component: LandingPage, title: "Landing Page" },
    { id: "luxury-product-page", component: LuxuryProductPage, title: "Luxury Product Page" },
    { id: "portfolio", component: Portfolio, title: "Portfolio" },
    { id: "task-flow-dashboard", component: TaskFlowDashboard, title: "Task Flow Dashboard" },
    { id: "trading-dashboard", component: TradingDashboard, title: "Trading Dashboard" },
    { id: "uuid-generator", component: UUIDGenerator, title: "UUID Generator" },
    { id: "doctor-booking-app", component: DoctorBookingApp, title: "Doctor Booking App" },
    { id: "forex-trading-dashboard", component: ForexTradingDashboard, title: "Forex Trading Dashboard" },
    { id: "gig-marketplace", component: GigMarketplace, title: "Gig Marketplace" },
    { id: "blog-landing-page", component: BlogLandingPage, title: "Blog Landing Page" },
    { id: "remote-job-platform", component: RemoteJobPlatform, title: "Remote Job Platform" },
    { id: "photo-gallery-page", component: PhotoGalleryPage, title: "Photo Gallery Page" },
  ]

  // Navigation Functions
  const navigate = (route) => {
    setCurrentRoute(route)
    setShowcaseMode(false)
  }

  const getCurrentInterfaceIndex = () => {
    const match = currentRoute.match(/\/interface\/(.+)/)
    if (!match) return -1
    return interfaces.findIndex((i) => i.id === match[1])
  }

  const navigateToPrevious = () => {
    const currentIndex = getCurrentInterfaceIndex()
    if (currentIndex > 0) {
      navigate(`/interface/${interfaces[currentIndex - 1].id}`)
    }
  }

  const navigateToNext = () => {
    const currentIndex = getCurrentInterfaceIndex()
    if (currentIndex < interfaces.length - 1) {
      navigate(`/interface/${interfaces[currentIndex + 1].id}`)
    }
  }

  // Enhanced notification system
  const showNotification = (message, type = "info", duration = 3000) => {
    const isMobile = window.innerWidth <= 768
    const isSmallMobile = window.innerWidth <= 480

    const notification = document.createElement("div")
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: ${isMobile ? "10px" : "20px"};
      ${isMobile ? "left: 50%; transform: translateX(-50%);" : "right: 20px;"}
      background: ${
        type === "error"
          ? "rgba(239, 68, 68, 0.95)"
          : type === "success"
            ? "rgba(34, 197, 94, 0.95)"
            : type === "warning"
              ? "rgba(245, 158, 11, 0.95)"
              : "rgba(59, 130, 246, 0.95)"
      };
      color: white;
      padding: ${isMobile ? "8px 16px" : "12px 20px"};
      border-radius: ${isMobile ? "8px" : "12px"};
      z-index: 10000;
      font-family: Inter, system-ui, sans-serif;
      font-size: ${isMobile ? "14px" : "16px"};
      font-weight: 500;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      max-width: ${isMobile ? "90vw" : "auto"};
      text-align: center;
      animation: slideIn 0.3s ease-out;
    `

    // Add slide-in animation
    if (!document.getElementById("notification-styles")) {
      const style = document.createElement("style")
      style.id = "notification-styles"
      style.textContent = `
        @keyframes slideIn {
          from { transform: ${isMobile ? "translate(-50%, -100%)" : "translateX(100%)"}; opacity: 0; }
          to { transform: ${isMobile ? "translate(-50%, 0)" : "translateX(0)"}; opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: ${isMobile ? "translate(-50%, 0)" : "translateX(0)"}; opacity: 1; }
          to { transform: ${isMobile ? "translate(-50%, -100%)" : "translateX(100%)"}; opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }

    document.body.appendChild(notification)

    // Auto remove after duration
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOut 0.3s ease-in"
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification)
          }
        }, 300)
      }
    }, duration)

    return notification
  }

  // Enhanced screenshot configuration (from App copy.jsx)
  const getScreenshotConfig = () => {
    const isMobile = window.innerWidth <= 768
    const isSmallMobile = window.innerWidth <= 480

    return {
      // Mobile-responsive dimensions
      padding: isMobile ? (isSmallMobile ? 20 : 30) : 50,
      borderRadius: isMobile ? (isSmallMobile ? 12 : 16) : 24,
      brandingHeight: isMobile ? (isSmallMobile ? 60 : 80) : 100,

      // Logo and text sizing
      logoSize: isMobile ? (isSmallMobile ? 30 : 50) : 70,
      brandTextSize: isMobile ? (isSmallMobile ? 16 : 20) : 24,
      subtitleTextSize: isMobile ? (isSmallMobile ? 12 : 14) : 16,
      rightTextSize: isMobile ? (isSmallMobile ? 14 : 16) : 18,
      timestampTextSize: isMobile ? (isSmallMobile ? 10 : 12) : 14,

      // Device flags
      isMobile,
      isSmallMobile,
    }
  }

  // Process and style the captured screenshot with App copy.jsx styling
  const processScreenshot = (dataUrl, config, currentInterface) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        // Create original canvas
        const originalCanvas = document.createElement("canvas")
        const originalCtx = originalCanvas.getContext("2d")
        originalCanvas.width = img.width
        originalCanvas.height = img.height
        originalCtx.drawImage(img, 0, 0)

        // Create styled canvas with App copy.jsx dimensions and styling
        const styledCanvas = document.createElement("canvas")
        const ctx = styledCanvas.getContext("2d")

        styledCanvas.width = originalCanvas.width + config.padding * 2
        styledCanvas.height = originalCanvas.height + config.padding * 2 + config.brandingHeight

        // Create sophisticated gradient background (exact from App copy.jsx)
        const gradient = ctx.createRadialGradient(
          styledCanvas.width / 2,
          styledCanvas.height / 2,
          0,
          styledCanvas.width / 2,
          styledCanvas.height / 2,
          Math.max(styledCanvas.width, styledCanvas.height) / 2,
        )
        gradient.addColorStop(0, "#0f0f23")
        gradient.addColorStop(0.3, "#1a1a2e")
        gradient.addColorStop(0.7, "#16213e")
        gradient.addColorStop(1, "#0a0a1a")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, styledCanvas.width, styledCanvas.height)

        // Add noise texture for premium feel (exact from App copy.jsx)
        const imageData = ctx.getImageData(0, 0, styledCanvas.width, styledCanvas.height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * 10
          data[i] = Math.max(0, Math.min(255, data[i] + noise)) // Red
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)) // Green
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)) // Blue
        }
        ctx.putImageData(imageData, 0, 0)

        // Add geometric pattern overlay (exact from App copy.jsx)
        ctx.fillStyle = "rgba(255, 255, 255, 0.02)"
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)"
        ctx.lineWidth = 1
        const patternSpacing = config.isMobile ? (config.isSmallMobile ? 40 : 50) : 60
        const patternSize = config.isMobile ? (config.isSmallMobile ? 1 : 1.5) : 2
        const patternLineLength = config.isMobile ? (config.isSmallMobile ? 10 : 15) : 20

        for (let i = 0; i < styledCanvas.width; i += patternSpacing) {
          for (let j = 0; j < styledCanvas.height; j += patternSpacing) {
            ctx.beginPath()
            ctx.arc(i, j, patternSize, 0, Math.PI * 2)
            ctx.fill()
            ctx.beginPath()
            ctx.moveTo(i, j)
            ctx.lineTo(i + patternLineLength, j + patternLineLength)
            ctx.stroke()
          }
        }

        // Enhanced rounded rectangle function (exact from App copy.jsx)
        const drawRoundedRect = (x, y, width, height, radius) => {
          ctx.beginPath()
          ctx.moveTo(x + radius, y)
          ctx.lineTo(x + width - radius, y)
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
          ctx.lineTo(x + width, y + height - radius)
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
          ctx.lineTo(x + radius, y + height)
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
          ctx.lineTo(x, y + radius)
          ctx.quadraticCurveTo(x, y, x + radius, y)
          ctx.closePath()
        }

        // Draw multiple shadow layers for depth (exact from App copy.jsx)
        const shadowOffsets = [
          { x: 0, y: 8, blur: 25, color: "rgba(0, 0, 0, 0.4)" },
          { x: 0, y: 4, blur: 15, color: "rgba(0, 0, 0, 0.3)" },
          { x: 0, y: 2, blur: 8, color: "rgba(0, 0, 0, 0.2)" },
        ]

        shadowOffsets.forEach((shadow) => {
          ctx.fillStyle = shadow.color
          drawRoundedRect(
            config.padding + shadow.x,
            config.padding + shadow.y,
            originalCanvas.width,
            originalCanvas.height,
            config.borderRadius,
          )
          ctx.fill()
        })

        // Clip for rounded corners and draw screenshot
        ctx.save()
        drawRoundedRect(
          config.padding,
          config.padding,
          originalCanvas.width,
          originalCanvas.height,
          config.borderRadius,
        )
        ctx.clip()
        ctx.drawImage(originalCanvas, config.padding, config.padding)
        ctx.restore()

        // Add sophisticated border with gradient (exact from App copy.jsx)
        const borderGradient = ctx.createLinearGradient(0, 0, styledCanvas.width, styledCanvas.height)
        borderGradient.addColorStop(0, "rgba(255, 255, 255, 0.2)")
        borderGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)")
        borderGradient.addColorStop(1, "rgba(255, 255, 255, 0.05)")
        ctx.strokeStyle = borderGradient
        ctx.lineWidth = 2
        drawRoundedRect(
          config.padding,
          config.padding,
          originalCanvas.width,
          originalCanvas.height,
          config.borderRadius,
        )
        ctx.stroke()

        // Enhanced branding section (exact from App copy.jsx)
        const brandingY = styledCanvas.height - config.brandingHeight / 2
        const currentInterfaceItem = currentInterface

        // Draw branding background with blur effect simulation
        const brandingBg = ctx.createLinearGradient(
          0,
          styledCanvas.height - config.brandingHeight,
          0,
          styledCanvas.height,
        )
        brandingBg.addColorStop(0, "rgba(255, 255, 255, 0.05)")
        brandingBg.addColorStop(1, "rgba(255, 255, 255, 0.02)")
        ctx.fillStyle = brandingBg
        ctx.fillRect(0, styledCanvas.height - config.brandingHeight, styledCanvas.width, config.brandingHeight)

        // Add branding border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, styledCanvas.height - config.brandingHeight)
        ctx.lineTo(styledCanvas.width, styledCanvas.height - config.brandingHeight)
        ctx.stroke()

        // Function to draw the logo (exact from App copy.jsx)
        const drawLogoImage = (x, y, size) => {
          if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
            console.log("Drawing actual logo image")
            ctx.save()

            // Calculate dimensions maintaining aspect ratio
            const aspectRatio = logoImg.naturalWidth / logoImg.naturalHeight
            let drawWidth = size
            let drawHeight = size
            let drawX = x
            let drawY = y

            if (aspectRatio > 1) {
              // Logo is wider than tall
              drawHeight = size / aspectRatio
              drawY = y + (size - drawHeight) / 2
            } else {
              // Logo is taller than wide
              drawWidth = size * aspectRatio
              drawX = x + (size - drawWidth) / 2
            }

            // Draw the logo
            ctx.drawImage(logoImg, drawX, drawY, drawWidth, drawHeight)
            ctx.restore()
          } else {
            console.log("Drawing fallback logo")
            // Fallback: Create custom logo using canvas
            ctx.save()

            // Logo background circle
            const logoGradient = ctx.createRadialGradient(
              x + size / 2,
              y + size / 2,
              0,
              x + size / 2,
              y + size / 2,
              size / 2,
            )
            logoGradient.addColorStop(0, "#4F46E5")
            logoGradient.addColorStop(0.7, "#7C3AED")
            logoGradient.addColorStop(1, "#2563EB")

            ctx.fillStyle = logoGradient
            ctx.beginPath()
            ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2)
            ctx.fill()

            // Logo icon (stylized 'BN') - responsive font size
            ctx.fillStyle = "white"
            ctx.font = `bold ${size * 0.4}px Inter, system-ui, sans-serif`
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText("BN", x + size / 2, y + size / 2)

            ctx.restore()
          }
        }

        drawLogoImage(config.padding, brandingY - config.logoSize / 2, config.logoSize)

        // Enhanced brand text (exact from App copy.jsx)
        ctx.fillStyle = "white"
        ctx.font = `bold ${config.brandTextSize}px Inter, system-ui, sans-serif`
        ctx.textAlign = "left"

        // Adjust text positioning for mobile
        const textX = config.padding + config.logoSize + (config.isMobile ? (config.isSmallMobile ? 10 : 15) : 20)
        const brandTextY = brandingY - (config.isMobile ? (config.isSmallMobile ? 4 : 6) : 8)

        // Handle text wrapping on very small screens
        if (
          config.isSmallMobile &&
          "BRAND NOVA".length * config.brandTextSize * 0.6 > styledCanvas.width - textX - config.padding
        ) {
          // Split brand name if too long
          ctx.fillText("BRAND", textX, brandTextY - 10)
          ctx.fillText("NOVA", textX, brandTextY + 10)
        } else {
          ctx.fillText("BRAND NOVA", textX, brandTextY)
        }

        // Add interface title (exact from App copy.jsx)
        if (currentInterfaceItem) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
          ctx.font = `${config.subtitleTextSize}px Inter, system-ui, sans-serif`
          const subtitleY = brandingY + (config.isMobile ? (config.isSmallMobile ? 12 : 15) : 18)

          // Truncate title if too long on mobile
          let titleText = currentInterfaceItem.title
          if (config.isMobile && titleText.length > (config.isSmallMobile ? 15 : 20)) {
            titleText = titleText.substring(0, config.isSmallMobile ? 12 : 17) + "..."
          }
          ctx.fillText(titleText, textX, subtitleY)
        }

        // Right side branding (exact from App copy.jsx)
        if (!config.isSmallMobile || styledCanvas.width > 400) {
          ctx.textAlign = "right"
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
          ctx.font = `bold ${config.rightTextSize}px Inter, system-ui, sans-serif`

          const rightText = config.isMobile
            ? config.isSmallMobile
              ? "UI Showcase"
              : "UI Design"
            : "UI Design Showcase"
          ctx.fillText(rightText, styledCanvas.width - config.padding, brandTextY)

          // Add timestamp (exact from App copy.jsx)
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
          ctx.font = `${config.timestampTextSize}px Inter, system-ui, sans-serif`
          const timestamp = new Date().toLocaleDateString("en-US", {
            year: config.isMobile ? "2-digit" : "numeric",
            month: "short",
            day: "numeric",
          })
          ctx.fillText(
            timestamp,
            styledCanvas.width - config.padding,
            brandingY + (config.isMobile ? (config.isSmallMobile ? 12 : 15) : 18),
          )
        }

        // Add decorative elements (exact from App copy.jsx)
        if (!config.isSmallMobile) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
          ctx.lineWidth = config.isMobile ? 1 : 2
          ctx.beginPath()
          const lineStartX = textX + (config.isMobile ? 100 : 200)
          const lineEndX = styledCanvas.width - config.padding - (config.isMobile ? 80 : 200)
          if (lineEndX > lineStartX) {
            ctx.moveTo(lineStartX, brandingY - (config.isMobile ? 15 : 20))
            ctx.lineTo(lineEndX, brandingY - (config.isMobile ? 15 : 20))
            ctx.stroke()
          }
        }

        resolve(styledCanvas)
      }
      img.src = dataUrl
    })
  }

  // Animation pause utility
  const pauseAnimations = () => {
    const style = document.createElement("style")
    style.id = "screenshot-pause-animations"
    style.textContent = `
      *, *::before, *::after {
        animation-play-state: paused !important;
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        transition: none !important;
      }
      
      .typewriter-cursor,
      .cursor,
      .blinking-cursor {
        opacity: 1 !important;
        animation: none !important;
      }
      
      [style*="gradient"],
      .gradient,
      .bg-gradient-to-r,
      .bg-gradient-to-l,
      .bg-gradient-to-t,
      .bg-gradient-to-b,
      .bg-gradient-to-br,
      .bg-gradient-to-bl,
      .bg-gradient-to-tr,
      .bg-gradient-to-tl {
        background-attachment: scroll !important;
      }
      
      .typewriter,
      .typing-animation,
      [class*="type"] {
        opacity: 1 !important;
        width: auto !important;
        white-space: normal !important;
        overflow: visible !important;
      }
    `
    document.head.appendChild(style)
    return style
  }

  // HTML to Image capture function
  const captureWithHtmlToImage = async (element) => {
    return await htmlToImage.toPng(element, {
      quality: 1.0,
      pixelRatio: 2, // Match html2canvas scale
      backgroundColor: "#ffffff",
      width: window.innerWidth,
      height: window.innerHeight,
      cacheBust: true,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: true,
      skipAutoScale: false,
      includeQueryParams: true,
      style: {
        "font-display": "block",
        "image-rendering": "auto",
        transform: "translateZ(0)",
      },
      filter: (node) => {
        if (node.classList) {
          return !(
            (node.classList.contains("fixed") &&
              node.classList.contains("bottom-6") &&
              node.classList.contains("right-6")) ||
            node.classList.contains("screenshot-exclude") ||
            node.id === "screenshot-pause-animations"
          )
        }
        return true
      },
    })
  }

  // HTML2Canvas fallback function
  const captureWithHtml2Canvas = async (element) => {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Ensure consistent 2x scaling
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: 0,
      scrollY: 0,
      ignoreElements: (element) => {
        return (
          element.classList?.contains("fixed") &&
          element.classList?.contains("bottom-6") &&
          element.classList?.contains("right-6")
        )
      },
      onclone: (clonedDoc) => {
        const clonedElements = clonedDoc.querySelectorAll("*")
        clonedElements.forEach((el) => {
          const computedStyle = window.getComputedStyle(el)
          if (computedStyle.transform && computedStyle.transform !== "none") {
            el.style.transform = computedStyle.transform
          }
          if (computedStyle.backdropFilter && computedStyle.backdropFilter !== "none") {
            el.style.backdropFilter = "none"
            el.style.background = computedStyle.background || "rgba(255, 255, 255, 0.1)"
          }
        })
      },
    })

    return canvas.toDataURL("image/png", 1.0)
  }

  // Main screenshot capture function with fallback
  const captureScreenshot = async () => {
    if (!appRef.current) return

    const config = getScreenshotConfig()
    const currentInterface = interfaces[getCurrentInterfaceIndex()]

    const loadingNotification = showNotification("Capturing screenshot...", "info", 10000)

    try {
      console.log("Starting screenshot capture...")

      // Hide floating controls
      const floatingControls = document.querySelector(".fixed.bottom-6.right-6")
      if (floatingControls) floatingControls.style.display = "none"

      // Pause animations
      const animationStyle = pauseAnimations()

      // Wait for animations to settle
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Force completion of typewriter effects
      const typewriterElements = document.querySelectorAll('.typewriter, .typing-animation, [class*="type"]')
      typewriterElements.forEach((el) => {
        if (el.dataset.fullText) {
          el.textContent = el.dataset.fullText
        }
        el.style.opacity = "1"
        el.style.width = "auto"
        el.style.whiteSpace = "normal"
        el.style.overflow = "visible"
      })

      // Ensure all images are loaded
      const images = Array.from(document.images)
      const imagePromises = images.map((img) => {
        if (img.complete) return Promise.resolve()
        return new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve
          setTimeout(resolve, 2000)
        })
      })
      await Promise.all(imagePromises)

      // Wait for fonts
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready
      }

      await new Promise((resolve) => setTimeout(resolve, 500))

      let dataUrl
      let captureMethod = "html-to-image"

      try {
        // Try html-to-image first
        console.log("Attempting capture with html-to-image...")
        dataUrl = await captureWithHtmlToImage(appRef.current)
        console.log("html-to-image capture successful")
      } catch (htmlToImageError) {
        console.warn("html-to-image failed, falling back to html2canvas:", htmlToImageError)

        // Update notification to show fallback
        if (loadingNotification.parentNode) {
          loadingNotification.textContent = "Retrying with fallback method..."
          loadingNotification.style.background = "rgba(245, 158, 11, 0.95)" // Warning color
        }

        try {
          dataUrl = await captureWithHtml2Canvas(appRef.current)
          captureMethod = "html2canvas"
          console.log("html2canvas fallback successful")
        } catch (html2canvasError) {
          console.error("Both capture methods failed:", { htmlToImageError, html2canvasError })
          throw new Error("Both capture methods failed")
        }
      }

      // Clean up animation pause
      if (animationStyle && animationStyle.parentNode) {
        animationStyle.parentNode.removeChild(animationStyle)
      }

      // Process the screenshot with enhanced styling
      const styledCanvas = await processScreenshot(dataUrl, config, currentInterface)

      // Download the image (inline implementation from App copy.jsx)
      const link = document.createElement("a")
      const filename = currentInterface
        ? `brand-nova-${currentInterface.id}-${Date.now()}.png`
        : `brand-nova-ui-showcase-${Date.now()}.png`

      link.download = filename
      link.href = styledCanvas.toDataURL("image/png", 1.0)
      link.click()

      // Show success notification (mobile responsive)
      const isMobile = window.innerWidth <= 768
      const successToast = document.createElement("div")
      successToast.textContent = "Screenshot saved successfully!"
      successToast.style.cssText = `
        position: fixed;
        top: ${isMobile ? "10px" : "20px"};
        ${isMobile ? "left: 50%; transform: translateX(-50%);" : "right: 20px;"}
        background: rgba(34, 197, 94, 0.9);
        color: white;
        padding: ${isMobile ? "8px 16px" : "12px 20px"};
        border-radius: 8px;
        z-index: 10000;
        font-family: Inter, system-ui, sans-serif;
        backdrop-filter: blur(10px);
        font-size: ${isMobile ? "14px" : "16px"};
        max-width: ${isMobile ? "90vw" : "auto"};
        text-align: center;
      `
      document.body.appendChild(successToast)

      setTimeout(() => {
        if (successToast.parentNode) {
          document.body.removeChild(successToast)
        }
      }, 3000)

      console.log("Enhanced screenshot captured successfully!")

      // Remove loading notification
      if (loadingNotification.parentNode) {
        loadingNotification.parentNode.removeChild(loadingNotification)
      }

      showNotification(`Screenshot saved successfully! (${captureMethod})`, "success", 4000)
    } catch (error) {
      console.error("Screenshot capture failed:", error)

      // Remove loading notification
      if (loadingNotification.parentNode) {
        loadingNotification.parentNode.removeChild(loadingNotification)
      }

      showNotification("Screenshot capture failed. Please try again.", "error", 5000)
    } finally {
      // Clean up
      const animationStyle = document.getElementById("screenshot-pause-animations")
      if (animationStyle) {
        animationStyle.remove()
      }

      // Restore floating controls
      const floatingControls = document.querySelector(".fixed.bottom-6.right-6")
      if (floatingControls) floatingControls.style.display = "block"
    }
  }

  // Route Rendering
  const renderCurrentRoute = () => {
    if (currentRoute === "/") {
      return <HomePage onNavigate={navigate} />
    }

    const match = currentRoute.match(/\/interface\/(.+)/)
    if (match) {
      const interfaceData = interfaces.find((i) => i.id === match[1])
      if (interfaceData) {
        const InterfaceComponent = interfaceData.component
        return <InterfaceComponent />
      }
    }

    return <HomePage onNavigate={navigate} />
  }

  const currentInterfaceIndex = getCurrentInterfaceIndex()
  const canGoPrevious = currentInterfaceIndex > 0
  const canGoNext = currentInterfaceIndex < interfaces.length - 1

  return (
    <div ref={appRef} className="min-h-screen">
      {renderCurrentRoute()}

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

      {showcaseMode && (
        <style jsx global>{`
          * {
            cursor: none !important;
          }
        `}</style>
      )}
    </div>
  )
}

export default App
