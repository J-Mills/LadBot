const fs = require('fs');

exports.run = async (client, message, args) => {
  if (args[0] != undefined) {
    var playing = args.join(' ');
    client.user.setPresence({ game: { name: playing, type: 0 } });
    message.channel.send(`\"Playing\" set to ${playing}`)
    console.log(`Lad-Bot "playing" set to ${playing}`)
  } else if (args[0] == undefined) {
    client.user.setPresence({ game: { name: undefined, type: 0 } });
    message.channel.send('Playing game cleared!');
  }
}

exports.help = {
  name: 'Playing',
  description: `Change the game that Lad Bot is playing.`,
  usage: '!playing [game]',
  extended: '',
  category: 'general'
}