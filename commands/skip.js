const ytdl = require("ytdl-core");

let cl;

module.exports = {
  name: "skip",
  description: "Advanced music bot",
  async execute(client, message, cmd, args, Discord) {
    cl = client;

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
    if (!server_queue) {
      return message.channel.send(`There are no songs in queue 😔`);
    }
    if (userVoiceChannel == clientVoiceConnection) {
      server_queue.connection.dispatcher.end();
      server_queue.songs.shift();
      video_player(message.guild, server_queue.songs[0]);
      return message.channel.send(`Đã skip bài thành công 😔`);
    }
  },
};

const video_player = async (guild, song) => {
  const song_queue = cl.queue.get(guild.id);
  let timeoutID;
  //If no song is left in the server client.queue. Leave the voice channel and delete the key and value pair from the global client.queue.
  if (!song) {
    setTimeout(() => {
      song_queue.voice_channel.leave();
      cl.queue.delete(guild.id);
    }, 5 * 60000);
  } else {
    clearTimeout(timeoutID);
    const stream = ytdl(song.url, { filter: "audioonly" });
    song_queue.connection
      .play(stream, { seek: 0, volume: 1 })
      .on("finish", () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
      });
    await song_queue.text_channel.send(`🎶 Đang phát bài **${song.title}**`);
  }
};
