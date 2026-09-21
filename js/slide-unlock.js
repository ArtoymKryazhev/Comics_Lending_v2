/**
 * Slide-to-unlock на brand-карточке.
 * Ручка — ластик по маске: текст на месте, под кругом мягко стирается.
 * По отпусканию возвращается назад — никуда не ведёт.
 */
(function () {
  function initSlider(root) {
    var knob = root.querySelector("[data-slider-knob]");
    if (!knob) return;

    var maxX = 0;
    var startX = 0;
    var currentX = 0;
    var dragging = false;
    var pointerId = null;
    var knobPad = 0;

    function remPx() {
      return parseFloat(getComputedStyle(document.documentElement).fontSize) || 1;
    }

    function measure() {
      var rem = remPx();
      knobPad = 6 * rem;
      var knobW = knob.offsetWidth;
      maxX = Math.max(0, root.clientWidth - knobPad * 2 - knobW);
      syncMask();
    }

    function syncMask() {
      var rem = remPx();
      var rootRect = root.getBoundingClientRect();
      var knobRect = knob.getBoundingClientRect();
      /* центр круга в координатах трека (учитывает transform / DPR) */
      var cx = knobRect.left + knobRect.width / 2 - rootRect.left;
      var knobR = knobRect.width / 2;
      /* ластик чуть шире круга; wipe — в rem, иначе на scale/телефоне зона уезжает */
      var pad = 8 * rem;
      var wipe = 12 * rem;
      root.style.setProperty("--mask-x", cx + "px");
      root.style.setProperty("--mask-r", knobR + pad + "px");
      root.style.setProperty("--mask-wipe", wipe + "px");
    }

    function setX(x, animate) {
      currentX = Math.max(0, Math.min(maxX, x));
      if (animate) {
        knob.style.transition = "transform 0.35s ease";
      } else {
        knob.style.transition = "none";
      }
      knob.style.transform = "translate3d(" + currentX + "px, 0, 0)";
      syncMask();
      if (animate) {
        var start = performance.now();
        function tick(now) {
          syncMask();
          if (now - start < 400) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    }

    function reset() {
      root.classList.remove("is-complete");
      root.classList.remove("is-dragging");
      setX(0, true);
    }

    function onPointerDown(event) {
      if (event.button != null && event.button !== 0) return;
      measure();
      dragging = true;
      pointerId = event.pointerId;
      startX = event.clientX - currentX;
      root.classList.add("is-dragging");
      knob.setPointerCapture(pointerId);
      knob.style.transition = "none";
      event.preventDefault();
    }

    function onPointerMove(event) {
      if (!dragging || event.pointerId !== pointerId) return;
      setX(event.clientX - startX, false);
    }

    function onPointerUp(event) {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      try {
        knob.releasePointerCapture(pointerId);
      } catch (err) {
        /* ignore */
      }
      pointerId = null;

      if (maxX > 0 && currentX >= maxX * 0.85) {
        setX(maxX, true);
        root.classList.add("is-complete");
        window.setTimeout(reset, 400);
      } else {
        reset();
      }
    }

    knob.addEventListener("pointerdown", onPointerDown);
    knob.addEventListener("pointermove", onPointerMove);
    knob.addEventListener("pointerup", onPointerUp);
    knob.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("resize", measure);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", measure);
    }
    measure();
    requestAnimationFrame(function () {
      requestAnimationFrame(measure);
    });
  }

  function boot() {
    var nodes = document.querySelectorAll("[data-slider]");
    for (var i = 0; i < nodes.length; i++) initSlider(nodes[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
