module.exports = {
    name: 'ticketsystem',
    description: 'server ticketsystem',

    async execute(reaction, user, message, channel, client) {
      const { serversupport } = require("../config.json");
      const { serversupportparent } = require("../config.json");
      const Discord = require('discord.js');

        if (user.partial) await user.fetch();
        if (reaction.partial) await reaction.fetch();
        if (reaction.message.partial) await reaction.message.fetch();
        if (user.bot) return;
        if (reaction.message.channel.type === "dm") return;
        let supportChannel = reaction.message.guild.channels.cache.get('745163136398524426');
      
        if (reaction.message.channel === supportChannel) {
          reaction.users.remove(user);
      
          reaction.message.guild.channels
            .create(`support-${user.username}`, {
              permissionOverwrites: [
                {
                  id: user.id,
                  allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                },
                {
                  id: reaction.message.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: reaction.message.guild.roles.cache.find(
                    (role) => role.name === "Moderators"
                  ),
                  allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                },
              ],
              type: "text",
              parent: serversupportparent,
            })
            .then((ch) => {
              supportIntroMessage = new Discord.MessageEmbed()
                .setTitle("Welcome to Jaden's Empire Support")
                .setDescription(
                  "Please provide us with information about what you need help with and a moderator with assist you shortly"
                )
                .setFooter(
                  `Jaden's Empire Support`,
                  "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
                )
                .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
                .setColor("#059DFF");
      
              ch.send(`${user}`, supportIntroMessage);
            });
        } else {
          return;
        }
    }
}
