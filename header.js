document.addEventListener("DOMContentLoaded", () => {
  // Inject header styles
  const headerStyles = document.createElement('style');
  headerStyles.textContent = `
    :root {
      --background: 270 30% 97%;
      --foreground: 245 35% 15%;
      --card: 0 0% 100%;
      --card-foreground: 245 35% 15%;
      --primary: 288 52% 36%;
      --primary-foreground: 0 0% 100%;
      --secondary: 270 20% 96%;
      --muted: 270 20% 96%;
      --muted-foreground: 245 10% 45%;
      --accent: 288 52% 36%;
      --accent-foreground: 0 0% 100%;
      --border: 245 20% 88%;
      --input: 245 20% 88%;
      --ring: 288 52% 36%;
      --radius: 1.75rem;
    }

    .deep-edge-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      transition: all 0.3s ease;
      padding: 0 1.5rem;
      height: 5rem;
      background-color: transparent;
    }

    .deep-edge-header.scrolled {
      background-color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(16px);
      box-shadow: 0 1px 3px rgba(27, 27, 47, 0.1);
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: 1280px;
      margin: 0 auto;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: #1B1B2F;
    }

    .logo-img {
      width: 1.75rem;
      height: 1.75rem;
      background-color: #7B2D8E;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
    }

    .logo {
      font-weight: 600;
      font-size: 1rem;
      letter-spacing: -0.025em;
      font-family: 'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif;
      color: #1B1B2F;
    }

    .menu-hamburger {
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

    .menu-hamburger svg {
      width: 28px;
      height: 24px;
    }

    .header-nav {
      display: none;
      position: fixed;
      top: 5rem;
      left: 0;
      right: 0;
      background: white;
      flex-direction: column;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header-nav.open {
      display: flex;
    }

    .header-nav ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .header-nav li {
      margin: 0;
      padding: 0;
    }

    .header-nav a {
      display: block;
      padding: 1rem 1.5rem;
      color: #1B1B2F;
      text-decoration: none;
      font-weight: 500;
      font-size: 1rem;
      transition: background-color 0.2s ease;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .header-nav a:hover {
      background-color: #f3f4f6;
    }

    .header-nav #sign-out-link {
      color: #dc2626;
      border-top: 1px solid #e5e7eb;
    }

    .header-nav #sign-out-link:hover {
      background-color: #fee2e2;
    }

    .header-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 99;
    }

    .header-overlay.open {
      display: block;
    }

    @media (min-width: 1024px) {
      .menu-hamburger {
        display: none;
      }

      .header-nav {
        position: static;
        display: flex !important;
        flex-direction: row;
        gap: 2rem;
        align-items: center;
        background: transparent;
        box-shadow: none;
        padding: 0;
      }

      .header-nav ul {
        flex-direction: row;
        gap: 2rem;
      }

      .header-nav a {
        padding: 0;
        color: #6E6E82;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .header-nav a:hover {
        background-color: transparent;
        color: #1B1B2F;
      }

      .header-nav #sign-out-link {
        color: #6E6E82;
        border-top: none;
      }

      .header-nav #sign-out-link:hover {
        background-color: transparent;
        color: #1B1B2F;
      }

      .header-overlay {
        display: none !important;
      }
    }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      padding-top: 5rem;
    }
  `;
  document.head.appendChild(headerStyles);

  // Inject header HTML
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="deep-edge-header">
      <div class="header-content">
        <a href="index.html" class="logo-container" style="text-decoration: none;">
          <div class="logo-img" style="background-color: #7B2D8E; width: 1.75rem; height: 1.75rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.75rem;">DE</div>
          <div class="logo">Deep Edge</div>
        </a>
        
        <!-- Hamburger SVG button -->
        <button class="menu-hamburger" aria-label="Open menu" id="menu-hamburger">
          <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="4" rx="2" fill="#1B1B2F"/>
            <rect y="10" width="28" height="4" rx="2" fill="#1B1B2F"/>
            <rect y="20" width="28" height="4" rx="2" fill="#1B1B2F"/>
          </svg>
        </button>
      </div>

      <nav class="header-nav" id="header-nav">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="dashboard.html">Dashboard</a></li>
          <li><a href="jobs.html">Jobs</a></li>
          <li><a href="profile.html">Profile</a></li>
          <li><a href="#" id="sign-out-link">Sign Out</a></li>
        </ul>
      </nav>

      <div class="header-overlay" id="header-overlay"></div>
    </header>
  `);

  // Menu toggle logic
  const hamburger = document.getElementById('menu-hamburger');
  const nav = document.getElementById('header-nav');
  const overlay = document.getElementById('header-overlay');
  const signOutLink = document.getElementById('sign-out-link');
  const header = document.querySelector('.deep-edge-header');

  function openMenu() {
    nav.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);

  // Scroll effect for header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Sign out
  signOutLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Sign out of Deep Edge?')) {
      import("https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js")
        .then(module => {
          const { getAuth, signOut } = module;
          signOut(getAuth()).then(() => {
            window.location.href = 'login.html';
          });
        })
        .catch(() => {
          window.location.href = 'login.html';
        });
    }
  });

  // Close menu on nav link click (mobile)
  document.querySelectorAll('.header-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) closeMenu();
    });
  });
});