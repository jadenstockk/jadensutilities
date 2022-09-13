module.exports = {
  name: "welcome",
  description: "server welcome message",

  execute(member, client) {

    const Discord = require("discord.js");
    let welcomeChannel = member.guild.channels.cache.get('727911879581630535');
    let rulesChannel = member.guild.channels.cache.get('727911980333269013');
    let welcomeSquadChannel = member.guild.channels.cache.get('803868583615922196');
    let generalChannel = member.guild.channels.cache.get('727990054026346496');
    let welcomeSquadRole = member.guild.roles.cache.get('803869275558903829');
    let serverEmoji = member.guild.emojis.cache.find(
      (emoji) => emoji.name === "theUltimateJaden"
    );

    serverLog(member.user, "joined", member.user.createdAt, "");

    if (member.user.bot) return;

    welcomeChannel.send(
      new Discord.MessageEmbed()
      .setAuthor(`Welcome to Jaden's Empire!`, client.user.displayAvatarURL())
      .setDescription(`**We hope you enjoy spending time here ${member.user}!**\nPlease read the ${rulesChannel} before carrying on`)
      .setThumbnail(member.user.displayAvatarURL())
      .setColor('#059DFF')
    );

    welcomeSquadChannel.send(
      welcomeSquadRole,

      new Discord.MessageEmbed()
      .setAuthor(`New member joined the server!`, client.user.displayAvatarURL())
      .setDescription(`**Go welcome ${member.user} in ${generalChannel}!**\n\nDon't ping and annoy them too much though 😳`)
      .setThumbnail(member.user.displayAvatarURL())
      .setColor('#059DFF')
    );
  },
};