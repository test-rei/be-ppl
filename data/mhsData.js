import axios from "axios";

// URL API yang akan digunakan
const url = "https://server-ppl-production.up.railway.app/mhs";

// Fungsi untuk generate data dummy
async function generateDummyData() {
    const jumlahData = 5000;

    // Loop untuk membuat 5000 data
    for (let i = 1; i <= jumlahData; i++) {
        const nim = `210555${String(i).padStart(4, "0")}`; // Membuat NIM sesuai format
        const nama_mhs = `Mahasiswa ${i}`; // Nama mahasiswa
        const ips = 0; // Set IPS dan IPK ke 0
        const ipk = 0;

        // Data yang akan dikirimkan ke API
        const data = {
            nim,
            nama_mhs,
            ips,
            ipk,
        };

        try {
            // Mengirimkan POST request ke API
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(`Data ke-${i} berhasil ditambahkan: ${response.status}`);
        } catch (error) {
            console.error(`Gagal menambahkan data ke-${i}:`, error.message);
        }
    }

    console.log("Proses penambahan data selesai");
}

// Menjalankan fungsi untuk generate data dummy
generateDummyData();
