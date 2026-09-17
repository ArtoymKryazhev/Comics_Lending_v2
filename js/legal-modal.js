/**
 * Legal modal — политика конфиденциальности и ПДн.
 * Открытие по data-legal-open; закрытие: крестик, фон, Escape.
 */
(function () {
  var TITLES = {
    privacy:
      "Политика конфиденциальности и обработки персональных данных",
  };

  function boot() {
    var modal = document.querySelector("[data-legal-modal]");
    if (!modal) return;

    var titleEl = modal.querySelector("#legal-modal-title");
    var bodyEl = modal.querySelector("[data-legal-body]");
    var closeBtn = modal.querySelector(".legal-modal__close");
    var lastFocus = null;
    var openKey = null;

    function getTemplate(key) {
      return document.getElementById("legal-template-" + key);
    }

    function lockScroll(on) {
      if (on) {
        document.documentElement.classList.add("is-legal-modal-open");
        document.body.classList.add("is-legal-modal-open");
      } else {
        document.documentElement.classList.remove("is-legal-modal-open");
        document.body.classList.remove("is-legal-modal-open");
      }
    }

    function close() {
      if (modal.hasAttribute("hidden")) return;
      modal.setAttribute("hidden", "");
      modal.setAttribute("aria-hidden", "true");
      lockScroll(false);
      openKey = null;
      if (bodyEl) bodyEl.innerHTML = "";
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
      lastFocus = null;
    }

    function open(key) {
      var tpl = getTemplate(key);
      if (!tpl || !titleEl || !bodyEl) return;

      lastFocus = document.activeElement;
      openKey = key;
      titleEl.textContent = TITLES[key] || "";
      bodyEl.innerHTML = "";
      bodyEl.appendChild(tpl.content.cloneNode(true));
      bodyEl.scrollTop = 0;

      modal.removeAttribute("hidden");
      modal.setAttribute("aria-hidden", "false");
      lockScroll(true);

      if (closeBtn) closeBtn.focus();
    }

    var triggers = document.querySelectorAll("[data-legal-open]");
    for (var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener("click", function (event) {
        var key = event.currentTarget.getAttribute("data-legal-open");
        if (!key) return;
        open(key);
      });
    }

    var closers = modal.querySelectorAll("[data-legal-close]");
    for (var c = 0; c < closers.length; c++) {
      closers[c].addEventListener("click", close);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (modal.hasAttribute("hidden")) return;
      close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
