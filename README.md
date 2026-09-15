# Comics Landing — Крумб

Статическая вёрстка одностраничного лендинга платформы «Крумб» по макетам Figma. Без бэка, без фреймворков.

## Открыть локально

Открой HTML-файл в браузере (двойной клик или Live Preview):

- [pages/index.html](pages/index.html) — лендинг

Либо из корня репозитория:

```bash
python -m http.server 8080
# затем http://localhost:8080/pages/index.html
```

## Макеты Figma

Файл: [Untitled (Крумб)](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=1-2)

| Страница | Desktop | Mobile |
| --- | --- | --- |
| Лендинг | [1:2](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=1-2) (обзор) | TODO |

Вёрстка идёт **по отдельным фреймам-блокам**, не всем артбордом сразу.

## Просмотр с телефона (одна сеть)

См. [docs/local-preview.md](docs/local-preview.md):

```bash
python -m http.server 8080 --bind 0.0.0.0
```

## Для агентов

См. [AGENTS.md](AGENTS.md) и [current_status.md](current_status.md).
