//src/app/libs/redisClient.ts
const redis = require("redis");

// Skapa en konfigurationsobjekt om nödvändigt
const redisConfig = {
  host: "localhost", // eller din Redis-serveradress
  port: 6379, // standardport för Redis
  // Lägg till ytterligare konfiguration vid behov, såsom lösenord
};

const client = redis.createClient(redisConfig);

client.on("error", (err) => {
  console.error("Redis error: ", err);
});

module.exports = client;
