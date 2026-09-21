# Current status

**Состояние:** Desktop + provisional mobile (без Figma). Adaptive: margin-first → scale, cap 4K; mobile при `w<1200 || h<600`. Desktop scroll запрещён; mobile scroll + fixed header. Две страницы: index + startup.

**Фазы:** Desktop + adaptive + mobile stack (без макета) → пиксель-полировка mobile, когда появятся фреймы.

**Следующий шаг:** Mobile-артборды из Figma (если будут) — заменить provisional stack на пиксель-в-пиксель.

---

## index.html — лендинг Крумб

### Desktop (пиксель-в-пиксель)
- [x] Header (`46:15`)
- [x] Brand / left card + slider (`3:126`) — slide-unlock рабочий, никуда не ведёт
- [x] Featured carousel (`1:29`, `41:131`, `41:141`, `41:151`) — Layered Mask Shift; dots + autoplay 5s
- [x] Subscribe (`55:70`) — CTA-заглушка
- [x] Footer (`38:17`) — legal / RuStore-заглушки

### Mobile (без макета — stacked 396rem)
- [ ] TODO: артборд / node-id — ещё нет (provisional layout)
- [x] Header — бар 396rem, `position: fixed`, sticky при scroll
- [x] Brand — ширина 396, под Featured
- [x] Featured — ширина 396 (scale desktop 672→396)
- [x] Subscribe — features → price → CTA колонкой
- [x] Footer — company → legal → RuStore колонкой

---

## startup.html — страница стартапа

### Desktop (пиксель-в-пиксель)
- [x] Обзор [`74:15`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=74-15)
- [x] Header — лого + «Скачать» (заглушка: comics icon + arrow)
- [x] Brand / slider — как на index
- [x] Featured — те же слайды + лейбл «КОМИКС»; слайды [`75:117`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=75-117), [`75:130`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=75-130), [`75:141`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=75-141)
- [x] Partners ×3 — Фонд / Платформа УТП / текст поддержки (вместо Subscribe)
- [x] Footer — company + RuStore, **без** политики

### Mobile (без макета — stacked 396rem)
- [x] Brand → Featured → Partners ×3 (стек 396) → Footer
- [x] Header `fixed` + download-заглушка
- [x] Partner-карточки на белом фоне; текст поддержки колонкой
- [x] Footer: company + RuStore в ряд (без legal)

### Навигация
- Между index и startup **нет** ссылок (независимые страницы)

---

## Adaptive
- [x] Margin-first: scale = 1, пока до контента 1083 по бокам ≥ 20px и `vh ≥ 1080`
- [x] Далее пропорциональный scale; потолок 4K (×2); центрирование страницы
- [x] Mobile breakpoint: `width < 1200` **или** `height < 600`
- [x] Desktop: scroll выключен; mobile: scroll разрешён

---

## Figma

- fileKey: `jElL6muhfPPhZSn3f5mi2C`
- Header: [`46:15`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=46-15)
- Featured: [`1:29`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=1-29) + slides
- Subscribe: [`55:70`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=55-70)
- Footer: [`38:17`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=38-17)
- Обзор Desktop: [`1:2`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=1-2) (1920×1080)
- Startup обзор: [`74:15`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=74-15)
- Mobile: **TODO** (сейчас provisional stacked column)

---

## Локальный просмотр

См. [docs/local-preview.md](docs/local-preview.md): `python -m http.server 8080 --bind 0.0.0.0`

- Index: `/pages/index.html`
- Startup: `/pages/startup.html`

---

## Риски / ограничения

- Размеры в CSS — в rem (1rem = 1px макета)
- Header / Continue / legal / RuStore / Скачать — **не кликабельны** или внешние заглушки
- Desktop без вертикального скролла
- Mobile без Figma — композиция provisional (не пиксель-в-пиксель)
- `design-viewport.js` — EXAMPLE
