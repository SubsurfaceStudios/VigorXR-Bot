//Config
const { channelMention, SlashCommandSubcommandBuilder } = require('@discordjs/builders');
const { Client, Intents, MessageEmbed, Guild, NewsChannel } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.DIRECT_MESSAGES] });

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
bot.on('messageCreate', message =>{
    if(!message.content.startsWith(pref) || message.author.bot) return;

    const args = message.content.slice(pref.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const channel = message.channel;
    const author = message.author;

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

        const emoteString = "<:HNNNNNNNG:883559297542389782> <:VXRcomplete:882817877806301224> <:floomba:882792620600991755> <:gigaflush:882792234142027816> <:flushy:882792179712552980> <:flushedtroll:882792116017827880> <:flushedsit:882792042072244295> <:awkwardflushed:882792005116239912> <:VXRgrimace:876252319648448532> <:ecks_dee:875194303369072690> <:VigorLogo:861824115283460116> <:gigachad:861823987801391174> <:thinky:861823891802554378> <:walter:861823318515908609> <:troled:861823217978310686> <:plotting:861823124702363688> <:awwwwhhhhh:853688065218707466> <:w_:848982162698403901> <:hecrypneg:846407517302030406> <:VXRCheck:845678436952965140> <:out:844332176119300097> <:dearGodNo:844330919430062130> <:ya:841427725456900106> <:sn:841427672785092610> <:concussion:841427587967877210> <:HAHAHAHAHAHAHAHAHH:841426936832196608> <:spook:841426891013619793> <:angeryyyy:841426816627769354> <:hawt:841426776210800660> <:tfbro:841426567530938390> <:lub:841426318502527021> <:bluhs:841426278099320872> <:sihg:841426232784715796> <:floo:841426008048664648> <:angery:841319000885035020> <:unpog:840704362824859660> pain: <:WAH:837682105344327751> <:ye:837442013892182046> <:sadbenzene:837325823567986740> <:flohed:836335455271256084> <:waa:836268670412914710> <:wat:833186678708895745> <:ooooeeee:833158789925568533> <:sir_gribbles_the_third:824134897991811122> <:wetroaches:824134791557414913> <:depressed_walter:824134683364294676> <:banan_tronk:824134566787809291> <:STOP:824134096325312532> <:Patreon:816851599149760542> <a:amogus:834064048101261332>";
        const emoteArray = emoteString.split(' ');
    
        channel.send(`Random Emote: ${emoteArray[Math.floor(Math.random()*emoteArray.length)]}`)

    } else if(command === 'shutdown' && message.member.roles.cache.has('812976292634427394')) {
        console.log(`$${author.username}#${author.discriminator}: Shutdown Command`);
        shutdown(channel);
    } else if(command === "owoify") {
        console.log(`$${author.username}#${author.discriminator}: owoify Command`);
        if(args[0] == null) {
            channel.send('Please set args.');
        }
        else {
            owoify(args, channel);
        }
    } else {
        console.log(`$${author.username}#${author.discriminator}: No Command`);
        channel.send('Command does not exist!');
        return;
    }});
//#endregion

function shutdown(channel) {
    channel.send('Bot has been shut down.');
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