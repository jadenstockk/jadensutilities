module.exports = {
  commands: ['explore'],

  callback: (message, args) => {
    const Discord = require('discord.js');
    const mongoose = require('mongoose');

    let timeoutEmbed = new Discord.MessageEmbed()
    .setDescription(`${message.author} you have to wait **2 minutes** before using the **explore** command again`)
    .setColor("FF3E3E")

    if (timeouts.has(`explore.${message.author.id}`)) return message.channel.send(timeoutEmbed);

    let maximumamount = 40;
    let minimumamount = 15;
    let random = Math.floor((Math.random()*maximumamount) + minimumamount);
    
    let places = ["their parents room", "Antartica", "New York", "the iStore", "their maths teacher's house", "Africa", "London", "their long lost friend", "Jaden", "an old man living in a hut by the ocean", "MrBeast's house", "amazon.com"]
    let place = places[Math.floor(Math.random() * places.length)];

        let exploreEmbed= new Discord.MessageEmbed()
        .setDescription(`${message.author} visited **${place}** and recieved **${random} Bentleys** for their exploration`)
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
        message.channel.send(exploreEmbed)

        timeouts.add(`explore.${message.author.id}`);

        setTimeout(function () {
          timeouts.delete(`explore.${message.author.id}`);
        }, 120000);
      }
};
