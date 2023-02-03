#! /bin/bash
echo "losungsbot wird aktualisiert, bitte warten..."
Repo_Path=$1
GUILDCONFIG=$1/guildconfig.json

curl https://api.github.com/repos/mainquestministries/losungsbot/releases  | jq ".[0].tag_name" |sed 's/\"//g' | read TAG

if [ test -f "$GUILDCONFIG" ] && [ test -f "$REPO_PATH/.env" ]; then
    echo "$GUILDCONFIG und env-Datei existiert."
    cp $GUILDCONFIG $HOME/guildconfig.bak.json
    cp $REPO_PATH/.env $HOME/env_var.bak.txt

    echo "Backup fertig."
else
    echo "Dateien nicht gefunden. Update wird feige verweigert."
    exit 127
fi

mkdir -p .cache

wget --output-document .cache/losungsbot-latest.zip github.com/mainquestministries/losungsbot/releases/download/latest/losungsbot-release-$TAG.zip

unzip -o .cache/losungsbot-latest.zip -d $REPO_PATH

rm -r .cache

if [ test -f "$GUILDCONFIG" ] && [ test -f "$REPO_PATH/.env" ]; then
    echo "$GUILDCONFIG und env-Datei existieren bereits."

else
    echo "Dateien nicht gefunden. Wiederherstellen..."
    mv $HOME/guildconfig.bak.json $GUILDCONFIG
    mv $HOME/env_var.bak.txt $REPO_PATH/.env
fi

echo "Update fertig!"
echo "Neue Version: $TAG"
exit 0
