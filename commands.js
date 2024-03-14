const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv') ;
dotenv.config() ;
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.login_token);

try {
  console.log('Started refreshing application (/) commands.');
  await rest.put(Routes.applicationCommands(process.env.bot_app_client_id), { body: commands });
  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}