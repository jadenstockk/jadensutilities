module.exports = {
  commands: ['colour', 'color', 'namecolour', 'namecolor'],

  callback: (message, args) => {
    const Discord = require("discord.js");

    const serverBoosterRole = message.guild.roles.cache.find(
      (r) => r.name === "Server Booster"
    );
    const inviterRole = message.guild.roles.cache.find(
      (r) => r.name === "Inviter"
    );
    const extravipRole = message.guild.roles.cache.find((r) => r.name === "Extra VIP");

    let changeMember = message.member;
    let changeColour = args.slice(0).join(" ").toLowerCase();

    let green = message.guild.roles.cache.find(
      (role) => role.name === "Green"
    );
    let orange = message.guild.roles.cache.find(
      (role) => role.name === "Orange"
    );
    let blue = message.guild.roles.cache.find(
      (role) => role.name === "Blue"
    );
    let red = message.guild.roles.cache.find((role) => role.name === "Red");
    let white = message.guild.roles.cache.find(
      (role) => role.name === "White"
    );
    let black = message.guild.roles.cache.find(
      (role) => role.name === "Black"
    );
    let aqua = message.guild.roles.cache.find(
      (role) => role.name === "Aqua"
    );
    let pink = message.guild.roles.cache.find(
      (role) => role.name === "Pink"
    );

    changeColourMessage = new Discord.MessageEmbed()
      .setColor("#059DFF")
      .setFooter('Type "!namecolour reset" to reset your colour')
      .setAuthor(
        `Set ${message.author.tag}'s colour to ${changeColour}`,
        message.author.displayAvatarURL()
      );

    function removeColours() {
      if (message.member.roles.cache.some((role) => role.name === "Green")) {
        changeMember.roles.remove(green);
      } else if (
        message.member.roles.cache.some((role) => role.name === "Orange")
      ) {
        changeMember.roles.remove(orange);
      } else if (
        message.member.roles.cache.some((role) => role.name === "Blue")
      ) {
        changeMember.roles.remove(blue);
      } else if (
        message.member.roles.cache.some((role) => role.name === "Red")
      ) {
        changeMember.roles.remove(red);
      } else if (
        message.member.roles.cache.some((role) => role.name === "White")
      ) {
        changeMember.roles.remove(white);
      } else if (
        message.member.roles.cache.some((role) => role.name === "Black")
      ) {
        changeMember.roles.remove(black);
      } else if (
        message.member.roles.cache.some((role) => role.name === "Aqua")
      ) {
        changeMember.roles.remove(aqua);
      } else if (
        message.member.roles.cache.some((role) => role.name === "Pink")
      ) {
        changeMember.roles.remove(pink);
      }
    }

    if (
      message.member.roles.cache.some(
        (role) => role.name === "Server Booster"
      ) ||
      message.member.roles.cache.some((role) => role.name === "Inviter") ||
      message.member.roles.cache.some((role) => role.name === "Extra VIP")
    ) {
      if (changeColour === "green") {
        removeColours();
        changeMember.roles.add(green);
        message.channel.send(changeColourMessage);
      } else if (changeColour === "orange") {
        removeColours();
        changeMember.roles.add(orange);
        message.channel.send(changeColourMessage);
      } else if (changeColour === "blue") {
        removeColours();

        changeMember.roles.add(blue);
        message.channel.send(changeColourMessage);
      } else if (changeColour === "red") {
        removeColours();
        changeMember.roles.add(red);
        message.channel.send(changeColourMessage);
      } else if (changeColour === "white") {
        removeColours();
        changeMember.roles.add(white);
        message.channel.send(changeColourMessage);
      } else if (changeColour === "black") {
        removeColours();
        changeMember.roles.add(black);
        message.channel.send(changeColourMessage);
      } else if (changeColour === "aqua") {
        removeColours();
        changeMember.roles.add(aqua);
        message.channel.send(changeColourMessage);
      } else if (changeColour === "pink") {
        removeColours();
        changeMember.roles.add(pink);
        message.channel.send(changeColourMessage);
      } else if (changeColour === "reset") {
        removeColours();
        let resetColour = new Discord.MessageEmbed()
          .setColor("#059DFF")
          .setFooter(
            'Type "!namecolour" and then your desired colour (eg. !colour green)'
          )
          .setAuthor(
            `Reset ${message.author.tag}'s colour`,
            message.author.displayAvatarURL()
          );

        message.channel.send(resetColour);
      } else {
        let invalidColour = new Discord.MessageEmbed()
          .addFields({
            name: "Available colours:",
            value:
              "🟢 Green, 🟠 Orange, 🔵 Blue, 🔴 Red, ⚪ White, ⚫ Black, 🔵 Aqua, 🟣 Pink",
          })
          .setColor("#059DFF")
          .setFooter(
            'Type "!namecolour" and then your desired colour (eg. !namecolour green)'
          );

        message.channel.send(invalidColour);
      }
    } else {
      let changeColourWrongRoles = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} you are unable to use this command`,
          message.author.displayAvatarURL()
        )
        .setDescription(
          `You have to be a ${extravipRole}, ${serverBoosterRole} or ${inviterRole} in order to change your name colour`
        )
        .setFooter(`Type "!roles" for more information`)
        .setColor("#059DFF");
      message.channel.send(changeColourWrongRoles);
    }
  },
};
