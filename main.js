const { readdirSync } = require("fs");
const { join } = require("path");
const { Base, Collection } = require('eris-sharder');

const config = require("./config")
const { Database } = require("quickmongo"); 
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));


class Main extends Base {
    constructor(bot) {
        super(bot);
    }
    async launch() {
      this.eris = require("eris");
      console.log(`${this.clusterID} joined!`);
      this.bot.commands = new this.eris.Collection();
      this.bot.editStatus("online", {name: config.status, type: 2});
      this.bot.config = config;
      this.bot.db = new Database(config.database);
      this.bot.admins = config.admins;
      for (const file of commandFiles) {
        const command = require(join(__dirname, "commands", `${file}`));
        this.bot.commands.set(command.name, command);
      }
      this.bot.db.on("ready", () => console.log("Database bağlandı."));
      
      this.bot.on("messageCreate", async msg => {
        if(msg.guildID == undefined) return;
        if(msg.author.bot) return;
        let prefix = await this.bot.db.get(`servers.${msg.guildID}.prefix`)|| "--";
        if(msg.content == `<@!${config.botid}>` || msg.content == `<@${config.botid}>`) return this.bot.createMessage(msg.channel.id, `**Sunucudaki Ön-Ek**: ${prefix}`);
        
        if(msg.content.startsWith(`<@!${config.botid}> `)){
          let prefix = `<@!${config.botid}> `
        }else if(msg.content.startsWith(`<@${config.botid}> `)){
          let prefix = `<@${config.botid}> `
        }
        
        if(msg.content.startsWith(prefix)){
          const args = msg.content.slice(prefix.length).trim().split(/ +/);
          const commandName = args.shift().toLowerCase();
          
          const command = this.bot.commands.get(commandName) || this.bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
          if (!command) return;
          
          try {
            command.execute(this.bot, msg, args, this);
          } catch (error) {
            console.error(error);
            this.bot.createMessage(msg.channel.id ,":x: Komut yürütülürken bilinmedik bir hata oluştu, lütfen yapımcı ile iletişime geçmeyi deneyin.").catch(console.error);
          }
        }
      });
    }
}
module.exports = Main;
