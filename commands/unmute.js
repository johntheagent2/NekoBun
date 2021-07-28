const { Message } = require("discord.js");
module.exports = {
  name: "unmute",
  description: "this command mute a member",
  execute(client, message, args) {
    const target = message.mentions.users.first();
    if (target) {
      let mainRole = message.guild.roles.cache.find(
        (role) => role.name === "member"
      );
      let muteRole = message.guild.roles.cache.find(
        (role) => role.name === "mute"
      );

      let memberTarget = message.guild.members.cache.get(target.id);

      memberTarget.roles.remove(muteRole.id);
      memberTarget.roles.add(mainRole.id);
      message.channel.send(`<@${memberTarget.id}> đã được unmute`);
    } else {
      message.channel.send(`Bạn không thể unmute <@${memberTarget.id}>!`);
    }
  },
};
