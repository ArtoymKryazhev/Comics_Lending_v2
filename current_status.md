# Current status

**Состояние:** Header + Brand + Featured-карусель (Layered Mask Shift) desktop. Adaptive rem-scale. Desktop scroll **запрещён**.

**Фазы:** Desktop + пропорциональный adaptive (сейчас) → Mobile-макеты — когда появятся фреймы.

**Следующий шаг:** Subscription (`41:118`) — ждать фрейм от пользователя.

---

## index.html — лендинг Крумб

### Desktop (пиксель-в-пиксель)
- [x] Header (`46:15`)
- [x] Brand / left card + slider (`3:126`) — slide-unlock рабочий, никуда не ведёт
- [x] Featured carousel (`1:29`, `41:131`, `41:141`, `41:151`) — Layered Mask Shift; dots + autoplay 5s
- [ ] Subscription (`41:118`; точный фрейм — когда пришлют)
- [ ] Footer (`38:17`; точный фрейм — когда пришлют)

### Mobile
- [ ] TODO: артборд / node-id — ещё нет
- [x] Header (тот же состав, бар 396rem; без отдельного Figma — подогнано под контентную колонку)
- [ ] Brand / intro card (desktop-only пока)
- [ ] Featured comic / серая карточка (desktop-only пока)
- [ ] Subscription
- [ ] Footer

### Adaptive
- [x] Rem-scale по ширине (`layout.css` + `design-viewport.js`)
- [x] Desktop: scroll выключен; mobile: scroll разрешён

---

## Figma

- fileKey: `jElL6muhfPPhZSn3f5mi2C`
- Header: [`46:15`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=46-15)
- Featured: [`1:29`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=1-29) + slides `41:131` / `41:141` / `41:151`
- Обзор Desktop: [`1:2`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=1-2) (1920×1080)
- Mobile: **TODO**

---

## Локальный просмотр

См. [docs/local-preview.md](docs/local-preview.md): `python -m http.server 8080 --bind 0.0.0.0`

---

## Риски / ограничения

- Размеры в CSS — в rem (1rem = 1px макета)
- Header: лого / RuStore / бургер — **не кликабельны** (заглушки)
- Featured: рамка и статус-бар статичны; анимируются только текст и картинка
- Desktop без вертикального скролла; при добавлении контента выше 1080 — пересмотреть
- Mobile header без отдельного макета — уточнить, когда будет фрейм
- `design-viewport.js` — EXAMPLE; `layout.css` изменён под no-scroll desktop по задаче
