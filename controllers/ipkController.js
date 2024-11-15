import IPK from "../models/ipk.js";
import MHS from "../models/mhs.js";
import KRS from "../models/krs.js";
import { calculateIPS, calculateIPK } from "./calculateIP.js";
import redis from "../config/cache.js";

export async function getAllIPK(req, res) {
    try {
        const ipkList = await IPK.findAll({
            include: [{ model: MHS }],
        });
        res.status(200).json(ipkList);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve IPK list" });
    }
}

export async function getIPKByNIM(req, res) {
    try {
        const nim = req.params.nim; // Ambil NIM dari parameter URL
        const ipk = await IPK.findAll({
            where: { nim }, // Cari berdasarkan NIM
            include: [{ model: MHS }],
        });
        if (ipk.length === 0) {
            // Jika tidak ada data IPK ditemukan
            return res.status(404).json({ error: "IPK not found for the specified NIM" });
        }
        res.status(200).json(ipk);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve IPK" });
    }
}

export async function getAllIPKCalculate(req, res) {
    try {
        // Ambil seluruh data mahasiswa dari tabel MHS
        const mhsList = await MHS.findAll();

        // Hitung IP untuk setiap mahasiswa berdasarkan semester dan tahun
        const mhsWithIPList = await Promise.all(
            mhsList.map(async (mhs) => {
                // Ambil seluruh data KRS mahasiswa tersebut untuk mendapatkan daftar semester dan tahun yang diambil
                const krsList = await KRS.findAll({
                    where: { nim: mhs.nim },
                    attributes: ["semester", "tahun"], // Ambil hanya semester dan tahun
                    group: ["semester", "tahun"], // Group by semester dan tahun
                    order: [
                        ["tahun", "ASC"], // Urutkan berdasarkan tahun dari terkecil
                        ["semester", "ASC"], // Urutkan berdasarkan semester dari terkecil
                    ],
                });

                // Jika tidak ada data KRS untuk mahasiswa ini, kembalikan dengan nilai default
                if (krsList.length === 0) {
                    return {
                        nim: mhs.nim,
                        nama_mhs: mhs.nama_mhs,
                        ipList: [], // Tidak ada data IP jika KRS kosong
                    };
                }

                // Loop setiap semester dan tahun untuk menghitung IPS dan IPK
                const ipList = await Promise.all(
                    krsList.map(async (krs) => {
                        const { semester, tahun } = krs;

                        // Hitung IPS untuk semester dan tahun ini
                        const ips = await calculateIPS(mhs.nim, semester, tahun);

                        // Hitung IPK kumulatif hingga semester dan tahun ini
                        const ipk = await calculateIPK(mhs.nim, semester, tahun);

                        return {
                            semester,
                            tahun,
                            ips: ips || 0, // IPS untuk semester dan tahun tersebut
                            ipk: ipk || 0, // IPK kumulatif hingga semester dan tahun tersebut
                        };
                    })
                );

                // Return data mahasiswa dengan list IP (IPS & IPK) berdasarkan semester dan tahun
                return {
                    nim: mhs.nim,
                    nama_mhs: mhs.nama_mhs,
                    ipList, // List IP per semester dan tahun
                };
            })
        );

        // Kirimkan response berisi data mahasiswa lengkap dengan list IP per semester dan tahun
        res.status(200).json(mhsWithIPList);
    } catch (error) {
        console.error("Error calculating IP list:", error);
        res.status(500).json({ error: "Failed to retrieve IP list for all students" });
    }
}

export async function getIPKByNIMCalculate(req, res) {
    try {
        const nim = req.params.nim;
        const mhs = await MHS.findByPk(nim);

        // Jika mahasiswa tidak ditemukan, return 404
        if (!mhs) {
            return res.status(404).json({ error: "MHS not found" });
        }

        // Ambil seluruh data KRS mahasiswa tersebut untuk mendapatkan daftar semester dan tahun yang diambil
        const krsList = await KRS.findAll({
            where: { nim },
            attributes: ["semester", "tahun"], // Ambil hanya semester dan tahun
            group: ["semester", "tahun"], // Group by semester dan tahun
            order: [
                ["tahun", "ASC"], // Urutkan berdasarkan tahun dari terkecil
                ["semester", "ASC"], // Urutkan berdasarkan semester dari terkecil
            ],
        });

        // Jika tidak ada data KRS untuk mahasiswa ini, kembalikan dengan nilai default
        if (krsList.length === 0) {
            return res.status(200).json({
                nim: mhs.nim,
                nama_mhs: mhs.nama_mhs,
                ipList: [], // Tidak ada data IP jika KRS kosong
            });
        }

        // Loop setiap semester dan tahun untuk menghitung IPS dan IPK
        const ipList = await Promise.all(
            krsList.map(async (krs) => {
                const { semester, tahun } = krs;

                // Hitung IPS untuk semester dan tahun ini
                const ips = await calculateIPS(nim, semester, tahun);

                // Hitung IPK kumulatif hingga semester dan tahun ini
                const ipk = await calculateIPK(nim, semester, tahun);

                return {
                    semester,
                    tahun,
                    ips: ips || 0, // IPS untuk semester dan tahun tersebut
                    ipk: ipk || 0, // IPK kumulatif hingga semester dan tahun tersebut
                };
            })
        );

        // Return data mahasiswa dengan list IP (IPS & IPK) berdasarkan semester dan tahun
        res.status(200).json({
            nim: mhs.nim,
            nama_mhs: mhs.nama_mhs,
            ipList, // List IP per semester dan tahun
        });
    } catch (error) {
        console.error("Error calculating IP list for NIM:", error);
        res.status(500).json({ error: "Failed to retrieve IP list for student" });
    }
}

export async function createIPK(req, res) {
    try {
        const { nim, semester, tahun, ips, ipk } = req.body;
        if (!nim || !semester || !tahun || ips === undefined || ipk === undefined) {
            return res.status(400).json({ error: "NIM, semester, tahun, IPS, and IPK are required" });
        }
        const newIPK = await IPK.create({ nim, semester, tahun, ips, ipk });

        // Menghapus cache yang relevan
        await redis.del(`/ipk`);

        res.status(201).json(newIPK);
    } catch (error) {
        res.status(500).json({ error: "Failed to create IPK" });
    }
}

export async function updateIPK(req, res) {
    try {
        const id_ipk = req.params.id;
        const { nim, semester, tahun, ips, ipk } = req.body;

        const ipkData = await IPK.findByPk(id_ipk);
        if (!ipkData) {
            return res.status(404).json({ error: "IPK not found" });
        }

        ipkData.nim = nim || ipkData.nim;
        ipkData.semester = semester || ipkData.semester;
        ipkData.tahun = tahun || ipkData.tahun;
        ipkData.ips = ips || ipkData.ips;
        ipkData.ipk = ipk || ipkData.ipk;

        await ipkData.save();

        // Menghapus cache yang relevan
        await redis.del(`/ipk`);
        await redis.del(`/ipk/${nim}`);

        res.status(200).json(ipkData);
    } catch (error) {
        res.status(500).json({ error: "Failed to update IPK" });
    }
}

export async function deleteIPK(req, res) {
    try {
        const id_ipk = req.params.id;
        const ipkData = await IPK.findByPk(id_ipk);
        if (!ipkData) {
            return res.status(404).json({ error: "IPK not found" });
        }

        // Menghapus cache yang relevan
        await redis.del(`/ipk`);
        await redis.del(`/ipk/${ipkData.nim}`);

        await ipkData.destroy();

        res.status(200).json({ message: "IPK deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete IPK" });
    }
}
