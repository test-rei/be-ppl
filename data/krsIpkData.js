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
    // Menghasilkan data KRS berdasarkan jumlah mahasiswa yang ada
    for (const mhs of mhsData) {
        const nim = mhs.nim; // Ambil NIM dari data MHS

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

            // Tentukan jumlah mata kuliah yang akan diambil (min 3, max 7)
            const numberOfCourses = Math.floor(Math.random() * (7 - 3 + 1)) + 3;

            // Ambil 'numberOfCourses' mata kuliah acak
            const courses = [];
            while (courses.length < numberOfCourses) {
                const randomMK = mkData[Math.floor(Math.random() * mkData.length)];
                if (!courses.find((course) => course.id_mk === randomMK.id_mk)) {
                    courses.push(randomMK);
                }
            }

            // Generate nilai acak untuk setiap mata kuliah dengan angka 4 s/d 0
            const grades = courses.map((course) => ({
                id_mk: course.id_mk,
                nilai: Math.floor(Math.random() * 5), // Nilai antara 0 dan 4
            }));

            // Kirimkan setiap data KRS satu per satu secara asynchronous
            for (const grade of grades) {
                const krsData = {
                    tahun,
                    semester,
                    nim,
                    id_mk: grade.id_mk,
                    nilai: grade.nilai, // Nilai integer antara 0 dan 4
                };

                // Kirim data KRS satu persatu dan tunggu hingga selesai sebelum lanjut
                await sendDummyData(krsData);
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
