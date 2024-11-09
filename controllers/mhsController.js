import { MHS } from "../models/index.js";

export async function getAllMHS(req, res) {
    try {
        const mhsList = await MHS.findAll();
        res.status(200).json(mhsList);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve MHS list" });
    }
}

export async function getMHSByNIM(req, res) {
    try {
        const nim = req.params.nim;
        const mhs = await MHS.findByPk(nim);
        if (!mhs) {
            return res.status(404).json({ error: "MHS not found" });
        }
        res.status(200).json(mhs);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve MHS" });
    }
}

export async function createMHS(req, res) {
    try {
        const { nim, nama_mhs, ips, ipk } = req.body;
        if (!nim || !nama_mhs) {
            return res.status(400).json({ error: "NIM and Nama MHS are required" });
        }
        const newMHS = await MHS.create({ nim, nama_mhs, ips, ipk });
        res.status(201).json(newMHS);
    } catch (error) {
        res.status(500).json({ error: "Failed to create MHS" });
    }
}

export async function updateMHS(req, res) {
    try {
        const nim = req.params.nim;
        const { nama_mhs, ips, ipk } = req.body;

        const mhs = await MHS.findByPk(nim);
        if (!mhs) {
            return res.status(404).json({ error: "MHS not found" });
        }

        mhs.nama_mhs = nama_mhs || mhs.nama_mhs;
        mhs.ips = ips || mhs.ips;
        mhs.ipk = ipk || mhs.ipk;

        await mhs.save();
        res.status(200).json(mhs);
    } catch (error) {
        res.status(500).json({ error: "Failed to update MHS" });
    }
}

export async function deleteMHS(req, res) {
    try {
        const nim = req.params.nim;
        const mhs = await MHS.findByPk(nim);
        if (!mhs) {
            return res.status(404).json({ error: "MHS not found" });
        }

        await mhs.destroy();
        res.status(200).json({ message: "MHS deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete MHS" });
    }
}
