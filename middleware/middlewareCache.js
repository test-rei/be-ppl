import redis from "../config/cache.js";

// Middleware untuk mengecek cache sebelum melanjutkan request
const cacheResponse = async (req, res, next) => {
    try {
        const key = req.originalUrl; // Gunakan URL asli sebagai key untuk cache

        // Cek cache Redis
        const cachedData = await redis.get(key);
        if (cachedData) {
            console.log("Serving from cache");
            return res.json(JSON.parse(cachedData)); // Mengambil data dari cache Redis jika ada
        }

        // Jika tidak ada cache, lanjutkan ke controller dan simpan data di cache setelah respon
        res.sendResponse = res.json;
        res.json = (body) => {
            if (body) {
                // Cek jika body tidak kosong
                redis.setex(key, 3600, JSON.stringify(body)); // Menyimpan data di cache Redis dengan TTL 1 jam
            }
            return res.sendResponse(body);
        };

        next(); // Melanjutkan ke controller
    } catch (error) {
        console.error("Redis error:", error);
        next(); // Tetap lanjutkan ke controller jika ada error Redis
    }
};

export default cacheResponse;
