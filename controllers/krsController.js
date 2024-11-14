import KRS from "../models/krs.js";
import MHS from "../models/mhs.js";
import MK from "../models/mk.js";
import IPK from "../models/ipk.js";
import { calculateIPS, calculateIPK } from "./calculateIP.js";

export async function getAllKRS(req, res) {
    try {
        const krsList = await KRS.findAll({
            include: [{ model: MHS }, { model: MK }],
        });
        res.status(200).json(krsList);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve KRS list" });
    }
}

export async function getKRSById(req, res) {
    try {
        const id_krs = req.params.id;
        const krs = await KRS.findByPk(id_krs, {
            include: [{ model: MHS }, { model: MK }],
        });
        if (!krs) {
            return res.status(404).json({ error: "KRS not found" });
        }
        res.status(200).json(krs);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve KRS" });
    }
}

export async function createKRS(req, res) {
    try {
        const { tahun, semester, nim, id_mk, nilai } = req.body;
        if (!tahun || !semester || !nim || !id_mk || nilai === undefined) {
            return res.status(400).json({ error: "Year, semester, NIM, MK ID, and grades are required" });
        }

        // Create new KRS
        const newKRS = await KRS.create({ tahun, semester, nim, id_mk, nilai });

        // Hitung IPS untuk semester yang bersangkutan
        const ips = await calculateIPS(nim, semester, tahun);

        // Hitung IPK untuk seluruh semester
        const ipk = await calculateIPK(nim, semester, tahun);

        // Update tabel IPK
        await IPK.upsert({
            nim,
            semester,
            tahun,
            ips,
            ipk,
        });

        // Update tabel MHS dengan IPS dan IPK terbaru
        const mhs = await MHS.findByPk(nim);
        if (mhs) {
            mhs.ips = ips;
            mhs.ipk = ipk;
            await mhs.save();
        }

        res.status(201).json(newKRS);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create KRS" });
    }
}

export async function updateKRS(req, res) {
    try {
        const id_krs = req.params.id;
        const { tahun, semester, nim, id_mk, nilai } = req.body;

        // Cari KRS berdasarkan ID
        const krs = await KRS.findByPk(id_krs);
        if (!krs) {
            return res.status(404).json({ error: "KRS not found" });
        }

        // Update data KRS
        krs.tahun = tahun || krs.tahun;
        krs.semester = semester || krs.semester;
        krs.nim = nim || krs.nim;
        krs.id_mk = id_mk || krs.id_mk;
        krs.nilai = nilai !== undefined ? nilai : krs.nilai; // Pastikan nilai bisa bernilai 0
        await krs.save();

        // Hitung ulang IPS dan IPK
        const ips = await calculateIPS(krs.nim, krs.semester, krs.tahun);
        const ipk = await calculateIPK(krs.nim, krs.semester, krs.tahun);

        // Update tabel IPK
        await IPK.upsert({
            nim: krs.nim,
            semester: krs.semester,
            tahun: krs.tahun,
            ips,
            ipk,
        });

        // Update tabel MHS
        const mhs = await MHS.findByPk(krs.nim);
        if (mhs) {
            mhs.ips = ips;
            mhs.ipk = ipk;
            await mhs.save();
        }

        res.status(200).json(krs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update KRS" });
    }
}

export async function deleteKRS(req, res) {
    try {
        const id_krs = req.params.id;

        // Cari KRS berdasarkan ID
        const krs = await KRS.findByPk(id_krs);
        if (!krs) {
            return res.status(404).json({ error: "KRS not found" });
        }

        // Simpan nim, semester, dan tahun sebelum dihapus
        const { nim, semester, tahun } = krs;

        // Hapus KRS
        await krs.destroy();

        // Hitung ulang IPS dan IPK setelah KRS dihapus
        const ips = await calculateIPS(nim, semester, tahun);
        const ipk = await calculateIPK(nim, semester, tahun);

        // Update tabel IPK
        await IPK.upsert({
            nim,
            semester,
            tahun,
            ips,
            ipk,
        });

        // Update tabel MHS
        const mhs = await MHS.findByPk(nim);
        if (mhs) {
            mhs.ips = ips;
            mhs.ipk = ipk;
            await mhs.save();
        }

        res.status(200).json({ message: "KRS deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete KRS" });
    }
}
