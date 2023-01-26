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

### Devmode

`NODE_ENV=devel npm run dev`
