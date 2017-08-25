exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Ping...?').catch(console.error);
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}

exports.help = {
  name: 'Ping',
  description: 'Pings the bot to check status.',
  usage: '!ping',
  extended: '',
  category: 'util'
}