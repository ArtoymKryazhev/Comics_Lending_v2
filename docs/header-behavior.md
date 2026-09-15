# Header — поведение

Визуал (цвета, отступы, размеры бара) — из фрейма Comics. Паттерн — spacer + pointer-events + blur.

Реализация: `pages/index.html` + `css/index.css` (Figma `46:15`). Лого / RuStore / бургер — **не кликабельны**.

## Паттерн (desktop)

1. **Spacer** на странице через `::before` у `.page-index` (высота = `top` + высота бара).
2. **`.header`**: `position: absolute` внутри `.page` (не `fixed` — иначе при Fit-центрировании шапка отлипает от страницы); `top` из макета; ширина = `calc(var(--design-w) * 1rem)`; **`pointer-events: none`** на оболочке.
3. **`.header__bar`**: flex, контентная ширина **1083rem**; bg; `border-radius`; при blur — **`backdrop-filter` + `-webkit-backdrop-filter`**; кликабельной зоны нет (заглушки).
4. Размеры в **rem** (1rem = 1px макета при fit-scale).

Comics (Figma `46:15`):

- Desktop: `top: 22rem`, bar **1083×52**, spacer `calc(22rem + 52rem)`, radius `39rem`, bg `#e8e8e8`
- Logo `38×38` (круг), RuStore `126×38`, burger `21×8`, gap actions `32rem`
- Mobile layout (без отдельного макета): бар **396rem**, те же элементы

## Почему `pointer-events: none` на оболочке

Оболочка на всю ширину артборда; без `none` перехватывала бы клики по контенту.

## Blur в Chrome

```css
backdrop-filter: blur(/* … */);
-webkit-backdrop-filter: blur(/* … */);
```

## Связь с adaptive

Fit-scale (`--fit-fs`) + центрирование `.page` в viewport. Header — `absolute` относительно `.page`, чтобы ехать вместе со страницей.
