const shop = require('../shop.json');

exports.run = async (client, message, args) => {
  let userData = points[message.author.id];
  let item = args[0];
  let amount = args[1];

  let formula = Math.floor(shop[item].price * ((userData.items[item] / 10) + 1));

  try {
    if (args[1]) {
      if ((userData.coins) > (formula * amount) && amount >= 1) {
        userData.items[item] += parseInt(amount);
        userData.coins -= (formula * amount);
        message.channel.send(`${amount} Coin ${item}s bought!`);

        if (userData.items[item] == 25) {
          let list = (Object.keys(shop));
          message.channel.send(next);
        }
      } else if (args[1] == 'price') {
        let price = formula;
        message.channel.send(`The coin ${item} will cost ฿${price.toLocaleString()}`);
      } else if (isNaN(args[1])) {
        message.channel.send('The amount should be a number!')
      } else if (amount === '0') {
        message.channel.send(`You can't buy 0 of something!`)
      } else {
        message.channel.send(`You don't have enough coins!`);
      }

    } else if (!args[1]) {
      if (userData.coins > formula) {
        userData.items[item]++;
        userData.coins -= formula;
        message.channel.send(`${item} bought!`);
        if (userData.items[item] == 25) {
          let list = (Object.keys(shop));
          console.log(list);
          // let next = list[index + 1];
          message.channel.send(next);
        }
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