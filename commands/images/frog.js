module.exports = {
  commands: ['frog', 'froggie', 'frogs'],

  callback: (message, args) => {
    const Discord = require("discord.js");

    let imageNumber = Math.floor(Math.random() * 10) + 1;
    message.channel.send({ files: ["././graphics/frogimages/" + imageNumber + ".jpg"] });
  },
};
