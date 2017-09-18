const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {
  if (!args[0]) {
    message.react('❓');
  } else {
    try {
      let command = args[0];
      let commandFile = require(`../commands/${command}.js`);
      message.channel.send(`= ${commandFile.help.name} =\n\nDescription :: ${commandFile.help.description}\n\nUsage :: ${commandFile.help.usage}`, { code: 'asciidoc' });
    } catch (err) {
      console.error(err)
      message.reply('Sorry, that command doesn\'t seem to exist. Try \`!help [command]\` for more information.');
    }
  }
}

exports.help = {
  name: 'Help',
  description: 'Provides information about commands.',
  usage: '!help [command]',
  extended: 'This command will display the help information panel, or if used with arguments, then it will provide help for the specific command you\'re looking into... Much like you\'ve just done.',
  category: 'general'
}