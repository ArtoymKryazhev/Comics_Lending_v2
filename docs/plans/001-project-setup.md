# 001 — Project setup

Архив плана подготовки репозитория Comics Landing (Крумб).

## Цель

Подготовить `Comics_Lending_v2` к поэтапной вёрстке по компонентам на основе эталона `Kutukov_business_landing`.

## Figma

- fileKey: `jElL6muhfPPhZSn3f5mi2C`
- Обзор Desktop: `1:2` (1920×1080)
- Mobile: TODO
- Вёрстка по отдельным фреймам-блокам; серая карточка может иметь доп. фреймы

## Создано

- Структура папок: `.cursor/`, `pages/`, `css/`, `js/`, `assets/index/`, `examples/`, `docs/plans/`, `pages/stubs/`
- Rules: `000-project.mdc`, `100-frontend.mdc`, `900-manual-handoff.mdc`
- Commands: `figma-page.md`, `handoff.md`, `review-diff.md`
- Docs: `AGENTS.md`, `README.md`, `current_status.md`, `docs/header-behavior.md`
- CSS: `reset.css`, `tokens.css` (placeholder), `layout.css` (**EXAMPLE**)
- JS: `design-viewport.js` (**EXAMPLE**, `isMobileReady` → `.page-index`)
- Каркасы: `pages/index.html`, `examples/page-skeleton.html`

## Фазы (зафиксировано в docs/rules)

1. Desktop — пиксель-в-пиксель, блок за блоком
2. Adaptive — только после явной отмашки
3. Mobile — после проверки Desktop + mobile-фреймы / отмашка

## Adaptive / Header

- Adaptive-код — пример из Kutukov; переписывать только с одобрения
- Фактический layout: `innerWidth >= 1024` → desktop
- Header-механика (fixed, spacer, pointer-events, blur) — в `docs/header-behavior.md`; HTML/CSS header не писали

## Порядок вёрстки

Header → Brand/intro → Featured comic (серая карточка) → Subscription → Footer

## Не входило в setup

- HTML/CSS блоков
- Ассеты из Figma
- `css/index.css`
- Git init / commit
- Mobile-артборд
