exports.run = async (clinet, message, args) => {
  let userData = points[message.author.id];
  let ladGuild = message.guild;
  let memberArray = [];

  ladGuild.members.forEach(user => {
    memberArray.push(points[user.id]);
  });

  if (args[0] == 'coins') {
    let top5Array = memberArray.sort((a, b) => b.coins - a.coins);
    
    message.channel.send(`Rank  |  Name
  
1 > # " ${top5Array[0].username} "
Level:  ${top5Array[0].level}
Points: ${top5Array[0].points}
Coins:  ${top5Array[0].coins}

2 > # " ${top5Array[1].username} "
Level:  ${top5Array[1].level}
Points: ${top5Array[1].points}
Coins:  ${top5Array[1].coins}

3 > # " ${top5Array[2].username} "
Level:  ${top5Array[2].level}
Points: ${top5Array[2].points}
Coins:  ${top5Array[2].coins}

4 > # " ${top5Array[3].username} "
Level:  ${top5Array[3].level}
Points: ${top5Array[3].points}
Coins:  ${top5Array[3].coins}

5 > # " ${top5Array[4].username} "
Level:  ${top5Array[4].level}
Points: ${top5Array[4].points}
Coins:  ${top5Array[4].coins}`
, { code: 'ml' });
  } else if (args[0] == 'points' || !args[0]) {
    let top5Array = memberArray.sort((a, b) => b.points - a.points);
    
    message.channel.send(`Rank  |  Name
  
1 > # " ${top5Array[0].username} "
Level:  ${top5Array[0].level}
Points: ${top5Array[0].points}
Coins:  ${top5Array[0].coins}

2 > # " ${top5Array[1].username} "
Level:  ${top5Array[1].level}
Points: ${top5Array[1].points}
Coins:  ${top5Array[1].coins}

3 > # " ${top5Array[2].username} "
Level:  ${top5Array[2].level}
Points: ${top5Array[2].points}
Coins:  ${top5Array[2].coins}

4 > # " ${top5Array[3].username} "
Level:  ${top5Array[3].level}
Points: ${top5Array[3].points}
Coins:  ${top5Array[3].coins}

5 > # " ${top5Array[4].username} "
Level:  ${top5Array[4].level}
Points: ${top5Array[4].points}
Coins:  ${top5Array[4].coins}`
, { code: 'ml' });
  }
}

exports.help = {
  name: 'Top5',
  description: 'Displays the current top 5 members.',
  usage: '!top5 [coins || points]',
  extended: '',
  category: 'util'
}