const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message, args) => {
  const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
  message.channel.send(`= STATS =\n
• Mem Usage   :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime      :: ${duration}
• Users       :: ${client.users.size.toLocaleString()}
• Servers     :: ${client.guilds.size.toLocaleString()}
• Channels    :: ${client.channels.size.toLocaleString()}
• Discord.js  :: v${version}
• Node        :: ${process.version}
• Source      :: www.google.com/how-do-I-make-a-bot`, { code: 'asciidoc' });
}
exports.help = {
  name: 'Stats',
  description: 'Displays some stats about the bot.',
  usage: '!stats',
  extended: '',
  category: 'util'
}