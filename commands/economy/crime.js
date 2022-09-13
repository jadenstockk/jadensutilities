module.exports = {
  commands: ['crime'],

    callback: (message, args) => {
        const Discord = require('discord.js');
        const mongoose = require('mongoose');

        let timeoutEmbed = new Discord.MessageEmbed()
        .setDescription(`${message.author} you have to wait **5 minutes** before using the **crime** command again`)
        .setColor("FF3E3E")

        if (timeouts.has(`crime.${message.author.id}`)) return message.channel.send(timeoutEmbed);

            let maximumamount = 100;
            let minimumamount = 10;
            let random = Math.floor((Math.random()*maximumamount) + minimumamount);

            let robOrFail = Math.floor((Math.random()*100));

            let crimePlaces = ["Starbucks", "a bank", "Discord Headquarters", "a local iStore", "Typo", "an old women crossing the road", "Donald Trump", "their mom", "Walmart", "Target", "Krispy Kreme", "Dunkin Donuts", "Cotton On", "Ebay's server room", "a local Samsung store"]
            let place = crimePlaces[Math.floor(Math.random() * crimePlaces.length)];

            let crimeEmbed= new Discord.MessageEmbed()
            .setDescription(`${message.author} succesfully robbed **${place}** and recieved **${random} Bentleys** for their dishonest work`)
            .setFooter(`Jaden's Empire Economy`,"https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
            .setColor("33FF5B")
            .setTimestamp()

            let crimeFailEmbed= new Discord.MessageEmbed()
            .setDescription(`${message.author} tried to rob **${place}** but got caught and had to pay **${random} Bentleys** to the police`)
            .setFooter(`Jaden's Empire Economy`,"https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
            .setColor("FF3E3E")
            .setTimestamp()
            
            const money = require("../../models/economy");

            if (robOrFail < 91) {

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
            message.channel.send(crimeEmbed)

            } else {
                money.findOne(
                    { Guild: message.guild.id, User: message.author.id },
                    async (err, data) => {
      
                      if (err) console.log(err);
      
                      if (!data) {
                          
                        let newMoney = new money({
                          User: message.author.id,
                          Guild: message.guild.id,
                          Money: 0
                        });
      
                        newMoney.save();
      
                      } else {
                          if (data.Money < 1){
                            data.Money = 0

                          } else {
                            data.Money = data.Money - random;

                          }
                        data.save();
                      }
                    }
                  );
                  message.channel.send(crimeFailEmbed)
            }

          timeouts.add(`crime.${message.author.id}`);

          setTimeout(function () {
            timeouts.delete(`crime.${message.author.id}`);
          }, 300000);

          }
}