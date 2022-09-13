module.exports = {
    commands: 'modrules',
    modRequired: true,
    permissionMessage: false,
  
    callback: (message, args) => {
    const Discord = require("discord.js");

      let commandsList = new Discord.MessageEmbed()
        .setColor("#059DFF")
        .setTitle("Moderator Rules:")
        .addFields(
            { name: "1. Advertising", value: "Users are not allowed to advertise any kind of content unless they have the server booster or VIP role, this includes but is not limited to:\n\n- Discord invite links\n- Referral links\n- Social media profiles or channels\n\n*This rule also applies to advertisements through direct messages.*", inline: true },
            { name: "2. Language & Behavior", value: "Language or behavior is prohibited if it is:\n\n- Insulting\n- Accusatory\n- Defamatory\n- Violent\n- Sexist\n- Racist\n\n*Policy: Users are warned when violating this rule, in severe cases they may be temporarily muted.*", inline: true },
            { name: "3. Prohibited Content", value: "Content is prohibited if it:\n\n- Is illegal\n- Involves pornography or nudity\n- Is sexual or suggestive content\n- Shows or encourages violence\n- Threatens, harasses, or bullies or encourages others to do so\n- Is personal and confidential information\n- Impersonates someone in a misleading or deceptive manner\n- Is spam\n\n*Policy: Depending on the severeness, users are warned, temporarily muted, or permanently muted when violating this rule.*", inline: true },
            { name: "4. Spamming", value: "The following behavior is considered spam:\n\n- Sending messages with arbitrary characters in a fast sequence\n- Sending the same message again and again in a fast sequence\n- Repeatedly mentioning staff roles\n\n*Policy: Depending on the severeness, users are warned or temporarily muted when violating this rule. Accounts that are solely used for spamming are permanently muted.*", inline: true },
            { name: "5. Begging", value: "Users are not allowed to ask others for free rewards or money. Please use our earning methods if you want to get rewards.\n\n*Policy: Depending on the severeness, users are warned or temporarily muted when violating this rule.*", inline: true },
            { name: "⠀ ", value: "⠀ ", inline: true },
        )
        .setFooter(
          "Jaden's Empire Moderation",
          "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
        )
      message.channel.send(commandsList);
    }
};
