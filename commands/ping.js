module.exports = {
  name: "ping",
  description: "Bot gecikme değerini atar.",
  usage: "--ping",
  aliases: ["gecikme"],
  
  async execute(client, msg, args, thos){
    
        const startTime = Date.now();
        const messageSent = await msg.channel.createMessage(`Ölçülüyor..`);
        return messageSent.edit(`Pong! \`${Date.now() - startTime}\`ms`);
  }
}
