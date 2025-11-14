// Simplified Navigation System for Header Layout
document.addEventListener('DOMContentLoaded', function () {
  // Ensure viewport meta tag is present for mobile scaling
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1'
    document.head.appendChild(meta)
  }

  // Normalize main containers for mobile/desktop consistency
  function normalizeMainContainers() {
    const containers = [
      document.body,
      document.querySelector('.homepage'),
      document.querySelector('.main-left'),
      document.querySelector('.main-right'),
    ]
    containers.forEach(function (el) {
      if (el) {
        el.style.width = '100%'
        el.style.minHeight = '100vh'
        el.style.maxWidth = '100%'
      }
    })
  }
  normalizeMainContainers()
  window.addEventListener('resize', normalizeMainContainers)
  const navbar = document.getElementById('navbar')
  const hamburgerMenu = document.getElementById('hamburger-menu')
  let isMobileExpanded = false

  // Hamburger menu click handler
  hamburgerMenu.addEventListener('click', function () {
    toggleMobileMenu()
  })

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (
      isMobileExpanded &&
      !navbar.contains(event.target) &&
      !hamburgerMenu.contains(event.target)
    ) {
      closeMobileMenu()
    }
  })

  // Handle window resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      // Desktop: Show navbar, hide hamburger
      closeMobileMenu()
      showDesktopNavbar()
    } else {
      // Mobile: Show hamburger, hide navbar
      showMobileHamburger()
    }
  })

  function showDesktopNavbar() {
    navbar.style.display = 'flex'
    hamburgerMenu.style.display = 'none'
  }

  function showMobileHamburger() {
    hamburgerMenu.style.display = 'flex'
    if (!isMobileExpanded) {
      navbar.style.display = 'none'
    }
  }

  function toggleMobileMenu() {
    if (isMobileExpanded) {
      closeMobileMenu()
    } else {
      openMobileMenu()
    }
  }

  function openMobileMenu() {
    navbar.classList.add('mobile-expanded')
    navbar.style.display = 'flex'
    hamburgerMenu.classList.add('active')
    isMobileExpanded = true

    // Add backdrop blur effect
    document.body.style.overflow = 'hidden'
  }

  function closeMobileMenu() {
    navbar.classList.remove('mobile-expanded')
    hamburgerMenu.classList.remove('active')
    isMobileExpanded = false

    // Remove backdrop blur effect
    document.body.style.overflow = 'auto'

    if (window.innerWidth <= 768) {
      // Keep hamburger visible on mobile
      navbar.style.display = 'none'
    }
  }

  // Initialize based on screen size
  if (window.innerWidth <= 768) {
    showMobileHamburger()
  } else {
    showDesktopNavbar()
  }

  // Trigger SVG animation
  const backgroundSvg = document.querySelector('.background-svg')
  if (backgroundSvg) {
    setTimeout(() => {
      backgroundSvg.classList.add('active')
    }, 200)
  }

  // Brand Animation - Full text to Logo after page load

  const brandLogo = document.querySelector('.brand-logo')
  const brandTextFull = document.querySelector('.brand-text-full')
  const brandTextShort = document.querySelector('.brand-text-short')

  if (brandLogo && brandTextFull && brandTextShort) {
    // Start the animation sequence (no scaling on logo)
    setTimeout(() => {
      brandTextFull.classList.add('hide')
      // Do NOT add any scaling/growing class to brandLogo
      // Only show the short text after a delay
      setTimeout(() => {
        brandTextShort.classList.add('show')
      }, 400)
    }, 2500) // Start after 2.5 seconds
  }

  // Header scroll effect
  const header = document.querySelector('.top-header')
  let lastScrollTop = 0

  window.addEventListener('scroll', function () {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop

    // Add scrolled class when user scrolls down more than 10px
    if (currentScroll > 10) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
  })
})
