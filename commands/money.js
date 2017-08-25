// const sql = require("sqlite");
// sql.open("../idlegame.sqlite");

// sql.get(`SELECT * FROM idlegame WHERE userId = '${message.author.id}'`).then(row => {
//   if (!row) { // Can't find the row.
//     sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
//   } else { // Can find the row.
//     sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
//   }
// }).catch(() => {
//   console.error;
//   sql.run("CREATE TABLE IF NOT EXISTS idlegame (userId TEXT, points INTEGER, level INTEGER)").then(() => {
//     sql.run("INSERT INTO idlegame (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
//   });
// });

exports.help = {
  name: 'Money',
  description: 'Unfinished command for future use',
  usage: 'Undefined',
  extended: '',
  category: 'unused'
}