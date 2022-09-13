module.exports = {
  commands: 'clear',
  permissions: 'MANAGE_MESSAGES',
  modRequired: true,
  permissionError: `You aren't allowed to clear messages`,
  permissionMessage: true,

  callback: (message, args) => {
    const Discord = require("discord.js");
      let clearAmount = args[0];

      message.delete();

      if (!clearAmount) return;
      if (isNaN(clearAmount)) return;
      if (clearAmount < 0) return;
      if (clearAmount > 999) return;

      message.channel
        .bulkDelete(clearAmount)
    }
};
