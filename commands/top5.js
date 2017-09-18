exports.run = async (clinet, message, args) => {
  let userData = points[message.author.id];
  let ladGuild = message.guild;
  let memberArray = [];

  ladGuild.members.forEach(user => {
    memberArray.push(points[user.id]);
  });
  
  let top5Array = memberArray.sort((a, b) => b.points - a.points);
  
  message.channel.send(`Rank | Name

1 > # "${top5Array[0].username}"
Level: ${top5Array[0].level}
Total Points: ${top5Array[0].points}
Total Coins: ${top5Array[0].coins}

2 > # "${top5Array[1].username}"
Level: ${top5Array[1].level}
Total Points: ${top5Array[1].points}
Total Coins: ${top5Array[1].coins}

3 > # "${top5Array[2].username}"
Level: ${top5Array[2].level}
Total Points: ${top5Array[2].points}
Total Coins: ${top5Array[2].coins}

4 > # "${top5Array[3].username}"
Level: ${top5Array[3].level}
Total Points: ${top5Array[3].points}
Total Coins: ${top5Array[3].coins}

5 > # "${top5Array[4].username}"
Level: ${top5Array[4].level}
Total Points: ${top5Array[4].points}
Total Coins: ${top5Array[4].coins}`
, { code: 'ml' })
}

exports.help = {
  name: 'Top5',
  description: 'Displays the current top 5 members.',
  usage: '!top5',
  extended: '',
  category: 'util'
}