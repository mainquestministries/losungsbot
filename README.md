# losungsbot

## Installieren

`npm ci --omit=dev`

## Konfigurieren

Du musst `guildconfig_template.json` kopieren bzw. in `guildconfig.json` umbennenen und die Werte (rechtsklick - Copy ID)
des Servers bei "guild_id" und die Id des Channels bei "channel_id" einsetzen.

Schließlich musst du `echo DISCORD_TOKEN=YOUR_PRIVATE_TOKEN > .env` ausführen

## Starten (Produktionsumgebung)

`NODE_ENV=production npm run start` bzw. mit [PM2](https://github.com/mainquestministries/losungsbot/tree/master#pm2) `pm2 start ecosystem.config.js`

Alternativ kann supervisor benutzt werden, ein Template ist in `supervisor.conf`, jedoch muss dann noch ein shell-skript geschrieben wird,
welches in das Bot-Verzeichnis wechselt.

## Entwicklung

`npm install`

### Kompilieren

`npm run build`

### Starten

`npm run dev` Hinweis: Der Bot sendet dann JEDE Minute eine Nachricht. NIEMALS in einer Produktionsumgebung nutzen!
