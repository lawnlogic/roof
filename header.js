document.addEventListener("DOMContentLoaded", () => {
  // Inject header HTML
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="deep-edge-header">
      <div class="header-content">
        <a href="index.html" class="header-logo">Deep Edge</a>
        
        <button class="hamburger" aria-label="Open menu" id="hamburger-btn">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="20" width="100" height="12" rx="6" fill="#e5e5e5"/>
            <rect y="44" width="100" height="12" rx="6" fill="#e5e5e5"/>
            <rect y="68" width="100" height="12" rx="6" fill="#e5e5e5"/>
          </svg>
        </button>
      </div>

      <nav class="header-nav" id="header-nav">
        <ul>
          <li><a href="index.html">🏡 Home</a></li>
          <li><a href="your_quotes.html">📋 Your Quotes</a></li>
          <li><a href="profile.html">⚙️ Profile</a></li>
          <li><a href="#" id="sign-out-link">🚪 Sign Out</a></li>
        </ul>
      </nav>

      <div class="header-overlay" id="header-overlay"></div>
    </header>
  `);

  // Menu toggle logic
  const hamburger = document.getElementById('hamburger-btn');
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
      // Firebase sign out
      import("https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js")
        .then(module => {
          const { getAuth, signOut } = module;
          signOut(getAuth()).then(() => {
            window.location.href = 'login.html';
          });
        })
        .catch(() => {
          // Fallback: just redirect
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