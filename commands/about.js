const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  let embed = new Discord.RichEmbed()
    .setAuthor('Lad Bot')
    .setDescription('Info on Lad Bot')
    .setColor('#2288FF')
    .addField('Use `!help` to see what I can do.', 'Example usage:');
  
  message.channel.send({ embed: embed });
}

exports.help = {
  name: 'About',
  description: 'Displays information about Lad Bot.',
  usage: '!about',
  extended: 'blah',
  category: 'general'
}