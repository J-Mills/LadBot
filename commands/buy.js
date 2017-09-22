const shop = require('../shop.json');

exports.run = async (client, message, args) => {
  let userData = points[message.author.id];
  let item = args[0];
  let amount = args[1];

  try {
    if (args[1]) {
      Math.floor(shop[item].price * ((userData.items[item] / 10) + 1))
      if ((userData.coins) > (Math.floor(shop[item].price * ((userData.items[item] / 10) + 1)) * amount) && amount >= 1) {
        userData.items[item] += parseInt(amount);
        userData.coins -= (Math.floor(shop[item].price * ((userData.items[item] / 10) + 1)) * amount);
        message.channel.send(`${amount} ${item}s bought!`);
      } else if (args[1] == 'price') {
        let price = Math.floor(shop[item].price * ((userData.items[item] / 10) + 1));
        message.channel.send(`The coin ${item} will cost ${price.toLocaleString()}`);
      } else if (isNaN(args[1])) {
        message.channel.send('The amount should be a number!')
      } else if (amount === '0') {
        message.channel.send(`You can't buy 0 of something!`)
      } else {
        message.channel.send(`You don't have enough coins!`);
      }

    } else if (!args[1]) {
      if (userData.coins > Math.floor(shop[item].price * ((userData.items[item] / 10) + 1))) {
        userData.items[item]++;
        userData.coins -= Math.floor(shop[item].price * ((userData.items[item] / 10) + 1));
        message.channel.send(`${item} bought!`);
      } else {
        message.channel.send(`You don't have enough coins!`);
      }
    }
  } catch (err) {
    message.channel.send(`Sorry, that item doesn't exist or was spelled incorrectly. Try the \`!shop\` command for a list of the available items.`);
    return;
  }
}

exports.help = {
  name: 'Buy',
  description: 'Use your coins to buy upgrades.',
  usage: '!buy [item] [amount]',
  extended: '',
  category: 'idle'
}