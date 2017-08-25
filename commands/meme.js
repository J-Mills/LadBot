const Promise = require('bluebird');
const Imgflipper = require('imgflipper');
const config = require('../config.json');

const imgflipper = new Imgflipper(config.imgUser, config.imgPass);
const generateMeme = Promise.promisify(imgflipper.generateMeme);

const memes = {
  "brace": 61546,
  "mostinteresting": 61532,
  "fry": 61520,
  "onedoesnot": 61579,
  "yuno": 61527,
  "success": 61544,
  "allthethings": 61533,
  "doge": 8072285,
  "drevil": 40945639,
  "skeptical": 101711,
  "notime": 442575,
  "yodawg": 101716,
  "awkwardpenguin": 61584
};

exports.run = async (client, message, args) => {
  if (!args[0]) {
    message.channel.send('Please specify a meme to create, or type \`!meme list\` to see a list of possible meme templates.')
    return;
  } else if (args[0].toLowerCase() == 'list') {
    message.author.send(Object.keys(memes));
    return;
  } else if (!args[2]) {
    message.channel.send('Too few args!');
    return;
  }

  const memeType = args[0];
  const joinedUpperText = args.join(' ');
  const splitUpperText = joinedUpperText.split(' |');

  if (splitUpperText.length > 3) {
    message.channel.send('It seems you\'ve added too many arguments. Type \`!help meme\` for help on how to structure the \`!meme\` command.');
    return;
  }

  if (isNaN(memeType)) {
    imgflipper.generateMeme(memes[memeType], splitUpperText[1], splitUpperText[2], function (err, image) {
      message.channel.send(image);
    })
  } else {
    imgflipper.generateMeme(memeType, splitUpperText[1], splitUpperText[2], function (err, image) {
      message.channel.send(image);
    });
  }
}

exports.help = {
  name: 'Meme',
  description: 'Create memes on the fly.',
  usage: '!meme [meme type] | [top text] | [bottom text] OR !meme list',
  extended: '',
  category: 'fun'
}