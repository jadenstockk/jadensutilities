module.exports = {
    commands: ['ping'],
  
    callback: (message, args, client) => {
      const Discord = require("discord.js");

      message.channel.send(`\`Calculating ping...\``).then(msg => {
          let ping = msg.createdTimestamp - message.createdTimestamp

          msg.edit(`**Bot Ping:** \`${ping}ms\`\n**API Ping:** \`${client.ws.ping}ms\``)
      })
    },
  };