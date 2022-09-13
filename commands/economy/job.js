module.exports = {
  commands: ['job'],

  callback: (message, args) => {
      const Discord = require("discord.js");
      const job = require("../../models/economy");

      let jobs = ['teacher', 'music producer', 'house wife', 'plumber', 'YouTuber', 'DJ', 'pharmacist']

      function changeJob(jobName) {
          let newJobEmbed = new Discord.MessageEmbed()
          .setDescription(`${message.author} is now employed as a **${jobName}**`)
          .setFooter(
            `Jaden's Empire Economy`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF")
          .setTimestamp();
          
          message.channel.send(newJobEmbed)

          job.findOne(
            { Guild: message.guild.id, User: message.author.id },
            async (err, data) => {

              if (err) console.log(err);

              if (!data) {
                  
                let newJob = new job({
                  User: message.author.id,
                  Guild: message.guild.id,
                  Job: jobName,
                  Money: 0
                });

                newJob.save();

              } else {
                  
                data.Job = jobName
                data.save();
              }
            }
          )
      }

      if (args[0] === 'list') {

        let jobList = new Discord.MessageEmbed()
        .setColor("#059DFF")
        .setTitle("List of Available Jobs")
        .addFields(
            { name: `Teacher`, value: "educate the next"},
            { name: `Music Producer`, value: "make some beats!"},
            { name: `House Wife`, value: "the hardest job of them all"},
            { name: `Plumber`, value: "fix people's pipes"},
            { name: `YouTuber`, value: "very popular job"},
            { name: `DJ`, value: "party all night"},
            { name: `Pharmacist`, value: "legally sell people drugs!"}
        )
        .setFooter(`Type "!job (selected job)" to get yourself employed!`)
        .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png");
      message.channel.send(jobList);
      return;
          
      } else {
          if (args[0]) {
              let inputText = args.slice(0).join(' ')

          for (var i in jobs) {
              if (inputText.toLowerCase() === jobs[i].toLocaleLowerCase()) return changeJob(jobs[i]);
          }

          if (!message.mentions.users.first() && !message.guild.members.cache.get(args[0])) {
              message.reply(`please provide a valid job.`)
              return;
          }
        }
      }

      let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
      if (!user) return message.reply('please enter a valid user.');
      if (user.bot) return message.reply('please enter a valid user.');

      function unemployed() {
        let noJobEmbed = new Discord.MessageEmbed()
        .setDescription(`${user} is currently **unemployed**`)
        .setFooter(
          `Jaden's Empire Economy`,
          "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
        )
        .setColor("#059DFF")
        .setTimestamp();

        message.channel.send(noJobEmbed);
        }
  
      job.findOne(
        { Guild: message.guild.id, User: user.id },
        async (err, data) => {
  
          if (err) console.log(err);
  
          if (!data) {

            unemployed();
  
          } else {

            if (!data.Job) return unemployed();
            if (data.Job === 'unemployed') return unemployed();
            let userJob = data.Job;
  
            let jobEmbed = new Discord.MessageEmbed()
            .setDescription(`${user} is currently employed as a **${userJob}**`)
            .setFooter(
              `Jaden's Empire Economy`,
              "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
            )
            .setColor("#059DFF")
            .setTimestamp();
  
            message.channel.send(jobEmbed);
          }
        }
      );
    },
  };
  