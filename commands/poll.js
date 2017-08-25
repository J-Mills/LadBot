exports.run = async (client, message, args) => {
  const splitArgs = args.join(' ').split(' |');
  if (splitArgs.length != 0 && splitArgs.length < 4) {
    message.channel.send('Click the reactions to vote!');
    for (i = 0; i < splitArgs.length; i++) {
      message.channel.send(`${splitArgs[i]}`).then(message => {
        message.react('✅');
      });
    }
  } else if (splitArgs.length >= 4) {
    message.channel.send('Too many arguments! Please refine the poll first.');
  } else {
    message.channel.send('Please include something to vote for!');
  };
};

exports.help = {
  name: 'Poll',
  description: 'Creates a reaction poll.',
  usage: '!poll [args] | [args] ...',
  extended: '',
  category: 'util'
}