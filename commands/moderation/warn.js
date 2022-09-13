const { Timestamp } = require("mongoose");
const mongoose = require("mongoose");
const { db } = require("../../models/warns");

module.exports = {
  commands: 'warn',
  modRequired: true,
  permissionError: `You aren't allowed to warn people`,
  permissionMessage: true,

  callback: (message, args, client) => {
    const Discord = require("discord.js");
    let warnEmoji = client.emojis.cache.get('780456437611495435');

    let warnTarget = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!warnTarget) return;

    if (warnTarget.user.bot) return;

      if (!warnTarget.hasPermission("ADMINISTRATOR")) {
        let warnReason = args.slice(1).join(" ");
        if (!warnReason) warnReason = "Unspecified";

        var currentDateAndTime1 = new Date().toLocaleString('en-ZA');
        var currentDateAndTime = currentDateAndTime1
          .slice(0, -3)
          .split("/2020,")
          .join(", ");

        let warnMod = message.author.tag;

        function warnUser(warnReason, warnTarget, warnMod, mutedStatus) {
          serverLog(warnTarget.user, "WARN", message.author, warnReason);

          let warnMessage1 = new Discord.MessageEmbed()
          .setDescription(`${warnEmoji} ${warnTarget} you have been warned for reason: **${warnReason}**! You next infraction will result in a mute`)
          .setColor("#FF3E3E");
  
          let warnMessage2 = new Discord.MessageEmbed()
          .setDescription(`${warnEmoji} ${warnTarget} you have been warned for reason: **${warnReason}**! You have been muted due to continuous infractions`)
          .setColor("#FF3E3E");

          let warnMessage3 = new Discord.MessageEmbed()
          .setDescription(`${warnEmoji} ${warnTarget} you have been warned for reason: **${warnReason}**! You are currently muted`)
          .setColor("#FF3E3E");

          let warnMessage = new Discord.MessageEmbed()
            .setColor("FF3E3E")
            .setDescription(`**You have been warned on Jaden's Empire**\n\n**Reason:** ${warnReason}\n**Warns until mute:** 1`)
            .setFooter(
              `Jaden's Empire Moderation`,
              "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
            )

            let warnMessageMutedCurrently = new Discord.MessageEmbed()
            .setColor("FF3E3E")
            .setDescription(`**You have been warned on Jaden's Empire**\n\n**Reason:** ${warnReason}\n**Warns until mute:** You are currently muted`)
            .setFooter(
              `Jaden's Empire Moderation`,
              "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
            )

            let warnMessageMuted = new Discord.MessageEmbed()
            .setColor("FF3E3E")
            .setDescription(`**You have been muted for continuous infractions on Jaden's Empire**\n\n**Reason:** ${warnReason}\n**Mute Duration:** 2 minutes`)
            .setFooter(
              `Jaden's Empire Moderation`,
              "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
            )

              if (mutedStatus === 2) warnTarget.send(warnMessageMuted), message.channel.send(warnMessage2);
              if (mutedStatus === 1) warnTarget.send(warnMessage), message.channel.send(warnMessage1);
              if (mutedStatus === 3) warnTarget.send(warnMessageMutedCurrently), message.channel.send(warnMessage3);

          message.delete();

          const warns = require("../../models/warns");

          warns.findOne(
            { Guild: message.guild.id, User: warnTarget.id },
            async (err, data) => {
              if (err) console.log(err);
              if (!data) {
                let newWarns = new warns({
                  User: warnTarget.id,
                  Guild: message.guild.id,
                  Warns: [
                    {
                      Reason: warnReason,
                      Time: currentDateAndTime,
                    },
                  ],
                });
                newWarns.save();
              } else {
                data.Warns.unshift({
                  Reason: warnReason,
                  Time: currentDateAndTime,
                });
                data.save();
              }
            }
          );
        }
        if (warnTarget.roles.cache.some((role) => role.name === "Muted")) {
          let mutedStatus = 3;

          warnUser(warnReason, warnTarget, warnMod, mutedStatus);
          
        } else if (warnsNumber.has(`${warnTarget.id}_1`)) {
          let mutedStatus = 2;

          warnUser(warnReason, warnTarget, warnMod, mutedStatus);

          let mutetime = 120000;

          serverLog(
            warnTarget.user,
            "MUTED",
            client.user,
            "Too many infractions",
            "2 Minutes"
          );

          warnTarget.roles.add(
            message.guild.roles.cache.find((r) => r.name === "Muted")
          );

          warnsNumber.delete(`${warnTarget.id}_1`);

          setTimeout(function () {
            if (warnTarget.roles.cache.some((role) => role.name === "Muted")) {
              warnTarget.roles.remove(
                message.guild.roles.cache.find((r) => r.name === "Muted")
              );
              serverLog(warnTarget.user, "UNMUTED", client.user, "", "");
            }
          }, mutetime);
        } else {
          let mutedStatus = 1;

          warnUser(warnReason, warnTarget, warnMod, mutedStatus);

          warnsNumber.add(`${warnTarget.id}_1`);

          setTimeout(function () {
            warnsNumber.delete(`${warnTarget.id}_1`);
          }, 15 * 60000);
        }
      }
  },
};
