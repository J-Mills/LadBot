exports.run = async (client, message, args) => {
  message.channel.send(`
    .-""-.
   /______\\      -- Please, Browse My Wares!
  (________)     ___________________________
  | /_  _\\ |
  | |o  o| |     * - Solar Coins       $1200
  | | _\\ | |     * - Meme Coins        $2000
  | |    | |     * - Coin Generator    $5000
  | |.__.| |
 /  |-..-|  \\
/___|____|___\\`
    , { code: 'ml' });
}

exports.help = {
  name: 'Shop',
  description: 'Buy things with your gold!',
  usage: '!shop',
  extended: '',
  category: 'fun'
}