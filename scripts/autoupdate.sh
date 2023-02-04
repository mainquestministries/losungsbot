#! /bin/bash
echo "Der Losungsbot muss später neugestartet werden, da es sonst zu unvorhersehbaren Ereignissen kommen kann."
echo "losungsbot wird aktualisiert, bitte warten..."
REPO_PATH=.
GUILDCONFIG=./guildconfig.json

if [[ $* =~ "-y" ]] || [[ $* =~ "--yes" ]]
    FORCE_YES=1
fi

function yes_or_no {
    while true; do
        read -p "$* [y/n]: " yn
        case $yn in
            [Yy]*) return 0  ;;
            [Nn]*) return 1 ;;
        esac
    done
}


read TAG <<< $( curl https://api.github.com/repos/mainquestministries/losungsbot/releases  | jq ".[0].tag_name" |sed 's/\"//g')

if test -f "$REPO_PATH/.install_log.txt"; then
    source "$REPO_PATH/.install_log.txt"
    echo "Aktuelle Version: $CURRENT_TAG"
    if [ "$TAG" = "$CURRENT_TAG" ]; then
        echo "Bereits die neueste Version."
    else
        if [ -n $FORCE_YES ] || yes_or_no "Aktualisieren: $CURRENT_TAG->$TAG"; then
            echo "Aktualisierung wird durchgeführt."
        else
            echo "Abbruch durch Benutzer."
            exit 9
        fi
    fi
else
    echo "Die aktuelle Version konnte nicht überprüft werden."
    if [ -n $FORCE_YES ] || yes_or_no "Durch $TAG ersetzen?"; then
        echo "Aktualisierung wird durchgeführt."
    else
        echo "Abbruch durch Benutzer."
        exit 9
    fi
fi

if  test -f "$GUILDCONFIG"  &&  test -f "$REPO_PATH/.env" ; then
    echo "$GUILDCONFIG und env-Datei existiert."
    cp $GUILDCONFIG
    cp $REPO_PATH/.env

    echo "Backup fertig. Ich kann nicht sicherstellen, ob das das richtig Verzeichnis ist."
else
    echo "Dateien nicht gefunden. Update wird feige verweigert."
    exit 127
fi

mkdir -p .cache

if wget -O .cache/losungsbot-latest.zip github.com/mainquestministries/losungsbot/releases/download/$TAG/losungsbot-release-$TAG.zip; then
    rm -r dist/
else
    echo "Download-Fehler"
    exit 1
fi

unzip -o .cache/losungsbot-latest.zip -d $REPO_PATH

rm -r .cache

if  test -f "$GUILDCONFIG"  &&  test -f "$REPO_PATH/.env" ; then
    echo "$GUILDCONFIG und env-Datei existieren bereits. Backups werden zerstört."
    rm $HOME/guildconfig.bak.json
    rm $HOME/env_var.bak.txt

else
    echo "Dateien nicht gefunden. Wiederherstellen..."
    mv $HOME/guildconfig.bak.json $GUILDCONFIG
    mv $HOME/env_var.bak.txt $REPO_PATH/.env
fi

echo "Update fertig!"
echo "Neue Version: $TAG"
echo "CURRENT_TAG=$TAG" > .install_log.txt
echo "LAST_UPDATE=`date +%F`" >> install_log.txt
exit 0
