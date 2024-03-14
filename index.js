const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const dotenv = require("dotenv");
const  handleTextQuery  = require("./textQueryController");

dotenv.config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === "hi") {
    message.reply({
      content: "Hello from bot",
    });
  } else if (message.content.toLowerCase() === "who are you") {
    message.reply({
      content:
        "I am a nodejs bot created by Mr.Karan Bhanushali a Software Developer in Mumbai",
    });
  } else if (message.content.toLowerCase() === "tell more about your creator") {
    message.reply({
      content:
        "Karan Bhanushali is a Software Developer and B.E Computer Science student from University of Mumbai.He holdes an experise in Full Stack Development :- (HTML5,CSS3,Javascript,React.js,Tailwind.css,Bootstrap,Next.js) in frontend development and (Node.js,MongoDB,Postman-API,Docker,Kubernetes) in Backend Development. Also builds mobile application with React-Native",
    });
  } else {
    const replyAnswer = handleTextQuery(message.content);
    message.reply({
      replyAnswer,
    });
  }

  console.log(message.content);
});

client.login(process.env.login_token);
