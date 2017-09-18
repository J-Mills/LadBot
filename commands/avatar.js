exports.run = async (client, message, args) => {
  let msg = await message.channel.send("Generating avatar...");

  let mentioned = message.mentions.users.first();

  if (args[0] != undefined) {
    message.channel.send(mentioned.displayAvatarURL);
  } else {
    message.channel.send(message.author.displayAvatarURL);
  }
  msg.delete();
};

exports.help = {
  name: 'Avatar',
  description: 'Displays the user\'s avatar.',
  usage: '!avatar or !avatar @[user]',
  extended: '',
  category: 'general'
}