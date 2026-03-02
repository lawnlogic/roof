document.addEventListener("DOMContentLoaded", () => {
  // Inject favicon
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.href = 'Images/logo.png';
  document.head.appendChild(favicon);

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
            .h-nav-hamburger,
            button.h-nav-hamburger,
            #hamburgerBtn {
                display: none !important;
            }
        }
        @media (min-width: 1024px) {
            .h-nav-hamburger-mobile,
            button.h-nav-hamburger-mobile,
            #mobileMenuBtn {
                display: none !important;
            }
            .h-nav-hamburger,
            button.h-nav-hamburger,
            #hamburgerBtn {
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

        /* Modal styles */
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.25s;
        }
        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        .modal-content {
            background: white;
            border: 1px solid rgba(229, 231, 235, 0.5);
            border-radius: 20px;
            width: 90%;
            max-width: 480px;
            padding: 32px;
            box-shadow: 0 24px 70px rgba(27, 27, 47, 0.12);
            transform: translateY(30px);
            transition: all 0.3s ease;
        }
        .modal-overlay.active .modal-content {
            transform: translateY(0);
        }
        .modal-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1B1B2F;
            margin-bottom: 16px;
        }
        .modal-buttons {
            display: flex;
            gap: 12px;
            margin-top: 24px;
        }
        .btn-modal {
            padding: 14px 24px;
            border-radius: 9999px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            flex: 1;
        }
        .btn-cancel {
            background: #e5e7eb;
            color: #1B1B2F;
        }
        .btn-cancel:hover {
            background: #d1d5db;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .btn-primary-modal {
            background: #7B2D8E;
            color: white;
            box-shadow: 0 4px 15px rgba(123, 45, 142, 0.25);
        }
        .btn-primary-modal:hover {
            background: #662375;
            box-shadow: 0 8px 20px rgba(123, 45, 142, 0.35);
            transform: translateY(-2px);
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
                <button class="h-nav-link" onclick="window.location.href='financials.html'">Financials</button>
                <button class="h-nav-link" onclick="window.location.href='jobs.html'">Jobs</button>
                <button class="h-nav-link" onclick="window.location.href='profile.html'">Profile</button>
                <button class="h-nav-link" onclick="window.location.href='help.html'">Help</button>
                <button class="h-button-primary" id="navAuthBtn" onclick="navigateAuth()">Login / Sign Up</button>
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
            <button onclick="window.location.href='financials.html'; closeMobileMenu();">Financials</button>
            <button onclick="window.location.href='jobs.html'; closeMobileMenu();">Jobs</button>
            <button onclick="window.location.href='profile.html'; closeMobileMenu();">Profile</button>
            <button onclick="window.location.href='help.html'; closeMobileMenu();">Help</button>
            <button id="mobileLoginBtn" onclick="window.location.href='index.html#final-cta'; closeMobileMenu();" style="display: none; color: #7B2D8E; border-top: 1px solid #e5e7eb; padding-top: 1rem; margin-top: 1rem; font-weight: 600;">Login / Sign Up</button>
            <button id="mobileSignOutBtn" onclick="signOut(); closeMobileMenu();" style="display: none; color: #dc2626; border-top: 1px solid #e5e7eb; padding-top: 1rem; margin-top: 1rem;">Sign Out</button>
        </div>
    </div>

    <!-- Sign Out Modal -->
    <div id="signOutModalOverlay" class="modal-overlay">
        <div class="modal-content" onclick="event.stopPropagation()">
            <h2 class="modal-title">Sign Out</h2>
            <p style="margin-bottom:20px; color:#4b5563;">
                Are you sure you want to sign out of Deep Edge?
            </p>
            <div class="modal-buttons">
                <button class="btn-modal btn-cancel" id="cancelSignOutBtn" onclick="closeSignOutModal()">Cancel</button>
                <button class="btn-modal btn-primary-modal" id="confirmSignOutBtn">Yes – Sign Out</button>
            </div>
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

  // Close mobile menu on window resize
  window.addEventListener('resize', () => {
    window.closeMobileMenu();
  });

  // Modal functions for sign out
  window.showSignOutModal = function() {
    const modal = document.getElementById('signOutModalOverlay');
    if (modal) {
      modal.classList.add('active');
    }
  }

  window.closeSignOutModal = function() {
    const modal = document.getElementById('signOutModalOverlay');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  window.confirmSignOut = function() {
    console.log('Sign out confirmed');
    // Clear storage immediately
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to home - Firebase will handle auth state on page load
    window.location.href = 'index.html#final-cta';
  }

  // Sign out function - shows modal
  window.signOut = function() {
    showSignOutModal();
  }

  // Attach event listeners to modal buttons
  const cancelSignOutBtn = document.getElementById('cancelSignOutBtn');
  const confirmSignOutBtn = document.getElementById('confirmSignOutBtn');
  
  if (cancelSignOutBtn) {
    cancelSignOutBtn.addEventListener('click', function() {
      window.closeSignOutModal();
    });
  }
  
  if (confirmSignOutBtn) {
    confirmSignOutBtn.addEventListener('click', async function() {
      confirmSignOutBtn.disabled = true;
      confirmSignOutBtn.textContent = 'Signing out...';
      
      try {
        // Dynamically import Firebase Auth and sign out
        const { getAuth, signOut } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js');
        const auth = getAuth();
        await signOut(auth);
        console.log('Firebase sign out successful');
      } catch (err) {
        console.error('Firebase sign out error:', err);
      }
      
      // Clear all auth data
      localStorage.removeItem('isLoggedIn');
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    });
  }

  // Close modal when clicking outside
  const signOutModal = document.getElementById('signOutModalOverlay');
  if (signOutModal) {
    signOutModal.addEventListener('click', function(e) {
      if (e.target === signOutModal) {
        closeSignOutModal();
      }
    });
  }

  // Auth state detection
  window.navigateAuth = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      // If logged in, go to dashboard
      window.location.href = 'dashboard.html';
    } else {
      // If not logged in, go to signup
      window.location.href = 'index.html#final-cta';
    }
  }

  // Check auth state and update header
  function updateAuthUI(isLoggedIn) {
    const navAuthBtn = document.getElementById('navAuthBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileSignOutBtn = document.getElementById('mobileSignOutBtn');
    
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
      if (navAuthBtn) navAuthBtn.textContent = 'Dashboard';
      if (navAuthBtn) navAuthBtn.onclick = () => { window.location.href = 'dashboard.html'; };
      if (mobileLoginBtn) mobileLoginBtn.style.setProperty('display', 'none', 'important');
      if (mobileSignOutBtn) mobileSignOutBtn.style.setProperty('display', 'block', 'important');
    } else {
      localStorage.removeItem('isLoggedIn');
      if (navAuthBtn) navAuthBtn.textContent = 'Login / Sign Up';
      if (navAuthBtn) navAuthBtn.onclick = () => { window.location.href = 'index.html#final-cta'; };
      if (mobileLoginBtn) mobileLoginBtn.style.setProperty('display', 'block', 'important');
      if (mobileSignOutBtn) mobileSignOutBtn.style.setProperty('display', 'none', 'important');
    }
  }

  // Initialize Firebase auth check (runs after Firebase is loaded on pages that use it)
  // First, set initial state from localStorage immediately
  const isLoggedInStorage = localStorage.getItem('isLoggedIn') === 'true';
  updateAuthUI(isLoggedInStorage);

  // Then try to check Firebase auth if available (will override localStorage if found)
  setTimeout(() => {
    try {
      // Check if Firebase auth is available on this page
      if (window.firebase && window.firebase.auth) {
        const auth = window.firebase.auth();
        auth.onAuthStateChanged((user) => {
          updateAuthUI(!!user);
        });
      }
    } catch (err) {
      // Firebase not available - that's OK, localStorage is being used
      console.log('Firebase auth not available on this page');
    }
  }, 500);
});