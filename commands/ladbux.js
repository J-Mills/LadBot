const fs   = require('fs');
const data = require('../ladbux.json');

let ladbux = JSON.parse(fs.readFileSync('../ladbux.json', 'utf8'));

exports.run = (client, message, args) => {
  if (!ladbux[message.author.id]) ladbux[message.author.id] = {
    money: 0,
    level: 0
  };
  ladbux[message.author.id].ladbux++;

  fs.writeFile('../ladbux.json', JSON.stringify(ladbux), (err) => {
    if (err) console.error(err);
  });
}