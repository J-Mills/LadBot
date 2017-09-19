const answers = [ 'Maybe.', 'Certainly not.', 'I hope so.', 'Not in your wildest dreams.', 'There is a good chance.', 'Quite likely.', 'I think so.', 'I hope not.', 'I hope so.', 'Never!', 'Fuhgeddaboudit.', 'Ahaha! Really?!?', 'Pfft.', 'Sorry, bucko.', 'Hell, yes.', 'Hell to the no.', 'The future is bleak.', 'The future is uncertain.', 'I would rather not say.', 'Who cares?', 'Possibly.', 'Never, ever, ever.', 'There is a small chance.', 'Yes!' ];

exports.run = async (client, message, args) => { 
  if (!message.content.endsWith('?')) return message.reply('That does not look like a question. (hint: end your question with a `?`.)');
  const msg = await message.channel.send('`Thinking...`');
  setTimeout( async () => {
    await msg.edit(`🎱 ${answers[Math.floor(Math.random() * answers.length)]}`);
  }, Math.random() * (1 - 5) + 1 * 2000);
};

exports.help = {
  name: 'Magic8',
  description: 'Helps you make decisions!',
  usage: '!magic8 [question]?',
  extended: '',
  category: 'fun'
}