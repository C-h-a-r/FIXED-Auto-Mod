const Discord = require('discord.js');
const client = new Discord.Client();
const Fs = require('fs')



client.on("guildMemberAdd", async (member) => {
  let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));
  UserJSON[member.id] = {
                warns: 0
            }
            Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));
})




let badWords = ["badword", "very bad word", "another bad word"]
client.on("message", async message => {
  let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));

  if (!UserJSON[message.author.id]) {
    if (message.author.bot) return;
    UserJSON[message.author.id] = {
      warns: 0
    }
    Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));
  }
for (i = 0; i < badWords.length; i++) {
if (message.content.toLowerCase().includes(badWords[i])) {
await message.delete();
message.reply("no bad words");







            UserJSON[message.author.id].warns += 1;
            Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));



if (UserJSON[message.author.id].warns === 3) {
 
(Fs.readFileSync("./DB/users.json"));
  UserJSON[message.author.id].warns = 0;
  Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

  const user = message.member
  let role = message.guild.roles.cache.find(r => r.name === "Muted");

  user.roles.add(role)
  console.log(`lol i muted ${message.author}`)
}
        }
    }
})



client.login(process.env.TOKEN)
