const fs = require('fs');

exports.run = async (client, message, args) => {
  if (args.length > 0) {
    fs.appendFile('./suggestions.txt', args.join(' ') + '\n', function (err) {
      if (err) {
        console.log(err.stack);
      }
    });
    message.channel.send(`Suggestion ${args.join(' ')} added!`);
  } else {
    message.channel.send('What would you like to suggest to our glorious dev?')
  }
}

exports.help = {
  name: 'Suggest',
  description: 'Adds your suggestion to a text file.',
  usage: '!suggest [suggestion]',
  extended: '',
  category: 'general'
}