# Локальный просмотр (ПК + телефон в одной сети)

Из корня проекта `Comics_Lending_v2`:

```bash
python -m http.server 8080 --bind 0.0.0.0
```

## На этом компьютере

Открой в браузере: [http://127.0.0.1:8080/pages/index.html](http://127.0.0.1:8080/pages/index.html)

## На телефоне (та же Wi‑Fi / локальная сеть)

1. Узнай IP компьютера:
   - **Windows (PowerShell):** `ipconfig` → IPv4-адрес адаптера Wi‑Fi / Ethernet (например `192.168.0.12`)
   - **macOS / Linux:** `ip a` или `ifconfig`
2. На телефоне открой: `http://<IP>:8080/pages/index.html`  
   Пример: `http://192.168.0.12:8080/pages/index.html`
3. Оставь терминал с `http.server` открытым, пока смотришь сайт.

Если телефон не открывает страницу: проверь, что оба устройства в одной сети, и что Windows Firewall не блокирует порт 8080 для Python.
