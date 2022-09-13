module.exports = {
  commands: ['help', 'commands'],

  callback: (message, args, client) => {
    const Discord = require("discord.js");

    let helpListType = args[0];

    let mainList = new Discord.MessageEmbed()
      .setColor("#059DFF")
      .setAuthor(`Commands List:`, client.user.displayAvatarURL())
      .addFields(
        { name: "!help", value: "get a list of available commands" },
        { name: "!help utilities", value: "get a list of all the general utility commands"},
        { name: "!help economy", value: "get a list of all the economy commands"},
        { name: "!help images", value: "get a list of all the image commands"}
      )
      .setFooter(`Jaden's Empire Commands`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")

      // { name: "!help family", value: "get a list of all the family commands"},

      let utilitiesList = new Discord.MessageEmbed()
      .setColor("#059DFF")
      .setAuthor(`Utility Commands:`, client.user.displayAvatarURL())
      .addFields(
        { name: "!infractions", value: "get a list of your infractions" },
        { name: "!namecolour (colour)", value: "change your name colour" },
        { name: "!urban", value: "get a definition of a word" },
        { name: "!covid (country/world)", value: "get Covid-19 stats of a country or the world" },
        { name: "!ping", value: "get the bot's response time in  milliseconds" },
        { name: "!userinfo (user)", value: "get information about a user" }
      )
      .setFooter(`Jaden's Empire Commands`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")

      let economyList = new Discord.MessageEmbed()
      .setColor("#059DFF")
      .setAuthor(`Economy Commands:`, client.user.displayAvatarURL())
      .addFields(
        { name: "!money (user)", value: "see how much money you or another user has" },
        { name: "!give (user) (amount)", value: "transfer money from your account to another user" },
        { name: "!job (user)", value: "see what a user's job is" },
        { name: "!hunt", value: "get a certain amount of money for hunting" },
        { name: "!beg", value: "if you're lucky, get a bit of money for begging" },
        { name: "!daily", value: "get a daily amount of money" },
        { name: "!explore", value: "get a certain amount of money for exploring" },
        { name: "!fish", value: "get a certain amount of money for fishing" },
        { name: "!work", value: "get a certain amount of money for working" },
        { name: "!crime", value: "get a certain amount of money for commiting a crime... or get caught" }
      )
      .setFooter(`Jaden's Empire Commands`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")

      let imagesList = new Discord.MessageEmbed()
      .setColor("#059DFF")
      .setAuthor(`Image Commands:`, client.user.displayAvatarURL())
      .addFields(
        { name: "!meme", value: "receive a random meme in return"},
        { name: "!cat", value: "receive a random cute cat pic!" },
        { name: "!dog", value: "receive a random cute dog pic!" },
        { name: "!frog", value: "receive a random frog pic!" }
      )
      .setFooter(`Jaden's Empire Commands`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")

      let familyList = new Discord.MessageEmbed()
      .setColor("#059DFF")
      .setTitle("Family List:")
      .addFields(
        { name: "!family (user)", value: "view a user's or your own family", },
        { name: "!propose (user)", value: "get down on one knee and ask the special question", },
        { name: "!adopt (user)", value: "add a child to your collection!" },
        { name: "!disown (user)", value: "remove a child from your collection!" },
        { name: "!divorce", value: "say bye bye to your loving partner" },
        { name: "!wedding (date) (time) (timezone)", value: "organize a wedding for you and your partner" },
      )
      .setFooter(`Jaden's Empire Commands`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")

      if (helpListType === 'utilities' || helpListType === 'utils') {
        message.channel.send(utilitiesList)

      } else if (helpListType === 'economy' || helpListType === 'econ') {
        message.channel.send(economyList)

      } else if (helpListType === 'images' || helpListType === 'img') {
        message.channel.send(imagesList)

//      } else if (helpListType === 'family' || helpListType === 'fam') {
//      message.channel.send(familyList)

      } else {
        message.channel.send(mainList);
      }
  },
};
