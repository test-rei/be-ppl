import KRS from "../models/krs.js";

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
        if (!tahun || !semester || !nim || !id_mk) {
            return res.status(400).json({ error: "Tahun, semester, NIM, and ID MK are required" });
        }
        const newKRS = await KRS.create({ tahun, semester, nim, id_mk, nilai });
        res.status(201).json(newKRS);
    } catch (error) {
        res.status(500).json({ error: "Failed to create KRS" });
    }
}

export async function updateKRS(req, res) {
    try {
        const id_krs = req.params.id;
        const { tahun, semester, nim, id_mk, nilai } = req.body;

        const krs = await KRS.findByPk(id_krs);
        if (!krs) {
            return res.status(404).json({ error: "KRS not found" });
        }

        krs.tahun = tahun || krs.tahun;
        krs.semester = semester || krs.semester;
        krs.nim = nim || krs.nim;
        krs.id_mk = id_mk || krs.id_mk;
        krs.nilai = nilai || krs.nilai;

        await krs.save();
        res.status(200).json(krs);
    } catch (error) {
        res.status(500).json({ error: "Failed to update KRS" });
    }
}

export async function deleteKRS(req, res) {
    try {
        const id_krs = req.params.id;
        const krs = await KRS.findByPk(id_krs);
        if (!krs) {
            return res.status(404).json({ error: "KRS not found" });
        }

        await krs.destroy();
        res.status(200).json({ message: "KRS deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete KRS" });
    }
}
