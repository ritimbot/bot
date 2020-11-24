module.exports = {
  name: "ping",
  aliases: ["gecikme"],
  async execute(client, msg, args){
        const zaman = Date.now();
        const gonder = await client.createMessage(msg.channel.id, `Ölçülüyor..`);
        return gonder.edit(`Pong! \`${Date.now() - zaman}\`ms`);
  }
}
