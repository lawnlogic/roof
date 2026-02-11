document.addEventListener("DOMContentLoaded", () => {
  // Inject header styles - EXACT SIZING IN PX FOR CONSISTENCY ACROSS ALL PAGES
  const headerStyles = document.createElement('style');
  headerStyles.setAttribute('data-header-inject', 'true');
  headerStyles.textContent = `
        /* === NAVIGATION - MAXIMUM OVERRIDE === */
        nav#mainNav,
        nav[id="mainNav"],
        body > nav {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            z-index: 100 !important;
            transition: all 0.3s ease !important;
            padding: 0 24px !important;
            height: 80px !important;
            margin: 0 !important;
            border: none !important;
            box-sizing: border-box !important;
        }
        nav#mainNav.scrolled,
        nav[id="mainNav"].scrolled,
        body > nav.scrolled {
            background-color: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(16px) !important;
            box-shadow: 0 1px 3px rgba(27, 27, 47, 0.1) !important;
        }
        nav#mainNav.not-scrolled,
        nav[id="mainNav"].not-scrolled,
        body > nav.not-scrolled {
            background-color: transparent !important;
        }
        nav#mainNav > .container,
        nav[id="mainNav"] > .container,
        body > nav > .container {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            height: 100% !important;
            max-width: 1280px !important;
            margin: 0 auto !important;
            gap: 0 !important;
            flex-direction: row !important;
            width: 100% !important;
            padding: 0 !important;
        }
        nav#mainNav > div.container,
        nav[id="mainNav"] > div.container,
        body > nav > div.container {
            max-width: 1280px !important;
            padding: 0 !important;
            width: 100% !important;
            margin: 0 auto !important;
        }
        a.h-nav-logo,
        .h-nav-logo {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            text-decoration: none !important;
            color: #1B1B2F !important;
            flex-shrink: 0 !important;
        }
        .h-nav-logo-icon {
            width: 28px !important;
            height: 28px !important;
            background-color: #7B2D8E !important;
            border-radius: 8px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: white !important;
            font-weight: bold !important;
            font-size: 12px !important;
            flex-shrink: 0 !important;
        }
        .h-nav-logo-text {
            font-weight: 600 !important;
            font-size: 16px !important;
            letter-spacing: -0.025em !important;
            white-space: nowrap !important;
        }
        .h-nav-menu-desktop {
            display: none !important;
            gap: 32px !important;
            align-items: center !important;
            flex-direction: row !important;
            margin-left: auto !important;
        }
        @media (min-width: 1024px) {
            .h-nav-menu-desktop {
                display: flex !important;
            }
            .h-nav-menu-mobile {
                display: none !important;
            }
        }
        .h-nav-link,
        .h-nav-link:link,
        .h-nav-link:visited {
            background: none !important;
            border: none !important;
            color: #6E6E82 !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            transition: color 0.3s ease !important;
            padding: 0 !important;
            margin: 0 !important;
            text-decoration: none !important;
        }
        .h-nav-link:hover,
        .h-nav-link:focus {
            color: #1B1B2F !important;
        }
        /* Override ALL button styles from external stylesheets */
        nav button,
        nav .h-nav-link,
        nav .h-button-primary,
        nav .h-nav-hamburger,
        nav .h-nav-hamburger-mobile,
        button.h-nav-link,
        button.h-button-primary,
        button.h-nav-hamburger,
        button.h-nav-hamburger-mobile {
            position: relative !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-family: inherit !important;
            line-height: 1 !important;
            letter-spacing: inherit !important;
            font-variant: normal !important;
            text-transform: none !important;
        }
        button.h-nav-link,
        .h-nav-link {
            background: none !important;
            border: none !important;
            color: #6E6E82 !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            transition: color 0.3s ease !important;
            padding: 0 !important;
            margin: 0 !important;
            text-decoration: none !important;
        }
        button.h-nav-link:hover,
        .h-nav-link:hover,
        button.h-nav-link:focus,
        .h-nav-link:focus {
            color: #1B1B2F !important;
        }
        button.h-button-primary,
        .h-button-primary {
            background-color: #7B2D8E !important;
            color: white !important;
            padding: 12px 24px !important;
            border-radius: 9999px !important;
            border: none !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            font-size: 14px !important;
            line-height: 1 !important;
            height: auto !important;
            min-height: auto !important;
            min-width: auto !important;
        }
        button.h-button-primary:hover,
        .h-button-primary:hover {
            background-color: #662375 !important;
            box-shadow: 0 8px 16px rgba(123, 45, 142, 0.3) !important;
        }
        button.h-nav-hamburger,
        .h-nav-hamburger {
            background: none !important;
            border: none !important;
            cursor: pointer !important;
            padding: 8px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: auto !important;
            height: auto !important;
            flex: 0 0 auto !important;
            margin: 0 !important;
            min-width: auto !important;
            min-height: auto !important;
            z-index: 1001 !important;
            position: relative !important;
            pointer-events: auto !important;
        }
        button.h-nav-hamburger-mobile,
        .h-nav-hamburger-mobile {
            background: none !important;
            border: none !important;
            cursor: pointer !important;
            padding: 8px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: auto !important;
            height: auto !important;
            flex: 0 0 auto !important;
            margin: 0 !important;
            flex-shrink: 0 !important;
            min-width: auto !important;
            min-height: auto !important;
            z-index: 1001 !important;
            position: relative !important;
            pointer-events: auto !important;
        }
        .h-nav-hamburger svg,
        button.h-nav-hamburger svg,
        .h-nav-hamburger-mobile svg,
        button.h-nav-hamburger-mobile svg {
            width: 28px !important;
            height: 24px !important;
            display: inline !important;
        }
        @media (max-width: 1023px) {
            .h-nav-hamburger-mobile,
            button.h-nav-hamburger-mobile {
                display: flex !important;
            }
        }
        @media (min-width: 1024px) {
            .h-nav-hamburger-mobile,
            button.h-nav-hamburger-mobile {
                display: none !important;
            }
        }
        /* Mobile menu */
        .h-mobile-menu {
            display: none !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background: rgba(0, 0, 0, 0.5) !important;
            z-index: 1000 !important;
            pointer-events: auto !important;
        }
        .h-mobile-menu.open {
            display: block !important;
            pointer-events: auto !important;
        }
        .h-mobile-menu-panel,
        div.h-mobile-menu-panel {
            position: absolute !important;
            top: 80px !important;
            left: 0 !important;
            right: 0 !important;
            background: white !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            pointer-events: auto !important;
        }
        .h-mobile-menu-panel button,
        div.h-mobile-menu-panel button {
            display: block !important;
            width: 100% !important;
            text-align: left !important;
            padding: 16px 24px !important;
            border: none !important;
            background: none !important;
            font-weight: 500 !important;
            color: #1B1B2F !important;
            cursor: pointer !important;
            font-size: 16px !important;
            transition: background-color 0.2s ease !important;
            margin: 0 !important;
            box-sizing: border-box !important;
        }
        .h-mobile-menu-panel button:hover,
        div.h-mobile-menu-panel button:hover {
            background-color: #f3f4f6 !important;
        }

        body,
        body.scroll-smooth {
            padding-top: 80px !important;
            margin: 0 !important;
        }
  `;
  document.head.appendChild(headerStyles);

  // Inject header HTML - EXACT structure from index.html
  document.body.insertAdjacentHTML('afterbegin', `
    <!-- Navigation -->
    <nav class="not-scrolled" id="mainNav">
        <div class="container">
            <a href="index.html" class="h-nav-logo">
                <div class="h-nav-logo-icon">DE</div>
                <span class="h-nav-logo-text">Deep Edge</span>
            </a>

            <!-- Desktop Navigation -->
            <div class="h-nav-menu-desktop">
                <button class="h-nav-link" onclick="window.location.href='dashboard.html'">Dashboard</button>
                <button class="h-nav-link" onclick="window.location.href='jobs.html'">Jobs</button>
                <button class="h-nav-link" onclick="window.location.href='profile.html'">Profile</button>
                <button class="h-nav-link" onclick="window.location.href='help.html'">Help</button>
                <button class="h-button-primary" onclick="window.location.href='index.html'">Home</button>
                <button class="h-nav-hamburger" id="hamburgerBtn" onclick="toggleMobileMenu()">
                    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="28" height="4" rx="2" fill="#1B1B2F"/>
                        <rect y="10" width="28" height="4" rx="2" fill="#1B1B2F"/>
                        <rect y="20" width="28" height="4" rx="2" fill="#1B1B2F"/>
                    </svg>
                </button>
            </div>

            <!-- Mobile Hamburger (separate for mobile view) -->
            <button class="h-nav-hamburger-mobile" id="mobileMenuBtn" onclick="toggleMobileMenu()">
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="4" rx="2" fill="#1B1B2F"/>
                    <rect y="10" width="28" height="4" rx="2" fill="#1B1B2F"/>
                    <rect y="20" width="28" height="4" rx="2" fill="#1B1B2F"/>
                </svg>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div class="h-mobile-menu" id="mobileMenu" onclick="closeMobileMenu()">
        <div class="h-mobile-menu-panel" onclick="event.stopPropagation()">
            <button onclick="window.location.href='dashboard.html'; closeMobileMenu();">Dashboard</button>
            <button onclick="window.location.href='jobs.html'; closeMobileMenu();">Jobs</button>
            <button onclick="window.location.href='profile.html'; closeMobileMenu();">Profile</button>
            <button onclick="window.location.href='help.html'; closeMobileMenu();">Help</button>
            <button onclick="signOut(); closeMobileMenu();" style="color: #dc2626; border-top: 1px solid #e5e7eb; padding-top: 1rem; margin-top: 1rem;">Sign Out</button>
        </div>
    </div>
  `);

  // Mobile menu functions
  window.toggleMobileMenu = function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('open');
  }

  window.closeMobileMenu = function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('open');
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    if (mobileMenu && mobileMenuBtn && hamburgerBtn) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        window.closeMobileMenu();
      }
    }
  });

  // Scroll effect on navigation
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
      nav.classList.remove('not-scrolled');
    } else {
      nav.classList.remove('scrolled');
      nav.classList.add('not-scrolled');
    }
  });

  // Sign out function
  window.signOut = function() {
    if (confirm('Sign out of Deep Edge?')) {
      // Clear any stored auth data
      localStorage.clear();
      sessionStorage.clear();
      // Redirect to login
      window.location.href = 'login.html';
    }
  }
});