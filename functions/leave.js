module.exports = {
    name: 'leave',
    description: 'member leaves server',

    async execute(member, client) {
    if (!member.bot) {
        const fetchedLogs = await member.guild.fetchAuditLogs({
          limit: 1,
          type: "MEMBER_KICK",
        });
        const kickLog = fetchedLogs.entries.first();
    
        if (!kickLog) return serverLog(member.user, "left", "", "");
    
        const { executor, target } = kickLog;
    
        if (Date.now() - kickLog.createdTimestamp < 5000) {
          let reason = kickLog.reason;
          if (!reason) reason = "Unspecified";
    
          if (executor === client.user)
            return serverLog(member.user, "left", "", "");
    
          if (target.id === member.id) {
            serverLog(member.user, "KICK", executor, reason);
            serverLog(member.user, "left", "", "");
          } else {
            serverLog(member.user, "KICK", "Unknown", "Unknown");
            serverLog(member.user, "left", "", "");
          }
        } else {
          serverLog(member.user, "left", "", "");
        }
      } else {
        serverLog(member.user, "left", "", "");
      }
    }
}