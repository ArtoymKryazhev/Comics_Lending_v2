# Header — поведение (эталон Kutukov)

Документ фиксирует **механику** header из [`Kutukov_business_landing`](../../Kutukov_business_landing) для Comics Landing. Визуал (цвета, отступы, размеры бара) берём из фрейма Comics; паттерн поведения — тот же.

Реализация: `pages/index.html` + `css/index.css` (Figma `46:15`). Лого / RuStore / бургер — **не кликабельны** (`span`, `pointer-events: none`).

## Зачем

Fixed-шапка с `backdrop-filter` / blur в Chrome требует осторожной разметки кликов и компенсации высоты контента. В эталоне это решено так.

## Паттерн (desktop)

1. **Spacer** на странице через `::before` у `.page-index` (высота = `top` + высота бара), чтобы контент не заезжал под fixed-header.
2. **`.header`**: `position: fixed`; `top` из макета; ширина = `calc(var(--design-w) * 1rem)`; `margin-inline: auto`; `z-index` высокий; **`pointer-events: none`** на оболочке.
3. **`.header__bar`**: flex, контентная ширина (в эталоне **1083rem** desktop / **396rem** mobile); полупрозрачный фон; `border-radius`; **`backdrop-filter` + `-webkit-backdrop-filter`**; **`pointer-events: auto`**.
4. Размеры в **rem** (1rem = 1px макета при эталонной ширине).

Comics (Figma `46:15` + обзор `1:2`):

- Desktop: `top: 22rem`, bar **1083×52**, spacer `calc(22rem + 52rem)`, radius `39rem`, bg `#e8e8e8`
- Logo `38×38` (круг), RuStore `126×38`, burger `21×8`, gap actions `32rem`
- Mobile layout (без отдельного макета): бар **396rem**, те же элементы

## Почему `pointer-events: none` на оболочке

Оболочка на всю ширину артборда поверх страницы; без `none` она перехватывала бы клики по контенту. Клики живут только на баре (`pointer-events: auto`).

## Blur в Chrome

Всегда дублировать:

```css
backdrop-filter: blur(/* … */);
-webkit-backdrop-filter: blur(/* … */);
```

## Mobile

Тот же паттерн под `html[data-layout="mobile"]`. Верстать mobile-header **только после отмашки** и наличия mobile-фрейма.

## Связь с adaptive

Ширина `.header` завязана на `--design-w` / rem-scale из `layout.css` + `design-viewport.js`. Desktop: scroll выключен; не ломать rem-scale ради шапки.
