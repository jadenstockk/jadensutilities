module.exports = {
  commands: ['work'],

  callback: (message, args) => {
    const Discord = require("discord.js");
    
    let timeoutEmbed = new Discord.MessageEmbed()
    .setDescription(`${message.author} you have to wait **15 minutes** before using the **work** command again`)
    .setColor("FF3E3E")
    
    if (timeouts.has(`work.${message.author.id}`)) return message.channel.send(timeoutEmbed);

    function unemployed() {
      let noJobEmbed = new Discord.MessageEmbed()
      .setDescription(`${message.author} you are currently **unemployed**\n*Type "!job list" for a list of available jobs*`)
      .setFooter(
        `Jaden's Empire Economy`,
        "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
      )
      .setColor("#059DFF")
      .setTimestamp();

      message.channel.send(noJobEmbed);
    }

    const job = require("../../models/economy");

    job.findOne(
      { Guild: message.guild.id, User: message.author.id },
      async (err, data) => {

        if (err) console.log(err);

        if (!data) {

          unemployed();

        } else {

          if (!data.Job) return unemployed();
          let userJob = data.Job;

            let maximumamount = 150;
            let minimumamount = 50;
            let random = Math.floor((Math.random()*maximumamount) + minimumamount);

          let jobEmbed = new Discord.MessageEmbed()
          .setDescription(`${message.author} recieved their salary of **${random} Bentleys** for working as a **${userJob}**`)
          .setFooter(
            `Jaden's Empire Economy`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("33FF5B")
          .setTimestamp();

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

          message.channel.send(jobEmbed);

          timeouts.add(`work.${message.author.id}`);

          setTimeout(function () {
            timeouts.delete(`work.${message.author.id}`);
          }, 900000);
        }
      }
    );
  },
};
