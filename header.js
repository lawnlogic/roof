document.addEventListener("DOMContentLoaded", () => {
  // Inject header styles - EXACT from index.html
  const headerStyles = document.createElement('style');
  headerStyles.textContent = `
        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            transition: all 0.3s ease;
            padding: 0 1.5rem;
            height: 5rem;
        }
        nav.scrolled {
            background-color: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(16px);
            box-shadow: 0 1px 3px rgba(27, 27, 47, 0.1);
        }
        nav.not-scrolled {
            background-color: transparent;
        }
        nav .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            max-width: 1280px;
            margin: 0 auto;
        }
        .nav-logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: #1B1B2F;
        }
        .nav-logo-icon {
            width: 1.75rem;
            height: 1.75rem;
            background-color: #7B2D8E;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 0.75rem;
        }
        .nav-logo-text {
            font-weight: 600;
            font-size: 1rem;
            letter-spacing: -0.025em;
        }
        .nav-menu-desktop {
            display: none;
            gap: 2rem;
            align-items: center;
        }
        @media (min-width: 1024px) {
            .nav-menu-desktop {
                display: flex;
            }
            .nav-menu-mobile {
                display: none;
            }
        }
        .nav-link {
            background: none;
            border: none;
            color: #6E6E82;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        .nav-link:hover {
            color: #1B1B2F;
        }
        .button-primary {
            background-color: #7B2D8E;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .button-primary:hover {
            background-color: #662375;
            box-shadow: 0 8px 16px rgba(123, 45, 142, 0.3);
        }
        .nav-hamburger {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: auto;
            flex: 0 0 auto;
        }
        .nav-hamburger svg {
            width: 28px;
            height: 24px;
        }
        .nav-hamburger-mobile {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: auto;
            flex: 0 0 auto;
        }
        .nav-hamburger-mobile svg {
            width: 28px;
            height: 24px;
        }
        @media (min-width: 1024px) {
            .nav-hamburger-mobile {
                display: none;
            }
        }
        /* Mobile menu */
        .mobile-menu {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99;
        }
        .mobile-menu.open {
            display: block;
        }
        .mobile-menu-panel {
            position: absolute;
            top: 5rem;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .mobile-menu-panel button {
            display: block;
            width: 100%;
            text-align: left;
            padding: 1rem 1.5rem;
            border: none;
            background: none;
            font-weight: 500;
            color: #1B1B2F;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.2s ease;
        }
        .mobile-menu-panel button:hover {
            background-color: #f3f4f6;
        }

        body {
            padding-top: 5rem;
        }
  `;
  document.head.appendChild(headerStyles);

  // Inject header HTML - EXACT structure from index.html
  document.body.insertAdjacentHTML('afterbegin', `
    <!-- Navigation -->
    <nav class="not-scrolled" id="mainNav">
        <div class="container">
            <a href="index.html" class="nav-logo">
                <div class="nav-logo-icon">DE</div>
                <span class="nav-logo-text">Deep Edge</span>
            </a>

            <!-- Desktop Navigation -->
            <div class="nav-menu-desktop">
                <button class="nav-link" onclick="window.location.href='dashboard.html'">Dashboard</button>
                <button class="nav-link" onclick="window.location.href='jobs.html'">Jobs</button>
                <button class="nav-link" onclick="window.location.href='profile.html'">Profile</button>
                <button class="button-primary" onclick="window.location.href='index.html'" style="padding: 0.5rem 1.5rem; font-size: 0.875rem;">Home</button>
                <button class="nav-hamburger" id="hamburgerBtn" onclick="toggleMobileMenu()">
                    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="28" height="4" rx="2" fill="#1B1B2F"/>
                        <rect y="10" width="28" height="4" rx="2" fill="#1B1B2F"/>
                        <rect y="20" width="28" height="4" rx="2" fill="#1B1B2F"/>
                    </svg>
                </button>
            </div>

            <!-- Mobile Hamburger (separate for mobile view) -->
            <button class="nav-hamburger-mobile" id="mobileMenuBtn" onclick="toggleMobileMenu()">
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="4" rx="2" fill="#1B1B2F"/>
                    <rect y="10" width="28" height="4" rx="2" fill="#1B1B2F"/>
                    <rect y="20" width="28" height="4" rx="2" fill="#1B1B2F"/>
                </svg>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" id="mobileMenu" onclick="closeMobileMenu()">
        <div class="mobile-menu-panel" onclick="event.stopPropagation()">
            <button onclick="window.location.href='dashboard.html'; closeMobileMenu();">Dashboard</button>
            <button onclick="window.location.href='jobs.html'; closeMobileMenu();">Jobs</button>
            <button onclick="window.location.href='profile.html'; closeMobileMenu();">Profile</button>
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