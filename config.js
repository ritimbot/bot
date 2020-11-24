module.exports = {
  admins: [], // ADMINLERIN ID'SI ARRAY ICINDE OLMALIDIR.
  botid: "", // BOTUN ID'SI
  token: "", // EFSANEVI TOKEN
  database: "", // MONGO.DB DATABASE URL
  webhooks: {
    shard: { id: "", token: "" }, // SHARD STATUSLARININ GÖNDERİLECEĞİ WEBHOOK
    cluster: { id: "", token: "" } // CLUSTER STATUSLARININ GÖNDERİLECEĞİ WEBHOOK
  },
  projectname: "", // PROJE ADI
  prefix: "", // MAIN PREFIX
  status: "", // OYNUYOR
  shards: 1 // // AÇILACAK SHARD SAYISI, TÜM CLUSTERLARI KULLANMAK İSTİYORSANIZ CLUSTER SAYISINI YAZABİLİRSİNİZ 1 CLUSTER'A 1 SHARD DÜŞECEK ŞEKİLDE
}