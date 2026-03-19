const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    // Not strictly needed 
    
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  // Delete if 4+ attachments in ONE message
  
  if (message.attachments.size >= 4) {
    try {
      await message.delete();
      console.log(
        `Deleted ${message.attachments.size} attachments from ${message.author.tag} in #${message.channel.name}`
      );
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  }
});

client.login(process.env.TOKEN);
