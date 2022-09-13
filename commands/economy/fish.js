module.exports = {
  commands: ['fish'],

  callback: (message, args) => {
    const Discord = require('discord.js');
    const mongoose = require('mongoose');

    let timeoutEmbed = new Discord.MessageEmbed()
    .setDescription(`${message.author} you have to wait **2 minutes** before using the **fish** command again`)
    .setColor("FF3E3E")

    if (timeouts.has(`fish.${message.author.id}`)) return message.channel.send(timeoutEmbed);

    let maximumamount = 35;
    let minimumamount = 10;
    let random = Math.floor((Math.random()*maximumamount) + minimumamount);

        let fishEmbed= new Discord.MessageEmbed()
        .setDescription(`${message.author} felt a bite at the end of their rod and recieved **${random} Bentleys** for the fish they caught`)
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
                Money: random
              });

              newMoney.save();

            } else {

              data.Money = data.Money + random;

              data.save();
            }
          }
        );
        message.channel.send(fishEmbed)

        timeouts.add(`fish.${message.author.id}`);

        setTimeout(function () {
          timeouts.delete(`fish.${message.author.id}`);
        }, 120000);
      }
};

