const prefix = '!';
const Discord = require('discord.js');
const { serverDmsID } = require("../config.json");
const { serverDmsTOKEN } = require("../config.json");
const dmLogs = new Discord.WebhookClient(serverDmsID, serverDmsTOKEN);

const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
}

module.exports = (client, commandOptions) => {
  let nopeEmoji = client.emojis.cache.get('779455910337970176');

  let {
    commands,
    expectedArgs = '',
    permissionError = `You aren't allowed to use this command.`,
    permissionMessage = true,
    modRequired = false,
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions

  // Ensure the command and aliases are in an array
  if (typeof commands === 'string') {
    commands = [commands]
  }

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }

  // Listen for messages
  client.on('message', (message) => {
    const { member, content, guild } = message

    if (message.channel.type === "dm" && !message.author.bot && !message.author === client.user) return dmLogs.send(new Discord.MessageEmbed().setColor("#059DFF").setDescription(`${message.author}\n${message.content}`))

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        // A command has been ran

        // Ensure the user has the required permissions
        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            if (permissionMessage) {
              let embed = new Discord.MessageEmbed()
              .setDescription(`${nopeEmoji} **${permissionError}**`)
              .setColor("#FF3E3E")

              message.channel.send(embed)
            }
            return;
          }
        }

        if (modRequired) {
          if (!member.roles.cache.some(role => role.name === 'Moderators')) {
            if (permissionMessage) {
              let embed = new Discord.MessageEmbed()
              .setDescription(`${nopeEmoji} ${permissionError}`)
              .setColor("#FF3E3E")

              message.channel.send(embed)
            }
            return;
          }
        }

        // Ensure the user has the required roles
        for (const requiredRole of requiredRoles) {
          console.log(requiredRole)
          console.log(requiredRoles)
            if (!member.roles.cache.some(role => role.name === requiredRole)) {
            if (permissionMessage) {
              message.channel.send(`${nopeEmoji} **${permissionError}**`)
            }
            return;
          }
        }

        // Split on any number of spaces
        const args = content.split(/[ ]+/)

        // Remove the command which is the first index
        args.shift()

        // Ensure we have the correct number of arguments
        if (
          args.length < minArgs ||
          (maxArgs !== null && args.length > maxArgs)
        ) {
          message.channel.send(
            `${nopeEmoji} **You worded the command wrong - use *${prefix}${alias} ${expectedArgs}***`
          )
          return
        }

        // Handle the custom command code
        callback(message, args, client)

        return
      }
    }
  })
}
