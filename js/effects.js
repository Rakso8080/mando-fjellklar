/* ══════════════════════════════════════════════════════
   M&O — EFFEKTER (tåke, stjerner, regn, lyn, vind, osv.)
   ══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var MO = window.MO || {};

  /* ── 1. TÅKE/MIST ──────────────────────────────── */
  MO.initFog = function () {
    var hero = document.getElementById('hero');
    if (!hero || hero.querySelector('.fog')) return;
    var div = document.createElement('div');
    div.className = 'fog';
    div.innerHTML =
      '<div class="fog__layer"></div>' +
      '<div class="fog__layer fog__layer--2"></div>' +
      '<div class="fog__layer fog__layer--3"></div>';
    hero.appendChild(div);

    var sections = document.querySelectorAll('.section--decorated');
    sections.forEach(function (s) {
      var f = document.createElement('div');
      f.className = 'fog--section';
      s.appendChild(f);
    });
  };

  /* ── 2. STJERNEHIMMEL ──────────────────────────── */
  MO.initStars = function () {
    if (window.innerWidth <= 768) return;
    var hero = document.getElementById('hero');
    if (!hero || hero.querySelector('.starry-sky')) return;
    var container = document.createElement('div');
    container.className = 'starry-sky';
    var canvas = document.createElement('canvas');
    container.appendChild(canvas);
    hero.insertBefore(container, hero.firstChild);

    var ctx = canvas.getContext('2d');
    var stars = [];
    var W, H;

    var dpr = window.devicePixelRatio;

    function resize() {
      var r = container.getBoundingClientRect();
      W = canvas.width = r.width * dpr;
      H = canvas.height = r.height * dpr;
    }
    resize();

    for (var i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7,
        r: (0.3 + Math.random() * 1.2) * dpr,
        a: 0.2 + Math.random() * 0.6,
        speed: 0.005 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2
      });
    }

    function getStarOpacity() {
      var h = new Date().getHours();
      if (h >= 6 && h < 18) return 0;
      if (h >= 5 && h < 6) return (h - 5) / 1 * 0.4;
      if (h >= 18 && h < 20) return (20 - h) / 2 * 0.4;
      return 0.4 + Math.random() * 0.1;
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var base = getStarOpacity();
      if (base === 0) return;

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var twinkle = Math.sin(time * s.speed + s.phase) * 0.3 + 0.7;
        var alpha = s.a * base * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
        ctx.fill();
      }
    }

    var animId;
    function animate(time) {
      draw(time);
      animId = requestAnimationFrame(animate);
    }
    animate(0);

    var resizeObs = new ResizeObserver(function () {
      resize();
    });
    resizeObs.observe(container);

    var visibilityObs = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) {
        animId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animId);
      }
    }, { threshold: 0 });
    visibilityObs.observe(hero);
  };

  /* ── 3. REGN ────────────────────────────────────── */
  MO.initRain = function () {
    var hero = document.getElementById('hero');
    if (!hero || hero.querySelector('.rain') || window.innerWidth <= 480) return;
    var container = document.createElement('div');
    container.className = 'rain';
    hero.appendChild(container);

    var count = window.innerWidth < 480 ? 20 : 35;
    for (var i = 0; i < count; i++) {
      var drop = document.createElement('i');
      drop.className = 'rain__drop';
      var x = Math.random() * 100;
      var dur = 0.8 + Math.random() * 0.8;
      var delay = Math.random() * 2;
      var h = 10 + Math.random() * 14;
      drop.style.cssText =
        'left:' + x + '%;height:' + h + 'px;' +
        'animation-duration:' + dur + 's;animation-delay:' + delay + 's;';
      container.appendChild(drop);
    }
  };

  /* ── 5. SNØSPOR (MUSE) ──────────────────────────── */
  MO.initFootprints = function () {
    if ('ontouchstart' in window) return;
    var last = 0;
    var counter = 0;
    document.addEventListener('mousemove', function (e) {
      var now = Date.now();
      if (now - last < 180) return;
      last = now;
      var el = document.createElement('span');
      el.className = 'footprint';
      el.style.left = (e.clientX - 6) + 'px';
      el.style.top = (e.clientY - 8) + 'px';
      el.innerHTML = '<span class="footprint__inner"></span>';
      document.body.appendChild(el);
      counter++;
      if (counter > 20) {
        var old = document.querySelector('.footprint');
        if (old) old.remove();
        counter--;
      }
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
        counter--;
      }, 4000);
    });
  };

  /* ── 6. VIND-EFFEKT ────────────────────────────── */
  MO.initWind = function () {
    if (window.innerWidth <= 768) return;
    var indicator = document.createElement('div');
    indicator.className = 'wind-indicator';
    indicator.innerHTML =
      '<span class="wind-indicator__arrow">→</span>' +
      '<span class="wind-indicator__label">0 m/s</span>';
    document.body.appendChild(indicator);

    var windSpeed = 2;
    var targetSpeed = 2;
    var gustTimer = 0;

    var landscapes = document.querySelectorAll('.forest-bg');

    function updateWind() {
      gustTimer++;
      if (gustTimer > 300 + Math.random() * 400) {
        gustTimer = 0;
        targetSpeed = 4 + Math.random() * 10;
        setTimeout(function () { targetSpeed = 1 + Math.random() * 3; }, 2000 + Math.random() * 3000);
      }
      windSpeed += (targetSpeed - windSpeed) * 0.02;
      if (Math.abs(windSpeed) < 0.1) windSpeed = 0;

      var arrow = indicator.querySelector('.wind-indicator__arrow');
      var label = indicator.querySelector('.wind-indicator__label');
      var speedRounded = Math.round(windSpeed * 10) / 10;
      label.textContent = speedRounded + ' m/s';

      var deg = 0;
      if (windSpeed > 8) deg = -15 + Math.random() * 30;
      arrow.style.transform = 'rotate(' + deg + 'deg)';

      var show = windSpeed > 1;
      indicator.classList.toggle('visible', show);

      if (windSpeed > 4) {
        landscapes.forEach(function (l) {
          l.classList.remove('windy');
          l.classList.add('strong-wind');
        });
      } else if (windSpeed > 2) {
        landscapes.forEach(function (l) {
          l.classList.add('windy');
          l.classList.remove('strong-wind');
        });
      } else {
        landscapes.forEach(function (l) {
          l.classList.remove('windy', 'strong-wind');
        });
      }

      requestAnimationFrame(updateWind);
    }
    requestAnimationFrame(updateWind);
  };

  /* ── 7. INTERAKTIVT KOMPASS ─────────────────────── */
  MO.initCompass = function () {
    if (window.innerWidth <= 768) return;
    var el = document.createElement('div');
    el.className = 'compass-interactive';
    el.innerHTML =
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="24" cy="24" r="22" fill="none" stroke="rgba(200,169,106,.3)" stroke-width=".8"/>' +
        '<circle cx="24" cy="24" r="20" fill="none" stroke="rgba(200,169,106,.12)" stroke-width=".5"/>' +
        '<g class="compass-interactive__ring">' +
          '<text x="24" y="8" font-size="4" fill="rgba(200,169,106,.4)" text-anchor="middle" font-family="sans-serif">N</text>' +
          '<text x="24" y="42" font-size="4" fill="rgba(200,169,106,.25)" text-anchor="middle" font-family="sans-serif">S</text>' +
          '<text x="6" y="26" font-size="4" fill="rgba(200,169,106,.2)" text-anchor="middle" font-family="sans-serif">V</text>' +
          '<text x="42" y="26" font-size="4" fill="rgba(200,169,106,.2)" text-anchor="middle" font-family="sans-serif">Ø</text>' +
        '</g>' +
        '<g class="compass-interactive__needle">' +
          '<polygon points="24,5 22,24 26,24" fill="rgba(212,168,75,.6)"/>' +
          '<polygon points="24,44 22,24 26,24" fill="rgba(255,255,255,.15)"/>' +
          '<circle cx="24" cy="24" r="3" fill="rgba(200,169,106,.3)"/>' +
        '</g>' +
      '</svg>';
    document.body.appendChild(el);

    var needle = el.querySelector('.compass-interactive__needle');

    function updateCompass() {
      var scrollY = window.scrollY;
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      var progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      var angle = progress * 360;

      needle.style.transform = 'rotate(' + angle + 'deg)';

      var above = window.innerHeight * 0.5;
      el.classList.toggle('visible', scrollY > above);
      requestAnimationFrame(updateCompass);
    }

    el.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    requestAnimationFrame(updateCompass);
  };

  /* ── 8. PARTIKKEL-TEKST ─────────────────────────── */
  MO.initParticleText = function () {
    if (window.innerWidth <= 768) return;
    var targets = document.querySelectorAll('.hero__title-line1, .hero__title-line2');
    if (!targets.length) return;

    targets.forEach(function (el) {
      var text = el.textContent;
      var wrapper = document.createElement('span');
      wrapper.className = 'particle-text';
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';

      var canvas = document.createElement('canvas');
      canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;opacity:0;transition:opacity 1s ease;';
      wrapper.appendChild(canvas);
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);

      var ctx = canvas.getContext('2d');
      var W, H;

      function measure() {
        var r = wrapper.getBoundingClientRect();
        W = canvas.width = r.width * window.devicePixelRatio;
        H = canvas.height = r.height * window.devicePixelRatio;
        canvas.style.width = r.width + 'px';
        canvas.style.height = r.height + 'px';
      }
      measure();
      var resizeObs = new ResizeObserver(measure);
      resizeObs.observe(wrapper);

      /* Make particle text visible on scroll */
      var obs = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) {
          canvas.style.opacity = '1';
          generateParticles();
        } else {
          canvas.style.opacity = '0';
        }
      }, { threshold: 0.5 });
      obs.observe(wrapper);

      function generateParticles() {
        if (!W || !H) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var fontSize = Math.min(H * window.devicePixelRatio * 0.7, 60);
        ctx.font = 'bold ' + fontSize + 'px Cormorant Garamond, Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(212,168,75,.15)';
        ctx.fillText(text, W / 2, H / 2);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var particles = [];

        var spacing = 4;
        for (var y = 0; y < canvas.height; y += spacing) {
          for (var x = 0; x < canvas.width; x += spacing) {
            var i = (y * canvas.width + x) * 4;
            if (data[i + 3] > 128) {
              particles.push({
                ox: x, oy: y,
                x: x + (Math.random() - 0.5) * 80,
                y: y + (Math.random() - 0.5) * 80,
                r: 0.5 + Math.random() * 1,
                a: 0.3 + Math.random() * 0.4,
                speed: 0.005 + Math.random() * 0.01,
                phase: Math.random() * Math.PI * 2
              });
            }
          }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var startTime = performance.now();
        var settled = false;

        function animateParticles(now) {
          var elapsed = (now - startTime) / 1000;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          var allSettled = true;
          for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var t = Math.min(elapsed / 2, 1);
            var ease = 1 - Math.pow(1 - t, 3);
            var cx = p.ox + (p.x - p.ox) * (1 - ease);
            var cy = p.oy + (p.y - p.oy) * (1 - ease);

            if (t < 1) allSettled = false;

            var wobble = settled ? Math.sin(now * p.speed + p.phase) * 0.5 : 0;
            ctx.beginPath();
            ctx.arc(cx + wobble, cy + wobble, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,' + p.a * Math.min(t * 2, 1) + ')';
            ctx.fill();
          }

          if (!allSettled) {
            requestAnimationFrame(animateParticles);
          } else {
            settled = true;
          }
        }
        requestAnimationFrame(animateParticles);
      }
    });
  };

  /* ── 9. AKVARELL-OVERFANG ────────────────────────── */
  MO.initWatercolor = function () {
    var sections = document.querySelectorAll('.section--decorated, .about-highlight, .newsletter');
    sections.forEach(function (s) {
      s.classList.add('watercolor-section');
      var obs = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) {
          s.classList.add('revealed');
          obs.unobserve(s);
        }
      }, { threshold: 0.15 });
      obs.observe(s);
    });
  };

  window.MO = MO;

})();
