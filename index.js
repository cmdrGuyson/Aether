const fs = require("fs");
const Discord = require("discord.js");
const { token } = require("./key.json");
const { prefix } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once("ready", () => {
  console.log("Hello there! I'm Aether!");
});

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).toLowerCase();
  const commandName = args;
  console.log(commandName);

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.log(error);
    message.reply("I'm sorry! I can't do that :(");
  }
});

client.login(token);
