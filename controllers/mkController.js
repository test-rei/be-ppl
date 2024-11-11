import MK from "../models/mk.js";

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
        const newMK = await MK.create({ nama_mk: nama_mk, sks: sks });
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

        mk.nama_mk = nama_mk || mk.nama_mk;
        mk.sks = sks || mk.sks;

        await mk.save();
        res.status(200).json(mk);
    } catch (error) {
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

        await mk.destroy();
        res.status(200).json({ message: "MK deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete MK" });
    }
}
