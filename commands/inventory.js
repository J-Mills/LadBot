exports.run = async (client, message, args) => {
  let userData = points[message.author.id];
  let itemList = Object.keys(userData.items);
  let valueList = Object.values(userData.items);
  let inventoryList = [];

  for (i = 0; i < itemList.length; i++) {
    if (valueList[i] == 0) {
    } else {
      inventoryList.push(`${itemList[i]}: ${valueList[i]}`)
    }
  }

  if (inventoryList.length == 0) {
    message.channel.send(`Looks like your inventory is empty! Save up some coins and \`!buy\` some items - or visit the \`!shop\` to see what is available`);
  } else {
    message.channel.send(`${inventoryList.join('\n')}`, {code: 'ml'});
  }
}

exports.help = {
  name: 'Inventory',
  description: 'See what items you have.',
  usage: '!inventory',
  extended: '',
  category: 'idle'
}