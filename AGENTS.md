# Comics Landing (Крумб)

Статическая вёрстка одностраничного лендинга платформы «Крумб» по макетам Figma. Без бэка, без фреймворков.

## Стек
HTML + CSS + vanilla JS.

## Артборды
- Desktop: **1920×1080** (обзорный фрейм `1:2`)
- Mobile: **440px** ширина (временно) — `html[data-layout="mobile"]`
- Mobile node-id / точные размеры: **TODO**
- Контентная ширина: desktop **1083px**, mobile **396px** (ориентир)

## Figma
- fileKey: `jElL6muhfPPhZSn3f5mi2C`
- Обзор Desktop: [`1:2`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=1-2)
- Вёрстка **по отдельным фреймам-блокам**, которые присылает пользователь (не весь артборд за раз)
- Для серой карточки возможны **доп. фреймы** — не угадывать, ждать node-id

## Фазы вёрстки
1. **Desktop** — пиксель-в-пиксель по Figma, блок за блоком
2. **Adaptive** — пропорциональный rem-scale (**разрешён** с задачи Header); не через CSS breakpoints для смены композиции
3. **Mobile-макеты** — отдельные фреймы, когда появятся; до этого mobile layout = тот же состав, узкая колонка

## Scroll
- **Desktop:** вертикальный scroll **запрещён** (фиксированная высота артборда 1080)
- **Mobile layout:** scroll разрешён

## Adaptive
- `js/design-viewport.js` + `css/layout.css`
- **Desktop** при `width ≥ 1200` **и** `height ≥ 600`; иначе **mobile**
- **Margin-first:** scale = 1, пока до контента (1083) по бокам ≥ **20px** и высота ≥ 1080 (поля артборда просто обрезаются)
- Дальше / при росте экрана: пропорциональный scale от контента + 20px, потолок **4K** (×2)
- Mobile scale: `100vw / 440`; gate `<320px`
- Страница центрируется в viewport; stubs без layout-обёртки

> Adaptive обновлён под Fit / margin-first (одобрение пользователя). Крупные переписывания — с одобрения.

## Header
Механика fixed + blur (Chrome) — см. [docs/header-behavior.md](docs/header-behavior.md). Визуал — из фрейма Comics.

## Страницы

| Файл | Назначение | Desktop | Mobile |
| --- | --- | --- | --- |
| [pages/index.html](pages/index.html) | Одностраничный лендинг | [`1:2`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=1-2) (обзор) | TODO |

## Структура
- `css/` — reset, tokens, layout (пример), стили страницы
- `js/design-viewport.js` — layout + fit-scale
- `assets/index/` — экспорты из Figma
- `examples/page-skeleton.html` — эталон каркаса
- `docs/plans/` — сохранённые планы
- `docs/header-behavior.md` — поведение header из эталона
- `docs/local-preview.md` — HTTP-сервер для ПК и телефона в LAN
- `current_status.md` — живой статус

## Нельзя без запроса
- Фреймворки, сборщики, бизнес-логика форм, новые верхнеуровневые папки
- Включать scroll на Desktop без запроса
- Переписывание `design-viewport.js` (EXAMPLE) без одобрения

## Статус
См. [current_status.md](current_status.md).
