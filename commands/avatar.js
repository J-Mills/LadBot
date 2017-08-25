exports.run = async (client, message, args) => {
  let msg = await message.channel.send("Generating avatar...");

  // message.channel.send({files: [
  //     {
  //       attachment: message.author.displayAvatarURL,
  //       name: "Avatar.png"
  //     }
  //   ]});
  if (args[0] != undefined) {
    
    message.channel.send(message.args[0].avatarURL);
  }
  message.channel.send(message.author.avatarURL);

  msg.delete();
};

exports.help = {
  name: 'Avatar',
  description: 'Displays the user\'s avatar.',
  usage: '!avatar',
  extended: '',
  category: 'general'
}