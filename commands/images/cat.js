module.exports = {
  commands: ['cat', 'kitten', 'cats', 'kitty'],

  callback: (message, args) => {
    const Discord = require("discord.js");

    let imageNumber = Math.floor(Math.random() * 30) + 1;
    message.channel.send({ files: ["././graphics/catimages/" + imageNumber + ".jpg"] });
  },
};
