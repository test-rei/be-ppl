import KRS from "../models/krs.js";
import MK from "../models/mk.js";

export async function calculateIPS(nim, semester, tahun) {
    // Ambil semua KRS berdasarkan NIM, semester, dan tahun
    const krsList = await KRS.findAll({
        where: { nim, semester, tahun },
        include: [MK], // Join dengan tabel MK
    });

    // Jika tidak ada KRS di semester ini, return 0
    if (krsList.length === 0) {
        return 0;
    }

    let totalSKS = 0;
    let totalNilai = 0;

    // Loop semua KRS dan hitung total SKS dan total nilai
    krsList.forEach((krs) => {
        const nilai = krs.nilai; // Nilai mata kuliah dari KRS
        const sks = krs.MK ? krs.MK.sks : 0; // Pastikan SKS diambil dari relasi MK

        if (sks > 0) {
            // Hanya jika SKS valid
            totalSKS += sks;
            totalNilai += nilai * sks;
        }
    });

    // Jika totalSKS masih 0 (tidak ada MK valid), return 0 untuk IPS
    if (totalSKS === 0) {
        return 0;
    }

    // Hitung IPS
    const ips = totalNilai / totalSKS;
    return ips;
}

export async function calculateIPK(nim) {
    // Ambil semua KRS berdasarkan NIM
    const krsList = await KRS.findAll({
        where: { nim },
        include: [MK], // Join dengan tabel MK
    });

    // Jika tidak ada KRS untuk mahasiswa ini, return 0
    if (krsList.length === 0) {
        return 0;
    }

    let totalSKS = 0;
    let totalNilai = 0;

    // Loop semua KRS untuk menghitung total nilai dan SKS
    krsList.forEach((krs) => {
        const nilai = krs.nilai; // Nilai dari KRS
        const sks = krs.MK ? krs.MK.sks : 0; // Ambil SKS dari MK jika tersedia

        if (sks > 0) {
            // Pastikan SKS valid
            totalSKS += sks;
            totalNilai += nilai * sks;
        }
    });

    // Jika tidak ada SKS, return 0 untuk IPK
    if (totalSKS === 0) {
        return 0;
    }

    // Hitung IPK
    const ipk = totalNilai / totalSKS;
    return ipk;
}
