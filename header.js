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

  // ---- SMS Modal & Template Helpers ----
  window.buildMessageFromTemplate = function(templateName, vars) {
    switch ((templateName || '').toString()) {
      case 'quote_sent':
        return `Hi ${vars.clientName || 'Customer'}, your quote is ready!\nView: ${vars.quoteUrl || ''}\n- ${vars.vendorName || 'Company'} (${vars.vendorNumber || ''})`;
      case 'quote_reminder':
        return `Hi ${vars.clientName || 'Customer'},\nQuote expires soon – view: ${vars.quoteUrl || ''}\n- ${vars.vendorName || 'Company'} (${vars.vendorNumber || ''})`;
      case 'service_scheduled':
        return `Hi ${vars.clientName || 'Customer'}, service booked for ${vars.dateTime || 'TBA'}.\nChanges? Call ${vars.vendorNumber || ''}\n- ${vars.vendorName || 'Company'}`;
      case 'service_cancelled':
        return `Hi ${vars.clientName || 'Customer'}, today's service cancelled.\nQuestions? Call ${vars.vendorNumber || ''}\n- ${vars.vendorName || 'Company'}`;
      case 'invoice_sent':
        return `Hi ${vars.clientName || 'Customer'}, invoice ${vars.amount || ''} sent.\nView & pay: ${vars.invoiceUrl || ''}\n- ${vars.vendorName || 'Company'} (${vars.vendorNumber || ''})`;
      case 'invoice_reminder':
        return `Hi ${vars.clientName || 'Customer'}, invoice due ${vars.dueDate || 'soon'}.\nPay here: ${vars.invoiceUrl || ''}\n- ${vars.vendorName || 'Company'} (${vars.vendorNumber || ''})`;
      default:
        return vars && vars.message ? vars.message : '';
    }
  };

  window.showSmsModal = function(clientName, phone, message, logPayload) {
    // Remove existing SMS modal if present
    const existing = document.getElementById('sms-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'sms-modal-overlay';
    overlay.style.cssText = 'position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:9999;';

    const box = document.createElement('div');
    box.className = 'sms-modal-box';
    box.style.cssText = 'background:#fff;border-radius:8px;padding:18px;max-width:460px;width:92%;box-shadow:0 6px 24px rgba(0,0,0,0.2);';

    box.innerHTML = `
      <h3 style="margin:0 0 8px 0;font-size:18px;color:#1f2937;">Text Message to ${clientName || 'Customer'}</h3>
      <div style="margin-bottom:12px;color:#6b7280;font-size:13px;">Recipient: ${phone || 'Unknown'}</div>
    `;

    const textarea = document.createElement('textarea');
    textarea.style.cssText = 'width:100%;min-height:110px;padding:10px;font-size:14px;border:1px solid #e5e7eb;border-radius:6px;font-family:inherit;';
    textarea.value = message || '';

    const buttons = document.createElement('div');
    buttons.style.cssText = 'display:flex;justify-content:flex-end;gap:8px;margin-top:12px;';

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.style.cssText = 'padding:8px 16px;border:1px solid #e5e7eb;background:#f3f4f6;color:#374151;border-radius:6px;font-weight:500;cursor:pointer;';
    backBtn.addEventListener('click', () => overlay.remove());

    const sendBtn = document.createElement('button');
    sendBtn.textContent = 'Send Text';
    sendBtn.style.cssText = 'padding:8px 16px;background:#7c3aed;color:white;border:none;border-radius:6px;font-weight:500;cursor:pointer;';
    sendBtn.addEventListener('click', async () => {
      sendBtn.disabled = true;
      const finalMsg = textarea.value || '';
      const phoneClean = (phone || '').toString().replace(/[^+0-9]/g, '');
      if (!phoneClean) {
        alert('No phone number available');
        sendBtn.disabled = false;
        return;
      }
      
      // Try to log activity to backend (non-blocking)
      try {
        if (window.WORKER_URL && logPayload) {
          fetch(`${window.WORKER_URL}/api/sms-log`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipient: phoneClean, message: finalMsg, meta: logPayload || {} })
          }).catch(() => {});
        }
      } catch (e) {}

      // Open SMS link
      const link = `sms:${phoneClean}?body=${encodeURIComponent(finalMsg)}`;
      window.location.href = link;
      setTimeout(() => overlay.remove(), 500);
    });

    buttons.appendChild(backBtn);
    buttons.appendChild(sendBtn);
    box.appendChild(textarea);
    box.appendChild(buttons);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  };
});