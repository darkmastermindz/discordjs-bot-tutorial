const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
  console.log('${bot.user.username} is online!')
  bot.user.setActivity("Bot being developed! | ~help");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  // !say hello => cmd, hello

  switch (cmd){
    case `${prefix}botinfo`:
      let botembed = new Discord.RichEmbed()
        .setDescription("Bot info")
        .setColor("#15f153")
        .addField("Bot Name", bot.user.username);

      return message.channel.send(botembed);

    case `${prefix}help`:
        return message.channel.send(
          "Current commands: \n ~hello : Sends a response back");

    case `${prefix}hello`:
        return message.channel.send("You Had Me at Hello World!");

    default:
    let boterr = new Discord.RichEmbed()
      .setColor("#e60000")
      .addField("Error: Command Not Found! ",
        "Use **~help** to see a list of available commands");

    return message.channel.send(boterr);
  }

});

bot.login(botconfig.token);
