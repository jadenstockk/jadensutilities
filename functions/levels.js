const Discord = require("discord.js");

module.exports = {
  name: "levels",
  description: "level role rewards",

  execute(message, args, client) {
    if (message.author.id === "159985870458322944") {
        if (message.content.includes(`Well done`)) {
          const args = message.content.split(/ +/);

          let user = message.mentions.members.first();
          let level = args[9].split("!**").join("");

          const communityLEVEL = `1`;
          const fvipLEVEL = `5`;
          const vipLEVEL = `10`;
          const extravipLEVEL = `20`;
          const mvipLEVEL = `25`;
          const extramvipLEVEL = `35`;
          const heirtoroyaltyLEVEL = `50`;
          const royaltyLEVEL = `65`;
          const highroyaltyLEVEL = `75`;
          const rulerLEVEL = `85`;
          const aboverulerLEVEL = `95`;
          const kingLEVEL = `100`;

          function sendNewRoleEmbed(newRole) {
            let newRoleEmbed = new Discord.MessageEmbed()
              .setTitle(`You are now a ${newRole}!`)
              .setColor("#059DFF")
              .setFooter(
                `Jaden's Empire Roles`,
                "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
              )
              .setDescription(
                `Congratulations ${user}! \n You reached **level ${level}** and earned the **${newRole}** role on Jaden's Empire!`
              )
              .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png");

            user.send(newRoleEmbed);
          }

          if (level === communityLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find(
                (role) => role.name === "Community"
              )
            );
            let newRole = "Community";
            sendNewRoleEmbed(newRole);
          } else if (level === fvipLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find(
                (role) => role.name === "Fairly Important Person"
              )
            );
            let newRole = "Fairly Important Person";
            sendNewRoleEmbed(newRole);
          } else if (level === vipLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find((role) => role.name === "VIP")
            );
            let newRole = "VIP";
            sendNewRoleEmbed(newRole);
          } else if (level === extravipLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find(
                (role) => role.name === "Extra VIP"
              )
            );
            let newRole = "Extra VIP";
            sendNewRoleEmbed(newRole);
          } else if (level === mvipLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find((role) => role.name === "MVIP")
            );
            let newRole = "MVIP";
            sendNewRoleEmbed(newRole);
          } else if (level === extramvipLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find(
                (role) => role.name === "Extra MVIP"
              )
            );
            let newRole = "Extra MVIP";
            sendNewRoleEmbed(newRole);
          } else if (level === heirtoroyaltyLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find(
                (role) => role.name === "Heir to Royalty"
              )
            );
            let newRole = "Heir to Royalty";
            sendNewRoleEmbed(newRole);
          } else if (level === royaltyLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find(
                (role) => role.name === "Royalty"
              )
            );
            let newRole = "Royalty";
            sendNewRoleEmbed(newRole);
          } else if (level === highroyaltyLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find(
                (role) => role.name === "High Royalty"
              )
            );
            let newRole = "High Royalty";
            sendNewRoleEmbed(newRole);
          } else if (level === rulerLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find((role) => role.name === "Ruler")
            );
            let newRole = "Ruler";
            sendNewRoleEmbed(newRole);
          } else if (level === aboverulerLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find(
                (role) => role.name === "Above Ruler"
              )
            );
            let newRole = "Above Ruler";
            sendNewRoleEmbed(newRole);
          } else if (level === kingLEVEL) {
            user.roles.add(
              message.guild.roles.cache.find((role) => role.name === "King")
            );
            let newRole = "King";
            sendNewRoleEmbed(newRole);
          }
      }
    }
  },
};
