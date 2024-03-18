const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const dotenv = require("dotenv");
// const handleTextQuery = require("./textQueryController");
const {
  handleHeadlineNewsQuery,
  handleCompleteNewsQuery,
} = require("./newsQueryController");

const handleJokeRequest = require("./jokesHandlingController");

const handleDisplayDateTime = () => {
  const date = new Date();
  const result = `The date is ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}  and time is ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return result;
};

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
  } else if (message.content.toLowerCase() === "what task you can perform") {
    message.reply({
      content:
        "I can perform task like giving you news headlines, complete news , jokes, and answers to your general questions",
    });
  } else if (
    message.content.toLowerCase() === "tell me current date and time"
  ) {
    const output = handleDisplayDateTime();
    {
      message.reply({
        content: output,
      });
    }
  } else if (message.content.toLowerCase() === "tell more about your creator") {
    message.reply({
      content:
        "Karan Bhanushali is a Software Developer and B.E Computer Science student from University of Mumbai.He holdes an experise in Full Stack Development :- (HTML5,CSS3,Javascript,React.js,Tailwind.css,Bootstrap,Next.js) in frontend development and (Node.js,MongoDB,Postman-API,Docker,Kubernetes) in Backend Development. Also builds mobile application with React-Native",
    });
  }
  // }
  else if (
    message.content.toLowerCase() === "tell me news headlines" ||
    message.content.includes("news headlines")
  ) {
    message.reply({
      content: "Please enter the domain you want news headlines",
    });

    const filter = (m) => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({
      filter,
      max: 1,
      time: 60000,
    });

    collector.on("collect", async (m) => {
      const input = m.content;

      try {
        const headlineResponse = await handleHeadlineNewsQuery(input);
        message.reply({ content: JSON.stringify(headlineResponse) });
      } catch (error) {
        const errorMessage = `Unable to process your request due to error ${error}`;
        message.reply({ content: JSON.stringify(errorMessage) });
      }
    });

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        message.reply("You didn't provide domain in time.");
      }
    });
  } else if (message.content.toLowerCase() === "tell me a joke") {
    handleJokeRequest()
      .then((joke) => {
        if (joke) {
          message.reply({ content: joke.toString() });
        } else {
          message.reply({ content: "Unable to fetch a joke." });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (message.content.toLowerCase() === "tell me complete news") {
    message.reply({
      content: "Type the domain you want news",
    });
    const filter = (m) => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({
      filter,
      max: 1,
      time: 60000,
    });

    collector.on("collect", async (m) => {
      // const input = m.content.split(",");
      // const userTopic = input[0].trim();
      // const userDomain = input[1].trim();

      const input = m.content;

      try {
        const headlineResponse = await handleCompleteNewsQuery(input);
        message.reply({ content: JSON.stringify(headlineResponse) });
      } catch (error) {
        const errorMessage = `Unable to process your request due to error ${error}`;
        message.reply({ content: JSON.stringify(errorMessage) });
      }
    });

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        message.reply("You didn't provide the domain name in time.");
      }
    });
  }

  console.log(message.content);
});

client.login(process.env.login_token);
