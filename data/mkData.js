const url = "https://be-ppl-production.up.railway.app/mk";
const listMK = [
    { nama_mk: "Agama Islam", sks: 2 },
    { nama_mk: "Agama Katolik", sks: 2 },
    { nama_mk: "Agama Protestan", sks: 2 },
    { nama_mk: "Agama Hindu", sks: 2 },
    { nama_mk: "Agama Budha", sks: 2 },
    { nama_mk: "Penganut Kepercayaan", sks: 2 },
    { nama_mk: "Algoritma dan Pemrograman", sks: 3 },
    { nama_mk: "Basis Data", sks: 3 },
    { nama_mk: "Jaringan Komputer dan Komunikasi", sks: 3 },
    { nama_mk: "Kewarganegaraan", sks: 2 },
    { nama_mk: "Tool Teknologi Informasi", sks: 2 },
    { nama_mk: "Tren Teknologi Informasi", sks: 3 },
    { nama_mk: "Praktikum Algoritma dan Pemrograman", sks: 1 },
    { nama_mk: "Aljabar Linier", sks: 2 },
    { nama_mk: "Disain UI/UX", sks: 3 },
    { nama_mk: "Manajemen Stress", sks: 3 },
    { nama_mk: "Pemrograman Berorientasi Obyek", sks: 3 },
    { nama_mk: "Sensor dan Perangkat IOT", sks: 3 },
    { nama_mk: "Teknologi Basis Data", sks: 3 },
    { nama_mk: "Praktikum Basis Data", sks: 1 },
    { nama_mk: "Praktikum Jaringan Komputer", sks: 1 },
    { nama_mk: "Inovasi Teknologi Informasi", sks: 2 },
    { nama_mk: "Interpersonal dan Life Skill", sks: 3 },
    { nama_mk: "Manajemen Jaringan dan Server", sks: 3 },
    { nama_mk: "Pangkalan Data", sks: 2 },
    { nama_mk: "Pemrograman Internet", sks: 3 },
    { nama_mk: "Pengolahan Citra Digital", sks: 3 },
    { nama_mk: "Rekayasa Perangkat Lunak", sks: 3 },
    { nama_mk: "Analisis dan Disain Sistem Informasi", sks: 3 },
    { nama_mk: "Bahasa Indonesia", sks: 2 },
    { nama_mk: "Integrasi dan Migrasi Sistem", sks: 3 },
    { nama_mk: "Keamanan Informasi", sks: 3 },
    { nama_mk: "Pancasila", sks: 2 },
    { nama_mk: "Pemrograman Mobile", sks: 3 },
    { nama_mk: "Sistem Enterprise", sks: 2 },
    { nama_mk: "Statistik", sks: 2 },
    { nama_mk: "Forensik TI", sks: 3 },
    { nama_mk: "Kecerdasan Tiruan", sks: 3 },
    { nama_mk: "Kerja Praktek", sks: 2 },
    { nama_mk: "Manajemen Layanan TI", sks: 3 },
    { nama_mk: "Pemrosesan Bahasa Alami", sks: 3 },
    { nama_mk: "Riset Teknologi Informasi", sks: 3 },
    { nama_mk: "Teknologi Imersif", sks: 3 },
    { nama_mk: "Big Data", sks: 3 },
    { nama_mk: "Data Mining", sks: 3 },
    { nama_mk: "Etika Profesi dan Pendidikan Anti Korupsi", sks: 2 },
    { nama_mk: "Sistem Temu Kembali Informasi", sks: 3 },
    { nama_mk: "Machine Learning", sks: 3 },
    { nama_mk: "Pengujian Perangkat Lunak", sks: 2 },
    { nama_mk: "Proyek Bidang Minat", sks: 3 },
    { nama_mk: "Visi Komputer", sks: 3 },
    { nama_mk: "Audit TI", sks: 3 },
    { nama_mk: "Business Process Management", sks: 3 },
    { nama_mk: "IT Management Framework", sks: 3 },
    { nama_mk: "Manajemen Berbasis Elektronik", sks: 3 },
    { nama_mk: "E-Government", sks: 3 },
    { nama_mk: "GIS", sks: 3 },
    { nama_mk: "Inovasi Bisnis Proses", sks: 3 },
    { nama_mk: "Multi Channel Access", sks: 3 },
    { nama_mk: "Financial Technology", sks: 3 },
    { nama_mk: "Model Bisnis Ekonomi Digital", sks: 3 },
    { nama_mk: "Pengantar Ekonomi Digital", sks: 3 },
    { nama_mk: "Teknologi dan Pemrograman Block Chain", sks: 3 },
    { nama_mk: "Restorasi Digital Warisan Budaya", sks: 3 },
    { nama_mk: "Teknologi Imersif Kebudayaan Bali", sks: 3 },
    { nama_mk: "Tourism & Culture Application", sks: 3 },
    { nama_mk: "Data Analytics and Visualization", sks: 3 },
    { nama_mk: "Data Science Programming", sks: 3 },
    { nama_mk: "Foundation of Data Science", sks: 3 },
    { nama_mk: "Practical Data Science", sks: 3 },
    { nama_mk: "Biomedics", sks: 3 },
    { nama_mk: "Biometrics", sks: 3 },
    { nama_mk: "Data Acquisition & Prepocessing", sks: 3 },
    { nama_mk: "Image and Video Retrieval System", sks: 3 },
    { nama_mk: "Early Warning System", sks: 3 },
    { nama_mk: "Embedded System (CAH)", sks: 3 },
    { nama_mk: "Smart Hospitality", sks: 3 },
    { nama_mk: "Telemetery", sks: 3 },
    { nama_mk: "Network Operating System", sks: 3 },
    { nama_mk: "System Administration", sks: 3 },
    { nama_mk: "Topik Khusus MKJ", sks: 3 },
    { nama_mk: "IT Architecture", sks: 3 },
    { nama_mk: "Proyek Audit", sks: 3 },
    { nama_mk: "Topik Khusus Tata Kelola", sks: 3 },
    { nama_mk: "Decision Support System", sks: 3 },
    { nama_mk: "Interoperabilitas", sks: 3 },
    { nama_mk: "Kolaborasi Digital", sks: 3 },
    { nama_mk: "Topik Khusus Sistem Informasi", sks: 3 },
    { nama_mk: "Big Data Analytics", sks: 3 },
    { nama_mk: "Bisnis Digital", sks: 3 },
    { nama_mk: "Digital Marketing Technology", sks: 3 },
    { nama_mk: "Topik Khusus Bidang Minat Ekonomi Digital", sks: 3 },
    { nama_mk: "GIS", sks: 3 },
    { nama_mk: "Imaging System untuk Kebudayaan Bali", sks: 3 },
    { nama_mk: "IOT Parwisata dan Kebudayaan Bali", sks: 3 },
    { nama_mk: "Data Science Tools", sks: 3 },
    { nama_mk: "Deep Learning", sks: 3 },
    { nama_mk: "Regression and Prediction", sks: 3 },
    { nama_mk: "Topik Khusus Bidang Minat Data Science", sks: 3 },
    { nama_mk: "Image Processing Programming", sks: 3 },
    { nama_mk: "Remote Sensing", sks: 3 },
    { nama_mk: "Topik Khusus Digital Imaging System", sks: 3 },
    { nama_mk: "Topik Khusus Remote Sensing", sks: 3 },
    { nama_mk: "Data Center & Cloud", sks: 3 },
    { nama_mk: "IOT Application", sks: 3 },
    { nama_mk: "Network Protocol", sks: 3 },
    { nama_mk: "Topik Khusus IOT", sks: 3 },
    { nama_mk: "Data Center & Cloud", sks: 3 },
    { nama_mk: "IT audit & Information System Security", sks: 3 },
    { nama_mk: "Network Centric Principle", sks: 3 },
    { nama_mk: "Sertifikasi", sks: 3 },
    { nama_mk: "Tugas Akhir", sks: 4 },
];

listMK.forEach((mk) => {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mk),
    })
        .then((response) => response.json())
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));
});