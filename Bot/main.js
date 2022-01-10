//Config
const { channelMention, SlashCommandSubcommandBuilder } = require('@discordjs/builders');
const { Client, Intents, MessageEmbed, Guild, Message, MessageActionRow, MessageButton } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

//#region Bot Events
bot.once('ready', () => {
    console.log('Bot is ready!');
})

//Channel Events
bot.once('channelCreate', (channel) => {
    const output = `\"${channel.name}\" Update - Channel Created.`;
    console.log(output);
    bot.channels.cache.get('883639468979028029').send(output);
})

bot.once('channelDelete', (channel) => {
    const output = `\"${channel.name}\" Update - Channel Deleted.`;
    console.log(output);
    bot.channels.cache.get('883639468979028029').send(output);
})
//#endregion

const config = require("./config.json");
const token = require("./token.json");
const pref = config.Prefix;

//#region Command Handling
bot.on('messageCreate', message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(pref))
    {
        if(
            message.content.includes("sus") ||
            message.content.includes("amogus") ||
            message.content.includes("among us") ||
            message.content.includes("sussy") ||
            message.content.includes("baka") ||
            message.content.includes("imposter") ||
            message.content.includes("amog us")
        ) {
            return message.author.send("https://cdn.discordapp.com/attachments/814904970330636318/896446025731022918/video0.mp4");
        }
        else return;
    }

    const args = message.content.slice(pref.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const channel = message.channel;
    const author = message.author;
    const guild = message.guild;

    if(command === 'test') {
        console.log(`$${author.username}#${author.discriminator}: Test Command`);
        channel.send('Channel Test.');
        channel.send(`<@${author.id}> Ping test.`);
        author.send('Author Test.');
        return;
    } else if(command === 'embedtest') {
        console.log(`$${author.username}#${author.discriminator}: Embed Test Command`);
        const testEmbed = new MessageEmbed()
        .setColor('#3c99f0')
        .setTitle('Test Embed!')
        .setURL('https://google.com/')
        .setAuthor('Test Author')
        .setDescription('Test Description')
        .addFields(
            {name: 'Test Field 1', value: 'Test Value 1', inline: true},
            {name: 'Test Field 2', value: 'Test Value 2', inline: true},
            {name: 'Test Field 3', value: 'Test Value 3', inline: false}
        )
        .setImage('https://media.discordapp.net/attachments/770362301978378282/867750302508646410/unknown.png')
        .setFooter('Test Footer');

        message.channel.send({ embeds: [testEmbed] });
        return;
    } else if(command === 'emote') {
        console.log(`$${author.username}#${author.discriminator}: Emote Command`);
        //Use this as a test array for now, until I finish it

        const emoteString = "<:HNNNNNNNG:883559297542389782> <:VXRcomplete:882817877806301224> <:floomba:882792620600991755> <:gigaflush:882792234142027816> <:flushy:882792179712552980> <:flushedtroll:882792116017827880> <:flushedsit:882792042072244295> <:awkwardflushed:882792005116239912> <:VXRgrimace:876252319648448532> <:ecks_dee:875194303369072690> <:VigorLogo:861824115283460116> <:gigachad:861823987801391174> <:thinky:861823891802554378> <:walter:861823318515908609> <:troled:861823217978310686> <:plotting:861823124702363688> <:awwwwhhhhh:853688065218707466> <:w_:848982162698403901> <:hecrypneg:846407517302030406> <:VXRCheck:845678436952965140> <:out:844332176119300097> <:dearGodNo:844330919430062130> <:ya:841427725456900106> <:sn:841427672785092610> <:concussion:841427587967877210> <:HAHAHAHAHAHAHAHAHH:841426936832196608> <:spook:841426891013619793> <:angeryyyy:841426816627769354> <:hawt:841426776210800660> <:tfbro:841426567530938390> <:lub:841426318502527021> <:bluhs:841426278099320872> <:sihg:841426232784715796> <:floo:841426008048664648> <:angery:841319000885035020> <:unpog:840704362824859660> <:pain:837682105366085682> <:WAH:837682105344327751> <:ye:837442013892182046> <:sadbenzene:837325823567986740> <:flohed:836335455271256084> <:waa:836268670412914710> <:wat:833186678708895745> <:ooooeeee:833158789925568533> <:sir_gribbles_the_third:824134897991811122> <:wetroaches:824134791557414913> <:depressed_walter:824134683364294676> <:banan_tronk:824134566787809291> <:STOP:824134096325312532> <:Patreon:816851599149760542> <a:amogus:834064048101261332>";
        const emoteArray = emoteString.split(' ');
        if(args[0] == null)
            channel.send(`Random Emote: ${emoteArray[Math.floor(Math.random()*emoteArray.length)]}`);
        else
            channel.send(`Emote ${args[0]}: ${emoteArray[args[0]]}`);

    } else if(command === 'shutdown' && message.member.roles.cache.has('812976292634427394')) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('ShutdownConfirm')
                .setLabel('CONFIRM')
                .setStyle('DANGER'),
            new MessageButton()
                .setCustomId('ShutdownCancel')
                .setLabel('CANCEL')
                .setStyle('PRIMARY')
        );

        message.reply({content: 'Are you sure you want to shut down the bot?', components: [row]});
    } else if(command === "owoify") {
        console.log(`$${author.username}#${author.discriminator}: owoify Command`);
        if(args[0] == null) {
            channel.send('Please set args.');
        }
        else {
            owoify(args, channel);
        }
    } else if(command === 'cock') {
        message.reply(`Cock ~~is not a funny word~~ is a very funny word, ${author}!`);
    } else if(command === 'help') {
        var msg = new MessageEmbed()
            .setColor('#3c99f0')
            .setTitle('Help Command')
            .setURL('https://www.compensationvr.tk')
            .setDescription('This is the official bot of the Compensation VR discord server, and these are the commands you can use.')
            .addFields(
                { name: 'Commands', value: 'c.help - THIS COMMAND \nc.coc - Shows in-game Code Of Conduct \nc.wannachat - Pings PingToChat role and asks to chat \nc.faq - Pulls up frequently asked question and answers. \nc.emote - Gives you a random emote. \nc.tos - Dislays the TOS of Compensation VR.', inline: 'false'},
                { name: 'Help us out!', value: "This now this bot doesn't have a lot of commands, and you can help solve that issue! \nSubmit your commands via the `!suggest [SUGGESTION]` command in #bot-commands to help us add commands to the bot. \nPlease structure your message like this: `BOT COMMAND: v.announce [MESSAGE]` - sends a command to #annoucements with the message specified in command.", inline: 'false'}
            )
            .setFooter('Thank you for contributing! \n  -Compensation Bot Team!');

        channel.send({ embeds: [msg] });
    } else if(command === 'wannachat') {
        channel.send(`Hey <@&852250185576874044>! ${message.author} wants to chat! Let's start an interesting conversation.`);
    } else if(command === 'coc' || command === 'codeofconduct' || command === 'rules') {
        var msg = new MessageEmbed()
            .setTitle('Compensation VR Code Of Conduct')
            .setURL("https://www.compensationvr.tk")
            .setDescription("This is the Compensation VR Code Of Conduct, the rules for how you can and can't act inside CVR.")
            .addFields(
                {name: 'COC', value: "- Don't be toxic. \n - Stay positive! \n - Don't be NSFW or sexual. \n - Don't modify the game without direct permission from the developers. \n - Please report any bugs you find! \n - Pulling game files is permitted, but only for non-commerical and entirely non- malicious purposes. \n - You are permitted to show footage and reviews of the beta on any social platform, though you are not allowed to re host the beta files on ANY platform without written consent from the Subsurface Studios development and moderation team.", inline: "false"}
            )
            .setFooter("Please abide by these rules at all times when playing Compensation VR. Failure to do so may result in moderation action.");
        
        channel.send({embeds: [msg]});
    } else if(command === 'tos') {
        var msg = new MessageEmbed()
            .setTitle('Compensation VR Terms Of Service')
            .setURL('https://www.compensationvr.tk/TOS')
            .setDescription('The Compensation VR Terms Of Service are the legal rules that you agree to upon downloading or playing the game. They are as follows:')
            .addFields(
                {
                    name: 'Link',
                    value: 'You can find the Compensation VR TOS at https://compensationvr.tk/TOS.',
                    inline: false
                }
            )
            .setFooter('Thank you for reading these terms, and have a nice day.');

            channel.send({ embeds: [msg]});
    } else if(command === 'dingus') {
        message.reply('`"Dingus"` \n -Bobrobot1, 2021');
        message.react('<:walter:861823318515908609>');
    } else if(command === 'uptime') {
        function format(seconds){
            function pad(s){
              return (s < 10 ? '0' : '') + s;
            }
            var hours = Math.floor(seconds / (60*60));
            var minutes = Math.floor(seconds % (60*60) / 60);
            var seconds = Math.floor(seconds % 60);
          
            return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
        }
        var uptime = process.uptime();
        
        channel.send(`Bot uptime is ${format(uptime)}`);

    } else if(command === 'kickmyballs') {
        message.author.send("🎊 🦶");
        message.author.send("this is a threat");
    } else {
        console.log(`$${author.username}#${author.discriminator}: No Command`);
        channel.send('Command does not exist!');
        return;
    }});
