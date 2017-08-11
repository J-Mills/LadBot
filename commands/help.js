const Discord = require('discord.js');
const fs = require('fs');

let commands = [];

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    commands.push(file);
  });
});

exports.run = async (client, message, args) => {

  if (args.length <= 0) {
    message.channel.send('```' + commands.join('\n') + '```');
  }
}