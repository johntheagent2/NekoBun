module.exports = {
  name: "leave",
  description: "stop the bot",
  async execute(client, message, cmd, args, Discord) {
    
    const guild = message.member.guild;
    const server_queue = client.queue.get(message.guild.id);

    const userVoiceChannel = message.member.voice;
    const botVoiceChannel = message.guild.me.voice;
    const voiceChannel = message.member.voice.channel;
    if (
      botVoiceChannel.channelID !== userVoiceChannel.channelID ||
      !userVoiceChannel.channel
    ) {
      return message.channel.send(`Bạn phải ở chung channel với NekoBun!`);
    } else if (!botVoiceChannel) {
      return message.channel.send(
        `NekoBun đang không ở trong channel voice nào cả!`
      );
    }
    if (
      botVoiceChannel.channelID == userVoiceChannel.channelID &&
      botVoiceChannel &&
      userVoiceChannel.channel
    ) {
      client.queue.delete(guild.id);
      await voiceChannel.leave();
      await message.channel.send("NekoBun rời channel!");
    }
  },
};
