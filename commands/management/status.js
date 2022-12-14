module.exports = {
  commands: ['status', 'presence'],
  permissions: ['ADMINISTRATOR'],
  permissionMessage: false,
  
  callback: (message, args, client) => {
      const Discord = require("discord.js");

      if (!args[0]) return;

      let presenceType = args[0].toUpperCase();
      let presenceName = args.slice(1).join(' ');

      if (presenceType === 'reset') presenceType = 'WATCHING', presenceName = `Jaden's Empire`;

      message.delete();

      client.user.setPresence({
        activity: {
          name: presenceName,
          type: presenceType,
        },
    })

    let statusSetEmbed = new Discord.MessageEmbed()
    .setDescription(`Status set to **${presenceType} ${presenceName}**`)
    .setColor("33FF5B")

    message.channel.send(statusSetEmbed).then(message => message.delete({ timeout: 5000 }));
}
};