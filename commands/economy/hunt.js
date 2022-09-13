module.exports = {
  commands: ['hunt'],

  callback: (message, args) => {
    const Discord = require('discord.js');
    const mongoose = require('mongoose');

    let timeoutEmbed = new Discord.MessageEmbed()
    .setDescription(`${message.author} you have to wait **2 minutes** before using the **hunt** command again`)
    .setColor("FF3E3E")

    if (timeouts.has(`hunt.${message.author.id}`)) return message.channel.send(timeoutEmbed);

    let maximumamount = 35;
    let minimumamount = 10;
    let random = Math.floor((Math.random()*maximumamount) + minimumamount);

    let animals = ["a skunk", "an ant eater", "a snake", "a duck", "a vegan snack", "a coconut", "a deer", "a unicorn", "a narwal", "a grape"]
    let animal = animals[Math.floor(Math.random() * animals.length)];

        let huntEmbed= new Discord.MessageEmbed()
        .setDescription(`${message.author} went out into the wild and came home with **${animal}** worth **${random} Bentleys**`)
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
        message.channel.send(huntEmbed)

        timeouts.add(`hunt.${message.author.id}`);

        setTimeout(function () {
          timeouts.delete(`hunt.${message.author.id}`);
        }, 120000);
      }
};
