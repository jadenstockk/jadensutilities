module.exports = {
  commands: ['dog', 'puppy', 'dogs'],

  callback: (message, args) => {
    const Discord = require("discord.js");

    let imageNumber = Math.floor(Math.random() * 30) + 1;
    message.channel.send({ files: ["././graphics/dogimages/" + imageNumber + ".jpg"] });
  },
};