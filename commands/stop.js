module.exports = {
  name: "stop",
  description: "Advanced music bot",
  async execute(client, message, cmd, args, Discord) {
    const voice_channel = message.member.voice.channel;
    if (!voice_channel)
      return message.channel.send(
        "Bạn cần phải ở trong một channel để dùng command này!"
      );

    const server_queue = client.queue.get(message.guild.id);

    const userVoiceChannel = message.member.voice.channelID;
    const clientVoiceConnection = message.guild.voice.channelID;
    if (userVoiceChannel != clientVoiceConnection)
      return message.channel.send(
        `Bạn phải ở chung channel ${message.guild.voice.channel} với NekoBun để dùng command này! 😔`
      );
    if (userVoiceChannel == clientVoiceConnection) {
      server_queue.songs = [];
      server_queue.connection.dispatcher.end();
      return message.channel.send(`NekoBun đã dừng nhạc! 😔`);
    }
  },
};
