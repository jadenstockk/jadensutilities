module.exports = {
    name: 'birthday',
    description: 'wish them happy birthdayyy',

    async execute(client) {
        const Discord = require('discord.js');
        const birthdays = require('../models/birthdays');
        const spacetime = require('spacetime');

        let now = spacetime.now();
        let channel = client.guilds.cache.get('721065682401493002').channels.cache.get('808331343868067860');
        let general = client.guilds.cache.get('721065682401493002').channels.cache.get('727990054026346496');

        birthdays.find(
            { date: `${now.date()}/${now.month() + 1}` },
            async (err, data) => {
              if (err) console.log(err);
              if (!data) {
                  return;

              } else {
                  data.forEach(async itemOne => {
                      if (itemOne.wished.includes(`${now.year()}`)) return;

                      let user = client.users.cache.get(itemOne.user);

                      channel.send(
                          new Discord.MessageEmbed()
                          .setAuthor(`Happy Birthday ${user.tag}`, user.displayAvatarURL())
                          .setDescription(`Today is ${user}'s Birthday! Everyone wish them in ${general}! 🥳`)
                          .setColor('BLUE')
                      )

                      itemOne.wished.push(`${now.year()}`);
                      await itemOne.save();

                  })
              }
            }
          );
    }
}