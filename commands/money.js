exports.run = async (client, message, args) => {
  const fs = require('fs');
  let points = JSON.parse(fs.readFileSync('../money.json', 'utf-8'));
  // let userData = points[message.author.id];
  // console.log(userData);
  
  // message.channel.send(`You are currently level ${userData.level} with ${userData.points} xp.`)
  message.channel.send(`You have ${points["159769994601824257"].points}`)
};

exports.help = {
  name: 'Money',
  description: 'Unfinished command for future use',
  usage: 'Undefined',
  extended: '',
  category: 'unused'
}