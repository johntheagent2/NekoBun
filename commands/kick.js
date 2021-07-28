const { Message } = require("discord.js");

module.exports = {
  name: "kick",
  description: "this command kick a member",
  execute(client, message, args) {
    const member = message.mentions.users.first();
    if (
      message.member.roles.cache.has("813671956334641185") || //bot
      message.member.roles.cache.has("805800790295183380") || //admin
      message.member.roles.cache.has("813427098500464640") || //dev
      message.member.roles.cache.has("805800537647742976")
    ) {
      if (member) {
        const memberTarget = message.guild.members.cache.get(member.id);
        memberTarget.kick();
        message.channel.send("Member đã bị kick!");
      } else {
        message.channel.send("Bạn không thể kick member này!");
      }
    } else {
      message.channel.send("Bạn không có quyền sử dụng command này!");
    }
  },
};
