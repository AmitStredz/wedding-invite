/* ═══════════════════════════════════════════════════════════
   ROYAL WEDDING INVITATION — JAVASCRIPT
   Fathima Ibrahim & Amalkar Zulfikar
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

    // Re-verify scratch card canvas dimensions once layout settles
    setTimeout(() => {
      if (!hasRevealed) initLuxuryScratchCard();
    }, 400);
  }

  if (sealBtn) {
    sealBtn.addEventListener('click', openInvitation);
    sealBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      openInvitation();
    });
  }

  /* ═══════════════════════════════════════════════════════════
     2. LUXURY GOLD SCRATCH CARD CANVAS (Royal Folio Veil)
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
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    
    scratchCanvas.width = rect.width * dpr;
    scratchCanvas.height = rect.height * dpr;

    scratchCtx = scratchCanvas.getContext('2d', { willReadFrequently: true });
    scratchCtx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    totalPixels = w * h;

    // Reset composite operation to source-over for painting the gilded veil
    scratchCtx.globalCompositeOperation = 'source-over';
    scratchCtx.globalAlpha = 1;

    // 1. Draw rich metallic gold leaf foil background (Multi-stop liquid 24K gold)
    const goldGrad = scratchCtx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0.00, '#FFF5D6');
    goldGrad.addColorStop(0.18, '#F0D48D');
    goldGrad.addColorStop(0.36, '#C99D3E');
    goldGrad.addColorStop(0.52, '#FBE7BA');
    goldGrad.addColorStop(0.70, '#B88B2A');
    goldGrad.addColorStop(0.88, '#E8C97E');
    goldGrad.addColorStop(1.00, '#8E6717');
    scratchCtx.fillStyle = goldGrad;
    scratchCtx.fillRect(0, 0, w, h);

    // 2. Diagonal Metallic Luster Reflection Sheen
    const sheenGrad = scratchCtx.createLinearGradient(0, 0, w, h);
    sheenGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.0)');
    sheenGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.22)');
    sheenGrad.addColorStop(0.48, 'rgba(255, 255, 255, 0.42)');
    sheenGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.12)');
    sheenGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    scratchCtx.fillStyle = sheenGrad;
    scratchCtx.fillRect(0, 0, w, h);

    // 3. Authentic 24K Handcrafted Gold Leaf Micro-Glitter Stippling
    scratchCtx.globalAlpha = 0.22;
    const speckCount = Math.min(3000, Math.floor((w * h) / 130));
    for (let i = 0; i < speckCount; i++) {
      const rx = Math.random() * w;
      const ry = Math.random() * h;
      const rsize = Math.random() * 2.2 + 0.6;
      scratchCtx.fillStyle = (i % 4 === 0) ? '#FFFFFF' : ((i % 2 === 0) ? '#FFF0C2' : '#8A6214');
      scratchCtx.fillRect(rx, ry, rsize, rsize);
    }

    // 4. Ornate Royal Filigree Borders & Fleurons
    scratchCtx.globalAlpha = 0.9;
    scratchCtx.strokeStyle = '#FFFFFF';
    scratchCtx.lineWidth = 1.5;
    scratchCtx.strokeRect(14, 14, w - 28, h - 28);

    scratchCtx.strokeStyle = '#6E4E10';
    scratchCtx.lineWidth = 1.2;
    scratchCtx.strokeRect(20, 20, w - 40, h - 40);

    scratchCtx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    scratchCtx.lineWidth = 1;
    if (scratchCtx.setLineDash) scratchCtx.setLineDash([4, 4]);
    scratchCtx.strokeRect(25, 25, w - 50, h - 50);
    if (scratchCtx.setLineDash) scratchCtx.setLineDash([]);

    // 4 Corner Fleurons (✦)
    scratchCtx.fillStyle = '#FFFFFF';
    scratchCtx.font = '14px serif';
    scratchCtx.textAlign = 'center';
    scratchCtx.textBaseline = 'middle';
    scratchCtx.fillText('✦', 22, 22);
    scratchCtx.fillText('✦', w - 22, 22);
    scratchCtx.fillText('✦', 22, h - 22);
    scratchCtx.fillText('✦', w - 22, h - 22);

    // 5. Central Royal Medallion / Heraldic Plaque
    const cx = w / 2;
    const cy = h / 2;
    const isMobile = w < 640;

    const cardW = Math.min(w - 60, isMobile ? 320 : 540);
    const cardH = Math.min(h - 70, isMobile ? 230 : 250);
    const cardX = cx - cardW / 2;
    const cardY = cy - cardH / 2;

    function drawRoundedBox(ctx, bx, by, bw, bh, r) {
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(bx, by, bw, bh, r);
      } else {
        ctx.rect(bx, by, bw, bh);
      }
    }

    // Plaque Parchment & Gold Plate Background
    scratchCtx.fillStyle = 'rgba(255, 252, 242, 0.38)';
    drawRoundedBox(scratchCtx, cardX, cardY, cardW, cardH, 18);
    scratchCtx.fill();

    scratchCtx.strokeStyle = 'rgba(110, 78, 16, 0.65)';
    scratchCtx.lineWidth = 1.5;
    scratchCtx.stroke();

    scratchCtx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    scratchCtx.lineWidth = 1;
    drawRoundedBox(scratchCtx, cardX + 5, cardY + 5, cardW - 10, cardH - 10, 14);
    scratchCtx.stroke();

    // Plaque Ornate Typography
    // Arabic Bismillah
    scratchCtx.fillStyle = '#4A3408';
    scratchCtx.font = isMobile ? '600 13px "Cormorant Garamond", serif' : '600 16px "Cormorant Garamond", serif';
    scratchCtx.fillText('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', cx, cardY + (isMobile ? 26 : 32));

    // Royal Kicker
    scratchCtx.fillStyle = '#FFFFFF';
    scratchCtx.font = isMobile ? '700 9px Cinzel, serif' : '700 11px Cinzel, serif';
    scratchCtx.fillText('✦ THE SACRED WEDDING CEREMONIES ✦', cx, cardY + (isMobile ? 52 : 62));

    // Flowing Romantic Script Callout
    scratchCtx.fillStyle = '#261B06';
    scratchCtx.font = isMobile ? '400 32px "Alex Brush", cursive' : '400 42px "Alex Brush", cursive';
    scratchCtx.fillText('Unveil the Auspicious Dates', cx, cardY + (isMobile ? 100 : 120));

    // Monogram & Botanical Flourish
    scratchCtx.fillStyle = '#4A3408';
    scratchCtx.font = isMobile ? '600 12px Cinzel, serif' : '600 14px Cinzel, serif';
    scratchCtx.fillText('❦  Fathima  &  Amalkar  ❦', cx, cardY + (isMobile ? 142 : 166));

    // Interactive Guidance Badge
    const pillW = isMobile ? 220 : 280;
    const pillH = isMobile ? 28 : 32;
    const pillY = cardY + (isMobile ? 184 : 208);
    scratchCtx.fillStyle = 'rgba(37, 57, 43, 0.8)';
    drawRoundedBox(scratchCtx, cx - pillW / 2, pillY - pillH / 2, pillW, pillH, 16);
    scratchCtx.fill();
    scratchCtx.strokeStyle = '#E5C77A';
    scratchCtx.lineWidth = 1;
    scratchCtx.stroke();

    scratchCtx.fillStyle = '#FFF8E7';
    scratchCtx.font = isMobile ? '700 9px Montserrat, sans-serif' : '700 10px Montserrat, sans-serif';
    scratchCtx.fillText('✦ GENTLY BRUSH OR SWIPE TO REVEAL ✦', cx, pillY);

    // 6. Switch Canvas Composite Operation to Erase Mode for Interactivity
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

    const isMobile = window.innerWidth < 640;
    const brushWidth = isMobile ? 38 : 50;

    scratchCtx.beginPath();
    scratchCtx.lineCap = 'round';
    scratchCtx.lineJoin = 'round';
    scratchCtx.lineWidth = brushWidth;

    if (lastPoint) {
      scratchCtx.moveTo(lastPoint.x, lastPoint.y);
      scratchCtx.lineTo(pos.x, pos.y);
    } else {
      scratchCtx.arc(pos.x, pos.y, brushWidth / 2, 0, Math.PI * 2);
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
      percentText.textContent = `${percent}% Unveiled`;
    }

    // Auto complete reveal when > 32%
    if (ratio > 0.32) {
      revealFullDate();
    }
  }

  function revealFullDate() {
    if (hasRevealed) return;
    hasRevealed = true;

    if (scratchCanvas) {
      scratchCanvas.style.transition = 'opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease';
      scratchCanvas.style.opacity = '0';
      scratchCanvas.style.transform = 'scale(1.02)';
      scratchCanvas.style.filter = 'blur(4px)';
      scratchCanvas.style.pointerEvents = 'none';
      setTimeout(() => {
        scratchCanvas.style.display = 'none';
      }, 800);
    }

    if (percentText) {
      percentText.textContent = '✦ Sacred Dates & Ceremonies Revealed! ✦';
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

    // Smooth cubic ease curve
    const easeP = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const vw = window.innerWidth;
    const isMobile = vw < 768;
    
    // Starting distance and target meeting position (touching side by side without overlapping)
    const arenaEl = $('#ringsArena');
    const arenaWidth = arenaEl ? arenaEl.clientWidth : (isMobile ? vw * 0.9 : 500);
    const startOffset = isMobile ? arenaWidth * 0.38 : arenaWidth * 0.32;
    const targetOffset = isMobile ? 22 : 32;

    // Bride Ring (starts left with 3D Y-tilt, moves to center)
    const brideCurrentX = -startOffset + ((startOffset - targetOffset) * easeP);
    const brideRotateY = 28 * (1 - easeP);
    const brideRotateZ = -10 * (1 - easeP);

    // Groom Ring (starts right with 3D Y-tilt, moves to center)
    const groomCurrentX = startOffset - ((startOffset - targetOffset) * easeP);
    const groomRotateY = -28 * (1 - easeP);
    const groomRotateZ = 10 * (1 - easeP);

    brideRing.style.transform = `translate3d(${brideCurrentX}px, 0, 0) rotateY(${brideRotateY}deg) rotateZ(${brideRotateZ}deg) scale(${0.85 + easeP * 0.18})`;
    groomRing.style.transform = `translate3d(${groomCurrentX}px, 0, 0) rotateY(${groomRotateY}deg) rotateZ(${groomRotateZ}deg) scale(${0.85 + easeP * 0.18})`;

    // Dynamic Golden Destiny Thread SVG Curve calculation
    const goldenThreadPath = $('#goldenThreadPath');
    const threadNodeLeft   = $('#threadNodeLeft');
    const threadNodeRight  = $('#threadNodeRight');

    if (goldenThreadPath && arenaEl) {
      const svgW = 800;
      const svgH = 200;
      
      const scaleRatio = svgW / arenaWidth;

      // Calculate exact X centers for each ring inside the SVG viewBox coordinate system
      const leftX  = (svgW / 2) + (brideCurrentX * scaleRatio);
      const rightX = (svgW / 2) + (groomCurrentX * scaleRatio);
      const cy     = svgH / 2;

      // Quadratic curve sag flexes dynamically as rings get closer
      const dipY = cy + (35 * (1 - easeP));

      // As rings interlock (> 78%), straighten and collapse thread into golden spark
      if (progress > 0.78) {
        goldenThreadPath.setAttribute('d', `M ${leftX} ${cy} Q ${svgW/2} ${cy} ${rightX} ${cy}`);
        goldenThreadPath.setAttribute('stroke-opacity', '0.2');
      } else {
        goldenThreadPath.setAttribute('d', `M ${leftX} ${cy} Q ${svgW/2} ${dipY} ${rightX} ${cy}`);
        goldenThreadPath.setAttribute('stroke-opacity', `${1 - progress * 0.8}`);
      }

      if (threadNodeLeft) {
        threadNodeLeft.setAttribute('cx', `${leftX}`);
        threadNodeLeft.setAttribute('cy', `${cy}`);
      }
      if (threadNodeRight) {
        threadNodeRight.setAttribute('cx', `${rightX}`);
        threadNodeRight.setAttribute('cy', `${cy}`);
      }
    }

    // Rings meet in center (> 78% scroll progress)
    if (progress > 0.78) {
      if (ringSparkle) ringSparkle.classList.add('is-active');
      if (unionStatus) unionStatus.classList.add('is-visible');
    } else {
      if (ringSparkle) ringSparkle.classList.remove('is-active');
      if (unionStatus) unionStatus.classList.remove('is-visible');
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

