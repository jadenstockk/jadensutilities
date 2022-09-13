module.exports = {
  commands: 'unmuteall',

  callback: (message, args, client) => {
    const Discord = require("discord.js");
    let nopeEmoji = client.emojis.cache.get('779455910337970176');

    if (message.member.hasPermission("ADMINISTRATOR")) {

      if (message.member.voice.channel) {
        message.delete();
        
        let channel = message.guild.channels.cache.get(
          message.member.voice.channel.id
        );
        for (const [memberID, member] of channel.members) {
          member.voice.setMute(false);
        }
      } else {
        let embed = new Discord.MessageEmbed()
        .setDescription(`${nopeEmoji} You have to be in a voice channel to use this command`)
        .setColor("#FF3E3E")

        message.channel.send(embed);
      }
    }
  },
};
