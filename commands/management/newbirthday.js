module.exports = {
    commands: 'newbirthday',
    permissions: 'ADMINISTRATOR',
    permissionMessage: false,
  
    callback: (message, args, client) => {
        const Discord = require('discord.js');
        const birthdays = require('../../models/birthdays');
        const spacetime = require('spacetime');

        let now = spacetime.now();
        let channel = client.guilds.cache.get('721065682401493002').channels.cache.get('808331343868067860');
        let general = client.guilds.cache.get('721065682401493002').channels.cache.get('727990054026346496');

        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        if (!user) return message.reply("the user you provided is invalid");
        if (!args[1]) return message.reply("please specify a **date/month**");

        birthdays.findOne(
            { user: user.id },
            async (err, data) => {
              if (err) console.log(err);
              if (!data) {
                  let newData = new birthdays({
                    user: user.id,
                    date: args[1],
                
                    wished: []
                  })
                  await newData.save();

                  return message.reply(`successfully added ${user}'s birthday on ${args[1]}`);

              } else {
                return message.reply("that user's birthday has already been added");
              }
            }
          );
    }
}