import MK from "../models/mk.js";
import MHS from "../models/mhs.js";
import IPK from "../models/ipk.js";
import KRS from "../models/krs.js";
import { calculateIPS, calculateIPK } from "./calculateIP.js";
import redis from "../config/cache.js";

export async function getAllMK(req, res) {
    try {
        const mkList = await MK.findAll();
        res.status(200).json(mkList);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve MK list" });
    }
}

export async function getMKById(req, res) {
    try {
        const id = req.params.id;
        const mk = await MK.findByPk(id);
        if (!mk) {
            return res.status(404).json({ error: "MK not found" });
        }
        res.status(200).json(mk);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve MK" });
    }
}

export async function createMK(req, res) {
    try {
        const { nama_mk, sks } = req.body;
        if (!nama_mk || !sks) {
            return res.status(400).json({ error: "Nama MK and SKS are required" });
        }
        const newMK = await MK.create({ nama_mk, sks });

        // Menghapus cache yang relevan
        await redis.del(`/mk`);

        res.status(201).json(newMK);
    } catch (error) {
        res.status(500).json({ error: "Failed to create MK" });
    }
}

export async function updateMK(req, res) {
    try {
        const id = req.params.id;
        const { nama_mk, sks } = req.body;

        const mk = await MK.findByPk(id);
        if (!mk) {
            return res.status(404).json({ error: "MK not found" });
        }

        // Update mata kuliah
        mk.nama_mk = nama_mk || mk.nama_mk;
        mk.sks = sks || mk.sks;
        await mk.save();

        // Cari semua KRS yang terkait dengan mata kuliah yang di-update (semua semester dan tahun)
        const krsList = await KRS.findAll({ where: { id_mk: id } });

        // Set mahasiswa dan semester/tahun yang harus dihitung ulang IP-nya
        const semesterTahunTerpengaruh = new Map();

        for (const krs of krsList) {
            const key = `${krs.nim}-${krs.semester}-${krs.tahun}`;
            if (!semesterTahunTerpengaruh.has(key)) {
                semesterTahunTerpengaruh.set(key, { nim: krs.nim, semester: krs.semester, tahun: krs.tahun });
            }
        }

        // Kalkulasi ulang IPS dan IPK hanya untuk semester dan tahun yang terkait
        for (const { nim, semester, tahun } of semesterTahunTerpengaruh.values()) {
            // Hitung ulang IPS untuk semester dan tahun tersebut
            const ips = await calculateIPS(nim, semester, tahun);

            // Update tabel IPK hanya untuk semester/tahun tersebut
            await IPK.upsert({
                nim,
                semester,
                tahun,
                ips,
                ipk: await calculateIPK(nim, semester, tahun), // Tambahkan semester dan tahun ke dalam perhitungan IPK
            });

            // Cari semester dan tahun terakhir dari mahasiswa
            const krsTerakhir = await KRS.findOne({
                where: { nim },
                order: [
                    ["tahun", "DESC"],
                    ["semester", "DESC"],
                ],
            });

            // Jika mata kuliah yang di-update ada di semester terakhir mahasiswa, perbarui IPS di tabel MHS
            const mhs = await MHS.findByPk(nim);
            if (mhs) {
                if (krsTerakhir && krsTerakhir.semester === semester && krsTerakhir.tahun === tahun) {
                    mhs.ips = ips; // Hanya update IPS jika semester/tahun terakhir terpengaruh
                }
                mhs.ipk = await calculateIPK(nim, semester, tahun); // IPK tetap diperbarui
                await mhs.save();
            }

            // Hapus cache yang relevan setelah update
            await redis.del(`/krs/${nim}`);
            await redis.del(`/ipk/${nim}`);
            await redis.del(`/ipkc/${nim}`);
            await redis.del(`/mhs/${nim}`);
            await redis.del(`/mhsc/${nim}`);
        }

        // Hapus cache yang relevan setelah update
        await redis.del(`/mk`);
        await redis.del(req.originalUrl);
        await redis.del(`/krs`);
        await redis.del(`/ipk`);
        await redis.del(`/ipkc`);
        await redis.del(`/mhs`);
        await redis.del(`/mhsc`);

        res.status(200).json(mk);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update MK" });
    }
}

export async function deleteMK(req, res) {
    try {
        const id = req.params.id;
        const mk = await MK.findByPk(id);
        if (!mk) {
            return res.status(404).json({ error: "MK not found" });
        }

        // Cari semua KRS yang terkait dengan mata kuliah yang akan dihapus
        const krsList = await KRS.findAll({ where: { id_mk: id } });

        // Set mahasiswa dan semester/tahun yang harus dihitung ulang IP-nya
        const semesterTahunTerpengaruh = new Map();

        for (const krs of krsList) {
            const key = `${krs.nim}-${krs.semester}-${krs.tahun}`;
            if (!semesterTahunTerpengaruh.has(key)) {
                semesterTahunTerpengaruh.set(key, { nim: krs.nim, semester: krs.semester, tahun: krs.tahun });
            }
        }

        // Hapus mata kuliah
        await mk.destroy();

        // Kalkulasi ulang IPS dan IPK hanya untuk semester dan tahun yang terkait
        for (const { nim, semester, tahun } of semesterTahunTerpengaruh.values()) {
            // Hitung ulang IPS untuk semester dan tahun tersebut
            const ips = await calculateIPS(nim, semester, tahun);

            // Update tabel IPK hanya untuk semester/tahun tersebut
            await IPK.upsert({
                nim,
                semester,
                tahun,
                ips,
                ipk: await calculateIPK(nim, semester, tahun),
            });

            // Cari semester dan tahun terakhir dari mahasiswa
            const krsTerakhir = await KRS.findOne({
                where: { nim },
                order: [
                    ["tahun", "DESC"],
                    ["semester", "DESC"],
                ],
            });

            // Jika MK yang dihapus ada di semester terakhir mahasiswa, perbarui IPS di tabel MHS
            const mhs = await MHS.findByPk(nim);
            if (mhs) {
                if (krsTerakhir && krsTerakhir.semester === semester && krsTerakhir.tahun === tahun) {
                    mhs.ips = ips; // Hanya update IPS jika semester/tahun terakhir terpengaruh
                }
                mhs.ipk = await calculateIPK(nim, semester, tahun); // IPK tetap diperbarui
                await mhs.save();
            }

            // Hapus cache yang relevan untuk mahasiswa tersebut
            await redis.del(`/krs/${nim}`);
            await redis.del(`/ipk/${nim}`);
            await redis.del(`/ipkc/${nim}`);
            await redis.del(`/mhs/${nim}`);
            await redis.del(`/mhsc/${nim}`);
        }

        // Hapus cache yang relevan setelah delete
        await redis.del(`/mk`);
        await redis.del(req.originalUrl);
        await redis.del(`/krs`);
        await redis.del(`/ipk`);
        await redis.del(`/ipkc`);
        await redis.del(`/mhs`);
        await redis.del(`/mhsc`);

        res.status(200).json({ message: "MK deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete MK" });
    }
}
