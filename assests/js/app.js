/* ============================================================
   ALAT BY WEMA — Power Hacks by Grok
   Breaking the ordinary. Creative. Limitless. 💡
   ============================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ---------- 1. HAMBURGER + MOBILE NAV ---------- */
const menu = $(".hamburger");
const nav_menu = $(".nav_menu");

if (menu) {
  menu.addEventListener("click", () => {
    menu.classList.toggle("open");
    nav_menu.classList.toggle("show");
    document.body.classList.toggle("nav-open");
  });
}

/* ---------- 2. SCROLL HEADER + SCROLL-UP ---------- */
const scrollHeader = () => {
  const header = $("#header");
  if (window.scrollY >= 50) {
    header.classList.add("header_scroll");
  } else {
    header.classList.remove("header_scroll");
  }
};

const scrollReveal = () => {
  const scrollUp = $("#scroll");
  if (window.scrollY >= 200) {
    scrollUp.classList.add("show");
  } else {
    scrollUp.classList.remove("show");
  }
};

window.addEventListener("scroll", () => {
  scrollHeader();
  scrollReveal();
});

/* ---------- 3. DARK MODE TOGGLE ---------- */
const themeToggle = document.createElement("button");
themeToggle.id = "theme-toggle";
themeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
themeToggle.setAttribute("aria-label", "Toggle dark mode");
themeToggle.title = "Toggle Dark / Light Mode";

const navContainer = $(".nav .container");
if (navContainer) {
  navContainer.appendChild(themeToggle);
}

const savedTheme = localStorage.getItem("alat-theme") || "light";
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("alat-theme", "light");
    themeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("alat-theme", "dark");
    themeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
  }
});

/* ---------- 4. TYPEWRITER HERO EFFECT ---------- */
const heroText = $(".hero_text");
if (heroText) {
  const text = "Banking Reimagined";
  const spanPart = "Reimagined";
  heroText.innerHTML = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      if (text.substring(i).startsWith("Reimagined")) {
        heroText.innerHTML = `Banking <span>${spanPart}</span>`;
        i = text.length;
      } else {
        heroText.innerHTML = text.substring(0, i + 1);
        i++;
        setTimeout(type, 55);
      }
    } else {
      heroText.classList.add("glow-pulse");
    }
  }
  setTimeout(type, 350);
}

/* ---------- 5. LIVE USER COUNTER ---------- */
function animateCounter(el, target, duration = 2200) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target.toLocaleString() + "+";
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString() + "+";
    }
  }, 16);
}

const userTitle = $(".user_details h1");
if (userTitle) {
  userTitle.innerHTML = `Join <span id="user-count">0</span> users who already trust us with their money`;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounter($("#user-count"), 35000000);
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );
  observer.observe(userTitle);
}

/* ---------- 6. DEMO WALLET + TRANSFER CENTER (₦1,000,000) ---------- */
let demoBalance = 1000000; // ₦1,000,000 starting balance

