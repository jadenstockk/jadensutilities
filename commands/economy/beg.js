module.exports = {
    commands: ['beg'],
  
      callback: (message, args) => {
          const Discord = require('discord.js');
          const mongoose = require('mongoose');
  
          let timeoutEmbed = new Discord.MessageEmbed()
          .setDescription(`${message.author} you have to wait **30 seconds** before using the **beg** command again`)
          .setColor("FF3E3E")
  
          if (timeouts.has(`beg.${message.author.id}`)) return message.channel.send(timeoutEmbed);
  
              let maximumamount = 90;
              let minimumamount = 1;
              let random = Math.floor((Math.random()*maximumamount) + minimumamount);
  
              let robOrFail = Math.floor((Math.random()*100));
  
              let begPlaces = ["Starbucks", "a bank", "Discord Headquarters", "a local iStore", "Typo", "an old women crossing the road", "Donald Trump", "their mom", "Walmart", "Target", "Krispy Kreme", "Dunkin Donuts", "Cotton On", "Ebay's server room", "a local Samsung store"]
              let place = begPlaces[Math.floor(Math.random() * begPlaces.length)];
  
              let begEmbed= new Discord.MessageEmbed()
              .setDescription(`${message.author} begged **${place}** and recieved **${random} Bentleys**`)
              .setFooter(`Jaden's Empire Economy`,"https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
              .setColor("33FF5B")
              .setTimestamp()
  
              let begFailEmbed = new Discord.MessageEmbed()
              .setDescription(`${message.author} begged **${place}** but they said no ❤`)
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
              message.channel.send(begEmbed)
  
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
                    message.channel.send(begFailEmbed)
              }
  
            timeouts.add(`beg.${message.author.id}`);
  
            setTimeout(function () {
              timeouts.delete(`beg.${message.author.id}`);
            }, 30000);
  
            }
  }