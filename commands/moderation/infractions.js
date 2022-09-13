const warns = require("../../models/warns")
const Discord = require("discord.js");

module.exports = {
  commands: 'infractions',

  callback: (message, args) => {
    var member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    if (!member) return;

    if (member.bot) return;

    var currentDateAndTime = new Date().toLocaleString();

    warns.find(
      { Guild: message.guild.id, User: member.id },
      async (err, data) => {
        let noInfractions = new Discord.MessageEmbed()
          .setAuthor(
            `${member.user.tag} has no infractions`,
            member.user.displayAvatarURL()
          )
          .setColor("FF3E3E");

        let amountOfWarns = [];
        data.map((d) => {
          return d.Warns.map((w, i) => `${amountOfWarns.push(i)}`);
        });

        let warnsList = []
        data.map((d) => {
          return d.Warns.map((w, i) => `${warnsList.push(`**${w.Reason}** ● ${w.Time}`)}`
          )
        })

        if (err) console.log(err);
        if (!data.length) return message.channel.send(noInfractions);

        let warnsEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${member.user.tag}'s Infractions`,
            member.user.displayAvatarURL()
          )
          .setThumbnail(
            "https://images.emojiterra.com/google/android-nougat/512px/26a0.png"
          )
          .setFooter(
            `Jaden's Empire Moderation`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("FF3E3E")
          .setTitle(`Total Infractions: ${amountOfWarns.length}`)
          .setDescription(`**Latest 10 Infractions:**\n${warnsList.slice(0, 10).join('\n')}`)

        message.channel.send(warnsEmbed);
      }
    );
  },
};
