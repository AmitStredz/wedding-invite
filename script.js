/* ═══════════════════════════════════════════════════════════
   ROYAL WEDDING INVITATION — JAVASCRIPT
   Fathima Ibrahim & Amalakar Zulfikar
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // DOM Elements
  const gatefoldCover   = $('#gatefoldCover');
  const sealBtn         = $('#sealBtn');
  const mainExperience  = $('#mainExperience');

  let isCoverOpened = false;

  /* ═══════════════════════════════════════════════════════════
     1. GATEFOLD COVER & THEATRE CURTAIN OPENING (Seamless Single Flow)
     ═══════════════════════════════════════════════════════════ */
  function openInvitation() {
    if (isCoverOpened) return;
    isCoverOpened = true;

    // Single unified flow: curtains part and invitation details reveal simultaneously in real time
    gatefoldCover.classList.add('is-open');
    mainExperience.classList.add('is-revealed');
    document.body.classList.remove('locked');

    // Dismiss the cover overlay after the synchronized curtain sweep completes
    setTimeout(() => {
      gatefoldCover.classList.add('is-dismissed');
    }, 2400);
  }

  if (sealBtn) {
    sealBtn.addEventListener('click', openInvitation);
    sealBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      openInvitation();
    });
  }

  /* ═══════════════════════════════════════════════════════════
     2. LUXURY GOLD SCRATCH CARD CANVAS
     ═══════════════════════════════════════════════════════════ */
  const scratchCanvas = $('#luxuryScratchCanvas');
  const scratchHolder = $('#scratchHolder');
  const percentText   = $('#scratchPercentText');
  const instantBtn    = $('#instantRevealBtn');

  let scratchCtx = null;
  let isScratching = false;
  let hasRevealed = false;
  let totalPixels = 0;

  function initLuxuryScratchCard() {
    if (!scratchCanvas || !scratchHolder) return;

    const rect = scratchHolder.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    
    scratchCanvas.width = rect.width * dpr;
    scratchCanvas.height = rect.height * dpr;

    scratchCtx = scratchCanvas.getContext('2d', { willReadFrequently: true });
    scratchCtx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    totalPixels = w * h;

    // Draw rich metallic gold leaf foil background
    const goldGrad = scratchCtx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0, '#F5DE98');
    goldGrad.addColorStop(0.25, '#D8B257');
    goldGrad.addColorStop(0.5, '#BE9033');
    goldGrad.addColorStop(0.75, '#E5C77A');
    goldGrad.addColorStop(1, '#9C721D');
    
    scratchCtx.fillStyle = goldGrad;
    scratchCtx.fillRect(0, 0, w, h);

    // Add gold dust grain & glitter specks
    scratchCtx.globalAlpha = 0.22;
    for (let i = 0; i < 2400; i++) {
      const rx = Math.random() * w;
      const ry = Math.random() * h;
      const rsize = Math.random() * 2 + 0.5;
      scratchCtx.fillStyle = (i % 3 === 0) ? '#FFFFFF' : '#FFF3D1';
      scratchCtx.fillRect(rx, ry, rsize, rsize);
    }

    // Elegant Ornate Double Border on the Foil
    scratchCtx.globalAlpha = 0.85;
    scratchCtx.strokeStyle = '#FFFFFF';
    scratchCtx.lineWidth = 1.5;
    scratchCtx.strokeRect(14, 14, w - 28, h - 28);
    scratchCtx.strokeStyle = '#6E4E10';
    scratchCtx.strokeRect(18, 18, w - 36, h - 36);

    // Central Royal Seal Emblem on Foil
    scratchCtx.fillStyle = '#FFFFFF';
    scratchCtx.font = '600 13px Cinzel, serif';
    scratchCtx.textAlign = 'center';
    scratchCtx.textBaseline = 'middle';
    scratchCtx.letterSpacing = '3px';
    scratchCtx.fillText('✦ SACRED DATE ✦', w / 2, h / 2 - 38);

    // Big Script Callout
    scratchCtx.fillStyle = '#261B06';
    scratchCtx.font = '400 36px "Alex Brush", cursive';
    scratchCtx.fillText('Scratch with Love', w / 2, h / 2 + 6);

    // Helper tap instruction
    scratchCtx.fillStyle = '#FFFFFF';
    scratchCtx.font = '500 10px Montserrat, sans-serif';
    scratchCtx.fillText('RUB TO REVEAL THE NIKAH DATE', w / 2, h / 2 + 45);

    // Switch composite operation to erase
    scratchCtx.globalAlpha = 1;
    scratchCtx.globalCompositeOperation = 'destination-out';
  }

  function getCanvasPos(e) {
    const rect = scratchCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  let lastPoint = null;

  function scratchBrush(pos) {
    if (!scratchCtx || hasRevealed) return;

    scratchCtx.beginPath();
    scratchCtx.lineCap = 'round';
    scratchCtx.lineJoin = 'round';
    scratchCtx.lineWidth = 42; // Generous scratch tip

    if (lastPoint) {
      scratchCtx.moveTo(lastPoint.x, lastPoint.y);
      scratchCtx.lineTo(pos.x, pos.y);
    } else {
      scratchCtx.arc(pos.x, pos.y, 21, 0, Math.PI * 2);
    }
    scratchCtx.stroke();
    lastPoint = pos;

    // Trigger subtle sparkles around scratch tip
    spawnScratchSparkles(pos.x, pos.y);

    // Check progress periodically
    checkScratchCompletion();
  }

  function checkScratchCompletion() {
    if (hasRevealed || !scratchCtx) return;

    // Fast pixel sampling (every 32nd pixel)
    const imgData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
    const pixels = imgData.data;
    let transparent = 0;
    const sampleStep = 32;

    for (let i = 3; i < pixels.length; i += sampleStep * 4) {
      if (pixels[i] < 30) transparent++;
    }

    const ratio = transparent / (pixels.length / (sampleStep * 4));
    const percent = Math.min(100, Math.round(ratio * 100));

    if (percentText) {
      percentText.textContent = `${percent}% Revealed`;
    }

    // Auto complete reveal when > 36%
    if (ratio > 0.36) {
      revealFullDate();
    }
  }

  function revealFullDate() {
    if (hasRevealed) return;
    hasRevealed = true;

    if (scratchCanvas) {
      scratchCanvas.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      scratchCanvas.style.opacity = '0';
      scratchCanvas.style.transform = 'scale(1.05)';
      setTimeout(() => {
        scratchCanvas.style.display = 'none';
      }, 800);
    }

    if (percentText) {
      percentText.textContent = '✦ Date Revealed with Love! ✦';
    }

    // Burst golden hearts and confetti
    celebrateScratchReveal();
  }

  // Pointer & Touch Events
  if (scratchCanvas) {
    scratchCanvas.addEventListener('pointerdown', (e) => {
      isScratching = true;
      lastPoint = getCanvasPos(e);
      scratchBrush(lastPoint);
      scratchCanvas.setPointerCapture(e.pointerId);
    });

    scratchCanvas.addEventListener('pointermove', (e) => {
      if (isScratching) {
        scratchBrush(getCanvasPos(e));
      }
    });

    const stopScratch = () => {
      isScratching = false;
      lastPoint = null;
    };

    scratchCanvas.addEventListener('pointerup', stopScratch);
    scratchCanvas.addEventListener('pointercancel', stopScratch);
  }

  if (instantBtn) {
    instantBtn.addEventListener('click', revealFullDate);
  }

  // Initialize scratch card
  window.addEventListener('load', initLuxuryScratchCard);
  window.addEventListener('resize', () => {
    if (!hasRevealed) initLuxuryScratchCard();
  });

  /* ═══════════════════════════════════════════════════════════
     3. TWO RINGS SCROLL CONVERGENCE & OVERLAP
     ═══════════════════════════════════════════════════════════ */
  const ringsUnionSection  = $('#ringsUnionSection');
  const brideRing          = $('#brideRing');
  const groomRing          = $('#groomRing');
  const ringSparkle        = $('#ringSparkle');
  const ringsPhotoBackdrop = $('#ringsPhotoBackdrop');
  const unionStatus        = $('#unionStatus');

  function updateRingsScrollMotion() {
    if (!ringsUnionSection || !brideRing || !groomRing) return;

    const rect = ringsUnionSection.getBoundingClientRect();
    const windowH = window.innerHeight;
    
    // Normalized scroll progress inside the rings section (0 to 1)
    const totalDist = ringsUnionSection.offsetHeight - windowH;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalDist));

    // Smooth ease curve
    const easeP = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const vw = window.innerWidth;
    const isMobile = vw < 768;
    const travelX = isMobile ? vw * 0.28 : vw * 0.22;

    // Bride Ring (starts left, moves to center)
    const brideStartX = -travelX;
    const brideStartY = -60;
    const brideCurrentX = brideStartX + (travelX * easeP);
    const brideCurrentY = brideStartY + (60 * easeP);
    const brideRotate = -25 + (25 * easeP);

    // Groom Ring (starts right, moves to center and overlaps Bride Ring)
    const groomStartX = travelX;
    const groomStartY = 50;
    const groomCurrentX = groomStartX - (travelX * easeP) - 15; // 15px interlocking offset
    const groomCurrentY = groomStartY - (50 * easeP);
    const groomRotate = 20 - (20 * easeP);

    brideRing.style.transform = `translate3d(${brideCurrentX}px, ${brideCurrentY}px, 0) rotate(${brideRotate}deg) scale(${0.88 + easeP * 0.16})`;
    groomRing.style.transform = `translate3d(${groomCurrentX}px, ${groomCurrentY}px, 0) rotate(${groomRotate}deg) scale(${0.88 + easeP * 0.16})`;

    // Rings flare and photo backdrop when fully converged (> 85%)
    if (progress > 0.82) {
      ringSparkle.classList.add('is-active');
      ringsPhotoBackdrop.style.opacity = `${(progress - 0.82) / 0.18}`;
      ringsPhotoBackdrop.style.transform = `scale(${0.92 + (progress - 0.82) * 0.4})`;
      unionStatus.classList.add('is-visible');
    } else {
      ringSparkle.classList.remove('is-active');
      ringsPhotoBackdrop.style.opacity = '0';
      unionStatus.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', updateRingsScrollMotion, { passive: true });
  updateRingsScrollMotion();

  /* ═══════════════════════════════════════════════════════════
     4. CELEBRATORY CONFETTI & SCRATCH SPARKLES
     ═══════════════════════════════════════════════════════════ */
  function spawnScratchSparkles(x, y) {
    if (!scratchHolder) return;
    const spark = document.createElement('div');
    spark.className = 'temp-sparkle';
    spark.innerHTML = '✦';
    spark.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      color: #FFF0B8;
      font-size: ${Math.random() * 14 + 10}px;
      pointer-events: none;
      z-index: 10;
      transform: translate(-50%, -50%) scale(1);
      transition: all 0.6s ease-out;
      opacity: 1;
    `;
    scratchHolder.appendChild(spark);

    requestAnimationFrame(() => {
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      spark.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(0)`;
      spark.style.opacity = '0';
    });

    setTimeout(() => spark.remove(), 600);
  }

  function celebrateScratchReveal() {
    const colors = ['#F5DE98', '#E5C77A', '#B32A35', '#FFFDF8', '#8CA394', '#9C721D'];
    const totalConfetti = 70;

    for (let i = 0; i < totalConfetti; i++) {
      const p = document.createElement('div');
      const isHeart = i % 4 === 0;
      p.innerHTML = isHeart ? '❤' : (i % 2 === 0 ? '✦' : '•');
      p.style.cssText = `
        position: fixed;
        left: 50vw;
        top: 60vh;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        font-size: ${Math.random() * 18 + 12}px;
        pointer-events: none;
        z-index: 9999;
        transition: transform 1.6s cubic-bezier(0.2, 0.8, 0.3, 1), opacity 1.6s ease;
      `;
      document.body.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 280 + 80;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 80;

      requestAnimationFrame(() => {
        p.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.8 + 0.6})`;
        p.style.opacity = '0';
      });

      setTimeout(() => p.remove(), 1800);
    }
  }

  /* ═══════════════════════════════════════════════════════════
     5. LIVE COUNTDOWN TIMER (Target: 29 Nov 2026, 12:00 PM IST)
     ═══════════════════════════════════════════════════════════ */
  const weddingEpoch = new Date('2026-11-29T12:00:00+05:30').getTime();
  const digitDays    = $('[data-unit="days"]');
  const digitHours   = $('[data-unit="hours"]');
  const digitMinutes = $('[data-unit="minutes"]');
  const digitSeconds = $('[data-unit="seconds"]');

  function updateGrandTimer() {
    const now = Date.now();
    const diff = Math.max(0, weddingEpoch - now);

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (digitDays)    digitDays.textContent    = String(d).padStart(2, '0');
    if (digitHours)   digitHours.textContent   = String(h).padStart(2, '0');
    if (digitMinutes) digitMinutes.textContent = String(m).padStart(2, '0');
    if (digitSeconds) digitSeconds.textContent = String(s).padStart(2, '0');
  }

  updateGrandTimer();
  setInterval(updateGrandTimer, 1000);

  /* ═══════════════════════════════════════════════════════════
     6. AMBIENT PARTICLES (GOLD DUST DRIFT)
     ═══════════════════════════════════════════════════════════ */
  const ambCanvas = $('#ambientCanvas');
  if (ambCanvas) {
    const aCtx = ambCanvas.getContext('2d');
    let particles = [];
    const pCount = 35;

    function resizeAmbCanvas() {
      ambCanvas.width = window.innerWidth;
      ambCanvas.height = window.innerHeight;
    }
    resizeAmbCanvas();
    window.addEventListener('resize', resizeAmbCanvas);

    for (let i = 0; i < pCount; i++) {
      particles.push({
        x: Math.random() * ambCanvas.width,
        y: Math.random() * ambCanvas.height,
        r: Math.random() * 1.8 + 0.4,
        vy: Math.random() * -0.4 - 0.1,
        vx: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function renderAmbParticles() {
      aCtx.clearRect(0, 0, ambCanvas.width, ambCanvas.height);
      aCtx.fillStyle = '#C59B3C';

      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < 0) p.y = ambCanvas.height;
        if (p.x < 0) p.x = ambCanvas.width;
        if (p.x > ambCanvas.width) p.x = 0;

        aCtx.globalAlpha = p.alpha;
        aCtx.beginPath();
        aCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        aCtx.fill();
      });

      requestAnimationFrame(renderAmbParticles);
    }
    renderAmbParticles();
  }


  /* ═══════════════════════════════════════════════════════════
     8. WISHES / RSVP FORM SUBMISSION
     ═══════════════════════════════════════════════════════════ */
  const wishForm   = $('#wishForm');
  const wishThanks = $('#wishThanks');

  if (wishForm) {
    wishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = $('#guestNameInput').value;
      const guestMsg  = $('#guestMsgInput').value;

      console.log('Guest wish received:', { guestName, guestMsg });

      wishForm.style.display = 'none';
      wishThanks.hidden = false;
      celebrateScratchReveal();
    });
  }

});

