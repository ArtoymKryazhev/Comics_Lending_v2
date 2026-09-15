/**
 * Adaptive viewport — margin-first fit + layout switch.
 *
 * Desktop:
 * 1) Пока до контента (1083) по бокам ≥20px и высота ≥1080 — scale = 1
 *    (белые поля артборда просто обрезаются).
 * 2) Иначе пропорциональный scale: min((vw-40)/1083, vh/1080), потолок 4K (×2).
 * 3) При большом экране — scale up с теми же отступами 20px.
 *
 * Mobile: w<1200 || h<600; scale 100vw/440. Gate: vw < 320.
 */
(function () {
  var DEFAULT_DESKTOP_W = 1920;
  var DEFAULT_DESKTOP_H = 1080;
  var DEFAULT_MOBILE_W = 440;
  var CONTENT_W = 1083;
  var EDGE_PAD = 20;

  var DESKTOP_MIN_W = 1200;
  var DESKTOP_MIN_H = 600;
  var FIT_FS_MAX = 3840 / DEFAULT_DESKTOP_W; /* 2 */
  var MIN_W = 320;

  function readDim(attr, fallback) {
    var value = parseInt(document.documentElement.getAttribute(attr), 10);
    return value > 0 ? value : fallback;
  }

  function artboardConfig() {
    return {
      desktopW: readDim("data-artboard-w", DEFAULT_DESKTOP_W),
      desktopH: readDim("data-artboard-h", DEFAULT_DESKTOP_H),
      mobileW: readDim("data-artboard-w-mobile", DEFAULT_MOBILE_W),
    };
  }

  function pickLayout(vw, vh) {
    if (vw < DESKTOP_MIN_W || vh < DESKTOP_MIN_H) return "mobile";
    return "desktop";
  }

  function isMobileReady() {
    return document.querySelector(".page-index") !== null;
  }

  function isSupported(vw, layout) {
    if (vw < MIN_W) return false;
    if (layout === "desktop") return true;
    return isMobileReady();
  }

  /**
   * 1:1 пока поля до контента ≥ EDGE_PAD и страница по высоте влезает.
   * Дальше / при увеличении — пропорционально к контенту + pad, cap 4K.
   */
  function fitFontSize(vw, vh, designH) {
    var pad2 = EDGE_PAD * 2;
    var minWFor1 = CONTENT_W + pad2; /* 1123 */
    var fsW = (vw - pad2) / CONTENT_W;
    var fsH = vh / designH;
    var fsUp = Math.min(fsW, (vh - pad2) / designH, FIT_FS_MAX);

    if (fsUp > 1) {
      return fsUp;
    }

    if (vw >= minWFor1 && vh >= designH) {
      return 1;
    }

    var fs = Math.min(fsW, fsH, 1);
    if (!(fs > 0)) fs = Math.min(vw / DEFAULT_DESKTOP_W, vh / designH);
    return fs;
  }

  function apply() {
    var root = document.documentElement;
    var page = document.querySelector(".page");
    var unsupported = document.querySelector(".viewport-unsupported");
    var config = artboardConfig();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var layout = pickLayout(vw, vh);
    var supported = isSupported(vw, layout);
    var designW = layout === "mobile" ? config.mobileW : config.desktopW;

    root.setAttribute("data-layout", layout);
    root.setAttribute("data-viewport", supported ? "ok" : "unsupported");
    root.style.setProperty("--design-w", String(designW));

    if (layout === "desktop" && supported) {
      var fs = fitFontSize(vw, vh, config.desktopH);
      root.style.setProperty("--fit-fs", fs + "px");
      root.style.fontSize = fs + "px";
    } else {
      root.style.removeProperty("--fit-fs");
      root.style.fontSize = "";
    }

    if (!supported) {
      if (page) page.hidden = true;
      if (unsupported) unsupported.hidden = false;
      return;
    }

    if (page) page.hidden = false;
    if (unsupported) unsupported.hidden = true;
  }

  function bind() {
    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
