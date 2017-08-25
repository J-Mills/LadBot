const d20 = require('d20');

exports.run = async (client, message, args) => {
  if (args.slice('d').length <= 1) {
    message.channel.send(`${message.author} rolled a ${d20.roll(args || '10')}`)
  }
}

exports.help = {
  name: 'Roll',
  description: 'Rolls a number of RPG dice.',
  usage: '!roll \n\nWARNING: COMMAND UNDER CONSTRUCTION - DO NOT USE',
  extended: '',
  category: 'util'
}