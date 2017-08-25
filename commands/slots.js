exports.run = async (client, message, args) => {
  if (!args[0]) {
    let first = '_';
    let second = '_';
    let third = '_';
    let winner = false;
    const msg = await message.channel.send(`
    \`\`\`lua\n['Would you like to play?']\n\n+---------+\n| CASINO! |\n|---------| o\n|' ${first} ${second} ${third} '| |\n|---------|/\n|  +  [_] |\n+---------+\`\`\``).then(message => {
      message.react('💲');
    });
  } else if (args[0] == 'wins') {

  } else if (args[0] == 'leaderboard') {

  } else {
    message.channel.send('To play slots, type \`!slots\` or \`!slots [wins | leaderboard]\` to see info.')
  }
}

exports.help = {
  name: 'Slots',
  description: 'Play a game of slots and try to win big!',
  usage: '!slots',
  extended: '',
  category: 'fun'
}