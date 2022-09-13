const Discord = require("discord.js");
const alexa = require("alexa-bot-api");
var chatbot = new alexa("aw2plm");

module.exports = {
  name: "chatbot",
  description: "server chatbot",

  execute(message, args, client) {
    if (message.channel.type === "dm") return;

    let chatChannel = message.guild.channels.cache.get('764630967507615774');

    if (message.channel === chatChannel) {
      if (message.author.bot) return;
      let content = message.content;
      message.channel.startTyping();
      chatbot.getReply(content).then((r) => message.channel.send(r));
      message.channel.stopTyping();
    }
  },
};
