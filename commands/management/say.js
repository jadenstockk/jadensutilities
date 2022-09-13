module.exports = {
  commands: ['say'],
  permissions: ['ADMINISTRATOR'],
  permissionError: `You aren't allowed to make me say stuff.`,

  callback: (message, args) => {
    const Discord = require("discord.js");
    const { blacklisted } = require("../../blacklist.json");

    let sayPhrase = args.slice(0).join(" ");
    let foundInText = false;

    for (var i in blacklisted) {
      if (sayPhrase.toLowerCase().includes(blacklisted[i].toLowerCase()))
        foundInText = true;
    }

    if (!foundInText) {
      message.channel.send(sayPhrase);
      message.delete();
    } else {
      message.delete();
    }
  },
};
