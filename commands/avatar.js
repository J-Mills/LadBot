exports.run = async (client, message, args) => {
  let msg = await message.channel.send("Generating avatar...");

  await message.channel.send({files: [
      {
        attachment: message.author.displayAvatarURL,
        name: "Avatar.png"
      }
    ]});

  msg.delete();
};