global.chudi2Interval = null;

module.exports = {
  config: {
    name: "chudi",
    aliases: ["r", "chod"],
    version: "1.0",
    author: "bayejid",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Danger gali chudi",
    },
    longDescription: {
      en: "chudi the mentioned user line by line with dangerous gali style!",
    },
    category: "Fun",
    guide: {
      en: "{pn} @mention",
    },
  },

  onStart: async function ({ message, api, event }) {
    const mentions = Object.keys(event.mentions);
    if (mentions.length === 0)
      return message.reply("❌ BOSS খানকির পোলা কে MENTION দেন!");

    const targetID = mentions[0];
    const targetName = event.mentions[targetID];
    const tagText = `@${targetName}`;

    const chudi = [
      "চুদা Start🥵🍌🖕🏿",
      "‎খাংকির পোলা তর কচি বোন রে চুদি 😍🩹",
      "‎ভোদাই জানে চোদার মজা তোর মাকে জিজ্ঞেস কর কেমন দিছিলাম চোদা 🥰। নিশি রাতে তোর মাকে চুদে পেয়েছিলাম অনেক আনন্দ।🤩✊🏻🗑️",
      "‎খাংকির পোলা তর কচি ভুদায় ভুদায় কামর দিমু 💔! তুর মারে আটলান্টিক মহাসাগরের মাঝামাঝি গলা টিপে ধরে চুদতে চুদতে ভুদার মাসিক চেন্জ করমো 🙈🚛",
      "‎মাদারচোদ তর আম্মু পম পম খাংকির পো 🐰🐐",
      "‎খাংকি মাগির পোলা কথা ক কম কম তর আম্মু রে চুদে বানামু আইটেম বোম😬",
      "‎depression থেকেও তর মাইরে চু*** দি 🥵🍌🔪",
      "‎তর আম্মু রে আচার এর লোভ দেখিয়ে আমি চুদি মাগির পোলা🤬 🚬",
      "‎বান্দির পোলা তর কচি বোনের ভুদা ফাক কর থুতু দিয়ে ভুদায় দন ডুকামু  👡",
      "‎বান্দি মাগির পোলা তর আম্মু রে চুদি তর দুলা ভাই এর কান্দে ফেলে 🤝💩",
      "‎হাই মাদারচোদ তর ব্যাশা জাতের আম্মু টা রে আদর করে করে চুদি🪧",
      "~ চুদা কি আরো খাবি মাগির পোল 🤖 ভাগলে তুর মারে তুর বাপ কাকায় সবাই এক লগে চুদে 🌸💋❤️🙀❤️❤️🎶",
      "‎পতিতা মাগির পোলা __ তোর মারে শেখ হাসিনা এর জামাই নরেন্দ্র মোদি কে দিয়ে পুটকি মারি😝🤨🤨📿",
      "‎উফফফ খাদ্দামা মাগির পোলা তর আম্মুর কালা ভুদায় আমার মাল আউট তর কচি বোন রে উপ্তা করে এবার চুদবো 💉। খানকি মাগির পোলা তুর মারে চাইনা রেস্তোরাঁ নিয়ে জাইয়া রেসিপি লোভ দেখিয়ে চুদি তুই কি রাগ করবি 😅🤣💋🥵💋😹💋🛢️",
      "‎অনলাইনে গালি বাজ হয়ে গেছত মাগির পোলা এমন চুদা দিমু লাইফ টাইম মনে রাখভি ʀᴜᴘᴏᴋ তর বাপ মাগির ছেলে 😘।🍗",
      "‎মাদারচোদ😍.. __ এত কথা বাদ চল ২ জন মিলে তর মারে ধষন করি কালা মাগীর পুত ︵❛❛༎ 🦋🖇️🌈🍒-!!📸",
      "‎ব্যাশ্যা মাগির পোলা 💔! __তর মার কচি ভুদায় ৭০ মণ বাগুন চাষ করমু নডির পুত পাগল ছাগল 💦👄💚🌻💯🫧",
      "‎তর মারে চুদি আপনার মারে ভুতের গল্প সুনিয়ে আসতে আসতে শির শির ভাবে চুদতে জায় 👍🥀😂🥀💋📚",
      "‎বাস্ট্রাড এর বাচ্ছা বস্তির পোলা __ তোর মাকে গ্রীন লাইন গাড়ির ছাদের উপর ফালিয়ে ভোদার উপর পাড়া দিয়া চুদবো-))!!💦👄🐰💚🌻💯 🛣️",
      "‎খাংকির পোলা তর কচি বোন রে চুদি 😍."
    ];

    let index = 0;
    const threadID = event.threadID;

    function sendchudi() {
      if (index < chudi.length) {
        api.sendMessage(
          {
            body: `${tagText}, ${chudi[index]}`,
            mentions: [{ id: targetID, tag: tagText }],
          },
          threadID,
          (err, info) => {
            global.lastchudi2Msg = info?.messageID;
          },
        );
        index++;
      } else {
        clearInterval(global.chudi2Interval);
        global.chudi2Interval = null;
      }
    }

    global.chudi2Interval = setInterval(sendchudi, 1800);

    message.reply(
      `🔥 খানকির পোলা কে চোদা শুরু করলাম 🥵 ${targetName}!\nType "STOP" to cancel শুধুমাত্র "BOSS" BAYEJID বন্ধ করতে পারবে 😎 .`,
    );
  },

  onChat: async function ({ event, message }) {
    if (
      ["stop", "off"].includes(event.body?.toLowerCase()) &&
      global.chudi2Interval
    ) {
      clearInterval(global.chudi2Interval);
      global.chudi2Interval = null;
      return message.reply(" যা খানকির পোলা এইবারের মতো BOSS এর কথা মতো ছেরে দিলাম 😎 !");
    }
  },
};
