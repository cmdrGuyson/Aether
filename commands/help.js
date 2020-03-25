const Discord = require("discord.js");

module.exports = {
  name: "Help",
  aliases: ["help", "?", "assist", "commands"],
  description: "Commands list",

  execute(message, args) {
    /* Embed */
    const embed = new Discord.MessageEmbed()
      .setColor("#ffbe00")
      .setTitle("Aether | Commands List")
      .setDescription("Below are a list of commands that you can use.")
      .setThumbnail("https://i.imgur.com/2w4CF8P.png")
      .addField("For help", "use: `>aether help`")
      .addField(
        "Covid-19 Statistics",
        "use: `>aether covid19` \ntype: `country-name` \nuse: `global` for global statistics"
      )
      .setFooter("Created by Guyson and Neith");

    message.channel.send(embed);
  }
};
