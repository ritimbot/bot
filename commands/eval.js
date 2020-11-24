module.exports = {
  name: "eval",
  description: "Bot dışardan eval alır.",
  usage: "--eval console.log()",
  aliases: ["heval", "hewal", "run", "try"],
  
  async execute(client, msg, args, thos){
    const message = msg;
    function clean(text) {
      if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      }
      else{
      return text;
      }
    }
    
    if(!client.config.admins.includes(msg.author.id)){
      msg.channel.createMessage(":x: Bu komutu kullanabilmek için gerekli yetkin yok. **[BOT_OWNER]**")
    }else{
      try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        // "`INPUT`\n```js\n"+code+"```\n`OUTPUT`\n"+"```js\n"+clean(evaled)+"```"
      msg.channel.createMessage({embed: {description: "`INPUT`\n```js\n"+code+"```\n`OUTPUT`\n"+"```js\n"+clean(evaled)+"```", footer: {text: `Created by erdem#0085 with ♥️`}}});
    } catch (err) {
      msg.channel.createMessage({embed: {description: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``}});
    }
    }
  }
}
