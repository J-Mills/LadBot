exports.run = async (client, message, args) => {
  if (!args[0]) {
    message.channel.send('No args.');
  } else {
    message.channel.send(`Your args are ${args}`);
    joined = args.join(' ');
    message.channel.send(`Your args are ${joined} at ${args.length}`);
    split = joined.split(' |');
    message.channel.send(`Your args are ${split} at ${split.length}`)
  }
}

exports.help = {
  name: 'Test',
  description: 'This is a test command',
  usage: '!test [args]',
  extended: '',
  category: 'unused'
}