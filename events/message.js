exports.run = async (client, message, args) => {
  let responseObject = {
    '(╯°□°）╯︵ ┻━┻': '┬─┬﻿ ノ( ゜-゜ノ)',
    'ayy': 'ayy, lmao!',
    'wew lad': 'w e w l a d'
  }

  if (responseObject[message.content]) {
    message.channel.send(responseObject[message.content])
  }

  if (message.content.includes('thot')) {
    message.channel.send('🚨🚨🚨🚨🚨\n THOT DETECTED \n🚨🚨🚨🚨🚨')
  }
}