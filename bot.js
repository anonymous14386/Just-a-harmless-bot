const Discord = require("discord.js");
const request = require("request");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on("message", msg => {

  //Command prefix
  let prefix = "$";

  if (msg.author.bot) return;

  if (msg.content.toLowerCase() === prefix + "help") {
    msg.reply("\n```Thank you for choosing me! Here is a basic help page:\n\n1. $avatar - Sends your profile pic\n\n2. $command2 - Sends a link to Song 2 by blur\n\n3. $md5 - Sends the md5 hash of a string\n\n4. $define - Sends the urban dictionary definition of a word\n\n5. $geoip - Sends the geographical information for an IP address\n\n6. $btc - Sends the current exchange rate for 1 BTC\n\n7. $ping - Sends back a pong```");
  }

  if (msg.content.toLowerCase().startsWith(prefix + 'avatar <@')) {
    let username =  msg.mentions.users.first()
    msg.reply(username.avatarURL);
  }

  if (msg.content.toLowerCase() === prefix + "command2") {
    msg.reply("https://www.youtube.com/watch?v=SSbBvKaM6sk");
  }

  if (msg.content.toLowerCase().startsWith(prefix + "md5")) {

    let string = msg.content.slice(5);

    request("https://api.apithis.net/encrypt.php?type=md5&content=" + string, function(error, response, body) {
      msg.channel.sendMessage(body);
    })
  }

  if (msg.content.toLowerCase().startsWith(prefix + "define")) {

    let string1 = msg.content.slice(8);
    let string = string1.split(' ').join('');

    request("https://api.apithis.net/dictionary.php?define=" + string, function(error, response, body) {
      msg.channel.sendMessage("**```" + "Definition: " + (body) + "```**");
    })

    request("https://api.apithis.net/dictionary.php?example=" + string, function(error, response, body) {
      msg.channel.sendMessage("**```" + "Example: " + (body) + "```**");
    })

  }

  if (msg.content.toLowerCase().startsWith(prefix + "geoip")) {

    let string = msg.content.slice(7);

    request("https://api.apithis.net/geoip.php?ip=" + string, function(error, response, body) {

      let output = (body).split('<BR>').join('\n\n')

      msg.channel.sendMessage('**```' + output + '```**');
    })
  }

  if (msg.content.toLowerCase().startsWith(prefix + "btc")) {

    let string = msg.content.slice(5);

    request("https://bitaps.com/api/ticker/average", function(error, response, body) {

      var now = new Date();

      var jsonDate = now.toJSON();

      let args = (body).split(" ").slice(1);

      let  usd = args[2].slice(0, -1);

      let rub = args[5].slice(1).slice(0, -2);

      let eur = args[7].slice(1).slice(0, -2);

      let cny = args[9].slice(1).slice(0, -3);

      msg.channel.sendMessage('**```' + 'Current exchange rate for one BTC as of: ' + now + '\n\n' + 'US Dollar: ' + usd + '\n\n' + 'Russian Ruble: ' + rub + '\n\n' + 'Euro: ' + eur + '\n\n' + 'Chinese Yuan: ' + cny + '```**');

    })
  }

  if (msg.content.startsWith(prefix + 'ping')) {
      msg.channel.sendMessage("Pong!")
          .then(message => {
              message.edit(`Pong! \`${message.createdTimestamp - msg.createdTimestamp}ms\``);
          });
  };

});

client.login("Bot token");
