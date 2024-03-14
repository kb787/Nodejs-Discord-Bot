const { Client, GatewayIntentBits } = require('discord.js') ;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const dotenv = require('dotenv') ;

dotenv.config() ;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.on('messageCreate',(message) => {
    console.log(message.content)
})

client.login(process.env.login_token);