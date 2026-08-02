module.exports = {
  config: {
    name: "spam",
    version: "1.0",
    author: "ChatGPT",
    countDown: 5,
    role: 2, // Admin Only
    shortDescription: "Spam text",
    longDescription: "Send a message multiple times",
    category: "admin",
    guide: {
      en: "{pn} <count> <text>"
    }
  },

  onStart: async function ({ args, message }) {
    const count = parseInt(args[0]);

    if (!count || count <= 0)
      return message.reply("❌ Usage: spam <count> <text>");

    if (count > 100)
      return message.reply("❌ Maximum limit is 100.");

    const text = args.slice(1).join(" ");

    if (!text)
      return message.reply("❌ Please enter a message.");

    for (let i = 0; i < count; i++) {
      await message.send(text);
    }
  }
};
