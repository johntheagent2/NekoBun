const Discord = require("discord.js");
module.exports = {
  name: "help",
  description: "Neko saying random things",
  execute(client, message, args) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#AE3450")
      .setTitle("Các câu lệnh để mọi người dùng:")
      .setThumbnail("https://i.imgur.com/YpIHHX6.png")
      .addFields(
        { name: "n.ping", value: "Gọi NekoBun!" },
        {
          name: "n.play",
          value: "Gọi NekoBun chơi nhạc!",
        },
        { name: "n.skip", value: "Gọi NekoBun skip bài!" },
        { name: "n.stop", value: "Gọi NekoBun ngừng hát!" },
        { name: "n.leave", value: "Bảo NekoBun rời khỏi Voice!" }
      );

    message.channel.send(exampleEmbed);
  },
};
