const botconfig = require("./botconfig.json");
const token = require("./token.json"); // Create a json file with {value: yourToken}
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
  console.log(messageArray);
  let cmd = messageArray[0];
  let args = messageArray[0].slice(1);
  console.log(args)
  // !say hello => cmd, hello

  //prevent regular messages from triggering bot
  if(cmd[0].charAt(0) != `${prefix}`) {
    return;
  }

  switch (args){
    case `help`:
      return message.channel.send(
        "Current commands: \n ~hello : Sends a response back");

    case `botinfo`:
      let boticon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
        .setDescription("Bot Info")
        .setColor("#15f153")
        .setThumbnail(boticon)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt);

      return message.channel.send(botembed);

    case `hello`:
      return message.channel.send("You Had Me at Hello World!");

    case `serverinfo`:
      let servericon = message.guild.displayAvatarURL
      return;

    default:

    let boterr = new Discord.RichEmbed()
      .setColor("#e60000")
      .addField("Error: Command Not Found! ",
        "Use **~help** to see a list of available commands");
    return message.channel.send(boterr);
  }



});

bot.login(token.value);
