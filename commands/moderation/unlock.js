module.exports = {
  commands: 'unlock',
  modRequired: true,
  permissionError: `You aren't allowed to unlock channels`,
  permissionMessage: true,

  callback: (message, args) => {
      const Discord = require("discord.js");
  
      if (
        message.member.hasPermission("MANAGE_CHANNELS")
      ) {
         message.delete();

         message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
    }
    },
  };