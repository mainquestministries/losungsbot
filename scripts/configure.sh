#! /bin/bash

echo "Leerlassen zum überspringen"
read -p "Discord-Token>" D_TOKEN 

if [ -n $D_TOKEN ]
    echo "DISCORD_TOKEN=$D_TOKEN" > .env
else
    echo "Token unverändert"
fi

read -p "Guild-ID>" G_ID
read -p "Channel-ID>" C_ID

if [ -n "$G_ID" ] && [ -n "$C_ID"]
    echo {"guild_id":"$G_ID", "channel_id":"$C_ID"} > guildconfig.json
else 
    echo "IDs unverändet"
fi
