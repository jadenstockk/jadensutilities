module.exports = {
  commands: ['money', 'bal', 'balance'],

  callback: (message, args) => {
    const Discord = require("discord.js");

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    if (!user) return message.reply('please enter a valid user.');
    if (user.bot) return message.reply('please enter a valid user.');

    const money = require("../../models/economy");

    money.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {

        if (err) console.log(err);

        if (!data) {

          let balanceEmbed = new Discord.MessageEmbed()
          .setDescription(`${user} currently has **0 Bentleys**`)
          .setFooter(
            `Jaden's Empire Economy`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF")
          .setTimestamp();

          message.channel.send(balanceEmbed);

          let newMoney = new money({
            User: message.author.id,
            Guild: message.guild.id,
            Money: 0,
            Job: 'unemployed'

          });

          newMoney.save();

        } else {
          
          let userMoney = data.Money;

          let balanceEmbed = new Discord.MessageEmbed()
          .setDescription(`${user} currently has **${userMoney} Bentleys**`)
          .setFooter(
            `Jaden's Empire Economy`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF")
          .setTimestamp();

          message.channel.send(balanceEmbed);
        }
      }
    );
  },
};
