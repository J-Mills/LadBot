const bot = require('../bot');

exports.run = async (client, message, args) => {
  message.channel.send(`\`\`\`lua\n['Would you like to play?']\n\n┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐\n│\\ ~ /│ │\\ ~ /│ │\\ ~ /│ │\\ ~ /│ │\\ ~ /│\n│}}:{{│ │}}:{{│ │}}:{{│ │}}:{{│ │}}:{{│\n│}}:{{│ │}}:{{│ │}}:{{│ │}}:{{│ │}}:{{│\n│/ ~ \\│ │/ ~ \\│ │/ ~ \\│ │/ ~ \\│ │/ ~ \\│\n└─────┘ └─────┘ └─────┘ └─────┘ └─────┘\n\`\`\`
  `).then(message => {
      message.react('⬆').then(msg => {
        message.react('⏹').then(msg => {
          message.react('🗑');
        });
      });
    });

  // Dealing the cards
  function deal() {
    card = Math.floor(Math.random() * 14 + 1);
    return card;
  }
  // Determine if the card is a face or a number
  function getCardFace(card) {
    if (card === 11) {
      return 'J';
    } else if (card === 12) {
      return 'Q';
    } else if (card === 13) {
      return 'K';
    } else if (card === 14) {
      return 'A';
    } else if (card === 10) {
      return 'T';
    } else {
      return card;
    }
  }
  // Execute the deal
  var card1 = deal();
  var card2 = deal();
  var card3 = deal();
  var card4 = deal();
  var card5 = deal();
  // Link dealt cards to the react event
  module.exports.run.dealValue = {
    card1: getCardFace(card1),
    card2: getCardFace(card2),
    card3: getCardFace(card3),
    card4: getCardFace(card4),
    card5: getCardFace(card5)
  }

  function getValue(card) {
    if (card === 11 || card === 12 || card === 13) {
      return 10;
    } else if (card === 14) {
      return 11;
    } else {
      return card;
    }
  }

  module.exports.run.dealScore = {
    deal1: getValue(card1) + getValue(card2),
    deal2: getValue(card1) + getValue(card2) + getValue(card3),
    deal3: getValue(card1) + getValue(card2) + getValue(card3) + getValue(card4),
    deal4: getValue(card1) + getValue(card2) + getValue(card3) + getValue(card4) + getValue(card5)
  }

  function randomSuit() {
    let suit = ['♣', '♦', '♥', '♠'];
    let dealtSuit = suit[Math.floor(Math.random() * suit.length)];
    return dealtSuit;
  }

  module.exports.run.dealCards = {
    card1: randomSuit(),
    card2: randomSuit(),
    card3: randomSuit(),
    card4: randomSuit(),
    card5: randomSuit(),
    card6: 0
  }

  function dealerHand() {
    let score = Math.floor(Math.random() * 22);
    return score;
  }

  dealerScore = dealerHand();

  module.exports.run.dealerHand = {
    dealerScore: dealerScore
  }

  bot.dealt.dealtCards = 0;
}

exports.help = {
  name: 'Blackjack',
  description: 'Play a game of blackjack against the bot!',
  usage: '!blackjack',
  extended: '',
  category: 'fun'
}