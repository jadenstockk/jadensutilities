module.exports = {
    name: 'serverlogs',
    description: 'log server actions',

    execute(user, type, moderator, reason, time, client) {
      const { serverLogsID } = require("../config.json");
      const { serverLogsTOKEN } = require("../config.json");
      const Discord = require('discord.js');
      const serverLogs = new Discord.WebhookClient(serverLogsID, serverLogsTOKEN);
        
        if (type === "WARN" || type === "KICK" || type === "BAN") {
            if (type === "WARN") (emoji = "❗"), (colour = "FFC24F");
            if (type === "KICK" || type === "BAN") (emoji = "🔒"), (colour = "FF3E3E");
        
            let banwarnkickEmbed = new Discord.MessageEmbed()
              .setAuthor(`[${type}] ${user.tag}`, user.displayAvatarURL())
              .setColor(colour)
              .addFields(
                { name: "User", value: user, inline: true },
                { name: "Moderator", value: moderator, inline: true },
                { name: "Reason", value: reason, inline: true }
              );
        
            serverLogs.send(banwarnkickEmbed);
          } else if (type === "joined") {
            if (type === "joined") (emoji = "📥"), (colour = "33FF5B");
        
            let joinleaveEmbed = new Discord.MessageEmbed()
              .setAuthor(`${user.tag}`, user.displayAvatarURL())
              .setColor(colour)
              .setDescription(`${emoji} ${user} ${type} the server`)
              .setThumbnail(user.displayAvatarURL());
        
            serverLogs.send(joinleaveEmbed);
          } else if (type === "left") {
            if (type === "left") (emoji = "📤"), (colour = "FF3E3E");
        
            let joinleaveEmbed = new Discord.MessageEmbed()
              .setAuthor(`${user.tag}`, user.displayAvatarURL())
              .setColor(colour)
              .setDescription(`${emoji} ${user} ${type} the server`)
              .setThumbnail(user.displayAvatarURL());
        
            serverLogs.send(joinleaveEmbed);
          } else if (type === "UNBAN") {
            if (type === "UNBAN") (emoji = "🔓"), (colour = "33FF5B");
        
            let unbanEmbed = new Discord.MessageEmbed()
              .setAuthor(`[${type}] ${user.tag}`, user.displayAvatarURL())
              .setColor(colour)
              .addFields(
                { name: "User", value: user, inline: true },
                { name: "Moderator", value: moderator, inline: true },
                { name: "Reason", value: reason, inline: true }
              )
              .setThumbnail(user.displayAvatarURL());
        
            serverLogs.send(unbanEmbed);
          } else if (type === "MUTED") {
            if (type === "MUTED") (emoji = "🔇"), (colour = "FFC24F");
        
            let mutedEmbed = new Discord.MessageEmbed()
              .setAuthor(`[${type}] ${user.tag}`, user.displayAvatarURL())
              .setColor(colour)
              .addFields(
                { name: "User", value: user, inline: true },
                { name: "Moderator", value: moderator, inline: true },
                { name: "Reason", value: reason, inline: true },
                { name: "Duration", value: time, inline: true }
              );
        
            serverLogs.send(mutedEmbed);
          } else if (type === "UNMUTED") {
            if (type === "UNMUTED") (emoji = "🔊"), (colour = "33FF5B");
        
            let mutedEmbed = new Discord.MessageEmbed()
              .setAuthor(`[${type}] ${user.tag}`, user.displayAvatarURL())
              .setColor(colour)
              .addFields(
                { name: "User", value: user, inline: true },
                { name: "Moderator", value: moderator, inline: true }
              );
        
            serverLogs.send(mutedEmbed);
          }
    }
}