module.exports = {
  commands: ['wed', 'wedding'],

  callback: (message, args) => {
    const Discord = require("discord.js");
    
    if (!message.member.hasPermission('ADMINISTRATOR'));
    
    let target1 = message.guild.members.cache.get(args[0]);
    let target2 = message.guild.members.cache.get(args[1]);
    
    let day = args.slice(2).join(" ");
    if (!day) return message.reply(`**please provide a date, time and timezone.**`);

    function acceptWedding() {
      let weddingMessage = new Discord.MessageEmbed()
        .setColor("#059DFF")
        .setTitle(`💒💍 New Wedding! 💍💒`)
        .setDescription(
          `Come celebrate ${target1} and ${target2} on their special day!`
        )
        .addFields({ name: "Date and Time:", value: day })
        .setFooter(
          `Jaden's Empire Weddings`,
          "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
        )
        .setThumbnail(
          "https://pngimg.com/uploads/wedding/wedding_PNG19483.png"
        );

      message.channel.send(weddingMessage).then((message) => {
        message.react("✅");
      });
    }
    acceptWedding();
  },
};
