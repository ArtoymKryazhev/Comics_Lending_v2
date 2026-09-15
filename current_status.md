# Current status

**Состояние:** Desktop-лендинг собран. Adaptive: **margin-first** (поля до контента 20px без scale) → пропорциональный scale, cap 4K; mobile при `w<1200 || h<600`. Desktop scroll **запрещён**.

**Фазы:** Desktop + adaptive → Mobile-макеты блоков — когда появятся фреймы.

**Следующий шаг:** Mobile-артборды блоков (сейчас на mobile layout контент скрыт, виден в основном header).

---

## index.html — лендинг Крумб

### Desktop (пиксель-в-пиксель)
- [x] Header (`46:15`)
- [x] Brand / left card + slider (`3:126`) — slide-unlock рабочий, никуда не ведёт
- [x] Featured carousel (`1:29`, `41:131`, `41:141`, `41:151`) — Layered Mask Shift; dots + autoplay 5s
- [x] Subscribe (`55:70`) — CTA-заглушка
- [x] Footer (`38:17`) — legal / RuStore-заглушки

### Mobile
- [ ] TODO: артборд / node-id — ещё нет
- [x] Header (тот же состав, бар 396rem; без отдельного Figma — подогнано под контентную колонку)
- [ ] Brand / intro card (desktop-only пока)
- [ ] Featured comic (desktop-only пока)
- [ ] Subscribe (desktop-only пока)
- [ ] Footer (desktop-only пока)

### Adaptive
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
- Mobile: **TODO**

---

## Локальный просмотр

См. [docs/local-preview.md](docs/local-preview.md): `python -m http.server 8080 --bind 0.0.0.0`

---

## Риски / ограничения

- Размеры в CSS — в rem (1rem = 1px макета)
- Header / Continue / legal / RuStore — **не кликабельны** (заглушки)
- Тексты footer как в Figma (`конфидициальности`, `ОРГН`)
- Desktop без вертикального скролла
- `design-viewport.js` — EXAMPLE
