const { Master: Sharder } = require('eris-sharder');
const config = require("./config");

process.on('beforeExit', () => setTimeout(() => { process.exit() }, 10000));
process.on('SIGINT', () => setTimeout(() => { process.exit() }, 10000));

const master = new Sharder(config.token, '/main.js', {
    stats: true,
    name: config.projectname, 
    clientOptions: {
        disableEvents: {
            TYPING_START: true
        },
        messageLimit: 0,
        defaultImageSize: 1024,
        restMode: true,
    },
    webhooks: {
        shard: { id: config.webhooks.shard.id, token: config.webhooks.shard.token },
        cluster: { id: config.webhooks.cluster.id, token: config.webhooks.cluster.token }
      },
    debug: true,
    shards: config.shards,
    clusters: require('os').cpus().length
});

master.on('stats', res => master.broadcast(1, { type: 'statsUpdate', data: res }));


