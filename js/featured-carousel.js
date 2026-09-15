/**
 * Featured carousel — Layered Mask Shift.
 * Рамка и статус-бар статичны; title/quote/image — dual-slot slide+fade.
 * Автопрокрутка 5с, пауза при hover; клик по точкам.
 */
(function () {
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
  var ANIM_MS = 480;

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

  function init(root) {
    var copyA = root.querySelector("[data-featured-copy-a]");
    var copyB = root.querySelector("[data-featured-copy-b]");
    var mediaA = root.querySelector("[data-featured-media-a]");
    var mediaB = root.querySelector("[data-featured-media-b]");
    var dots = root.querySelectorAll("[data-featured-dot]");
    var card = root.querySelector(".featured__card") || root;

    if (!copyA || !copyB || !mediaA || !mediaB) return;

    var index = 0;
    var useA = true;
    var animating = false;
    var timer = null;

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

    function goTo(nextIndex, direction) {
      nextIndex = ((nextIndex % SLIDES.length) + SLIDES.length) % SLIDES.length;
      if (animating || nextIndex === index) return;

      var dir = direction;
      if (dir == null) {
        dir = nextIndex > index || (index === SLIDES.length - 1 && nextIndex === 0) ? 1 : -1;
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

      outCopy.classList.remove("is-enter", "is-enter-from-left", "is-enter-from-right");
      inCopy.classList.remove("is-enter", "is-enter-from-left", "is-enter-from-right", "is-exit", "is-exit-left", "is-exit-right");
      outMedia.classList.remove("is-enter", "is-enter-from-left", "is-enter-from-right");
      inMedia.classList.remove("is-enter", "is-enter-from-left", "is-enter-from-right", "is-exit", "is-exit-left", "is-exit-right");

      /* prepare incoming off-screen */
      inCopy.classList.add(dir > 0 ? "is-enter-from-right" : "is-enter-from-left");
      inMedia.classList.add(dir > 0 ? "is-enter-from-right" : "is-enter-from-left");
      inCopy.setAttribute("aria-hidden", "false");
      inMedia.setAttribute("aria-hidden", "false");

      /* force reflow */
      void inCopy.offsetWidth;

      outCopy.classList.remove("is-active");
      outMedia.classList.remove("is-active");
      outCopy.classList.add("is-exit", dir > 0 ? "is-exit-left" : "is-exit-right");
      outMedia.classList.add("is-exit", dir > 0 ? "is-exit-left" : "is-exit-right");

      inCopy.classList.remove("is-enter-from-right", "is-enter-from-left");
      inMedia.classList.remove("is-enter-from-right", "is-enter-from-left");
      inCopy.classList.add("is-active", "is-enter");
      inMedia.classList.add("is-active", "is-enter");

      index = nextIndex;
      useA = !useA;
      setDots(index);

      window.setTimeout(function () {
        outCopy.classList.remove("is-exit", "is-exit-left", "is-exit-right");
        outMedia.classList.remove("is-exit", "is-exit-left", "is-exit-right");
        outCopy.setAttribute("aria-hidden", "true");
        outMedia.setAttribute("aria-hidden", "true");
        inCopy.classList.remove("is-enter");
        inMedia.classList.remove("is-enter");
        animating = false;
      }, ANIM_MS);
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
