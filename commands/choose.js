exports.run = async (client, message, args) => {
  const splitArgs = args.join('').split('|');
  var chosen = splitArgs[Math.floor(Math.random() * splitArgs.length)];
  message.channel.send(`Your random choice is ${chosen}!`);
  console.log(`Choice made: ${chosen}`)
}

exports.help = {
  name: 'Choose',
  description: 'Will make a choice for you.',
  usage: '!choose [args] | [args] ...',
  extended: '',
  category: 'util'
}