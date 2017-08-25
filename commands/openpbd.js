exports.run = async (client, message, args) => {
  message.channel.send(`I'm sorry, ${message.author}. I'm afraid I can't do that.`)
}

exports.help = {
  name: 'OpenPBD',
  description: `I'm afraid I can't help you with this.`,
  usage: '!openpbd',
  extended: '',
  category: 'fun'
}