const Discord = require("discord.js");
const { blacklisted } = require("../blacklist.json");
const { blacklisted2 } = require("../blacklist.json");
const { blacklisted3 } = require("../blacklist.json");

module.exports = {
  name: "profanityfilter",
  description: "server profanity filter",

  execute(message, args, client) {
    let swearEmoji = client.emojis.cache.get('780429179665514506');

    if (message.author.bot) return;
    if (message.channel.id === '777634073442648075') return;

    let foundInText = false;
    let messageLowerCase = message.content.toLowerCase();
    let messageLength = message.content.length;
    let messageNoSpaces = messageLowerCase.replace(/\s+/g, '');
    let messageRecord = message.content;
    let messageWriter = message.author;
    let messageMember = message.member;
    let messageChannel = message.channel;
    let filtered = 'Unknown';

    function removeDuplicateCharacters(string) {
      return string
        .split('')
        .filter(function(item, pos, self) {
          return self.indexOf(item) == pos;
        })
        .join('');
    }

    let messageNoSpecialCharacters = messageLowerCase;
    let messageReplaceAt = messageLowerCase.replace(/[0-9]/g, '');
    let messageReplaceDollar = messageLowerCase.replace(/[0-9]/g, '');
    let messageReplaceExclamation = messageLowerCase.replace(/[0-9]/g, '');
    let messageReplaceLine = messageLowerCase.replace(/[0-9]/g, '');
    let messageReplaceZero = messageLowerCase;
    let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];



    for (var i = 0; i < messageLength; i++) messageNoSpecialCharacters = messageNoSpecialCharacters.replace('.', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace(',', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('_', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('+', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('<', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('>', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('=', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace("'", ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace(';', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace(':', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('/', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace(/[0-9]/g, ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace(')', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('(', ''),messageNoSpecialCharacters = messageNoSpecialCharacters.replace('#', ''),messageNoSpecialCharacters = messageNoSpecialCharacters.replace('*', ''),messageNoSpecialCharacters = messageNoSpecialCharacters.replace('%', ''),messageNoSpecialCharacters = messageNoSpecialCharacters.replace('^', ''),messageNoSpecialCharacters = messageNoSpecialCharacters.replace('&', ''),messageNoSpecialCharacters = messageNoSpecialCharacters.replace('.', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace(',', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('@', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('$', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('-', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('!', ''), messageNoSpecialCharacters = messageNoSpecialCharacters.replace('?', '');
    for (var i in alphabet) messageNoSpecialCharacters.replace(`:regional_indicator_${alphabet[i]}:`, alphabet[i]);
    for (var i = 0; i < messageLength; i++) messageReplaceZero = messageReplaceZero.replace('0', 'o'), messageReplaceLine = messageReplaceLine.replace('|', 'i'), messageReplaceExclamation = messageReplaceExclamation.replace('!', 'i'), messageReplaceDollar = messageReplaceDollar.replace('$', 's'), messageReplaceAt = messageReplaceAt.replace('@', 'a')



    let combinedNoSpacesToLowerCase = removeDuplicateCharacters(messageNoSpaces) + removeDuplicateCharacters((messageNoSpecialCharacters.replace(/[0-9]/g, '')).replace(/\s+/g, '')) + messageNoSpecialCharacters.replace(/[0-9]/g, '') + messageNoSpaces + messageNoSpecialCharacters.replace(/\s+/g, '') + removeDuplicateCharacters(messageNoSpecialCharacters) + removeDuplicateCharacters(messageReplaceAt) + removeDuplicateCharacters(messageReplaceZero) + removeDuplicateCharacters(messageReplaceExclamation) + removeDuplicateCharacters(messageReplaceDollar) + removeDuplicateCharacters(messageReplaceLine)
    let combinedSimple = (`${messageNoSpecialCharacters} ${messageReplaceAt} ${messageReplaceZero} ${messageReplaceExclamation} ${messageReplaceDollar} ${messageReplaceLine}`)
    

    for (var i in blacklisted) {
      if (messageLowerCase.includes(blacklisted[i].toLowerCase()) && !foundInText) filtered = blacklisted[i], blacklistNumber = '1', foundInText = true;
    }
    for (var i in blacklisted2) {
      if (messageLowerCase === blacklisted2[i].toLowerCase() ||
      messageLowerCase.endsWith(` ${blacklisted2[i].toLowerCase()}`) ||
      messageLowerCase.startsWith(`${blacklisted2[i].toLowerCase()} `) ||
      messageLowerCase.includes(` ${blacklisted2[i].toLowerCase()} `) ||
      messageLowerCase.includes(`||${blacklisted2[i].toLowerCase()}||`) ||
      combinedSimple === blacklisted2[i].toLowerCase() ||
      combinedSimple.endsWith(` ${blacklisted2[i].toLowerCase()}`) ||
      combinedSimple.startsWith(`${blacklisted2[i].toLowerCase()} `) ||
      combinedSimple.includes(` ${blacklisted2[i].toLowerCase()} `) ||
      combinedSimple.includes(`||${blacklisted2[i].toLowerCase()}||`) && !foundInText) filtered = blacklisted2[i], blacklistNumber = '2', foundInText = true;
    }
    for (var i in blacklisted3) {
      if (combinedSimple.includes(blacklisted3[i].toLowerCase()) ||
      combinedNoSpacesToLowerCase.includes(blacklisted3[i].toLowerCase()) && !foundInText) filtered = blacklisted3[i], blacklistNumber = '3', foundInText = true;
    }

    let loggingChannel = message.guild.channels.cache.get('734394541351764080');
    
    function log(filtered) {
    let logEmbed = new Discord.MessageEmbed()
      .setTitle("Deleted Message")
      .setDescription(`From ${message.author} in ${message.channel}`)
      .addFields({ name: `Message:`, value: `${messageRecord}`, inline: true }, { name: `Filtered:`, value: `__${filtered}__`, inline: true })
      .setFooter(
        `Jaden's Empire Moderation`,
        "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
      )
      .setColor("#FF3E3E")
      .setTimestamp();
      loggingChannel.send(logEmbed);
    }

      let warnTarget = messageWriter;
      let warnMod = client.user;
      let warnModNAME = "Jaden's Utilities";
      let warnReason = "Bad word usage";

      let swearWarning = new Discord.MessageEmbed()
        .setDescription(`${swearEmoji} ${messageWriter} you're an admin! You should know swearing isn't allowed lol`)
        .setColor("#FF3E3E");

        let swearWarning1 = new Discord.MessageEmbed()
        .setDescription(`${swearEmoji} ${messageWriter} swearing is not allowed! Continuing will result in a mute`)
        .setColor("#FF3E3E");

        let swearWarning2 = new Discord.MessageEmbed()
        .setDescription(`${swearEmoji} ${messageWriter} swearing is not allowed! You have been temporarily muted for continuous infractions`)
        .setColor("#FF3E3E");

        let swearWarning3 = new Discord.MessageEmbed()
        .setDescription(`${swearEmoji} ${messageWriter} because you're in the dank memer channel I'll let it slide. But remember swearing is againist the rules!`)
        .setColor("#FF3E3E");

        let swearWarning4 = new Discord.MessageEmbed()
        .setDescription(`${swearEmoji} ${messageWriter} swearing is not allowed! You are currently muted`)
        .setColor("#FF3E3E");

        if (foundInText) {
          message.delete();
    
          let dankMemer = message.guild.channels.cache.get('782697308520316959');
          if (!dankMemer) {
            console.log('Error when finding dank memer channel')
    
          } else if (message.channel === dankMemer) {
            message.channel.send(swearWarning3)
            return;
    
          }

      if (!messageMember.hasPermission("ADMINISTRATOR")) {

      } else {
        messageChannel
          .send(swearWarning)
          .then((m) => m.delete({ timeout: 5000 }));
      }

      var currentDateAndTime1 = new Date().toLocaleString('en-ZA');
      var currentDateAndTime = currentDateAndTime1
        .slice(0, -3)
        .split("/2020,")
        .join(", ");

      function warnUser(warnReason, warnTarget, warnMod, mutedStatus) {
        serverLog(messageWriter, "WARN", warnMod, warnReason);

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

          if (mutedStatus === 2) message.channel.send(swearWarning2);
          if (mutedStatus === 1) message.channel.send(swearWarning1);
          if (mutedStatus === 3) message.channel.send(swearWarning3);

        const warns = require("../models/warns");

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

      if (!messageMember.hasPermission("ADMINISTRATOR")) {
        if (messageMember.roles.cache.some((role) => role.name === "Muted")) {
          let mutedStatus = 3;

          warnUser(warnReason, warnTarget, warnMod, mutedStatus);
          
        } else if (warnsNumber.has(`${warnTarget.id}_1`)) {

          let mutedStatus = 2;

          warnUser(warnReason, warnTarget, warnMod, mutedStatus);

          let mutetime = 120000;

          serverLog(
            messageMember.user,
            "MUTED",
            client.user,
            "Too many infractions",
            "2 Minutes"
          );

          messageMember.roles.add(
            message.guild.roles.cache.find((r) => r.name === "Muted")
          );

          warnsNumber.delete(`${warnTarget.id}_1`);

          setTimeout(function () {
            if (
              messageMember.roles.cache.some((role) => role.name === "Muted")
            ) {
              messageMember.roles.remove(
                message.guild.roles.cache.find((r) => r.name === "Muted")
              );
              serverLog(messageMember.user, "UNMUTED", client.user, "", "");
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
    } else {
    }
  },
};
