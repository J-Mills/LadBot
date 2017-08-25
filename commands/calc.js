exports.run = async (client, message, args) => {
  if (args[0] == 'add') {
    let numArray = args.map(n => parseInt(n));
    numArray.shift();
    let total = numArray.reduce((prev, current) => prev + current);
    message.channel.send(total);
  } else if (args[0] == 'multiply') {
    let numArray = args.map(n => parseInt(n));
    numArray.shift();
    let total = numArray.reduce((prev, current) => prev * current);
    message.channel.send(total);
  } else if (args[0] == 'divide') {
    let numArray = args.map(n => parseInt(n));
    numArray.shift();
    let total = numArray.reduce((prev, current) => prev / current);
    message.channel.send(total);
  } else if (args[0] == 'subtract') {
    let numArray = args.map(n => parseInt(n));
    numArray.shift();
    let total = numArray.reduce((prev, current) => prev - current);
    message.channel.send(total);
  } else if (args[0] == 'factorial') {
    let num = args[1];
    let rval = 1;
    for (i = 2; i <= num; i++) {
      rval = rval * i;
    }
    message.channel.send(rval);
  } else {
    message.channel.send('Please use one of the calculator functions, such as `add`, `subtract` or `factorial`!')
  }
}

exports.help = {
  name: 'Calc',
  description: 'Performs basic calculations.',
  usage: '!calc [add/subtract/divide/multiply/factorial] [numbers]',
  extended: '',
  category: 'util'
}