const shop = require('../shop.json');

exports.run = async (client, message, args) => {
  let userData = points[message.author.id];
  let item = args[0];
  let amount = args[1];

  if (args[1]) {
    if ((userData.coins) > (shop[item].price * amount)) {
      userData.items[item] += parseInt(amount);
      userData.coins -= (shop[item].price * amount);
      message.channel.send(`${amount} ${item}'s bought!`);
    } else {
      message.channel.send(`You don't have enough coins!`);
    }
  } else {
    if (userData.coins > shop[item].price) {
      userData.items[item]++;
      userData.coins -= shop[item].price;
      message.channel.send(`${item} bought!`);
    } else {
      message.channel.send(`You don't have enough coins!`);
    }
  }
}

exports.help = {
  name: 'Buy',
  description: 'Use your coins to buy upgrades.',
  usage: '!buy [item]',
  extended: '',
  category: 'idle'
}