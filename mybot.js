const Discord = require("discord.js");
const client = new Discord.Client();

// Load config file that contains tokens and prefix
const config = require("./config.json");
// for writing on JSON file
const fs = require("fs");


client.on("ready", () => {
    console.log("I am ready!");
});

fs.readdir("./events/", (err, files) => {
    if(err)
	return console.error(err);
    files.forEach(file => {
	let fileW = file.replace(/\W/g, "");
	let eventFunction = require(`./events/${fileW}`);
	let eventName = file.split(".")[0];
	client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

// Triggers every time the bot sees a message
client.on("message", (message) => {
    // Exit and stop if it's not a command or sender is bot
    if(!message.content.startsWith(config.prefix) || message.author.bot)
	return;
    
    // .slice() cuts beginning prefix
    // .trim() remove extra before and after spaces
    // / +/g selects white space to remove by .split()
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    // .shift() get first element from the array
    const command = args.shift().toLowerCase();

    try {
	let commandW = command.replace(/\W/g, "");
	let commandFile = require(`./commands/${commandW}.js`);
	commandFile.run(client, message, args);
    } catch(err) {
	console.error(err);
    }

});

client.login(config.token);
