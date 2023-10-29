const fs = require('node:fs');
const path = require('node:path');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { DisTube } = require('distube')
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { TOKEN } = require('./configs/token.json');


const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.MessageContent,
] });

client.commands = new Collection();
client.distube = new DisTube(client, {
	searchSongs: 5,
	leaveOnStop: false,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	plugins: [
	  new SpotifyPlugin({
		emitEventsAfterFetching: true
	  }),
	  new SoundCloudPlugin(),
	  new YtDlpPlugin({ update: true })
	],

  })

module.exports = { client };

const eventsPath = path.join(__dirname, 'events');

const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const c_filePath = path.join(eventsPath, file);
	const event = require(c_filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const distubeEventsPath = path.join(__dirname, 'distube_events');

const distubeFiles = fs.readdirSync(distubeEventsPath).filter(file => file.endsWith('.js'));

for (const d_file of distubeFiles) {
	const d_filePath = path.join(distubeEventsPath, d_file);
	const d_event = require(d_filePath);
	if (d_event.once) {
		client.distube.once(d_event.name, (...args) => d_event.execute(...args));
	} else {
		client.distube.on(d_event.name, (...args) => d_event.execute(...args));
	}
}


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.login(TOKEN);