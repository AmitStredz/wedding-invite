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

  /* Classic 8-point Islamic Khatim star: a square overlapped by a 45° square */
  function drawKhatimStar(ctx, x, y, r) {
    const d = r * 0.7071;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - r, y);
    ctx.closePath();
    ctx.moveTo(x - d, y - d);
    ctx.lineTo(x + d, y - d);
    ctx.lineTo(x + d, y + d);
    ctx.lineTo(x - d, y + d);
    ctx.closePath();
    ctx.stroke();
  }

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

    // 3b. Hand-etched Islamic geometric lattice (8-point Khatim stars)
    //     Gives the foil an artisanal guilloché finish instead of a blank gold slab.
    const latticeUnit = w < 640 ? 30 : 38;
    const latticeStep = latticeUnit * 1.55;
    scratchCtx.globalAlpha = 0.13;
    scratchCtx.strokeStyle = '#FFF6D8';
    scratchCtx.lineWidth = 1;
    let latticeRow = 0;
    for (let gy = -latticeStep; gy < h + latticeStep; gy += latticeStep) {
      const rowOffset = (latticeRow % 2) ? latticeStep / 2 : 0;
      for (let gx = -latticeStep; gx < w + latticeStep; gx += latticeStep) {
        drawKhatimStar(scratchCtx, gx + rowOffset, gy, latticeUnit / 2);
      }
      latticeRow++;
    }
    scratchCtx.globalAlpha = 1;

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
  const infinitySvg        = $('#ringInfinitySvg');
  const infinityPath       = $('#infinityPath');

  /* Scroll-progress phase map (0 = section enters, 1 = section leaves) */
  const RING_TRAVEL_END = 0.62;  // rings finish travelling & interlock here
  const INFINITY_START  = 0.54;  // ribbon begins re-shaping toward the ∞
  const INFINITY_END    = 0.92;  // ∞ fully formed and holding

  // Cache the ∞ path length so we can "draw" it with stroke-dashoffset
  let infinityLength = 0;
  if (infinityPath && typeof infinityPath.getTotalLength === 'function') {
    infinityLength = infinityPath.getTotalLength();
    if (infinityLength > 0) {
      infinityPath.style.strokeDasharray  = `${infinityLength}`;
      infinityPath.style.strokeDashoffset = `${infinityLength}`;
    }
  }

  function updateRingsScrollMotion() {
    if (!ringsUnionSection || !brideRing || !groomRing) return;

    const rect = ringsUnionSection.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Normalized scroll progress inside the rings section (0 to 1)
    const totalDist = ringsUnionSection.offsetHeight - windowH;
    const scrolled = -rect.top;
    const rawProgress = Math.max(0, Math.min(1, scrolled / Math.max(1, totalDist)));

    /* Ease the raw progress so the rings do not start moving the instant the
       section pins — they hold still briefly, then accelerate gently and
       decelerate into the interlock. */
    const progress = rawProgress < 0.08
      ? 0
      : Math.min(1, (rawProgress - 0.08) / 0.92);

    // Ring travel completes at RING_TRAVEL_END, then holds while the ∞ forms.
    const raceP = Math.max(0, Math.min(1, progress / RING_TRAVEL_END));

    // Strong ease-out: quickest early, slowest as they meet (a long graceful settle)
    const easeP = 1 - Math.pow(1 - raceP, 3);

    const vw = window.innerWidth;
    const isMobile = vw < 768;

    // Starting distance and stopping distance for the two rings
    const arenaEl = $('#ringsArena');
    const arenaWidth = arenaEl ? arenaEl.clientWidth : (isMobile ? vw * 0.9 : 600);
    const startOffset = arenaWidth * 0.34;

    /* The ring artwork fills roughly 80% of its own PNG width, so we derive the
       stopping distance from the ring's *rendered* width instead of a magic
       number. 0.40 puts the two bands ~20% overlapped — enough to read as an
       interlock while keeping both rings clearly visible (no full stacking). */
    const ringEntityW = brideRing.offsetWidth || (isMobile ? 160 : 300);
    const bandWidth = ringEntityW * 0.80;
    const targetOffset = Math.min(bandWidth * 0.40, startOffset * 0.72);

    // Bride Ring (starts left with 3D Y-tilt, moves to center)
    const brideCurrentX = -startOffset + ((startOffset - targetOffset) * easeP);
    const brideRotateY = 28 * (1 - easeP);
    const brideRotateZ = -10 * (1 - easeP);

    // Groom Ring (starts right with 3D Y-tilt, moves to center)
    const groomCurrentX = startOffset - ((startOffset - targetOffset) * easeP);
    const groomRotateY = -28 * (1 - easeP);
    const groomRotateZ = 10 * (1 - easeP);

    brideRing.style.transform = `translate3d(${brideCurrentX}px, 0, 0) rotateY(${brideRotateY}deg) rotateZ(${brideRotateZ}deg) scale(${0.82 + easeP * 0.22})`;
    groomRing.style.transform = `translate3d(${groomCurrentX}px, 0, 0) rotateY(${groomRotateY}deg) rotateZ(${groomRotateZ}deg) scale(${0.82 + easeP * 0.22})`;

    // How far the ribbon has re-shaped into the eternity knot (0 → 1)
    const infP = Math.max(0, Math.min(1, (progress - INFINITY_START) / (INFINITY_END - INFINITY_START)));

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

      // The thread hands over to the ∞ as it forms
      const threadAlpha = Math.max(0, 1 - EasingClamp(infP * 1.5)) * (1 - progress * 0.55);

      if (progress > RING_TRAVEL_END) {
        goldenThreadPath.setAttribute('d', `M ${leftX} ${cy} Q ${svgW / 2} ${cy} ${rightX} ${cy}`);
      } else {
        goldenThreadPath.setAttribute('d', `M ${leftX} ${cy} Q ${svgW / 2} ${dipY} ${rightX} ${cy}`);
      }
      goldenThreadPath.setAttribute('stroke-opacity', threadAlpha.toFixed(3));

      if (threadNodeLeft) {
        threadNodeLeft.setAttribute('cx', `${leftX}`);
        threadNodeLeft.setAttribute('cy', `${cy}`);
        threadNodeLeft.setAttribute('opacity', threadAlpha.toFixed(3));
      }
      if (threadNodeRight) {
        threadNodeRight.setAttribute('cx', `${rightX}`);
        threadNodeRight.setAttribute('cy', `${cy}`);
        threadNodeRight.setAttribute('opacity', threadAlpha.toFixed(3));
      }
    }

    // ── The ribbon re-shapes into the ∞ eternity knot ──
    if (infinityPath && infinityLength > 0) {
      // Draw the knot progressively along the path
      const drawn = 1 - EasingClamp(infP);
      infinityPath.style.strokeDashoffset = `${(infinityLength * drawn).toFixed(2)}`;

      if (infinitySvg) {
        // Grow into place with a soft settle, and breathe once fully formed
        const scale = 0.82 + EasingClamp(infP) * 0.18;
        const breathe = infP > 0.98 ? 1 + Math.sin(Date.now() / 900) * 0.012 : 1;
        infinitySvg.style.transform = `scale(${(scale * breathe).toFixed(4)})`;
        infinitySvg.style.opacity = EasingClamp(infP * 1.25).toFixed(3);
      }
    }

    // Interlock flash fires briefly as the rings meet, then settles
    if (ringSparkle) {
      const flashing = progress > 0.58 && progress < 0.74;
      ringSparkle.classList.toggle('is-active', flashing);
    }
    if (unionStatus) {
      unionStatus.classList.toggle('is-visible', progress > RING_TRAVEL_END);
    }
  }

  function EasingClamp(v) {
    return v < 0 ? 0 : (v > 1 ? 1 : v);
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
    // Respect visitors who prefer reduced motion — no particle storm for them.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const folio = $('#scratchHolder');
    if (folio) {
      folio.classList.add('is-celebrating');
      setTimeout(() => folio.classList.remove('is-celebrating'), 1800);
    }

    bloomGoldHalo(folio);
    scatterGoldTwinkles(folio);
    shedRosePetals();
    raiseGoldMotes(folio);
  }

  /* A soft champagne halo that blooms outward from the folio and dissolves */
  function bloomGoldHalo(folio) {
    if (!folio) return;
    const r = folio.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const glowSize = Math.min(Math.max(r.width, r.height) * 1.5, 1000);

    const glow = document.createElement('div');
    glow.className = 'unveil-halo';
    glow.setAttribute('aria-hidden', 'true');
    glow.style.cssText = `left:${cx}px;top:${cy}px;width:${glowSize}px;height:${glowSize}px;` +
      `margin-left:${-glowSize / 2}px;margin-top:${-glowSize / 2}px;`;

    document.body.appendChild(glow);
    setTimeout(() => glow.remove(), 2000);
  }

  /* Fine gold ✦ twinkles that bloom and dissolve across the revealed folio */
  function scatterGoldTwinkles(folio) {
    if (!folio) return;
    const r = folio.getBoundingClientRect();

    for (let i = 0; i < 16; i++) {
      const tw = document.createElement('div');
      tw.className = 'gold-twinkle';
      tw.setAttribute('aria-hidden', 'true');
      tw.textContent = '✦';
      tw.style.cssText =
        `left:${r.left + 20 + Math.random() * Math.max(10, r.width - 40)}px;` +
        `top:${r.top + 20 + Math.random() * Math.max(10, r.height - 40)}px;` +
        `font-size:${(Math.random() * 12 + 9).toFixed(1)}px;` +
        `--tw-delay:${(Math.random() * 1.2).toFixed(2)}s;`;

      document.body.appendChild(tw);
      setTimeout(() => tw.remove(), 3000);
    }
  }

  /* Dusty-rose, sage and champagne petals that flutter down the screen */
  function shedRosePetals() {
    const palette = ['#D9A6AD', '#C98F98', '#B99BB0', '#9DB29F', '#E4D2A4', '#F3E6D2'];
    const count = window.innerWidth < 640 ? 16 : 26;

    for (let i = 0; i < count; i++) {
      const fallDur = (Math.random() * 3 + 4.5).toFixed(2);
      const delay = (Math.random() * 1.6).toFixed(2);
      const swayDur = (Math.random() * 1.8 + 1.6).toFixed(2);
      const sway = (Math.random() * 40 + 18).toFixed(0);
      const scale = Math.random() * 0.6 + 0.55;
      const color = palette[i % palette.length];

      const outer = document.createElement('div');
      outer.className = 'petal-fall';
      outer.setAttribute('aria-hidden', 'true');
      outer.style.cssText = `position:fixed;top:0;left:${(Math.random() * 100).toFixed(2)}vw;z-index:9997;` +
        `pointer-events:none;--fall-dur:${fallDur}s;--fall-delay:${delay}s;` +
        `--petal-opacity:${(Math.random() * 0.4 + 0.5).toFixed(2)};`;

      const inner = document.createElement('div');
      inner.className = 'petal-sway';
      inner.style.cssText = `--sway:${sway}px;--sway-dur:${swayDur}s;--fall-delay:${delay}s;`;

      const px = Math.round(18 * scale);
      inner.innerHTML =
        `<svg viewBox="0 0 24 24" style="width:${px}px;height:${px}px;display:block" xmlns="http://www.w3.org/2000/svg">` +
          `<path d="M12 2 C18 7 20 14 12 22 C4 14 6 7 12 2 Z" fill="${color}" opacity="0.9"/>` +
          '<path d="M12 4 C12 10 12 16 12 20" stroke="rgba(255,255,255,0.5)" stroke-width="0.6" fill="none"/>' +
        '</svg>';

      outer.appendChild(inner);
      document.body.appendChild(outer);
      setTimeout(() => outer.remove(), (parseFloat(fallDur) + parseFloat(delay)) * 1000 + 250);
    }
  }

  /* Fine gold dust motes lifting off the revealed card */
  function raiseGoldMotes(folio) {
    if (!folio) return;
    const r = folio.getBoundingClientRect();

    for (let i = 0; i < 22; i++) {
      const mote = document.createElement('div');
      mote.className = 'gold-mote';
      mote.setAttribute('aria-hidden', 'true');
      mote.textContent = '✦';
      mote.style.cssText =
        `position:fixed;left:${r.left + Math.random() * r.width}px;` +
        `top:${r.top + r.height * (0.5 + Math.random() * 0.5)}px;` +
        'z-index:9998;pointer-events:none;' +
        `color:${Math.random() > 0.5 ? '#E8C97E' : '#FFF3CC'};` +
        `font-size:${(Math.random() * 10 + 8).toFixed(1)}px;`;

      document.body.appendChild(mote);

      const tx = (Math.random() - 0.5) * 90;
      const ty = -(Math.random() * 160 + 60);
      requestAnimationFrame(() => {
        mote.style.transition =
          `transform ${(Math.random() * 1.2 + 1.2).toFixed(2)}s ease-out, opacity 1.6s ease-out`;
        mote.style.transform =
          `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${(Math.random() * 0.8 + 0.5).toFixed(2)}) rotate(${Math.round(Math.random() * 180)}deg)`;
        mote.style.opacity = '0';
      });

      setTimeout(() => mote.remove(), 2600);
    }
  }

  /* ═══════════════════════════════════════════════════════════
     5. LIVE COUNTDOWN TIMER (Target: 29 Nov 2026, 12:00 PM IST)
        With Smooth Mechanical Rolling Number Reels
     ═══════════════════════════════════════════════════════════ */
  const weddingEpoch = new Date('2026-11-29T12:00:00+05:30').getTime();
  const digitDays    = $('[data-unit="days"]');
  const digitHours   = $('[data-unit="hours"]');
  const digitMinutes = $('[data-unit="minutes"]');
  const digitSeconds = $('[data-unit="seconds"]');

  function renderRollingDigitGroup(container, value, minDigits = 2) {
    if (!container) return;
    const str = String(Math.max(0, value)).padStart(minDigits, '0');
    const chars = str.split('');

    let wheels = container.querySelectorAll('.digit-wheel');
    if (wheels.length !== chars.length) {
      container.innerHTML = '';
      chars.forEach(() => {
        const wheel = document.createElement('div');
        wheel.className = 'digit-wheel';
        const strip = document.createElement('div');
        strip.className = 'digit-strip';
        for (let i = 0; i <= 9; i++) {
          const span = document.createElement('span');
          span.className = 'digit-num';
          span.textContent = i;
          strip.appendChild(span);
        }
        wheel.appendChild(strip);
        container.appendChild(wheel);
      });
      wheels = container.querySelectorAll('.digit-wheel');
    }

    chars.forEach((ch, idx) => {
      const num = parseInt(ch, 10);
      const strip = wheels[idx].querySelector('.digit-strip');
      if (strip) {
        strip.style.transform = `translateY(-${num * 10}%)`;
      }
    });
  }

  function updateGrandTimer() {
    const now = Date.now();
    const diff = Math.max(0, weddingEpoch - now);

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    renderRollingDigitGroup(digitDays, d, 2);
    renderRollingDigitGroup(digitHours, h, 2);
    renderRollingDigitGroup(digitMinutes, m, 2);
    renderRollingDigitGroup(digitSeconds, s, 2);
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
     7. CUSTOM ROUTING & DYNAMIC GALLERY (Family / Friends)
     ═══════════════════════════════════════════════════════════ */
  const GALLERY_COLLECTIONS = {
    // Friends: 1, 2, 3, 4, 5, 6, 7, 8
    friends: [
      { src: 'assets/card-images/1.jpeg', alt: 'Cherished Moment 1' },
      { src: 'assets/card-images/2.jpeg', alt: 'Cherished Moment 2' },
      { src: 'assets/card-images/3.jpeg', alt: 'Cherished Moment 3' },
      { src: 'assets/card-images/4.jpeg', alt: 'Cherished Moment 4' },
      { src: 'assets/card-images/5.jpeg', alt: 'Cherished Moment 5' },
      { src: 'assets/card-images/6.jpeg', alt: 'Cherished Moment 6' },
      { src: 'assets/card-images/7.jpeg', alt: 'Cherished Moment 7' },
      { src: 'assets/card-images/8.jpeg', alt: 'Cherished Moment 8' }
    ],
    // Family: 2, 3, 9, 10, 11
    family: [
      { src: 'assets/card-images/2.jpeg',  alt: 'Family Moment 1' },
      { src: 'assets/card-images/9.png',   alt: 'Family Moment 3' },
      { src: 'assets/card-images/10.png',  alt: 'Family Moment 4' },
      { src: 'assets/card-images/3.jpeg',  alt: 'Family Moment 2' },
      { src: 'assets/card-images/11.png',  alt: 'Family Moment 5' }
    ]
  };

  const ROTATION_PATTERNS = [
    'rotate-neg-1',
    'rotate-pos-2',
    'rotate-neg-2',
    'rotate-pos-1',
    'rotate-neg-3',
    'rotate-pos-3'
  ];

  function determineAudienceGroup() {
    const rawUrl = window.location.href;
    const search = window.location.search || '';
    const hash = window.location.hash || '';

    let token = '';

    try {
      const params = new URLSearchParams(search);
      const keys = ['v', 'code', 'access', 'group', 'type', 'tag', 'p', 'view', 'id', 'ref'];
      for (const k of keys) {
        if (params.has(k)) {
          token = params.get(k) || '';
          break;
        }
      }
      if (!token) {
        for (const k of params.keys()) {
          if (k && !params.get(k)) {
            token = k;
            break;
          }
        }
      }
    } catch (e) {
      // ignore
    }

    if (!token && hash) {
      token = hash.replace(/^#/, '');
    }

    token = (token || '').toLowerCase().trim();

    // Map secret tokens:
    // Friends Secret Tokens: e.g. "wruh@3%k", "wruh@3k", "wruh3k"
    if (
      token.includes('wruh') ||
      token === 'friends' ||
      token === 'friend' ||
      /wruh[@%3k]+/i.test(rawUrl)
    ) {
      return 'friends';
    }

    // Family Secret Tokens: e.g. "k9x@7%m", "f7m@9%x", "k9x@7m", "fam", "family"
    if (
      token.includes('k9x') ||
      token.includes('f7m') ||
      token === 'family' ||
      token === 'fam' ||
      /k9x[@%7m]+/i.test(rawUrl) ||
      /f7m[@%9x]+/i.test(rawUrl) ||
      /family/i.test(rawUrl)
    ) {
      return 'family';
    }

    // Default fallback to family
    return 'family';
  }

  function initDynamicGallery() {
    const track = $('.hanging-wire-track');
    if (!track) return;

    const groupKey = determineAudienceGroup();
    const images = GALLERY_COLLECTIONS[groupKey] || GALLERY_COLLECTIONS.family;

    // Ensure adequate items per half for infinite loop
    let items = [...images];
    while (items.length < 8) {
      items = items.concat(images);
    }

    // Duplicate once to form exact 2 halves for seamless loop (0% -> -50%)
    const fullTrackItems = [...items, ...items];

    track.innerHTML = fullTrackItems.map((item, idx) => {
      const rot = ROTATION_PATTERNS[idx % ROTATION_PATTERNS.length];
      return `
        <div class="wire-photo-card ${rot}">
          <div class="photo-hanging-clip"></div>
          <div class="wire-photo-frame">
            <img src="${item.src}" alt="${item.alt}" loading="lazy" />
          </div>
        </div>
      `;
    }).join('');
  }

  initDynamicGallery();

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

