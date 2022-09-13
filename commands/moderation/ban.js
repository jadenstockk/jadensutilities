module.exports = {
  commands: 'ban',
  permissions: 'BAN_MEMBERS',
  permissionError: `You aren't allowed to ban members`,
  permissionMessage: true,

  callback: (message, args, client) => {
      const Discord = require('discord.js');

      if (message.author.bot) return;

      async function banUserProcess() {
        let banUser =
          message.mentions.users.first() || client.users.fetch(args[0]);

        if (!banUser) return;

        let banReason = args.slice(1).join(" ");
        if (!banReason) banReason = "Unspecified";

        message.guild.members.ban(banUser, { reason: banReason });

        let banMessage = new Discord.MessageEmbed()
          .setColor("FF3E3E")
          .setAuthor(
            `${banUser.tag} has been banned`,
            banUser.displayAvatarURL()
          )
          .setDescription(`**Reason:** ${banReason}`);

        message.channel.send(banMessage);

        serverLog(banUser, "BAN", message.author, banReason);

        message.delete();
      }
      banUserProcess();
  },
};
