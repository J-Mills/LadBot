const fs = require('fs');
const money = require('../money.json');
let points = JSON.parse(fs.readFileSync('./money.json', 'utf-8'));

exports.run = async (client, message, args) => {
  let userData = points[message.author.id];
  console.log(userData);
  
  message.channel.send(`You are currently level ${userData.level} with ${userData.points} xp.`)
};

exports.help = {
  name: 'Money',
  description: 'Unfinished command for future use',
  usage: 'Undefined',
  extended: '',
  category: 'unused'
}