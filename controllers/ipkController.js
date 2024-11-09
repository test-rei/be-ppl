import IPK from "../models/ipk.js";

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

export async function getIPKById(req, res) {
    try {
        const id_ipk = req.params.id;
        const ipk = await IPK.findByPk(id_ipk, {
            include: [{ model: MHS }],
        });
        if (!ipk) {
            return res.status(404).json({ error: "IPK not found" });
        }
        res.status(200).json(ipk);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve IPK" });
    }
}

export async function createIPK(req, res) {
    try {
        const { nim, semester, tahun, ips, ipk } = req.body;
        if (!nim || !semester || !tahun || ips === undefined || ipk === undefined) {
            return res.status(400).json({ error: "NIM, semester, tahun, IPS, and IPK are required" });
        }
        const newIPK = await IPK.create({ nim, semester, tahun, ips, ipk });
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

        await ipkData.destroy();
        res.status(200).json({ message: "IPK deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete IPK" });
    }
}