//#endregion

//Buttons
bot.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	
    if(interaction.customId == "ShutdownConfirm")
    {
        shutdown(interaction.channel, interaction.message);
    }
    else if(interaction.customId == "ShutdownCancel")
    {
        interaction.channel.send({content: "Shutdown cancelled."});
        interaction.message.delete(0);
    }
});

bot.on('guildMemberAdd', member => {
    console.log('User ' + member.user.username + ' has joined the server!');
    var role = member.guild.roles.cache.find(role => role.name === 'Member');
    member.roles.add(role);
});

function shutdown(channel, message) {
    channel.send({content: "Understood. Shutting down."})
        .then(async () => {
            bot.user.setPresence({ status: 'invisible'});
            await message.delete(0);
            console.log("Bot shut down from command.");
            process.exit(0);
        });
}

//Credits: Bobrobot1 for helping me out with this bot
//#region owoify Function
function owoify(args, channel) {
    let owoString = "";
    args.forEach(arg => {
        owoString += arg + " ";
    });

    while(owoString.includes('r') || owoString.includes('l') ||
    owoString.includes('R') || owoString.includes('L')) {
        owoString = owoString.replace('r', 'w');
        owoString = owoString.replace('l', 'w');
        owoString = owoString.replace('R', 'W');
        owoString = owoString.replace('L', 'W');
    }

    channel.send(owoString);
}
//#endregion

//Start Bot
bot.login(token.Token);