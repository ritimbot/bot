module.exports = {
  name: "ping",
  aliases: ["gecikme"],
  execute(client, msg, args){
    
    client.msgCreate(msg.channel.id, "Pong! "+)
  }
}