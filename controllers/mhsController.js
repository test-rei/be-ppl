import MHS from "../models/mhs.js";
import { calculateIPS, calculateIPK, getLastSemesterAndYear } from "./calculateIP.js";

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
        const mhs = await MHS.findOne({ where: { nim: "2105551001" } });

        if (!mhs) {
            return res.status(404).json({ error: "MHS not found" });
        }
        res.status(200).json(mhs);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve MHS" });
    }
}

export async function getAllMHSCalculate(req, res) {
    try {
        // Ambil daftar mahasiswa dari database
        const mhsList = await MHS.findAll();

        // Loop untuk menghitung IPK dan IPS untuk setiap mahasiswa
        const mhsWithIP = await Promise.all(
            mhsList.map(async (mhs) => {
                // Ambil semester dan tahun terakhir untuk mahasiswa ini
                const { semester, tahun } = await getLastSemesterAndYear(mhs.nim);

                // Gunakan semester dan tahun dari query, jika ada, jika tidak gunakan yang terakhir dari database
                const semesterQuery = req.query.semester ? parseInt(req.query.semester) : semester; // Default ke semester terakhir jika tidak ada query
                const tahunQuery = req.query.tahun ? parseInt(req.query.tahun) : tahun; // Default ke tahun terakhir jika tidak ada query

                // Hitung IPK berdasarkan NIM, semester dan tahun terakhir
                const ipk = (await calculateIPK(mhs.nim, semesterQuery, tahunQuery)) || 0; // Fallback ke 0 jika IPK tidak ditemukan

                // Hitung IPS berdasarkan semester dan tahun terakhir
                const ips = (await calculateIPS(mhs.nim, semesterQuery, tahunQuery)) || 0; // Fallback ke 0 jika IPS tidak ditemukan

                // Return data mahasiswa dengan IPK dan IPS
                return {
                    nim: mhs.nim,
                    nama_mhs: mhs.nama_mhs,
                    ipk, // IPK yang dihitung
                    ips, // IPS yang dihitung
                    semester: semesterQuery, // Semester yang digunakan dalam perhitungan
                    tahun: tahunQuery, // Tahun yang digunakan dalam perhitungan
                };
            })
        );

        // Mengirimkan response dengan data mahasiswa yang sudah dihitung IPK dan IPS-nya
        res.status(200).json(mhsWithIP);
    } catch (error) {
        console.error("Error calculating IPK and IPS:", error);
        res.status(500).json({ error: "Failed to take MHS list and calculate IPK/IPS" });
    }
}

export async function getMHSByNIMCalculate(req, res) {
    try {
        const nim = req.params.nim;
        const mhs = await MHS.findByPk(nim);

        if (!mhs) {
            return res.status(404).json({ error: "MHS not found" });
        }

        // Ambil semester dan tahun terakhir dari database (gunakan query parameter atau default)
        const { semester, tahun } = await getLastSemesterAndYear(nim);

        // Ambil semester dan tahun dari query jika ada, atau gunakan semester dan tahun terakhir
        const semesterQuery = req.query.semester ? parseInt(req.query.semester) : semester;
        const tahunQuery = req.query.tahun ? parseInt(req.query.tahun) : tahun;

        // Hitung IPK berdasarkan NIM, semester, dan tahun
        const ipk = (await calculateIPK(nim, semesterQuery, tahunQuery)) || 0;

        // Hitung IPS berdasarkan semester dan tahun yang dipilih
        const ips = (await calculateIPS(nim, semesterQuery, tahunQuery)) || 0;

        // Respon berisi detail mahasiswa, IPK, dan IPS
        res.status(200).json({
            nim: mhs.nim,
            nama_mhs: mhs.nama_mhs,
            ipk, // IPK yang dihitung
            ips, // IPS yang dihitung
            semester: semesterQuery, // Semester yang digunakan dalam perhitungan
            tahun: tahunQuery, // Tahun yang digunakan dalam perhitungan
        });
    } catch (error) {
        console.error("Error retrieving MHS data:", error);
        res.status(500).json({ error: "Failed to retrieve MHS data" });
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
