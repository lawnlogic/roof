document.addEventListener("DOMContentLoaded", () => {
  // Inject header HTML with hamburger SVG
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="deep-edge-header">
      <div class="header-content">
        <div class="logo-container">
          <img src="Images/logo.png" alt="Deep Edge Logo" class="logo-img">
          <div class="logo"><b>Deep Edge</b></div>
        </div>
        
        <!-- Hamburger SVG button -->
        <button class="menu-hamburger" aria-label="Open menu" id="menu-hamburger">
          <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="4" rx="2" fill="#412e75"/>
            <rect y="10" width="28" height="4" rx="2" fill="#412e75"/>
            <rect y="20" width="28" height="4" rx="2" fill="#412e75"/>
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