const botconfig = require("./botconfig.json");
const token = require("./token.json"); // Create a json file with {value: yourToken}
const Discord = require("discord.js");
const express = require('express');
const fs = requre("fs");

const bot = new Discord.Client({disableEveryone: true})

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =? {
  if (err) console(err);

  let jsfile = files.filter(f => f.split(".").pop ==== "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.")
    return;
  }
  console.log("loading commands");
  js.file.forEach((f, i) = +> {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set props.help.name, props
  });
});

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
  if(`${cmd}`.charAt(0) != `${prefix}` ) {
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
        .addField("report", "report a user");
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

      return message.channel.send(botEmbed)

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

      case `report`:
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find user.");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
          .setDescription("Reports")
          .setColor("#E5DA2A")
          .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
          .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
          .addField("Channel", message.channel)
          .addField("Time", message.createdAt)
          .addField("Reason", reason);

        //return message.channel.send(reportEmbed); //send msg in current channel
        let reportsChannel = message.guild.channels.find(`name`, "reports") //TODO: set reports channel
        if(!reportsChannel) return message.channel.send("Couldn't find reports channel.");

        message.delete().catch(O_o=>{}); //delete previous message (input command)

        return reportsChannel.send(reportEmbed);

      //** Mod Commands **//
      case `kick`:
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kUser) message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);

        let kickEmbed = new discord.RichEmbed()
          .setDescription("Reports")
          .setColor("#ff4c00")
          .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
          .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
          .addField("Kicked From Channel", message.channel)
          .addField("Time", message.createdAt)
          .addField("Reason", kReason);
          if(!message.member.hasPemission("MANAGE_MESSAGES")) return messages.channel.send("You don't have perms to kick. Report with `"+`${prefix}`+"`report 🙀")

        let kickChannel = message.guild.channels.find(`name`, "incidents");
        if (!kickChannel) return message.channel.send("Can't find incidents channel.");

        return;

      case `ban`:
      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if (!kUser) message.channel.send("Can't find user!");
      let bReason = args.join(" ").slice(22);

      let banEmbed = new discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#ff4c00")
        .addField("Banned User", `${kUser} with ID: ${kUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Kicked From Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);
        if(!message.member.hasPemission("MANAGE_MESSAGES")) return messages.channel.send("You don't have perms to kick. Report with `"+`${prefix}`+"`report 🙀")

      let banChannel = message.guild.channels.find(`name`, "incidents");
      if (!banChannel) return message.channel.send("Can't find incidents channel.");

      return;

      default:
        let botErr = new Discord.RichEmbed()
          .setColor("#e60000")
          .addField("Error: Command Not Found! ",
            "Use **~help** to see a list of available commands");
        return message.channel.send(botErr);
  }

});

bot.login(token.value);
