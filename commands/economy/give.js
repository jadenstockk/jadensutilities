module.exports = {
  commands: ['give', 'transfer'],

  callback: (message, args, client) => {
    const Discord = require("discord.js");
    let nopeEmoji = client.emojis.cache.get('779455910337970176'); 

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`${nopeEmoji} That is not a valid user`).setColor("#FF3E3E"));
    if (user.user.bot) return message.channel.send(new Discord.MessageEmbed().setDescription(`${nopeEmoji} You aren't allowed to give bots money`).setColor("#FF3E3E"));
    if (user === message.member) return message.channel.send(new Discord.MessageEmbed().setDescription(`${nopeEmoji} Um... it's kinda pointless to give yourself money`).setColor("#FF3E3E"));

    let amount = args.slice(1);
    if (!amount || isNaN(amount) || amount < 1) return message.channel.send(new Discord.MessageEmbed().setDescription(`${nopeEmoji} Please enter an amount higher than 1`).setColor("#FF3E3E"));

    amount = parseInt(amount)

    let transferEmbed = new Discord.MessageEmbed()
      .setTitle("Bank Transfer")
      .addFields(
        { name: "To:", value: user, inline: true },
        { name: "Amount", value: amount + " Bentleys", inline: true },
        { name: "From:", value: message.author, inline: true }
      )
      .setFooter(`Jaden's Empire Economy`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
      .setColor("#059DFF")
      .setThumbnail("https://www.pngkey.com/png/full/817-8178976_save-more-make-more-money-arrow-cool-pictures.png")
      .setTimestamp()

      const money = require("../../models/economy");

      money.findOne(
        { Guild: message.guild.id, User: message.author.id },
        async (err, data) => {

          if (err) console.log(err);

          if (!data) {
              
            return message.channel.send(new Discord.MessageEmbed().setDescription(`${nopeEmoji} You don't have enough money to make this transaction`).setColor("#FF3E3E"));

          } else {

            if (data.Money < amount) return message.channel.send(new Discord.MessageEmbed().setDescription(`${nopeEmoji} You don't have enough money to make this transaction`).setColor("#FF3E3E"));

            message.channel.send(transferEmbed);

            data.Money = data.Money - amount;
            data.save();
          }
        }
      );

      money.findOne(
        { Guild: message.guild.id, User: user.id },
        async (err, data) => {

          if (err) console.log(err);

          if (!data) {
              
            let newMoney = new money({
              User: user.id,
              Guild: message.guild.id,
              Money: amount
            });
            newMoney.save();

          } else {

            data.Money = data.Money + amount;
            data.save();
          }
        }
      );
  },
};
