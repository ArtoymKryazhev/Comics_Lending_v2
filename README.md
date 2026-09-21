# Comics Landing — Крумб

Статическая вёрстка лендингов платформы «Крумб» по макетам Figma. Без бэка, без фреймворков.

## Открыть локально

```bash
python -m http.server 8080 --bind 0.0.0.0
```

- Главная (стартап): [http://localhost:8080/](http://localhost:8080/) → `pages/index.html`
- Подписка (вторичная): [http://localhost:8080/pages/subscribe.html](http://localhost:8080/pages/subscribe.html)

См. также [docs/local-preview.md](docs/local-preview.md) (ПК + телефон в LAN).

## GitHub Pages

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Save — сайт будет по адресу `https://<user>.github.io/Comics_Lending_v2/`

В корне лежат `index.html` (редирект на главную) и `.nojekyll`.

## Макеты Figma

Файл: [jElL6muhfPPhZSn3f5mi2C](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/)

| Страница | Файл | Desktop |
| --- | --- | --- |
| Главная (стартап) | [pages/index.html](pages/index.html) | [`74:15`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/WEBSITE-STARTUP-?node-id=74-15) |
| Подписка | [pages/subscribe.html](pages/subscribe.html) | [`1:2`](https://www.figma.com/design/jElL6muhfPPhZSn3f5mi2C/Untitled?node-id=1-2) |

## Для агентов

См. [AGENTS.md](AGENTS.md) и [current_status.md](current_status.md).
