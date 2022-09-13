const { color } = require("canvas-constructor");
const Discord = require("discord.js");
const { Timestamp } = require("mongodb");

module.exports = {
  commands: 'embed',
  permissions: 'ADMINISTRATOR',
  permissionMessage: false,

  callback: (message, args, client) => {
    let channel = message.mentions.channels.first();
    if (!channel) return message.reply(`your message was structured incorrectly.`);

    let colour = args[1];
    if (!colour) return message.reply(`your message was structured incorrectly.`);

    message.channel.send('**Provide a title for your embed:**\n*type "**none**" if you do not want an embed title*')

    message.channel.awaitMessages(m => m.author.id === message.author.id,
        {max: 1, time: 30000}).then(titleCollected => {

            let title = titleCollected.first().content;
            if (title.toLowerCase() === 'none') title = ''

            message.channel.send('**Title set. Now provide a description:**\n*type "**none**" if you do not want an embed description*')

            message.channel.awaitMessages(m => m.author.id === message.author.id,
                {max: 1, time: 30000}).then(descriptionCollected => {
        
                    let description = descriptionCollected.first().content;
                    if (description.toLowerCase() === 'none') description = ''

                    message.channel.send('**Description set. Now provide a footer:**\n*type "**none**" if you do not want an embed footer*')

                    message.channel.awaitMessages(m => m.author.id === message.author.id,
                        {max: 1, time: 30000}).then(footerCollected => {
                
                            let footer = footerCollected.first().content;
                            if (footer.toLowerCase() === 'none') footer = ''
        
                            channel.send(
                                new Discord.MessageEmbed()
                                .setTitle(title)
                                .setDescription(description)
                                .setColor(colour)
                                .setFooter(footer, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
                            )
                
                        }).catch(() => {
                
                                message.reply('embed setup cancelled.')
                        });
        
                }).catch(() => {
        
                        message.reply('embed setup cancelled.')
                });

        }).catch(() => {

                message.reply('embed setup cancelled.')
        });
  }
};