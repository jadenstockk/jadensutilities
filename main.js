const Discord = require("discord.js");
const path = require('path');
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const prefix = "!";
const { token } = require("./config.json");
const fs = require("fs");
global.warnsNumber = new Set();
global.timeouts = new Set();
global.spammers = new Set();
let repeatXYZ = "1";
client.setMaxListeners(0);

client.database = require("./database");

function getMemberCount() {
  return client.guilds.cache.get('721065682401493002').memberCount;
}

client.functions = new Discord.Collection();
const funcFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
for (const fcfile of funcFiles) {
const fccommand = require(`./functions/${fcfile}`);

client.functions.set(fccommand.name, fccommand);
}

client.once("ready", () => {
  console.clear()
  console.log("||------------------------------||\n|| Jaden's Utilities is online ✔ ||\n||------------------------------||\n")

  client.user.setPresence({activity: { name: "Jaden's Empire", type: "WATCHING" }});

  let i = 0;
  setInterval(() => {
    let statuses = [
      { activity: { name: `private vcs`, type: "LISTENING"}},
      { activity: { name: `${getMemberCount()} members`, type: "WATCHING"}},
      { activity: { name: `warn.exe`, type: "PLAYING"}},
      { activity: { name: `for rule breakers`, type: "WATCHING"}},
      { activity: { name: `jaden`, type: "LISTENING"}},
      { activity: { name: `Jaden's Empire`, type: "WATCHING"}}
    ];

       let status = statuses[i];
       if(!status){
           status = statuses[0];
           i = 0;
       }
       client.user.setPresence(status);
       i++;

  }, 10000);

  //COMMAND HANDLER
  const baseFile = 'commandhandler.js'
  const commandBase = require(`./commands/${baseFile}`)
  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }

  readCommands('commands')
});

//USER JOINED    
client.on("guildMemberAdd", async (member) => {
  client.functions.get("welcome").execute(member, client);
  client.functions.get("namefilter").execute(member, member.user.username, client);

});

//MESSAGE EDITED
client.on('messageUpdate', message => {
  client.functions.get('profanityfilter').execute(message, message.content, client);
})

//USER LEAVE
client.on("guildMemberRemove", async (member) => {
  client.functions.get("leave").execute(member, client);

});

//USER BANNED
client.on("guildBanAdd", async (guild, user) => {
  client.functions.get("ban").execute(guild, user, client);
});

//USER UNBANNED
client.on("guildBanRemove", async (guild, user) => {
  client.functions.get("unban").execute(guild, user, client);
});

//LOGGING
global.serverLog = function (user, type, moderator, reason, time) {
  client.functions.get("serverlogs").execute(user, type, moderator, reason, time, client);
};

//NICKNAME FILTER
client.on("guildMemberUpdate", async (user1, user2) => {
  client.functions.get("namefilter").execute(user2, user2.nickname, client, user1);
});

//TICKET SYSTEM
client.on("messageReactionAdd", async (reaction, user, message, channel) => {
  client.functions.get("ticketsystem").execute(reaction, user, message, channel, client);
});

//BIRTHDAYS
setInterval(() => {
  client.functions.get("birthday").execute(client);
  
}, 30000);

//FUNCTIONS
client.on('message', async message => {
const args = message.content;

if (message.channel.type === 'dm') {
  client.functions.get('dms').execute(message, args, client);

} else {
  client.functions.get('profanityfilter').execute(message, args, client);
  client.functions.get('chatbot').execute(message, args);
  client.functions.get('levels').execute(message, args);
  client.functions.get('linkblocker').execute(message, args, client);
  client.functions.get('reactions').execute(message, client);
  client.functions.get('entertainment').execute(message, client);
}
})

