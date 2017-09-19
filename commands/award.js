const config = require('../config.json');
const fs     = require('fs');

exports.run = async (client, message, args) => {
  let mentioned = message.mentions.users.first();
  let userData = points[mentioned.id];
  let amount = args[1];

  if (message.author.id !== config.adminID) {
    message.channel.send("You're not the admin!");
    return;
  } else if (args[2] == 'points') {
    userData.points += parseInt(amount);
    message.channel.send(`${amount} points awarded to ${mentioned}!`)
  } else if (args[2] == 'coins') {
    userData.coins += parseInt(amount);
    message.channel.send(`${amount} coins awarded to ${mentioned}!`)
  } else {
    message.channel.send('Please specify who you want to reward and how much!')
  }
}

exports.help = {
  name: 'Award',
  description: 'Award points to a user!',
  usage: '!award @[user] [amount]',
  extended: '',
  category: 'admin'
}