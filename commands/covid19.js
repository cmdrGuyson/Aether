const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "Covid19",
  aliases: ["covid19", "corona", "covid"],
  description: "Details about novel covid-19 corona virus.",

  execute(message, args) {
    /* Embed */

    let country = "global";

    message.channel.send("`Which country do you want statistics of?`");
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, {
      max: 1
    });

    collector.on("collect", async m => {
      console.log(m.content);
      country = m.content;
    });

    collector.on("end", async collected => {
      console.log(collected.size);

      if (country != "sri-lanka") {
        axios
          .get("https://api.covid19api.com/summary")
          .then(data => {
            let result = data.data.Countries.filter(object => {
              return object.Slug === country;
            });
            result = result[0];

            const embed = new Discord.MessageEmbed()
              .setColor("#ffbe00")
              .setTitle(`Covid-19 | ${result.Country}`)
              .setDescription("Please find the statistics below.")
              .setThumbnail("https://i.imgur.com/2w4CF8P.png")
              .addFields(
                {
                  name: "Total Confirmed",
                  value: result.TotalConfirmed,
                  inline: true
                },
                {
                  name: "New Confirmed",
                  value: result.NewConfirmed,
                  inline: true
                },
                {
                  name: "Total Deaths",
                  value: result.TotalDeaths,
                  inline: true
                },
                {
                  name: "New Deaths",
                  value: result.NewDeaths,
                  inline: true
                },
                {
                  name: "Total Recovered",
                  value: result.TotalRecovered,
                  inline: true
                },
                {
                  name: "New Recovered",
                  value: result.NewRecovered,
                  inline: true
                },
                { name: "\u200B", value: "\u200B" },
                {
                  name: "Recovered Percentage",
                  value:
                    Math.round(
                      ((result.TotalRecovered / result.TotalConfirmed) * 100 +
                        Number.EPSILON) *
                        100
                    ) / 100
                },
                {
                  name: "Deaths Percentage",
                  value:
                    Math.round(
                      ((result.TotalDeaths / result.TotalConfirmed) * 100 +
                        Number.EPSILON) *
                        100
                    ) / 100
                }
              )
              .setFooter(`Last updated on: ${data.data.Date}`);

            message.channel.send(embed);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }
};
