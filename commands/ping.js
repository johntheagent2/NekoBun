module.exports = {
  name: "ping",
  description: "Neko saying random things",
  execute(client, message, args) {
    const rep = ["kêu cái j z!", "kêu nữa ăn dấm!", "hẻ?", "đừng kêu nữa coi!"];
    const randomMessage = rep[Math.floor(Math.random() * rep.length)];
    message.reply(randomMessage);
  },
};
