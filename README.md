# losungsbot

## Installieren

`npm install`. Nicht mehr, nicht weniger.

## Konfigurieren

Du musst `guildconfig_template.json` kopieren und die Werte (rechtsklick - Copy ID)
des Servers bei "guild_id" und die Id des Channels bei "channel_id" einsetzen.

Schließlich musst du `echo DISCORD_TOKEN=YOUR_PRIVATE_TOKEN > src/.env` ausführen

## Ausführen

### Kompilieren

`npm run build`

### Starten

`npm run start`

### PM2

Ich empfehle AUSDRÜCKLICH, pm2 zu benutzen.
PM2 kann folgendermaßen installiert werden: `[sudo] npm install -g pm2`
(Sudo ist auf z. B. SUSE bzw. SLE notwendig)

Dann kann die App einfach per `pm2 start dist/index.js --name losungsbot` gestartet werden.

Siehe https://pm2.keymetrics.io/

### Devmode

`NODE_ENV=devel npm run dev`
