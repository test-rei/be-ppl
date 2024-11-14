import axios from "axios";

// Mengambil data MK dan MHS
const getMKAndMHSData = async () => {
    try {
        // Mendapatkan data MK
        const mkResponse = await axios.get("https://be-ppl-production.up.railway.app/mk");
        const mkData = mkResponse.data;

        // Mendapatkan data MHS
        const mhsResponse = await axios.get("https://be-ppl-production.up.railway.app/mhs");
        const mhsData = mhsResponse.data;

        // Mengecek jika data tersedia
        if (mkData.length === 0) {
            console.log("There is no MK data.");
            return;
        }
        if (mhsData.length === 0) {
            console.log("There is no MHS data.");
            return;
        }

        console.log("MK and MHS data successfully retrieved.");

        // Lanjutkan untuk membuat data dummy
        generateDummyKRS(mkData, mhsData);
    } catch (error) {
        console.error("There was an error in retrieving MK or MHS data", error);
    }
};

const generateDummyKRS = async (mkData, mhsData) => {
    // Urutkan data mahasiswa berdasarkan NIM untuk memastikan urutan
    mhsData.sort((a, b) => a.nim.localeCompare(b.nim));

    // NIM awal yang akan diproses
    const startNIM = "2105550740";

    // Menghasilkan data KRS berdasarkan jumlah mahasiswa yang ada
    for (const mhs of mhsData) {
        const nim = mhs.nim; // Ambil NIM dari data MHS

        // Lanjutkan hanya jika NIM >= 2105550740
        if (nim >= startNIM) {
            // Tentukan jumlah semester (min 3, max 8)
            const totalSemesters = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
            let tahun = 2021; // Mulai dari tahun 2021

            for (let i = 0; i < totalSemesters; i++) {
                const semester = i + 1; // Iterasi semester

                // Jika semester ganjil (semester 1, 3, 5, dst.), maka tetap pada tahun saat ini
                // Jika semester genap (semester 2, 4, 6, dst.), maka tambahkan tahun
                if (semester % 2 === 0) {
                    tahun++;
                }

                // Tentukan jumlah SKS per semester (min 18, max 24)
                let totalSKS = Math.floor(Math.random() * (24 - 18 + 1)) + 18;
                let currentSKS = 0; // Variabel untuk melacak total SKS yang telah diambil
                const courses = []; // Array untuk menyimpan mata kuliah yang diambil

                // Loop untuk menambahkan mata kuliah hingga mencapai totalSKS yang diinginkan
                while (currentSKS < totalSKS) {
                    const randomMK = mkData[Math.floor(Math.random() * mkData.length)];

                    // Jika mata kuliah belum diambil dan total SKS tidak melebihi batas
                    if (!courses.find((course) => course.id_mk === randomMK.id_mk)) {
                        const courseSKS = randomMK.sks;

                        // Cek jika totalSKS tidak terlampaui setelah menambahkan mata kuliah ini
                        if (currentSKS + courseSKS <= totalSKS) {
                            courses.push(randomMK);
                            currentSKS += courseSKS; // Tambahkan SKS ke total
                        }
                    }
                }

                // Generate nilai acak untuk setiap mata kuliah dalam rentang 0-100
                const grades = courses.map((course) => ({
                    id_mk: course.id_mk,
                    nilai: Math.floor(Math.random() * 101), // Nilai antara 0 dan 100
                }));

                // Kirimkan setiap data KRS satu per satu secara asynchronous
                for (const grade of grades) {
                    const krsData = {
                        tahun,
                        semester,
                        nim,
                        id_mk: grade.id_mk,
                        nilai: grade.nilai, // Nilai antara 0 dan 100
                    };

                    // Kirim data KRS satu persatu dan tunggu hingga selesai sebelum lanjut
                    await sendDummyData(krsData);
                }
            }
        }
    }
};

// Mengirimkan data KRS satu per satu
const sendDummyData = async (krsData) => {
    try {
        const response = await axios.post("https://be-ppl-production.up.railway.app/krs", krsData);
        console.log("KRS data successfully sent:", response.data);
    } catch (error) {
        console.error("An error occurred while sending KRS data:", error);
    }
};

// Menjalankan fungsi untuk mengambil data MK dan MHS, kemudian membuat dan mengirim data dummy KRS
getMKAndMHSData();