function formatMoney(n) {
  return "₦" + Number(n).toLocaleString();
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function updateBalanceDisplay() {
  const el = $("#demo-balance");
  if (el) {
    el.textContent = formatMoney(demoBalance);
    el.classList.add("balance-pulse");
    setTimeout(() => el.classList.remove("balance-pulse"), 600);
  }
}

function createSimulator() {
  const section = document.createElement("section");
  section.className = "beyond-lab";
  section.id = "beyond";
  section.innerHTML = `
    <div class="container">
      <h2 class="lab-title" data-aos="fade-up">💰 Alat Demo Wallet</h2>
      <p class="lab-sub">Play with real transfer flows — starting balance ₦1,000,000</p>
      
      <!-- BALANCE CARD -->
      <div class="wallet-balance-card glass">
        <div class="balance-label">Available Balance</div>
        <div class="balance-amount" id="demo-balance">₦1,000,000</div>
        <div class="balance-sub">Demo Account • Free Transfers • 100% Success Rate</div>
      </div>

      <div class="sim-grid">
        <!-- TRANSFER CARD -->
        <div class="sim-card glass">
          <h3>💸 Transfer Money</h3>
          <div class="sim-form">
            <label class="sim-label">Transfer Method</label>
            <select id="sim-method" class="sim-select">
              <option value="alat">Alat Wallet (Instant & Free)</option>
              <option value="bank">Other Bank Account</option>
              <option value="ussd">USSD / Bank Transfer</option>
              <option value="pos">POS / Agent</option>
            </select>

            <label class="sim-label">Amount (₦)</label>
            <input type="number" id="sim-amount" placeholder="Enter amount" value="5000" min="100">

            <label class="sim-label">Recipient</label>
            <input type="text" id="sim-recipient" placeholder="Name or Account Number" value="John Doe">

            <label class="sim-label">Bank / Wallet</label>
            <input type="text" id="sim-bank" placeholder="e.g. GTBank / Alat Wallet" value="Alat Wallet">

            <button id="sim-send" class="btn-power">Send Money →</button>
          </div>
          <div id="sim-result" class="sim-result"></div>
        </div>

        <!-- QUICK ACTIONS + STATS -->
        <div class="sim-card glass">
          <h3>⚡ Quick Actions</h3>
          <div class="quick-actions">
            <button class="quick-btn" data-amount="1000">Send ₦1,000</button>
            <button class="quick-btn" data-amount="5000">Send ₦5,000</button>
            <button class="quick-btn" data-amount="10000">Send ₦10,000</button>
            <button class="quick-btn" data-amount="50000">Send ₦50,000</button>
          </div>

          <div class="stats" style="margin-top:1.8rem">
            <div class="stat">
              <span class="stat-num" id="tps">0</span>
              <span class="stat-label">TPS</span>
            </div>
            <div class="stat">
              <span class="stat-num" id="uptime">99.99%</span>
              <span class="stat-label">Uptime</span>
            </div>
            <div class="stat">
              <span class="stat-num" id="cashback">₦0</span>
              <span class="stat-label">Cashback</span>
            </div>
          </div>

          <button id="reset-balance" class="btn-reset" style="margin-top:1.5rem">🔄 Reset to ₦1,000,000</button>
        </div>
      </div>
    </div>
  `;

  const usersSection = $(".users");
  if (usersSection) {
    usersSection.after(section);
  }

  // Main transfer logic
  const sendBtn = $("#sim-send");
  const result = $("#sim-result");

  function doTransfer(amount, method, recipient, bank) {
    amount = Number(amount) || 0;
    if (amount < 100) {
      result.innerHTML = `<div class="error-pulse">❌ Minimum transfer is ₦100</div>`;
      result.classList.add("show");
      return;
    }
    if (amount > demoBalance) {
      result.innerHTML = `<div class="error-pulse">❌ Insufficient balance. You have ${formatMoney(demoBalance)}</div>`;
      result.classList.add("show");
      return;
    }

    // Deduct
    demoBalance -= amount;
    updateBalanceDisplay();

    // Method specific message
    let methodText = {
      alat: "Alat Wallet (Instant & Free)",
      bank: "Other Bank Account",
      ussd: "USSD / Bank Transfer",
      pos: "POS / Agent"
    }[method] || method;

    result.innerHTML = `
      <div class="success-pulse">
        ✅ ${formatMoney(amount)} sent successfully!<br>
        <small>To: ${escapeHTML(recipient)} • ${escapeHTML(bank)}<br>
        Method: ${methodText}<br>
        New Balance: ${formatMoney(demoBalance)}</small>
      </div>`;
    result.classList.add("show");

    // Update cashback
    const cash = $("#cashback");
    if (cash) {
      const current = parseInt(cash.textContent.replace(/[^\d]/g, "")) || 0;
      cash.textContent = "₦" + (current + Math.floor(Math.random() * 30) + 5).toLocaleString();
    }

    // TPS spike
    const tps = $("#tps");
    if (tps) tps.textContent = Math.floor(Math.random() * 4000) + 1500;
  }

  sendBtn?.addEventListener("click", () => {
    const amount = $("#sim-amount").value;
    const method = $("#sim-method").value;
    const recipient = $("#sim-recipient").value || "Unknown";
    const bank = $("#sim-bank").value || "Unknown";
    doTransfer(amount, method, recipient, bank);
  });

  // Quick action buttons
  $$(".quick-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const amount = btn.dataset.amount;
      $("#sim-amount").value = amount;
      doTransfer(amount, $("#sim-method").value, $("#sim-recipient").value || "Unknown", $("#sim-bank").value || "Unknown");
    });
  });

  // Reset balance
  $("#reset-balance")?.addEventListener("click", () => {
    demoBalance = 1000000;
    updateBalanceDisplay();
    result.innerHTML = `<div class="success-pulse">🔄 Balance reset to ₦1,000,000</div>`;
    result.classList.add("show");
  });

  // Live TPS
  setInterval(() => {
    const tps = $("#tps");
    if (tps && Math.random() > 0.4) {
      tps.textContent = Math.floor(Math.random() * 3800) + 800;
    }
  }, 1800);
}

createSimulator();

/* ---------- 7. 3D TILT ON CARDS ---------- */
$$(".about_cards, .sim-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = "perspective(1000px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.03)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});

/* ---------- 8. PARTICLE CANVAS BACKGROUND ---------- */
function initParticles() {
  const canvas = document.createElement("canvas");
  canvas.id = "particle-canvas";
  canvas.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; opacity: 0.35;";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    ctx.fillStyle = isDark ? "rgba(29, 201, 155, 0.6)" : "rgba(29, 201, 155, 0.35)";

    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

initParticles();

/* ---------- 9. CTA POWER BUTTONS ---------- */
document.addEventListener("click", (e) => {
  if (e.target.matches(".user_details a, .btn-power")) {
    e.target.classList.add("clicked");
    setTimeout(() => e.target.classList.remove("clicked"), 600);
  }
});

/* ---------- 10. SMOOTH DROPDOWN ---------- */
$$(".nav_list").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const sub = item.querySelector(".sub_menu");
    if (sub) sub.style.display = "block";
  });
  item.addEventListener("mouseleave", () => {
    const sub = item.querySelector(".sub_menu");
    if (sub) sub.style.display = "none";
  });
});

console.log("%c🚀 ALAT BY WEMA — Hacked & Powered by Grok", "color:#1dc99b;font-size:16px;font-weight:bold");
console.log("%cDark mode • Live counters • Demo Wallet ₦1M • Transfer methods • Particles • 3D tilt", "color:#888");
