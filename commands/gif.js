exports.run = async (client, message, args) => {
  var config = {
    'api_key': 'dc6zaTOxFJmzC',
    'rating': 'pg-13',
    'url': 'http://api.giphy.com/v1/gifs/random',
    'permission': ['NORMAL']
  };

  var tags = args;
  var qs = require('querystring');
  var request = require('request');

  function get_gif(tags, func) {
    var params = {
      "api_key": config.api_key,
      "rating": config.rating,
      "format": "json",
      "limit": 1
    };

    var query = qs.stringify(params);

    if (tags !== null) {
      query += "&tag=" + tags.join('+');
    }

    var request = require("request");
    request(config.url + "?" + query, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        console.error("giphy: Got error: " + body);
        console.log(error);
      } else {
        try {
          var responseObj = JSON.parse(body)
          func(responseObj.data.id);
        } catch(err) {
          func(undefined);
        }
      }
    }.bind(this));
  }

  get_gif(tags, function (id) {
    var joined = tags.join(' ');
    if (typeof id !== "undefined") {
      message.channel.send('http://media.giphy.com/media/' + id + '/giphy.gif [Tags: ' + (args ? joined : "Random GIF") + ']');
    } else {
      message.channel.send('Invalid tags. [Tags: ' + (args ? joined : 'Random GIF') + ']');
    }
  });
}

exports.help = {
  name: 'Gif',
  description: 'Sends a random gif or a gif based on tags.',
  usage: '!gif [tags]',
  extended: '',
  category: 'fun'
}