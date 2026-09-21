# Current status

**Состояние:** Desktop + provisional mobile (без Figma). Adaptive: margin-first → scale, cap 4K; mobile при `w<1200 || h<600`. Desktop scroll запрещён; mobile scroll + fixed header. **Главная = startup** (`pages/index.html`); вторичная = подписка (`pages/subscribe.html`).

**Фазы:** Desktop + adaptive + mobile stack (без макета) → пиксель-полировка mobile, когда появятся фреймы.

**Следующий шаг:** Mobile-артборды из Figma (если будут) — заменить provisional stack на пиксель-в-пиксель.

---

## index.html — главная (стартап / партнёры)

### Desktop (пиксель-в-пиксель)
- [x] Обзор [`74:15`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=74-15)
- [x] Header — лого + «Скачать» (заглушка)
- [x] Brand / slider — как на subscribe
- [x] Featured — слайды + лейбл «КОМИКС»; [`75:117`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=75-117), [`75:130`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=75-130), [`75:141`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=75-141)
- [x] Partners ×3 — Фонд / Платформа УТП / текст поддержки
- [x] Footer — company + RuStore, **без** политики

### Mobile (без макета — stacked 396rem)
- [x] Brand → Featured → Partners ×3 → Footer
- [x] Header `fixed` + download-заглушка
- [x] Partner-карточки на белом фоне; текст поддержки колонкой
- [x] Footer: company + RuStore в ряд (без legal)

---

## subscribe.html — вторичная (лендинг подписки)

### Desktop (пиксель-в-пиксель)
- [x] Header (`46:15`) — RuStore + burger
- [x] Brand / left card + slider (`3:126`)
- [x] Featured carousel — Layered Mask Shift; dots + autoplay 5s
- [x] Subscribe (`55:70`) — CTA-заглушка
- [x] Footer (`38:17`) — legal / RuStore

### Mobile (без макета — stacked 396rem)
- [ ] TODO: артборд / node-id — ещё нет (provisional layout)
- [x] Header fixed; Brand → Featured → Subscribe → Footer

### Навигация
- Между страницами **нет** ссылок (независимые URL)
- Корень репо `index.html` → редирект на `pages/index.html` (GitHub Pages)

---

## Adaptive
- [x] Margin-first: scale = 1, пока до контента 1083 по бокам ≥ 20px и `vh ≥ 1080`
- [x] Далее пропорциональный scale; потолок 4K (×2); центрирование страницы
- [x] Mobile breakpoint: `width < 1200` **или** `height < 600`
- [x] Desktop: scroll выключен; mobile: scroll разрешён

---

## Figma

- fileKey: `jElL6muhfPPhZSn3f5mi2C`
- Главная (startup): [`74:15`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=74-15)
- Подписка (обзор): [`1:2`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=1-2)
- Mobile: **TODO** (provisional stacked column)

---

## Локальный просмотр / GitHub Pages

См. [docs/local-preview.md](docs/local-preview.md): `python -m http.server 8080 --bind 0.0.0.0`

- Главная: `/` или `/pages/index.html`
- Подписка: `/pages/subscribe.html`

GitHub Pages: Settings → Pages → Deploy from branch `main` / root (есть `.nojekyll` + корневой редирект).

---

## Риски / ограничения

- Размеры в CSS — в rem (1rem = 1px макета)
- Header / Continue / legal / RuStore / Скачать — **не кликабельны** или внешние заглушки
- Desktop без вертикального скролла
- Mobile без Figma — композиция provisional (не пиксель-в-пиксель)
- `design-viewport.js` — EXAMPLE
