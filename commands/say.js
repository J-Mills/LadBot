exports.run = async (client, message, args) => {
  var nameArray = ['jack', 'jack\'s', 'mizzazz', 'mizzazz\'s']
  let found = nameArray.some(r => message.content.toLowerCase().includes(r));
  if (found) {
    message.channel.send('I\'d never say anything out of turn about my glorious creator!');
  } else if (args[1] || args[0]) {
    message.channel.send(args.join(' '));
  } else {
    message.channel.send('What did you want me to say?');
  }
}

exports.help = {
  name: 'Say',
  description: 'I will repeat whatever you tell me to!',
  usage: '!say [Nothing mean about Jack Mills]',
  extended: '',
  category: 'general'
}