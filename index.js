const botconfig = require("./botconfig.json");
const token = require("./token.json"); // Create a json file with {value: yourToken}
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
  console.log('${bot.user.username} is online!')
  bot.user.setActivity("~help", {type: "Bot being developed!"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1); // all args
  let fargs = messageArray[0].slice(1); //first args

  //prevent regular messages from triggering bot
  if(cmd.charAt(0) != `${prefix}` ) {
    return;
  }

  switch (fargs){
    //** Basic Commands **//
    case `help`:
      let helpIcon = bot.user.displayAvatarURL;
      let helpEmbed = new Discord.RichEmbed()
        .setDescription("Bot Commands")
        .setColor("#20C20E")
        .setThumbnail(botIcon)
        .addField("hello", "say hello to the bot")
        .addField("botinfo", "get bot info")
        .addField("serverinfo", "get bot info")
        .addField("report", "report a user")
      return message.channel.send(helpEmbed);

    case `hello`:
      return message.channel.send("You Had Me at Hello World!");

    case `botinfo`:
      let botIcon = bot.user.displayAvatarURL;
      let botEmbed = new Discord.RichEmbed()
        .setDescription("Bot Info")
        .setColor("#15f153")
        .setThumbnail(botIcon)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt);

      return message.channel.send(botEmbed);


    case `serverinfo`:
      let serverIcon = message.guild.displayAvatarURL
      let serverEmbed = new Discord.RichEmbed()
      .setDescription("Server Info")
      .setColor("#15f153")
      .setThumbnail(serverIcon)
      .addField("Server Name", message.guild.name)
      .addField("Created On", message.guild.createdAt)
      .addField("You've been here since", message.member.joinedAt)
      .addField("Total Members", message.guild.memberCount);

      return message.channel.send(serverEmbed);

      //** Administrative Commands **//

      case `report`:
        let rUser = message.guild.member(message.mentions.users.first())
        if(!rUser) return message.channel.send("Couldn't find user.");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("E5DA2A")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);

        return message.channel.send(reportEmbed);

    default:
    let botErr = new Discord.RichEmbed()
      .setColor("#e60000")
      .addField("Error: Command Not Found! ",
        "Use **~help** to see a list of available commands");
    return message.channel.send(botErr);
  }

});

bot.login(token.value);
