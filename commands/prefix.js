module.exports = {
  name: "prefix",
  description: "Bot'un prefixini değiştirir.",
  usage: "--prefix newprefix",
  example: "--prefix !",
  aliases: ["setprefix", "onek", "önek", "ön-ek"],
  
  async execute(client, msg, args, thos){
    let message = msg;
    let prefix = await client.db.get(`servers.${msg.guildID}.prefix`) || "--";
    if(msg.member.permission.json.administrator == true || client.config.admins.includes(msg.author.id)) {
      if(args.length == 0) return msg.channel.createMessage(":x: Prefixin değiştirilmesi için bir prefix girmelisiniz. Güncel prefix: "+prefix);
      await client.db.set(`servers.${msg.guildID}`, {prefix: `${args[0]}`}) 
      message.channel.createMessage(`:white_check_mark: Sunucu ön-eki **${args[0]}** olarak değiştirildi. `)
    } else {
      msg.channel.createMessage(`:x: Bu komutu kullanabilmek için gerekli yetkin yok. **[ADMINISTRATOR]**\n Bu Sunucudaki güncel prefix: ${prefix}`)
    }
  }
}
