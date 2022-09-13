module.exports = {
    commands: 'lockdown',
    permissions: 'ADMINISTRATOR',
    permissionError: `You aren't allowed to lockdown the server`,
    permissionMessage: true,
  
    callback: (message, args) => {
        const Discord = require("discord.js");
        const config = require('../../config.json');

        message.delete();

        let confirmEmbed = new Discord.MessageEmbed()
        .setDescription('🔒 **Are you sure you want to lockdown the entire server?**')
        .setFooter('Respond with yes/no within 30 seconds')
        .setColor("FF3E3E")
      
        let lockingEmbed = new Discord.MessageEmbed()
        .setDescription("🔒 **Locking down the server**")
        .setFooter('This process can sometimes take a while due to the amount of channels')
        .setColor("FF3E3E")
      
        let lockedEmbed = new Discord.MessageEmbed()
        .setDescription('🔒 **Server locked**')
        .setFooter('Use !unlockdown to unlock the server')
        .setColor("FF3E3E")
      
        let cancelledEmbed = new Discord.MessageEmbed()
        .setDescription('🔒 **Lockdown cancelled**')
        .setFooter('Lockdown command cancelled')
        .setColor("FF3E3E")
      
        let authorID = message.author.id
        let guildLocking = message.guild

        function lockdownServer() {
          guildLocking.channels.cache.forEach(channel => {

            if (config.lockChannels.includes(channel.parentID)) {
              if (!config.execptChannels.includes(channel.id)) {
                if (channel.type === 'text') {
                  channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
        
                } else if (channel.type === 'voice') {
                  channel.updateOverwrite(message.channel.guild.roles.everyone, { SPEAK: false, CONNECT: false, STREAM: false });
                }
              }
            }
          })
        }
      
        message.channel.send(confirmEmbed).then(msg => {
          message.channel.awaitMessages(m => m.author.id === authorID,
            {max: 1, time: 30000}).then(collected => {

                    if (collected.first().content.toLowerCase() == 'yes') {
                            msg.edit(lockingEmbed)
                              lockdownServer();

                              msg.delete();
                              collected.first().delete();
                              message.channel.send(lockedEmbed)

                    } else {
                      msg.edit(cancelledEmbed);

                    }

            }).catch(() => {
              msg.edit(cancelledEmbed);

            })
        })
      },
    };
