exports.run = async (member) => {
  const channel = member.guild.channels.get('345998250257416192');
  channel.send(`Welcome, ${member}, to the lads general assembly!`);
  // const role = member.guild.roles.get('233160665777307648');
  // if (!role) return;
  // member.addRole(role);
}