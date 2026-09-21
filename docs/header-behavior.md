# Header — поведение

Визуал (цвета, отступы, размеры бара) — из фрейма Comics. Паттерн — spacer + pointer-events (+ blur при translucent bg).

Реализация: `pages/subscribe.html` / `pages/index.html` + `css/index.css` (+ `startup.css` на главной). Лого / RuStore / бургер / Скачать — **не кликабельны** или внешние заглушки.

## Паттерн (desktop)

1. **Spacer** на странице через `::before` у `.page-index` (высота = `top` + высота бара).
2. **`.header`**: `position: absolute` внутри `.page` (не `fixed` — иначе при Fit-центрировании шапка отлипает от страницы); `top` из макета; ширина = `calc(var(--design-w) * 1rem)`; **`pointer-events: none`** на оболочке.
3. **`.header__bar`**: flex, контентная ширина **1083rem**; bg; `border-radius`; при blur — **`backdrop-filter` + `-webkit-backdrop-filter`**; кликабельной зоны нет (заглушки).
4. Размеры в **rem** (1rem = 1px макета при fit-scale).

## Паттерн (mobile)

1. Тот же spacer (`22rem + 52rem`).
2. **`.header`**: `position: fixed` (как в Kutukov) — шапка остаётся в viewport при page scroll; ширина артборда 440; **`pointer-events: none`** на оболочке.
3. **`.header__bar`**: контентная ширина **396rem**; непрозрачный bg `#e8e8e8` — blur не используем (без translucent фона он не виден).
4. Desktop Fit / `absolute` на mobile **не** копируем: на mobile нет letterbox-центрирования страницы.

Comics (Figma `46:15`):

- Desktop: `top: 22rem`, bar **1083×52**, spacer `calc(22rem + 52rem)`, radius `39rem`, bg `#e8e8e8`
- Logo `38×38` (круг), RuStore `126×38`, burger `21×8`, gap actions `32rem` (mobile gap `20rem`)
- Mobile layout (без отдельного макета): бар **396rem**, `position: fixed`, те же элементы

## Почему `pointer-events: none` на оболочке

Оболочка на всю ширину артборда; без `none` перехватывала бы клики по контенту.

## Blur в Chrome

```css
backdrop-filter: blur(/* … */);
-webkit-backdrop-filter: blur(/* … */);
```

Нужен полупрозрачный `background`, иначе эффект не виден. Сейчас бар Comics непрозрачный — blur не подключаем.

## Связь с adaptive

- **Desktop:** Fit-scale (`--fit-fs`) + центрирование `.page`. Header — `absolute` относительно `.page`.
- **Mobile:** rem-scale `100vw/440`, page scroll. Header — `fixed` к viewport.
