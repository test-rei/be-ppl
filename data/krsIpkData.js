import axios from "axios";

// Mengambil data MK dan MHS
const getMKAndMHSData = async () => {
    try {
        // Mendapatkan data MK
        const mkResponse = await axios.get("https://server-ppl-production.up.railway.app/mk");
        const mkData = mkResponse.data;

        // Mendapatkan data MHS
        const mhsResponse = await axios.get("https://server-ppl-production.up.railway.app/mhs");
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

const generateDummyKRS = (mkData, mhsData) => {
    // Menghasilkan data KRS berdasarkan jumlah mahasiswa yang ada
    mhsData.forEach((mhs) => {
        const nim = mhs.nim; // Ambil NIM dari data MHS
        const semester = Math.floor(Math.random() * 14) + 1; // Semester acak antara 1 dan 14
        const tahun = Math.floor(Math.random() * (2028 - 2021 + 1)) + 2021; // Tahun acak antara 2021 dan 2028

        // Tentukan jumlah mata kuliah yang akan diambil (min 7, max 58)
        const numberOfCourses = Math.floor(Math.random() * (58 - 7 + 1)) + 7;

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

        // Kirimkan setiap data KRS satu persatu
        grades.forEach(async (grade) => {
            const krsData = {
                tahun,
                semester,
                nim,
                id_mk: grade.id_mk,
                nilai: grade.nilai, // Nilai integer antara 0 dan 4
            };

            // Kirim data KRS satu persatu
            await sendDummyData(krsData);
        });
    });
};

// Mengirimkan data KRS satu per satu
const sendDummyData = async (krsData) => {
    const BATCH_SIZE = 10; // Set the number of requests to send at once
    for (let i = 0; i < krsData.length; i += BATCH_SIZE) {
        const batch = krsData.slice(i, i + BATCH_SIZE);

        // Send batch requests
        const batchPromises = batch.map(async (data) => {
            try {
                const response = await axios.post("https://server-ppl-production.up.railway.app/krs", data);
                console.log("KRS data successfully sent", response.data);
            } catch (error) {
                console.error("An error occurred while sending KRS data", error);
            }
        });

        // Wait for the batch to finish before continuing
        await Promise.all(batchPromises);
    }
};

// Menjalankan fungsi untuk mengambil data MK dan MHS, kemudian membuat dan mengirim data dummy KRS
getMKAndMHSData();
