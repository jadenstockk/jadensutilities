module.exports = {
  commands: ['daily'],

  callback: (message, args) => {
      const Discord = require('discord.js');
      const mongoose = require('mongoose');

      let timeoutEmbed = new Discord.MessageEmbed()
      .setDescription(`${message.author} you have to wait **1 day** before using the **daily** command again`)
      .setColor("FF3E3E")

      if (timeouts.has(`daily.${message.author.id}`)) return message.channel.send(timeoutEmbed);

          let dailyAmount = 200;

          let dailyEmbed= new Discord.MessageEmbed()
          .setDescription(`${message.author} recieved their daily amount of **${dailyAmount} Bentleys**`)
          .setFooter(`Jaden's Empire Economy`,"https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
          .setColor("33FF5B")
          .setTimestamp()
          
          const money = require("../../models/economy");

          money.findOne(
            { Guild: message.guild.id, User: message.author.id },
            async (err, data) => {

              if (err) console.log(err);

              if (!data) {
                  
                let newMoney = new money({
                  User: message.author.id,
                  Guild: message.guild.id,
                  Money: dailyAmount
                });

                newMoney.save();

              } else {

                data.Money = data.Money + dailyAmount;

                data.save();
              }
            }
          );
          message.channel.send(dailyEmbed)

          timeouts.add(`daily.${message.author.id}`);

          setTimeout(function () {
            timeouts.delete(`daily.${message.author.id}`);
          }, 1440 * 1440);
        }
}
