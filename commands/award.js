const config = require('../config.json');
const fs     = require('fs');

exports.run = async (client, message, args) => {
  let mentioned = message.mentions.users.first();
  let userData = points[mentioned.id];
  let amount = args[1];

  if (message.author.id !== config.adminID) {
    message.channel.send("You're not the admin!");
    return;
  } else if (args[0] != undefined) {
    userData.points += parseInt(amount);
    message.channel.send(`${amount} points awarded to ${mentioned}!`)
  } else {
    console.log('welp')
  }
}

exports.help = {
  name: 'Award',
  description: 'Award points to a user!',
  usage: '!award @[user] [amount]',
  extended: '',
  category: 'admin'
}