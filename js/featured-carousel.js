/**
 * Featured carousel — Layered Mask Shift.
 * Рамка и статус-бар статичны; title/quote/image — dual-slot slide+fade.
 * Автопрокрутка 5с, пауза при hover; клик по точкам; свайп (mobile overlay).
 */
(function () {
  var SWIPE_MIN_PX = 36;
  var SLIDES = [
    {
      title: "С ЧЕГО НАЧАЛАСЬ II МИРОВАЯ ВОЙНА",
      quote:
        "«В современном Европейском союзе официально господствует идея о равноправной вине III Рейха и СССР в начале II мировой войны»",
      src: "../assets/index/img-first-slide.jpg",
      alt: "Комикс: С чего началась II мировая война",
    },
    {
      title: "НОЧНЫЕ ВЕДЬМЫ",
      quote:
        "«Немцы звали их «Ведьмами». Они приходили во тьме, выключали моторы и обрушивали бомбы с небес. История легендарного женского авиаполка, где каждый вылет — игра со смертью»",
      src: "../assets/index/img-second-slide.jpg",
      alt: "Комикс: Ночные ведьмы",
    },
    {
      title: "БЕРЛИНСКАЯ ОПЕРАЦИЯ",
      quote:
        "«Берлин, апрель 1945. Последний штурм. Город в огне, Рейхстаг — цель, победа — цена. История решающей битвы Второй мировой в комиксе»",
      src: "../assets/index/img-third-slide.jpg",
      alt: "Комикс: Берлинская операция",
    },
    {
      title: "ЦАРЬ, КОТОРЫЙ РЕШИЛ ПЕРЕСТРОИТЬ РОССИЮ",
      quote:
        "«Петр I — царь, который провёл масштабные реформы и изменил развитие России. Читатели узнают, как были созданы флот, новая армия и Санкт-Петербург, а страна стала одной из ведущих держав Европы»",
      src: "../assets/index/img-fourth-slide.jpg",
      alt: "Комикс: Пётр I",
    },
  ];

  var AUTO_MS = 5000;
  var ANIM_MS = 450;

  function fillSlot(slot, slide) {
    var title = slot.querySelector("[data-featured-title]");
    var quote = slot.querySelector("[data-featured-quote]");
    var img = slot.querySelector("[data-featured-img]");
    if (title) title.textContent = slide.title;
    if (quote) quote.textContent = slide.quote;
    if (img) {
      img.src = slide.src;
      img.alt = slide.alt || "";
    }
  }

  function remPx(n) {
    var fs = parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
    return n * (fs || 1);
  }

  function init(root) {
    var copyA = root.querySelector("[data-featured-copy-a]");
    var copyB = root.querySelector("[data-featured-copy-b]");
    var mediaA = root.querySelector("[data-featured-media-a]");
    var mediaB = root.querySelector("[data-featured-media-b]");
    var dots = root.querySelectorAll("[data-featured-dot]");
    var card = root.querySelector(".featured__card") || root;
    var swipe = root.querySelector("[data-featured-swipe]");

    if (!copyA || !copyB || !mediaA || !mediaB) return;

    var index = 0;
    var useA = true;
    var animating = false;
    var timer = null;
    var hasWaapi =
      typeof Element !== "undefined" &&
      typeof Element.prototype.animate === "function";

    fillSlot(copyA, SLIDES[0]);
    fillSlot(mediaA, SLIDES[0]);
    fillSlot(copyB, SLIDES[0]);
    fillSlot(mediaB, SLIDES[0]);

    function setDots(i) {
      for (var d = 0; d < dots.length; d++) {
        var on = d === i;
        dots[d].classList.toggle("is-active", on);
        dots[d].setAttribute("aria-selected", on ? "true" : "false");
      }
    }

    function stopAuto() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function startAuto() {
      stopAuto();
      timer = window.setInterval(function () {
        goTo((index + 1) % SLIDES.length, 1);
      }, AUTO_MS);
    }

    function clearInlineMotion(el) {
      el.style.opacity = "";
      el.style.transform = "";
      el.classList.remove("is-animating");
    }

    function animateSlide(el, fromX, toX, fromOp, toOp) {
      return el.animate(
        [
          { opacity: fromOp, transform: "translate3d(" + fromX + "px, 0, 0)" },
          { opacity: toOp, transform: "translate3d(" + toX + "px, 0, 0)" },
        ],
        {
          duration: ANIM_MS,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
        }
      );
    }

    function goTo(nextIndex, direction) {
      nextIndex = ((nextIndex % SLIDES.length) + SLIDES.length) % SLIDES.length;
      if (animating || nextIndex === index) return;

      var dir = direction;
      if (dir == null) {
        dir =
          nextIndex > index || (index === SLIDES.length - 1 && nextIndex === 0)
            ? 1
            : -1;
        if (index === 0 && nextIndex === SLIDES.length - 1) dir = -1;
      }

      var slide = SLIDES[nextIndex];
      var outCopy = useA ? copyA : copyB;
      var inCopy = useA ? copyB : copyA;
      var outMedia = useA ? mediaA : mediaB;
      var inMedia = useA ? mediaB : mediaA;

      fillSlot(inCopy, slide);
      fillSlot(inMedia, slide);

      animating = true;
      inCopy.setAttribute("aria-hidden", "false");
      inMedia.setAttribute("aria-hidden", "false");

      index = nextIndex;
      useA = !useA;
      setDots(index);

      /* Web Animations API — стабильно в Yandex/Chrome, без CSS-transition quirks */
      if (hasWaapi) {
        var copyD = remPx(36);
        var mediaD = remPx(40);
        var outCopyX = dir > 0 ? -copyD : copyD;
        var inCopyX = dir > 0 ? copyD : -copyD;
        var outMediaX = dir > 0 ? -mediaD : mediaD;
        var inMediaX = dir > 0 ? mediaD : -mediaD;

        outCopy.classList.add("is-animating");
        inCopy.classList.add("is-animating");
        outMedia.classList.add("is-animating");
        inMedia.classList.add("is-animating");

        outCopy.classList.remove("is-active");
        outMedia.classList.remove("is-active");
        inCopy.classList.add("is-active");
        inMedia.classList.add("is-active");

        var anims = [
          animateSlide(outCopy, 0, outCopyX, 1, 0),
          animateSlide(inCopy, inCopyX, 0, 0, 1),
          animateSlide(outMedia, 0, outMediaX, 1, 0),
          animateSlide(inMedia, inMediaX, 0, 0, 1),
        ];

        Promise.all(
          anims.map(function (a) {
            return a.finished.catch(function () {});
          })
        ).then(function () {
          for (var i = 0; i < anims.length; i++) {
            try {
              anims[i].cancel();
            } catch (err) {
              /* ignore */
            }
          }
          clearInlineMotion(outCopy);
          clearInlineMotion(inCopy);
          clearInlineMotion(outMedia);
          clearInlineMotion(inMedia);
          outCopy.setAttribute("aria-hidden", "true");
          outMedia.setAttribute("aria-hidden", "true");
          animating = false;
        });
        return;
      }

      /* Fallback без WAAPI — CSS-классы */
      outCopy.classList.remove(
        "is-enter",
        "is-enter-from-left",
        "is-enter-from-right",
        "is-exit",
        "is-exit-left",
        "is-exit-right"
      );
      inCopy.classList.remove(
        "is-enter",
        "is-enter-from-left",
        "is-enter-from-right",
        "is-exit",
        "is-exit-left",
        "is-exit-right"
      );
      outMedia.classList.remove(
        "is-enter",
        "is-enter-from-left",
        "is-enter-from-right",
        "is-exit",
        "is-exit-left",
        "is-exit-right"
      );
      inMedia.classList.remove(
        "is-enter",
        "is-enter-from-left",
        "is-enter-from-right",
        "is-exit",
        "is-exit-left",
        "is-exit-right"
      );

      inCopy.classList.add(dir > 0 ? "is-enter-from-right" : "is-enter-from-left");
      inMedia.classList.add(
        dir > 0 ? "is-enter-from-right" : "is-enter-from-left"
      );

      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          outCopy.classList.remove("is-active");
          outMedia.classList.remove("is-active");
          outCopy.classList.add(
            "is-exit",
            dir > 0 ? "is-exit-left" : "is-exit-right"
          );
          outMedia.classList.add(
            "is-exit",
            dir > 0 ? "is-exit-left" : "is-exit-right"
          );
          inCopy.classList.remove("is-enter-from-right", "is-enter-from-left");
          inMedia.classList.remove("is-enter-from-right", "is-enter-from-left");
          inCopy.classList.add("is-active", "is-enter");
          inMedia.classList.add("is-active", "is-enter");

          window.setTimeout(function () {
            outCopy.classList.remove("is-exit", "is-exit-left", "is-exit-right");
            outMedia.classList.remove(
              "is-exit",
              "is-exit-left",
              "is-exit-right"
            );
            outCopy.setAttribute("aria-hidden", "true");
            outMedia.setAttribute("aria-hidden", "true");
            inCopy.classList.remove("is-enter");
            inMedia.classList.remove("is-enter");
            animating = false;
          }, ANIM_MS);
        });
      });
    }

    for (var i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", function (event) {
        var btn = event.currentTarget;
        var idx = parseInt(btn.getAttribute("data-index"), 10);
        if (isNaN(idx)) return;
        var dir = idx >= index ? 1 : -1;
        goTo(idx, dir);
        startAuto();
      });
    }

    card.addEventListener("mouseenter", stopAuto);
    card.addEventListener("mouseleave", startAuto);

    /* Swipe: отдельный overlay (Chrome) + fallback на root */
    function bindSwipe(el) {
      if (!el) return;

      var startX = 0;
      var startY = 0;
      var tracking = false;
      var lockedAxis = null;

      el.addEventListener(
        "touchstart",
        function (event) {
          if (event.touches.length !== 1) return;
          tracking = true;
          lockedAxis = null;
          startX = event.touches[0].clientX;
          startY = event.touches[0].clientY;
          stopAuto();
        },
        { passive: true }
      );

      el.addEventListener(
        "touchmove",
        function (event) {
          if (!tracking || event.touches.length !== 1) return;
          var dx = event.touches[0].clientX - startX;
          var dy = event.touches[0].clientY - startY;

          if (!lockedAxis) {
            if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
            lockedAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
          }

          if (lockedAxis === "x") {
            event.preventDefault();
          }
        },
        { passive: false }
      );

      el.addEventListener(
        "touchend",
        function (event) {
          if (!tracking) return;
          tracking = false;
          var axis = lockedAxis;
          lockedAxis = null;

          var t = event.changedTouches[0];
          if (!t || axis === "y") {
            startAuto();
            return;
          }

          var dx = t.clientX - startX;
          var dy = t.clientY - startY;
          if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) {
              goTo((index + 1) % SLIDES.length, 1);
            } else {
              goTo((index - 1 + SLIDES.length) % SLIDES.length, -1);
            }
          }
          startAuto();
        },
        { passive: true }
      );

      el.addEventListener(
        "touchcancel",
        function () {
          tracking = false;
          lockedAxis = null;
          startAuto();
        },
        { passive: true }
      );

      /* Drag мышью — удобно проверять в DevTools / узком окне */
      var mouseOn = false;
      var mouseX = 0;
      var mouseY = 0;

      el.addEventListener("mousedown", function (event) {
        if (event.button !== 0) return;
        mouseOn = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
        stopAuto();
      });

      window.addEventListener("mouseup", function (event) {
        if (!mouseOn) return;
        mouseOn = false;
        var dx = event.clientX - mouseX;
        var dy = event.clientY - mouseY;
        if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) {
            goTo((index + 1) % SLIDES.length, 1);
          } else {
            goTo((index - 1 + SLIDES.length) % SLIDES.length, -1);
          }
        }
        startAuto();
      });
    }

    bindSwipe(swipe || root);

    setDots(0);
    startAuto();
  }

  function boot() {
    var nodes = document.querySelectorAll("[data-featured-carousel]");
    for (var i = 0; i < nodes.length; i++) init(nodes[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
