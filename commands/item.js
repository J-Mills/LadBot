const shop = require('../shop.json');

exports.run = async (client, message, args) => {
  let userData = points[message.author.id];
  let item = args[0]
  let list = Object.keys(shop);

  try {
    if (args[0] == 'list') {
      message.channel.send('This is where a list would go!');
      message.channel.send(`${list.join(' \n')}`, { code: 'ml' })
    } else if (args[0]) {
      message.channel.send(`${shop[item].image}\n
Name: Coin ${item}
Price: ฿${shop[item].price}
Description: ${shop[item].description}`, { code: 'ml' });
    } else if (!args[0]) {
      message.channel.send('Please provide an item to give info about, or type \`!item list\` for a list of the items to see.')
    }
  } catch (err) {
    message.channel.send(`That item doesn't exist or was typed incorrectly.`)
    return;
  }
}

exports.help = {
  name: 'Item',
  description: 'Get some fun info on each item.',
  usage: '!item [item] || !item list',
  extended: '',
  category: 'idle'
}