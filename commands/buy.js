const shop = require('../shop.json');

exports.run = async (client, message, args) => {
  let userData = points[message.author.id];

  // if (args[0] == )

  if (args[0] == 'booster') {
    if (userData.coins > shop.booster.price) {
      userData.items.booster++;
      userData.coins -= shop.booster.price;
      message.channel.send('Booster bought!');
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