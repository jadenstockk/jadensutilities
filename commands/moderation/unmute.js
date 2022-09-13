module.exports = {
  commands: 'unmute',
  modRequired: true,
  permissionError: `You aren't allowed to unmute people`,
  permissionMessage: true,

  callback: (message, args, client) => {
    const Discord = require("discord.js");
    let nopeEmoji = client.emojis.cache.get('779455910337970176');

    let muteTarget =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!muteTarget) return;

    if (muteTarget.user.bot) return;

      if (!muteTarget.hasPermission("ADMINISTRATOR")) {
        let muteRole = message.guild.roles.cache.find(
          (role) => role.name === "Muted"
        );

        if (muteTarget.roles.cache.some((role) => role.name === "Muted")) {
          message.delete();

          let muteMod = message.author.tag;

          let mutedMessageChannelSend = new Discord.MessageEmbed()
            .setColor("33FF5B")
            .setAuthor(
              `${muteTarget.user.tag} has been unmuted`,
              muteTarget.user.displayAvatarURL()
            );

          message.channel.send(mutedMessageChannelSend);

          muteTarget.roles.remove(muteRole);

          serverLog(muteTarget.user, "UNMUTED", message.author, "", "");
        } else {
          let alreadyMuted = new Discord.MessageEmbed()
            .setDescription(
              `${nopeEmoji} You cannot unmute someone that is not muted`
            )
            .setColor("FF3E3E");

          message.channel.send(alreadyMuted);

          return;
        }
      } else {
        let embed = new Discord.MessageEmbed()
        .setDescription(`${nopeEmoji} You aren't allowed to unmute admins`)
        .setColor("#FF3E3E")

        message.channel.send(embed)
      }
    }
};
