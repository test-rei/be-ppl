import Redis from "ioredis";

// Gunakan URL yang disediakan oleh Railway untuk mengonfigurasi koneksi Redis
const redis = new Redis(process.env.REDIS_PUBLIC_URL); // Menggunakan variabel lingkungan

redis.on("connect", () => {
    console.log("Connected to Redis");
});

redis.on("error", (err) => {
    console.error("Redis error:", err);
});

export default redis;
