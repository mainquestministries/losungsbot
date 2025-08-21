import { ApplyOptions } from '@sapphire/decorators';
import { Listener, Store } from '@sapphire/framework';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
import type { TextChannel } from 'discord.js';
import { existsSync, readFileSync } from 'fs';
import cron from "node-cron"
import path, { join } from 'path';

const dev = process.env.NODE_ENV !== 'production';
function date_string(now: Date) {
		let day = now.getDate().toString();
		if (day.length === 1) day = `0${day}`;
		let month = (now.getMonth() + 1).toString();
		if (month.length === 1) month = `0${month}`;
		let year = now.getFullYear().toString();
	
		return `${day}.${month}.${year}`;
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
			//const now = new Date()
			
			if (now === 'manual' || now === 'init' || process.env.SKIP_CRONJOB !== undefined) return;
			this.container.logger.info('*** Biblebomber: ACTIVE');
			const data: Array<Array<string>> = JSON.parse(readFileSync(join(path.resolve(""), `dist/losungen_${now.getFullYear()}.json`)).toString());
			
			const today = date_string(now);
			
			for (const item of data) {
				//this.container.logger.debug(today)
				if (item[0] === today) {

						const channel = await (await this.container.client.guilds.fetch(guild)).channels.fetch(channel_id);
						let new_msg = await (channel as TextChannel).send({
							embeds: [
								{
									title: `Tageslosung vom ${today}`,
									url: `https://www.bibleserver.com/LUT/${item[3].replaceAll(" ", "")}`,
									description: `*${item[3]}:* ${item[4]}`,
									color: 0xB49B83
								}
							]
						});
						const thread = await new_msg.startThread({
							name: `Losungsvers vom ${today}`
						});
						for (const emoji_ of ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']) {
							await new_msg.react(emoji_);
						}
                        await thread.send({
                            embeds: [
                                {
                                    title: `Lehrvers vom ${today}`,
                                    url: `https://www.bibleserver.com/LUT/${item[5].replaceAll(" ", "")}`,
                                    description: `*${item[5]}:* ${item[6]}`,
                                    color: 0xB49B83
                                }
                            ]
                        });

                }
			}
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
