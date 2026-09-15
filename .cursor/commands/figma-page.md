Вёрстка одного блока страницы из Figma. Plan mode сначала, код — после подтверждения.

1. Уточни блок по `current_status.md` и node-id фрейма от пользователя (не весь артборд `1:2`, если дан отдельный фрейм).
2. Если это серая карточка / featured comic — спроси, есть ли доп. фреймы; не угадывай.
3. Вызови `get_design_context` + скриншот для node-id (fileKey `jElL6muhfPPhZSn3f5mi2C`). Skill: figma-design-to-code.
4. Скачай ассеты в `assets/index/`, подключи локальные пути.
5. Верстай пиксель-в-пиксель Desktop в `pages/index.html` + `css/index.css` (размеры в rem).
6. Adaptive: пропорциональный rem-scale уже в проекте; отдельные mobile-макеты — только когда есть фрейм.
7. Desktop scroll запрещён; mobile layout — scroll разрешён.
8. Не добавляй лишнюю JS-логику и бизнес-функции.
9. Header: механика из `docs/header-behavior.md`; визуал — из фрейма Comics.
10. Сверь результат со скриншотом Figma; перечисли отличия, если остались.
11. Не переписывай `layout.css` / `design-viewport.js` без одобрения (EXAMPLE).