global.rulesList = new Discord.MessageEmbed()
  .setColor("#059DFF")
  .setTitle("📜 Jaden's Empire Rules: 📜")
  .setDescription(
    "#1: Do not harass other users or be toxic, such arguing with or insulting others (in other words, be kind)\n\n#2: No swearing or attempting to bypass the swear filter by changing the characters of a banned word. (Songs with swearing are allowed as long as it isn't excessive)\n\n#3: No inappropriate images/links/speech (Nothing can be shared that is sexual, is relating to substance abuse, is disturbing or that displays a grave nature).\n\n#4: No racism/hate speech.\n\n#5: Please keep your topics in the correct channels.\n\n#6: If there is any problem at all, please message <@541189322007904266> or visit the #👪・support channel.\n\n#7: No spamming - this is only allowed in dedicated spam channels and must not be over the top. (using auto-spammers will result in a warn and temp mute)\n\n#8: Do not post malicious links or files in the server that can steal information.\n\n#9: Avoid posting personal information such as phone numbers or email addresses in chats.\n\n#10: You are not allowed to act as though you are a moderator (this means acting as a moderator by threatening that people will be punished).\n\n#11: Do not argue with @🔒 Moderators when action is taken against you for breaking a server rule.\n\n#12: Do not mention @everyone or mass mention any other role or user.\n\n#13: Advertising your own server requires you to be a VIP or Server Booster. Please don't advertise your server to members through dms if they haven't asked you for the invite link."
  )
  .setFooter(
    `Jaden's Empire Rules`,
    "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
  );

  global.rolesList = new Discord.MessageEmbed()
  .setColor("#059DFF")
  .setTitle("📖 Jaden's Empire Roles: 📖")
  .addFields(
    { name: "⠀", value: "⠀" },
    { name: "1. 🧔 Random Person", value: "This role is the very minimum. You are very limited and cannot send messages.\n" },
    { name: "2. 🙂 Member (Unlocks at LEVEL 0)", value: "This is the standard role of the sever, when you join you are granted this role.\n" },
    { name: "3. 🤠 Fairly Important Person (Unlocks at LEVEL 5)", value: "This role allows you to send files and embed links on the server.\n" },
    { name: "4. 😄 VIP (Unlocks at LEVEL 10)", value: "This role allows you to hangout in the VIP EXCLUSIVE area, change your nickname and advertise your server in the self-promo channel.\n" },
    {
      name: "5. 🤩 Extra VIP (Unlocks at LEVEL 20)",
      value: "This role allows you to change your name colour.\n",
    },
    {
      name: "6. 😎 MVIP (Unlocks at LEVEL 25)",
      value: "This role gives you access to the MVIP EXCLUSIVE area.\n",
    },
    {
      name: "7. 😍 Extra MVIP (Unlocks at LEVEL 35)",
      value:
        "This role allows you to send text to speech messages and get priority when speaking in voice channels.\n",
    },
    {
      name: "8. 🧒 Heir to Royalty (Unlocks at LEVEL 50)",
      value:
        "This role allows you to move people to different voice channels.\n",
    },
    {
      name: "9. 👑 Royalty (Unlocks at LEVEL 65)",
      value:
        "This role allows you to access the ROYALTY EXCLUSIVE area and to mute people in calls.\n",
    },
    {
      name: "10. 👑 High Royalty (Unlocks at LEVEL 75)",
      value: "This role allows you to deafen people in calls.\n",
    },
    {
      name: "11. 👑 Ruler (Unlocks at LEVEL 85)",
      value:
        "This role allows you to see the MODERATION area (shows all server events such as kicks, bans, mutes etc.) on the server.\n",
    },
    {
      name: "12. 👑 Above Ruler (Unlocks at LEVEL 95)",
      value: "This role allows you to kick and ban people from the server.\n",
    },
    {
      name: "13. 👑 King (Unlocks at LEVEL 100)",
      value: "This role unlocks many server management features and tools.\n\n",
    },
    { name: "⠀", value: "⠀" },
    {
      name: "OTHER ROLES",
      value:
        "\n\n•👨‍👩‍👧‍👧 Community - This role unlocks when you reach LEVEL 1.\n\n•🥇 Original Member - This role was only granted to the first people on the server\n\n•🔒 Moderators - This role belongs to the people who help out and moderate the server.\n\n•📍 Inviter - This role is given to you when you send 3 invites to different people and they join the server.\n\n•💿 DJ - This role is given to you when you can be trusted with choosing the right jams\n\n•💜 Server Booster - Get this special role when you boost the server! You instantly get permissions equal to a 🤩 Extra VIP and you get an exclusive chat and voice channel that non-boosters cannot join!\n\n•🥐 Croissant Squad - This is just a random role... no idea why it even exists\n\n•Muted - This role is given to you as punishment and doesn't allow you to talk :)",
    }
  )
  .setFooter(
    `Jaden's Empire Roles`,
    "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
  );

client.database.init();
client.login(token);
