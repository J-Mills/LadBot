const config = require('../config.json');

exports.run = (client, message, args) => {
  if (message.author.id !== config.adminID) {
    message.channel.send("You're not the admin!");
    return;
  }
  try {
    if (!args || args.length < 1) {
      message.reply("You must provide a command name to reload.");
      return
    } else if (args) {
      // the path is relative to the *current folder*, so just ./filename.js
      delete require.cache[require.resolve(`./${args[0]}.js`)];
      message.reply(`The command ${args[0]} has been reloaded`);
    } 
  }  catch (err) {
    message.reply('Command does not exist!');
  }
};