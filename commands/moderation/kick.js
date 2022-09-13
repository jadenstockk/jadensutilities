module.exports = {
  commands: 'kick',
  permissions: 'KICK_MEMBERS',
  permissionError: `You aren't allowed to kick members`,
  permissionMessage: true,

  callback: (message, args) => {
    const Discord = require("discord.js");
      if (message.author.bot) return;

      let kickUser =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!kickUser) return;

      let kickReason = args.slice(1).join(" ");
      if (!kickReason) kickReason = "Unspecified";

      if (message.guild.member(kickUser).kickable) {
        let kickedMessage = new Discord.MessageEmbed()
          .setColor("FF3E3E")
          .setAuthor(
            `${kickUser.user.tag} has been kicked`,
            kickUser.user.displayAvatarURL()
          )
          .setDescription(`**Reason:** ${kickReason}`);

        message.channel.send(kickedMessage);

        message.guild.member(kickUser).kick(kickReason);

        serverLog(kickUser.user, "KICK", message.author, kickReason);

        message.delete();
      } else {
        return;
      }
  },
};
