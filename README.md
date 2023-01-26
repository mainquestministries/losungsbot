# losungsbot

## Installieren

`npm ci --omit=dev`

## Konfigurieren

Du musst `guildconfig_template.json` kopieren und die Werte (rechtsklick - Copy ID)
des Servers bei "guild_id" und die Id des Channels bei "channel_id" einsetzen.

Schließlich musst du `echo DISCORD_TOKEN=YOUR_PRIVATE_TOKEN > src/.env` ausführen

## Starten

`NODE_ENV=production npm run start` bzw. mit [PM2](https://github.com/mainquestministries/losungsbot/tree/master#pm2) `pm2 start ecosystem.config.js`

## Entwicklung

`npm install`

### Kompilieren

`npm run build`

### Starten

`npm run dev` Hinweis: Der Bot sendet dann JEDE Minute eine Nachricht. NIEMALS in einer Produktionsumgebung nutzen!

### PM2

Ich empfehle AUSDRÜCKLICH, pm2 zu benutzen, speziell wenn auf dem server mehrere Bots laufen.
PM2 kann folgendermaßen installiert werden: `[sudo] npm install -g pm2`
(Sudo ist auf z. B. SUSE bzw. SLE notwendig)

Siehe https://pm2.keymetrics.io/
