const Discord = require("discord.js");

module.exports = {
  name: "Hello!",
  aliases: ["hello", "identify", "hi"],
  description: "Basic identification and greeting.",

  execute(message, args) {
    /* Embed */
    const embed = new Discord.MessageEmbed()
      .setColor("#ffbe00")
      .setTitle("Aether")
      .setDescription(
        "Hello! I'm Aether. I'm a discord bot that will give you will give you updated details on emergency situations happening around the world."
      )
      .setThumbnail("https://i.imgur.com/2w4CF8P.png")
      .addField("For help", "use: `>aether help`", true)
      .setFooter("Created by Guyson and Neith");

    message.channel.send(embed);
  }
};
