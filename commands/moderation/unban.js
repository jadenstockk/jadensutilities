module.exports = {
  commands: 'unban',
  permissions: 'BAN_MEMBERS',
  permissionError: `You aren't allowed to unban members`,
  permissionMessage: true,

  callback: (message, args) => {
    const Discord = require("discord.js");
      if (message.author.bot) return;

      let banReason = args.slice(1).join(" ");
      if (!banReason) banReason = "Unspecified";

      let banUser = args[0];
      message.guild.fetchBans().then((bans) => {
        if (bans.size == 0) return;
        let bUser = bans.find((b) => b.user.id == banUser);
        if (!bUser) return;
        message.guild.members.unban(bUser.user);

        let unbannedMessage = new Discord.MessageEmbed()
          .setColor("33FF5B")
          .setAuthor(
            `${bUser.user.tag} has been unbanned`,
            bUser.user.displayAvatarURL()
          )
          .setDescription(`**Reason:** ${banReason}`);

        message.channel.send(unbannedMessage);

        serverLog(bUser.user, "UNBAN", message.author, banReason);
        message.delete();
      });
  },
};
