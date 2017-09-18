exports.run = async (client, message, args) => {
  let userData = points[message.author.id];
  console.log(userData);

  message.reply(`You are currently level ${userData.level} with ${userData.points} xp and have ${userData.coins} coins.`)
};

exports.help = {
  name: 'Money',
  description: 'Displays your current level & xp.',
  usage: '!money',
  extended: '',
  category: 'util'
}