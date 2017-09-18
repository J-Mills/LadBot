const Discord     = require('discord.js');
const client      = new Discord.Client();
const fs          = require('fs');
const config      = require('./config.json');
const blackJack   = require('./commands/blackjack');

points = JSON.parse(fs.readFileSync('./money.json', 'utf-8'));

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') {
    message.channel.send('Private messages are not supported!');
    return;
  };

  // --- START MONEY SECTION ---

  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0,
    coins: 0
  };
  let userData = points[message.author.id];
  userData.points++;

  let curLevel = Math.floor(0.8 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`Congratulations, you just advanced a level!\nYou are now level ${curLevel}.`);
  }

  fs.writeFile("./money.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });

  // --- END MONEY SECTION ---

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err)
    message.reply(`Sorry, the command ${command} does not exist or was typed incorrectly.`);
  }
});

exports.dealt = {
  dealtCards: 0
}

client.on('messageReactionAdd', async (messageReaction, user) => {
  if (user == client.user) return;
  if (messageReaction.emoji.name == '💲') {
    if (messageReaction.message.content.charAt(3) !== 'l') return;
    messageReaction.remove(user);
    for (let i = 0; i < 3; i++) {
      let slotArray = ['7', '$', 'O', '#'];
      let first = slotArray[Math.floor(Math.random() * slotArray.length)];
      let second = slotArray[Math.floor(Math.random() * slotArray.length)];
      let third = slotArray[Math.floor(Math.random() * slotArray.length)];
      // Now that await is here, you can run the "fake loop" first and then the rest
      let msg = await messageReaction.message.edit(`\`\`\`lua\n['Spinning...']\n\n+---------+\n| CASINO! |\n|---------| o\n|' ${first} ${second} ${third} '| |\n|---------|/\n|  +  [_] |\n+---------+\`\`\``)
    }
    let slotArray = ['7', '$', 'O', '#'];
    let first = slotArray[Math.floor(Math.random() * slotArray.length)];
    let second = slotArray[Math.floor(Math.random() * slotArray.length)];
    let third = slotArray[Math.floor(Math.random() * slotArray.length)];
    let result = '';
    if (first === second && first === third) {
      result = 'You win! Play again...?';
    } else {
      result = 'You lose... Play again?';
    }
    messageReaction.message.edit(`\`\`\`lua\n['${result}']\n\n+---------+\n| CASINO! |\n|---------| o\n|' ${first} ${second} ${third} '| |\n|---------|/\n|  +  [_] |\n+---------+\`\`\``)
  }
  if (messageReaction.emoji.name == '❓') {
    // if (messageReaction.message.content.charAt(1) !== 'l') return;

    let commands = [];

    let generalCommands = [];
    let funCommands = [];
    let utilCommands = [];
    let adminCommands = [];

    fs.readdir('./commands/', (err, files) => {
      for (i = 0; i < files.length; i++) {
        const commandFile = require(`./commands/${files[i]}`);
        commands.push(files[i]);
        if (commandFile.help.category == 'general') {
          generalCommands.push(commandFile.help.name + ' '.repeat(10 - commandFile.help.name.length) + ':: ');
          generalCommands.push(commandFile.help.description + '\n');
        }
        if (commandFile.help.category == 'admin') {
          adminCommands.push(`${commandFile.help.name}${' '.repeat(9 - commandFile.help.name.length)} :: `);
          adminCommands.push(`${commandFile.help.description} \n`);
        }
        if (commandFile.help.category == 'fun') {
          funCommands.push(`${commandFile.help.name}${' '.repeat(9 - commandFile.help.name.length)} :: `);
          funCommands.push(`${commandFile.help.description} \n`);
        }
        if (commandFile.help.category == 'util') {
          utilCommands.push(`${commandFile.help.name}${' '.repeat(9 - commandFile.help.name.length)} :: `);
          utilCommands.push(`${commandFile.help.description} \n`);
        }
      }
      let fGeneral = generalCommands.join('');
      let fFun = funCommands.join('');
      let fUtil = utilCommands.join('');
      let fAdmin = adminCommands.join('');
      messageReaction.message.channel.send(`= Command List =\n\n[Use !help [commandname] for details and usage]\n\n== General ==\n${fGeneral}\n== Fun ==\n${fFun}\n== Utilities ==\n${fUtil}\n== Admin ==\n${fAdmin}\nCAUTION: Help command is undergoing an overhaul. Please be patient! :)`, { code: 'asciidoc' }).then(message => {
        message.react('🗑')
      });
    });
  }
  if (messageReaction.emoji.name == '⬆') {
    if (messageReaction.message.content.charAt(0) !== '`') return;
    messageReaction.remove(user);

    let blackJack = require(`./commands/blackjack`);

    // var exports.dealt.dealtCards = blackJack.run.dealCards.card6;

    if (exports.dealt.dealtCards == 0) {
      if (blackJack.run.dealScore.deal1 <= 20) {
        result = `Current score is ${blackJack.run.dealScore.deal1}, hit or stand?`
        exports.dealt.dealtCards = 2;
      } else if (blackJack.run.dealScore.deal1 == 21) {
        result = 'Blackjack! You win!!'
        exports.dealt.dealtCards = undefined;
      }
      messageReaction.message.edit(`\`\`\`lua\n['${result}']\n\n┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐\n│${blackJack.run.dealValue.card1}    │ │${blackJack.run.dealValue.card2}    │ │\\ ~ /│ │\\ ~ /│ │\\ ~ /│\n│  ${blackJack.run.dealCards.card1}  │ │  ${blackJack.run.dealCards.card2}  │ │}}:{{│ │}}:{{│ │}}:{{│\n│     │ │     │ │}}:{{│ │}}:{{│ │}}:{{│\n│    ${blackJack.run.dealValue.card1}│ │    ${blackJack.run.dealValue.card2}│ │/ ~ \\│ │/ ~ \\│ │/ ~ \\│\n└─────┘ └─────┘ └─────┘ └─────┘ └─────┘\`\`\`\n`)
    } else if (exports.dealt.dealtCards == 2) {
      if (blackJack.run.dealScore.deal2 <= 20) {
        result = `Current score is ${blackJack.run.dealScore.deal2}, hit or stand?`
        exports.dealt.dealtCards = 3;
      } else if (blackJack.run.dealScore.deal2 == 21) {
        result = 'Blackjack! You win!!'
        exports.dealt.dealtCards = undefined;
      } else if (blackJack.run.dealScore.deal2 > 21) {
        result = 'Bust!'
        exports.dealt.dealtCards = undefined;
      }
      messageReaction.message.edit(`\`\`\`lua\n['${result}']\n\n┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐\n│${blackJack.run.dealValue.card1}    │ │${blackJack.run.dealValue.card2}    │ │${blackJack.run.dealValue.card3}    │ │\\ ~ /│ │\\ ~ /│\n│  ${blackJack.run.dealCards.card1}  │ │  ${blackJack.run.dealCards.card2}  │ │  ${blackJack.run.dealCards.card3}  │ │}}:{{│ │}}:{{│\n│     │ │     │ │     │ │}}:{{│ │}}:{{│\n│    ${blackJack.run.dealValue.card1}│ │    ${blackJack.run.dealValue.card2}│ │    ${blackJack.run.dealValue.card3}│ │/ ~ \\│ │/ ~ \\│\n└─────┘ └─────┘ └─────┘ └─────┘ └─────┘\`\`\`\n`)
    } else if (exports.dealt.dealtCards == 3) {
      if (blackJack.run.dealScore.deal3 <= 20) {
        result = `Current score is ${blackJack.run.dealScore.deal3}, hit or stand?`
        exports.dealt.dealtCards = 4;
      } else if (blackJack.run.dealScore.deal3 == 21) {
        result = 'Blackjack! You win!!'
        exports.dealt.dealtCards = undefined;
      } else if (blackJack.run.dealScore.deal3 > 21) {
        result = 'Bust!'
        exports.dealt.dealtCards = undefined;
      }
      messageReaction.message.edit(`\`\`\`lua\n['${result}']\n\n┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐\n│${blackJack.run.dealValue.card1}    │ │${blackJack.run.dealValue.card2}    │ │${blackJack.run.dealValue.card3}    │ │${blackJack.run.dealValue.card4}    │ │\\ ~ /│\n│  ${blackJack.run.dealCards.card1}  │ │  ${blackJack.run.dealCards.card2}  │ │  ${blackJack.run.dealCards.card3}  │ │  ${blackJack.run.dealCards.card4}  │ │}}:{{│\n│     │ │     │ │     │ │     │ │}}:{{│\n│    ${blackJack.run.dealValue.card1}│ │    ${blackJack.run.dealValue.card2}│ │    ${blackJack.run.dealValue.card3}│ │    ${blackJack.run.dealValue.card4}│ │/ ~ \\│\n└─────┘ └─────┘ └─────┘ └─────┘ └─────┘\`\`\`\n`)
    } else if (exports.dealt.dealtCards == 4) {
      if (blackJack.run.dealScore.deal4 <= 20) {
        if (blackJack.run.dealScore.deal4 > blackJack.run.dealerHand.dealerScore) {
          result = `You win! You got ${blackJack.run.dealScore.deal2}, the dealer scored ${blackJack.run.dealerHand.dealerScore}`;
        } else {
          result = `You lose... dealer scored ${blackJack.run.dealerHand.dealerScore}`;
        }
        exports.dealt.dealtCards = 5;
      } else if (blackJack.run.dealScore.deal4 == 21) {
        result = 'Blackjack! You win!!'
        exports.dealt.dealtCards = undefined;
      } else if (blackJack.run.dealScore.deal4 > 21) {
        result = 'Bust!'
        exports.dealt.dealtCards = undefined;
      }
      messageReaction.message.edit(`\`\`\`lua\n['${result}']\n\n┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐\n│${blackJack.run.dealValue.card1}    │ │${blackJack.run.dealValue.card2}    │ │${blackJack.run.dealValue.card3}    │ │${blackJack.run.dealValue.card4}    │ │${blackJack.run.dealValue.card5}    │\n│  ${blackJack.run.dealCards.card1}  │ │  ${blackJack.run.dealCards.card2}  │ │  ${blackJack.run.dealCards.card3}  │ │  ${blackJack.run.dealCards.card4}  │ │  ${blackJack.run.dealCards.card5}  │\n│     │ │     │ │     │ │     │ │     │\n│    ${blackJack.run.dealValue.card1}│ │    ${blackJack.run.dealValue.card2}│ │    ${blackJack.run.dealValue.card3}│ │    ${blackJack.run.dealValue.card4}│ │    ${blackJack.run.dealValue.card5}│\n└─────┘ └─────┘ └─────┘ └─────┘ └─────┘\`\`\`\n`)
    } else {
      messageReaction.message.edit(`\`\`\`lua\n['Would you like to play?']\n\n┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐\n│\\ ~ /│ │\\ ~ /│ │\\ ~ /│ │\\ ~ /│ │\\ ~ /│\n│}}:{{│ │}}:{{│ │}}:{{│ │}}:{{│ │}}:{{│\n│}}:{{│ │}}:{{│ │}}:{{│ │}}:{{│ │}}:{{│\n│/ ~ \\│ │/ ~ \\│ │/ ~ \\│ │/ ~ \\│ │/ ~ \\│\n└─────┘ └─────┘ └─────┘ └─────┘ └─────┘\n\`\`\`
      `)
      exports.dealt.dealtCards = 0;
    }
  }
  if (messageReaction.emoji.name == '⏹') {
    if (messageReaction.message.content.charAt(0) !== '`') return;
    messageReaction.remove(user);

    let blackJack = require(`./commands/blackjack`);

    if (exports.dealt.dealtCards == 2) {
      exports.dealt.dealtCards = undefined;  
      if (blackJack.run.dealScore.deal1 > blackJack.run.dealerHand.dealerScore) {
        result = `You win! You got ${blackJack.run.dealScore.deal1}, the dealer scored ${blackJack.run.dealerHand.dealerScore}`;
      } else {
        result = `You lose... dealer scored ${blackJack.run.dealerHand.dealerScore}`;
      }
      messageReaction.message.edit(`\`\`\`lua\n['${result}']\n\n┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐\n│${blackJack.run.dealValue.card1}    │ │${blackJack.run.dealValue.card2}    │ │\\ ~ /│ │\\ ~ /│ │\\ ~ /│\n│  ${blackJack.run.dealCards.card1}  │ │  ${blackJack.run.dealCards.card2}  │ │}}:{{│ │}}:{{│ │}}:{{│\n│     │ │     │ │}}:{{│ │}}:{{│ │}}:{{│\n│    ${blackJack.run.dealValue.card1}│ │    ${blackJack.run.dealValue.card2}│ │/ ~ \\│ │/ ~ \\│ │/ ~ \\│\n└─────┘ └─────┘ └─────┘ └─────┘ └─────┘\`\`\`\n`)
    } else if (exports.dealt.dealtCards == 3 && blackJack.run.dealScore.deal2 <= 21) {
      exports.dealt.dealtCards = undefined;
      if (blackJack.run.dealScore.deal2 > blackJack.run.dealerHand.dealerScore) {
        result = `You win! You got ${blackJack.run.dealScore.deal2}, the dealer scored ${blackJack.run.dealerHand.dealerScore}`;
      } else {
        result = `You lose... dealer scored ${blackJack.run.dealerHand.dealerScore}`;
      }
      messageReaction.message.edit(`\`\`\`lua\n['${result}']\n\n┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐\n│${blackJack.run.dealValue.card1}    │ │${blackJack.run.dealValue.card2}    │ │${blackJack.run.dealValue.card3}    │ │\\ ~ /│ │\\ ~ /│\n│  ${blackJack.run.dealCards.card1}  │ │  ${blackJack.run.dealCards.card2}  │ │  ${blackJack.run.dealCards.card3}  │ │}}:{{│ │}}:{{│\n│     │ │     │ │     │ │}}:{{│ │}}:{{│\n│    ${blackJack.run.dealValue.card1}│ │    ${blackJack.run.dealValue.card2}│ │    ${blackJack.run.dealValue.card3}│ │/ ~ \\│ │/ ~ \\│\n└─────┘ └─────┘ └─────┘ └─────┘ └─────┘\`\`\`\n`)
    } else if (exports.dealt.dealtCards == 4 && blackJack.run.dealScore.deal3 <= 21) {
      exports.dealt.dealtCards = undefined;
      if (blackJack.run.dealScore.deal3 > blackJack.run.dealerHand.dealerScore) {
        result = `You win! You got ${blackJack.run.dealScore.deal3}, the dealer scored ${blackJack.run.dealerHand.dealerScore}`;
      } else {
        result = `You lose... dealer scored ${blackJack.run.dealerHand.dealerScore}`;
      }
      messageReaction.message.edit(`\`\`\`lua\n['${result}']\n\n┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐\n│${blackJack.run.dealValue.card1}    │ │${blackJack.run.dealValue.card2}    │ │${blackJack.run.dealValue.card3}    │ │${blackJack.run.dealValue.card4}    │ │\\ ~ /│\n│  ${blackJack.run.dealCards.card1}  │ │  ${blackJack.run.dealCards.card2}  │ │  ${blackJack.run.dealCards.card3}  │ │  ${blackJack.run.dealCards.card4}  │ │}}:{{│\n│     │ │     │ │     │ │     │ │}}:{{│\n│    ${blackJack.run.dealValue.card1}│ │    ${blackJack.run.dealValue.card2}│ │    ${blackJack.run.dealValue.card3}│ │    ${blackJack.run.dealValue.card4}│ │/ ~ \\│\n└─────┘ └─────┘ └─────┘ └─────┘ └─────┘\`\`\`\n`)
    }
  }
  if (messageReaction.emoji.name == '🗑') {
    messageReaction.message.delete();
  }
});

client.on('messageReactionRemove', async (messageReaction, user) => {
  if (user == client.user) return;
  if (messageReaction.emoji.name == '❓') {
    // if (messageReaction.message.content.charAt(1) !== 'h') return;
    // let msg = messageReaction.message.channel.send('hi');
    messageReaction.lastMessageID.delete();
  }
});

setInterval(function () {
  let ladGuild = client.guilds.get('197513106803523584');
  // console.log(ladGuild.members);
  ladGuild.members.forEach(user => {
    if (!points[user.id]) points[user.id] = {
      points: 0,
      level: 0,
      coins: 0
    };
    if (user.presence.status == 'online') {
      let userData = points[user.id]
      userData.coins++;
    }
    fs.writeFile("./money.json", JSON.stringify(points), (err) => {
      if (err) console.error(err)
    });
  });
}, 60000);

client.login(config.token).catch(console.error);