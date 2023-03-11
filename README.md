# losungsbot

[![CI/CD Pipeline](https://github.com/mainquestministries/losungsbot/actions/workflows/build_and_publish.yml/badge.svg)](https://github.com/mainquestministries/losungsbot/actions/workflows/build_and_publish.yml) [![CodeQL](https://github.com/mainquestministries/losungsbot/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/mainquestministries/losungsbot/actions/workflows/github-code-scanning/codeql)

## Hinweis:

Profilbild von [Unsplash](https://unsplash.com/de/fotos/xUXGHzhIbN4)

Die Losungen können [hier](https://www.losungen.de/download/) heruntergeladen werden. Sie sind kostenlos nutzbar (siehe Website für Bestimmungen)

## Installieren

`npm ci --omit=dev`

## Konfigurieren

Du musst `guildconfig_template.json` kopieren bzw. in `guildconfig.json` umbennenen und die Werte (rechtsklick - Copy ID)
des Servers bei "guild_id" und die Id des Channels bei "channel_id" einsetzen.

Schließlich musst du `echo DISCORD_TOKEN=YOUR_PRIVATE_TOKEN > .env` ausführen

## Starten (Produktionsumgebung)

`NODE_ENV=production npm run start` bzw. mit PM2 `pm2 start ecosystem.config.js` (pm2@5.2.2 scheint einen Memory Leak zu haben!)

Alternativ kann supervisor benutzt werden, ein Template ist in `supervisor.conf`

## Entwicklung

`npm install`

### Kompilieren

`npm run build`

### Starten

`npm run dev` Hinweis: Der Bot sendet dann JEDE Minute eine Nachricht. NIEMALS in einer Produktionsumgebung nutzen!
