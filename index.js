/* TURNS ON THE BOT */
const { Client, GatewayIntentBits, PermissionBitField, Permissions } = require(`discord.js`);
const {EmbedBuilder} = require('discord.js');
const prefix = '>';
const client = new Client ({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log('Bot is online!');
  
  //status
  client.user.setActivity(`>help`), {type: 'PLAYING'}; //watching playing repeating competing listening etc
})

client.login('MTA2MDAyMzIyOTIxOTA4MjI4Mg.GkYy-5.g0PJyG_MnpiotFK7nRxKg_53kGr1HlxkIIu8pc')


/* RUNS THE COMMANDS */
client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  //message array var
  const messageArray = message.content.split(" ");
  const argument = messageArray.slice(1);
  const cmd = messageArray[0];

  // commands
  if (command === 'help') {
    message.channel.send(':purple_heart: **Welcome to COSMOS2023!** :purple_heart: Current commands are: \n >help *(to list all available commands)*\n >test *(for devs)*\n >membercount *(displays the total number of members)*\n >embed *(displays a basic embed)*\n >warn *(tag the user for it to work)*')
  };

  if (command === 'test') {
    message.channel.send('hello world')
  };

  //membercount

  if (cmd === `${prefix}membercount`){
    message.channel.send(`**Server Members:** ${message.guild.memberCount}`)
  }

  //embed
  if (command === 'embed'){
    const exampleEmbed = new EmbedBuilder() //MessageEmbed no longer works
    .setColor('LuminousVividPink')
    .setTitle('Embed Title')
    .setDescription('Embed description. Thumbnail credit to @CU9#5558. Image credit meteora')
    .setThumbnail('https://media.tenor.com/0XvJ3zg--UAAAAAC/lake-serenity.gif')
    .setImage('https://cdn.discordapp.com/attachments/682064671028805798/1048265909065752576/D0F872C3-2FA2-4844-B623-9D0632CF105F.jpg')
    .setTimestamp()
    //.addFields .setFooter .setURL

    message.channel.send({embeds: [exampleEmbed]});
  }

  // warn command
  if (command === 'warn'){
    const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));

    //kickmembers
    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You do not have permission to excecute this command! Moron!")
    //if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.channel.send("I don't have permission to warn people! Idiot!")

    //self-warn
    if (message.member === member) return message.channel.send("You cannot warn yourself! You know better!")

    if (!member.kickable) return message.channel.send("I cannot kick this user as they have perms over me. Check the roles you fool!")
    if (!argument[0]) return message.channel.send('You must specify someone in this command!')

    let reason = argument.slice(1).join(" ") || 'No reason given.'

    const dmEmbed = new EmbedBuilder()
    .setDescription(`You were **warned** in ${message.guild.name} | ${reason}`)
    .setColor('0xFF0000')

    const embed = new EmbedBuilder()
    .setDescription(`${member} has been **warned** | ${reason}`)
    .setColor('0xFFFF00')

    message.channel.send({embeds: [embed]})
    member.send({embeds: [dmEmbed]}).catch(err => {console.log("This user has their DMs off. How will we be able to warn them? :sob:")})
  }



});

























