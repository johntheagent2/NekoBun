const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

let cl;

module.exports = {
  name: "play",
  description: "Advanced music bot",
  async execute(client, message, cmd, args, Discord) {
    cl = client;

    //Checking for the voicechannel and permissions (you can add more permissions if you like).
    const voice_channel = message.member.voice.channel;
    if (!voice_channel)
      return message.channel.send(
        "Bạn cần phải ở trong một channel để dùng command này!"
      );
    //This is our server client.queue. We are getting this server queue from the global client.queue.
    const server_queue = client.queue.get(message.guild.id);

    //If the user has used the play command

    if (!args.length)
      return message.channel.send("Mình không biết bạn tìm nhạc gì!");
    let song = {};

    //If the first argument is a link. Set the song object to have two keys. Title and URl.
    const isValidateURL = ytdl.validateURL(args[0]);
    console.log(isValidateURL);

    if (isValidateURL) {
      const song_info = await ytdl.getInfo(args[0]);
      song = {
        title: song_info.videoDetails.title,
        url: song_info.videoDetails.video_url,
      };
    } else {
      //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.

      const video = await findVideo(args.join(" "));
      if (video) {
        song = { title: video.title, url: video.url };
      } else {
        message.channel.send("Lỗi tìm video.");
      }
    }

    //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global client.queue.
    if (!server_queue) {
      const queue_constructor = {
        voice_channel: voice_channel,
        text_channel: message.channel,
        connection: null,
        songs: [],
      };

      //Add our key and value pair into the global client.queue. We then use this to get our server client.queue.
      client.queue.set(message.guild.id, queue_constructor);
      queue_constructor.songs.push(song);

      //Establish a connection and play the song with the vide_player function.
      try {
        const connection = await voice_channel.join();
        queue_constructor.connection = connection;
        video_player(message.guild, queue_constructor.songs[0]);
      } catch (err) {
        client.queue.delete(message.guild.id);
        message.channel.send("Đã xảy ra lỗi khi thêm nhạc!");
        throw err;
      }
    } else {
      server_queue.songs.push(song);
      return message.channel.send(
        `👍 **${song.title}** đã được cho vào hàng chờ!`
      );
    }
  },
};

async function findVideo(query) {
  const video_result = await ytSearch(query);
  return video_result.videos.length > 1 ? video_result.videos[0] : null;
}

const video_player = async (guild, song) => {
  const song_queue = cl.queue.get(guild.id);
  let timeoutID;
  //If no song is left in the server client.queue. Leave the voice channel and delete the key and value pair from the global client.queue.
  if (!song) {
      song_queue.voice_channel.leave();
      cl.queue.delete(guild.id);
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
