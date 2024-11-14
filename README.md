# Backend API - Sistem Manajemen KRS

## Gambaran Umum Proyek

Proyek ini adalah API backend untuk mengelola sistem Kartu Rencana Studi (KRS) yang mencatat data mahasiswa, mata kuliah (MK), nilai akademik (IPK), dan catatan KRS. Backend ini dibangun menggunakan **Node.js**, **Express.js**, dan **Sequelize ORM**, serta terhubung ke database **MySQL** untuk menyimpan dan mengelola data.
Link [Backend](https://be.bitloka.top), Link [Frontend](https://fe.bitloka.top).

## Fitur

-   Mengelola data mahasiswa (`mhs`)
-   Mengelola data mata kuliah (`mk`)
-   Mengelola catatan akademik (`krs`)
-   Mengelola IPK (`ipk`)
-   Operasi dasar CRUD untuk setiap entitas: `Create`, `Read`, `Update`, `Delete`
-   Mendukung CORS untuk permintaan lintas domain
-   Manajemen variabel lingkungan melalui **dotenv**

## Daftar Isi

- [Backend API - Sistem Manajemen KRS](#backend-api---sistem-manajemen-krs)
  - [Gambaran Umum Proyek](#gambaran-umum-proyek)
  - [Fitur](#fitur)
  - [Daftar Isi](#daftar-isi)
  - [Instalasi](#instalasi)
  - [Variabel Lingkungan](#variabel-lingkungan)
  - [Endpoint API yang Tersedia](#endpoint-api-yang-tersedia)
    - [IPK (Indeks Prestasi Kumulatif)](#ipk-indeks-prestasi-kumulatif)
    - [KRS (Catatan Akademik)](#krs-catatan-akademik)
    - [MHS (Data Mahasiswa)](#mhs-data-mahasiswa)
    - [MK (Data Mata Kuliah)](#mk-data-mata-kuliah)
  - [Pengaturan Database](#pengaturan-database)
  - [Menjalankan Aplikasi](#menjalankan-aplikasi)
  - [Kontribusi](#kontribusi)
  - [Lisensi](#lisensi)

## Instalasi

1. Kloning repositori ini:

```bash
git clone https://github.com/test-rei/be-ppl.git
cd be-ppl
```

2. Instal dependensi:

```bash
npm install
```

3. Siapkan file `.env` untuk mengonfigurasi koneksi database MySQL dan variabel lingkungan lainnya.

## Variabel Lingkungan

Buat file `.env` di direktori root proyek. Sertakan variabel berikut:

```bash
DB_HOST=host_mysql_anda
DB_PORT=port_mysql_anda
DB_NAME=nama_database_anda
DB_USER=user_database_anda
DB_PASSWORD=password_database_anda
```

## Endpoint API yang Tersedia

### IPK (Indeks Prestasi Kumulatif)

-   **GET** `/ipk` - Mendapatkan semua data IPK
-   **GET** `/ipk/:id` - Mendapatkan IPK berdasarkan ID
-   **POST** `/ipk` - Membuat catatan IPK baru
-   **PATCH** `/ipk/:id` - Memperbarui catatan IPK berdasarkan ID
-   **DELETE** `/ipk/:id` - Menghapus catatan IPK berdasarkan ID

### KRS (Catatan Akademik)

-   **GET** `/krs` - Mendapatkan semua data KRS
-   **GET** `/krs/:id` - Mendapatkan KRS berdasarkan ID
-   **POST** `/krs` - Membuat catatan KRS baru
-   **PATCH** `/krs/:id` - Memperbarui catatan KRS berdasarkan ID
-   **DELETE** `/krs/:id` - Menghapus catatan KRS berdasarkan ID

### MHS (Data Mahasiswa)

-   **GET** `/mhs` - Mendapatkan semua data mahasiswa
-   **GET** `/mhs/:nim` - Mendapatkan data mahasiswa berdasarkan NIM
-   **POST** `/mhs` - Membuat catatan mahasiswa baru
-   **PATCH** `/mhs/:nim` - Memperbarui data mahasiswa berdasarkan NIM
-   **DELETE** `/mhs/:nim` - Menghapus catatan mahasiswa berdasarkan NIM

### MK (Data Mata Kuliah)

-   **GET** `/mk` - Mendapatkan semua data mata kuliah
-   **GET** `/mk/:id` - Mendapatkan data mata kuliah berdasarkan ID
-   **POST** `/mk` - Membuat catatan mata kuliah baru
-   **PATCH** `/mk/:id` - Memperbarui data mata kuliah berdasarkan ID
-   **DELETE** `/mk/:id` - Menghapus catatan mata kuliah berdasarkan ID

## Pengaturan Database

1. Buat database MySQL baru sesuai dengan nama yang ditentukan dalam file `.env`.

2. Sequelize akan secara otomatis menyinkronkan model ke database saat aplikasi dijalankan.

## Menjalankan Aplikasi

1. Untuk menjalankan aplikasi dalam mode produksi:

```bash
npm start
```

2. Untuk pengembangan dengan **Nodemon** (auto-restart saat file diubah):

```bash
npm run dev
```

Server akan berjalan pada port yang ditentukan di file `.env`, atau secara default pada port `3000`.

## Kontribusi

Anda dapat berkontribusi dengan membuka _issue_ atau mengajukan _pull request_.

## Lisensi

Proyek ini dilisensikan di bawah lisensi ISC.

---

Backend ini dapat diintegrasikan dengan platform frontend apa pun dan menyediakan REST API sederhana untuk mengelola data mahasiswa, mata kuliah, dan catatan akademik.
