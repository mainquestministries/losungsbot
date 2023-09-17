import { ApplyOptions } from '@sapphire/decorators';
import { Listener, Store } from '@sapphire/framework';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
import type { GuildMember, TextChannel } from 'discord.js';
import { existsSync, readFileSync } from 'fs';
import cron from "node-cron"
import path, { join } from 'path';
import { pickRandom } from '../lib/utils';

const dev = process.env.NODE_ENV !== 'production';
function date_string(now: Date) {
		let day = now.getDate().toString();
		if (day.length === 1) day = `0${day}`;
		let month = (now.getMonth() + 1).toString();
		if (month.length === 1) month = `0${month}`;
		let year = now.getFullYear().toString();
	
		return `${day}.${month}.${year}`;
	}

function hatchling_text(hatchling : [GuildMember, number]) {
	const USER = hatchling[0].user
	const NUMBER = hatchling[1]
	
	let res = pickRandom<string>([`**Wow! Schon ${NUMBER} Jahre hier, ${USER}**`,
								`**Wir gratulieren unserem Veteranen ${USER} für ${NUMBER} Jahre Treue.**`,
								`**${USER} hat Level ${NUMBER} erreicht!**`, 
								`**Hier ein Stück Kuchen für dich, ${USER} - Schon ${NUMBER} Jahre dabei! 🍰**`,
								`**Du meinst es wohl ernst mit der MainQuest, ${USER}. Wusstest du, dass du sie schon seit ${NUMBER} Jahren jagst?**`,
								`**Du ${NUMBER} Jahre hier sein schon, ${USER}.**`,])
	if (hatchling[1] <= 4) {
		res = pickRandom<string>([`*Immer noch Nerd, ${USER}? Oder ist man das nach ${NUMBER} Jahren nicht mehr?*`,
									`*Gratulation zu ${NUMBER} Jahren MQ-Mitglied, ${USER}!*`,
									`*Leider haben wir keinen Kuchen für dich, ${USER}. Freu dich trotzdem, seit ${NUMBER} Jahren Member zu sein.*`,
									`*Du scheinst ein größeres Ziel zu haben, ${USER}. Oder warum bist du seit ${NUMBER} Jahren schon hier?*`,
									`*Management dankt dir, ${USER}. Schon seit ${NUMBER} Jahren arbeitest du die Mainquest ab.*`,
									`*Herzlich Willkommen, ${USER}. Wait... *Raschel* Ups. Du bist ja schon seit ${NUMBER} Jahren hier 🤔*`,
									`*Hiermit überreichen wir ${USER} die Auszeichnung für ${NUMBER} Jahre MQ-Member.*`])
	}

	if (hatchling[1] == 1) {
		res = pickRandom<string>([`Gratulation zum ersten Dienstjahr, ${USER}.`,
									`Hiermit ist Jahr 1 abgeschlossen, ${USER}.`,
									`Kuchen gibt es erst ab dem 2. Jahr, ${USER}. Bleib dran!`,
									`Und, wie fühlt es sich an, hier schon ein Jahr zu sein, $USER?`])
	}
	return res + "\n"
}

@ApplyOptions<Listener.Options>({ once: true })
export class UserEvent extends Listener {
	private readonly style = dev ? yellow : blue;

	public run() {

		const cron_str = dev ? '*/20 * * * * *' : '0 0 7 * * * *';
		if(!(existsSync(join(path.resolve(""), `dist/losungen_${(new Date()).getFullYear()}.json`))))
			{this.container.logger.fatal(`dist/losungen_${(new Date()).getFullYear()}.json not found!`); return}
			const guild = process.env.GUILD_ID
			const channel_id = process.env.CHANNEL_ID
			if (guild === undefined || channel_id === undefined) {
				this.container.logger.fatal("Some Data is missing on the .env file!")
				return
			}
		cron.schedule(cron_str, async (now) => {
			//onst now = new Date()
			
			if (now === 'manual' || now === 'init' || process.env.SKIP_CRONJOB !== undefined) return;
			this.container.logger.info('*** Biblebomber: ACTIVE');
			const data: Array<Array<string>> = JSON.parse(readFileSync(join(path.resolve(""), `dist/losungen_${now.getFullYear()}.json`)).toString());
			
			const today = date_string(now);
			
			data.forEach(async (item) => {
				//this.container.logger.debug(today)
				if (item[0] === today) {
						
						

						let hatchlings : [GuildMember, number][] = []

						const mainquest = (await this.container.client.guilds.fetch(guild));

						for(const m of (await mainquest.members.fetch({
							force: true
						}))) {
							const member = await (m[1].fetch(true))
							const joined = await member.joinedAt
							if (joined != null && joined.getDay() == now.getDay() && joined.getMonth() == now.getMonth()) {
								hatchlings.push([member, now.getFullYear() - joined.getFullYear()])
							}
						}
						
						let hatchday_text = "";

						if (hatchlings.length > 0) {
							hatchday_text = "\n**Alle mal herhören! Wir haben Schlüpflinge! 🥳**\n\n"
							for (const h of hatchlings) {
								hatchday_text += hatchling_text(h)
							}
						}
						
						const channel = await mainquest.channels.fetch(channel_id);
						let new_msg = await (channel as TextChannel).send({
							embeds: [
								{
									title: `Tageslosung vom ${today}`,
									url: `https://www.bibleserver.com/LUT/${item[3].replaceAll(" ", "")}`,
									description: `*${item[3]}:* ${item[4]}` + hatchday_text,
									color: 0xB49B83
								}
							]
						});
						await new_msg.startThread({
							name: `Tageslosung vom ${today}`
						});
						['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'].forEach(async (emoji_) => {
							await new_msg.react(emoji_);
						});
					
				}
			});
			this.container.logger.info('*** Disabling Biblebomber mode');
		
		})

		this.printBanner();
		this.printStoreDebugInformation();
	}

	private printBanner() {
		const success = green('+');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
