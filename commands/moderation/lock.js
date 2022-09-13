module.exports = {
  commands: 'lock',
  modRequired: true,
  permissionError: `You aren't allowed to lock channels`,
  permissionMessage: true,

  callback: (message, args) => {
      const Discord = require("discord.js");
  
      if (
        message.member.hasPermission("MANAGE_CHANNELS")
      ) {
         message.delete();
         message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });

         let lockEmbed = new Discord.MessageEmbed()
         .setTitle(`🔒 Channel Locked 🔒`)
         .setFooter(`By ${message.member.nickname}`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
         .setTimestamp()
         .setColor("#059DFF")

         message.channel.send(lockEmbed)
    }
    },
  };