module.exports = {
  commands: 'meme',

  callback: async (message, args, client) => {
      const Discord = require("discord.js");
      const Reddit = require("@cxllm/reddit");

      const meme = await Reddit.random('cleanmemes');
      const img = meme.image;
      const link = meme.url;
      const title = meme.title;

      let memeEmbed = new Discord.MessageEmbed()
      .setImage(img)
      .setURL(link)
      .setTitle(title)
      .setColor("#059DFF")
      .setFooter(
        `Jaden's Empire Memes • Powered by reddit.com/r/cleanmemes/`,
        "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
      )

      message.channel.send(memeEmbed);
    },
  };
  