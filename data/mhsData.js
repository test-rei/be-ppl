import axios from "axios";

// URL API yang akan digunakan
const url = "https://be-ppl-production.up.railway.app/mhs";

// Fungsi untuk generate data dummy
async function generateDummyData() {
    const jumlahData = 1000;
    const dataMhsList = [];

    // Loop untuk membuat data dan menambahkan ke list terlebih dahulu
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

        // Tambahkan data ke array list mahasiswa
        dataMhsList.push(data);
    }

    console.log("Semua data MHS berhasil dibuat, siap dikirim.");

    try {
        // Menggunakan Promise.all untuk mengirim semua data secara bersamaan
        const responses = await Promise.all(
            dataMhsList.map(async (mhsData, index) => {
                try {
                    const response = await axios.post(url, mhsData, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    console.log(`Data mahasiswa ${index + 1} berhasil ditambahkan: ${response.status}`);
                } catch (error) {
                    console.error(`Gagal menambahkan data mahasiswa ${index + 1}:`, error.message);
                }
            })
        );

        console.log("Proses penambahan data MHS selesai.");
    } catch (error) {
        console.error("Terjadi kesalahan saat mengirim data:", error);
    }
}

// Menjalankan fungsi untuk generate data dummy
generateDummyData();
