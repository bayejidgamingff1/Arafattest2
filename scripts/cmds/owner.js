const fs = require("fs").promises;
const fssync = require("fs");
const path = require("path");
const axios = require("axios");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "owner",
    version: "2.0",
    author: "BAYEJID",
    category: "owner",
    guide: {
      en: "Use !owner or type Bayejid Admin to view owner information."
    }
  },

  onStart: async function ({ api, event }) {
    if (!this.sentThreads) this.sentThreads = {};
    if (this.sentThreads[event.threadID]) return;
    this.sentThreads[event.threadID] = true;

    const ownerInfo = {
      name: "𝐁𝐀𝐘𝐄𝐉𝐈𝐃 🕊️",
      gender: "Male 🧑🏻",
      age: "17",
      from: "Bangladesh 🇧🇩",
      hobby: "Gaming 🎮",
      status: "Student 📚",
      bio: "Tabu Forever ❤️",
      botName: "SIJUKA",
      nick: "BAYEJID"
    };

    const sec = process.uptime();
    const botUptime =
      `${Math.floor(sec / 86400)}d ` +
      `${Math.floor((sec % 86400) / 3600)}h ` +
      `${Math.floor((sec % 3600) / 60)}m`;

    const now = moment()
      .tz("Asia/Dhaka")
      .format("hh:mm A • dddd");

    const body = `
█▀ █ ░░█ █░█ █▄▀ ▄▀█
▄█ █ █▄█ █▄█ █░█ █▀█

╔════════════════════════════╗
       ⚡ 𝗦𝗜𝗝𝗨𝗞𝗔 ⚡
   「𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗘𝗗𝗜𝗧𝗜𝗢𝗡」
╚════════════════════════════╝

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃ 👑 𝗢𝗪𝗡𝗘𝗥 𝗣𝗥𝗢𝗙𝗜𝗟𝗘
╰━━━━━━━━━━━━━━━━━━━━━━╯

➤ 👤 Name    : ${ownerInfo.name}
➤ 🚹 Gender  : ${ownerInfo.gender}
➤ 🎂 Age     : ${ownerInfo.age}
➤ 🌍 Country : ${ownerInfo.from}
➤ 🎮 Hobby   : ${ownerInfo.hobby}
➤ 📚 Status  : ${ownerInfo.status}

━━━━━━━━━━━━━━━━━━━━━━
`;🤖 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢
━━━━━━━━━━━━━━━━━━━━━━

➤ 🤖 Bot Name : ${ownerInfo.botName}
➤ 💖 Bio      : ${ownerInfo.bio}
➤ 👑 Owner    : ${ownerInfo.nick}

━━━━━━━━━━━━━━━━━━━━━━

⚡ 𝗦𝗧𝗔𝗧𝗨𝗦
━━━━━━━━━━━━━━━━━━━━━━

➤ ⏳ Uptime : ${botUptime}
➤ 🕒 Time   : ${now}
➤ 🟢 Status : Online

━━━━━━━━━━━━━━━━━━━━━━

💌 𝗖𝗢𝗡𝗧𝗔𝗖𝗧
━━━━━━━━━━━━━━━━━━━━━━

➤ 👑 Facebook : ${ownerInfo.nick}
➤ 💬 Messenger: ${ownerInfo.nick}

━━━━━━━━━━━━━━━━━━━━━━

✨ Random Quote ✨

❝
Success isn't luck.
It's consistency,
patience and hard work.
❞

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃ ❤️ Thanks For Using
┃ 🤖 ${ownerInfo.botName}
┃ 🌸 Have A Great Day!
╰━━━━━━━━━━━━━━━━━━━━━━╯
`;const imageUrl = "https://files.catbox.moe/eaydp3.jpg";
    const imagePath = path.join(__dirname, "cache", "owner.jpg");

    try {
      const response = await axios.get(imageUrl, {
        responseType: "stream"
      });

      const writer = response.data.pipe(
        fssync.createWriteStream(imagePath)
      );

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      const msg = await api.sendMessage(
        {
          body,
          attachment: fssync.createReadStream(imagePath)
        },
        event.threadID
      );

      this.lastOwnerMsgID = msg.messageID;

      try {
        await fs.unlink(imagePath);
      } catch (e) {}
    }
    catch (err) {
      console.error("Owner Command Error:", err);

      const msg = await api.sendMessage(
        body,
        event.threadID
      );

      this.lastOwnerMsgID = msg.messageID;
    }
  },

  onChat: async function ({ api, event }) {
    if (!event.body) return;

    const text = event.body.toLowerCase().trim();

    if (
      text === "!owner" ||
      text === "owner" ||
      text === "bayejid admin" ||
      text === "admin"
    ) {
      return this.onStart({ api, event });
    }
  }
};
