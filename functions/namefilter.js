const Discord = require("discord.js");
const { blacklisted } = require("../blacklist.json");
const { blacklisted2 } = require("../blacklist.json");

module.exports = {
  name: "namefilter",
  description: "server nickname profanity filter",

  execute(user, nickname, client, user1) {
    if (user1.nickname === user.nickname) return;
    if (user1.nickname === user.user.username) return;
    if (user1.user.username === user.nickname) return;
    if (user1.user.username === user.user.username) return;

    let foundInText = false;
    let nicknameLog = nickname;
    let filtered = 'none';
    let loggingChannel = user.guild.channels.cache.get('734394541351764080');
    
    function log(filtered) {
    user.setNickname(nicknameLog.toLowerCase().replace(filtered, '****'))

    let logEmbed = new Discord.MessageEmbed()
      .setTitle("Filtered Nickname")
      .setDescription(`${user} updated their nickname and it was filtered`)
      .addFields({ name: `Nickname:`, value: `${nicknameLog}`, inline: true }, { name: `Filtered:`, value: `__${filtered}__`, inline: true })
      .setFooter(
        `Jaden's Empire Moderation`,
        "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
      )
      .setColor("#FF3E3E")
      .setTimestamp();

      loggingChannel.send(logEmbed);
      user.send(warnMessage);
    }

    let warnMessage = new Discord.MessageEmbed()
    .setColor("FF3E3E")
    .setTitle("Nickname filtered on Jaden's Empire")
    .setDescription(`Hey ${user}! We just wanted to notify you that your nickname on Jaden's Empire has been filtered due to the server's profanity filter`)
    .setFooter(
      `Jaden's Empire Moderation`,
      "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
    )
    .setThumbnail(
      "https://images.emojiterra.com/google/android-nougat/512px/26a0.png");

      for (var i in blacklisted) {
        if (nicknameLog.toLowerCase().includes(blacklisted[i].toLowerCase()) && !foundInText) foundInText = true, log(blacklisted[i]);
      }
      for (var i in blacklisted2) {
        if (nicknameLog.toLowerCase() === blacklisted2[i].toLowerCase() || nicknameLog.toLowerCase().endsWith(` ${blacklisted2[i].toLowerCase()}`) || nicknameLog.toLowerCase().startsWith(`${blacklisted2[i].toLowerCase()} `) || nicknameLog.toLowerCase().includes(` ${blacklisted2[i].toLowerCase()} `) || nicknameLog.toLowerCase().includes(`||${blacklisted2[i].toLowerCase()}||`) && !foundInText) foundInText = true, log(blacklisted2[i]);
      }
  },
};
