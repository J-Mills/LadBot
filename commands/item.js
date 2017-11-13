const shop = require('../shop.json');

exports.run = async (client, message, args) => {
  let userData = points[message.author.id];
  let userItems = Object.keys(userData.items);
  let userValues = Object.values(userData.items);
  let item = args[0]
  let list = Object.keys(shop);
  let unlockedItems = [];

  try {
    if (args[0] == 'list') {
      for (i = 0; i < list.length; i++) {
        if (userValues[i] > 0) {
          unlockedItems.push(`Coin ${list[i]}`);
        }
      }

      // list.forEach((item, index) => {
      //   if (userData.items[item] > 0) {
      //     unlockedItems.push('Coin ' + item);
      //   } else {
      //     if (index > 0) {
      //       let previous = list[index - 1];
      //       if (userData.items[previous] >= 25) {
      //         unlockedItems.push('Coin ' + item);
      //         if (userData.items[item] == 0) {
      //           // Remove last item and replace it with the same one but NEW added
      //           // Please make this more efficient later...
      //           unlockedItems.pop();
      //           unlockedItems.push('Coin ' + item + ' * NEW *')
      //         }
      //       } else {
      //           unlockedItems.push(`To unlock the next item, purchase ${(25 - userData.items[previous])} more ${previous}s`);
      //         return;
      //         // unlockedItems.push('???');
      //       }
      //     }
      //   }  
      // });
      message.channel.send(unlockedItems.join(' \n'), { code: 'ml' });
    } else if (args[0]) {
      message.channel.send(`${shop[item].image}\n\nItem Name: Coin ${item}\nStock Price: ฿${shop[item].price}\nDescription: ${shop[item].description}`, { code: 'ml' });
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