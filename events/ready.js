const Discord = require('discord.js');
const config = require('../config.json');

exports.run = async (client) => {
  console.log('Starting Lad Bot...\nNode Version: ' + process.version + '\nDiscord.js version: ' + Discord.version);
  console.log(`Lad-Bot ready to serve ${client.users.size} lads in the Lads Official Discord Channel!`);
  // client.user.setGame(config.playing);
  client.user.setPresence({ game: { name: config.playing, type: 0 } });
  console.log(`\"Playing\" set to ${config.playing}`)
}