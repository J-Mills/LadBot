const Discord   = require('discord.js');
const client    = new Discord.Client();
const fs        = require('fs');
const config    = require('./config.json');

client.on('ready', () => {
  console.log('I am ready!');
});

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err)
    message.reply('Command does not exist!');
  }
});

//   if (message.content.includes('vote')) {
//     var results = 0;
//     message.channel.send(args[0] || 'No arguments provided');
//     message.reply('Ok');
//     message.react('👍');
//     message.react('👎');
    
//   }
// });

// let ping = {
//   help: 'Send a pong!',
//   func: (message, args) => {
//     message.channel.send('Pong!');
//   }
// }

client.login(config.token).catch(console.error);