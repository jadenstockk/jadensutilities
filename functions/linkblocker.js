const Discord = require("discord.js");

module.exports = {
  name: "linkblocker",
  description: "server link filter",

  async execute(message, args, client) {

    if (message.author.bot) return;

    const isInvite = async (guild, code) => {
        return await new Promise((resolve) => {
          guild.fetchInvites().then((invites) => {
            for (const invite of invites) {
              if (code === invite[0]) {
                resolve(true)
                return
              }
            }
    
            resolve(false)
          })
        })
      }
        const { guild, member, content } = message
    
        const code = content.split('discord.gg/')[1]

        if (content.includes('discord.gg/')) {
          const isOurInvite = await isInvite(guild, code)
          if (!isOurInvite) {
            let warnEmoji = client.emojis.cache.get('780456437611495435');
            let vipRole = message.guild.roles.cache.find(role => role.name === 'VIP');
            let boosterRole = message.guild.roles.cache.find(role => role.name === 'Server Booster');
            let rolesChannel = message.guild.channels.cache.get('728166304082558997');
            let selfpromoChannel = message.guild.channels.cache.get('781066008026021898');

            if (message.member.roles.cache.some(role => role.name === 'VIP')) {
                if (message.channel === selfpromoChannel) {
                    return;

                } else {
                    
                    message.delete()

                    let warnMessage = new Discord.MessageEmbed()
                    .setDescription(`${warnEmoji} ${message.author} please use the ${selfpromoChannel} channel for posting server links`)
                    .setColor("#FF3E3E");
          
                    message.channel.send(warnMessage);

                }

            } else {
                message.delete();

                let warnMessage = new Discord.MessageEmbed()
                .setDescription(`${warnEmoji} ${message.author} you are required to be a ${vipRole} or ${boosterRole} to send server invites! Check the ${rolesChannel} channel for more information`)
                .setColor("#FF3E3E");
      
                message.channel.send(warnMessage);

            }
          }
        }
  },
};
