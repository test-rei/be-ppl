# Backend API - Sistem Manajemen KRS

## Gambaran Umum Proyek

Proyek ini adalah API backend untuk mengelola sistem Kartu Rencana Studi (KRS) yang mencatat data mahasiswa, mata kuliah (MK), nilai akademik (IPK), dan catatan KRS. Backend ini dibangun menggunakan **Node.js**, **Express.js**, dan **Sequelize ORM**, serta terhubung ke database **MySQL** untuk menyimpan dan mengelola data.
[Link Backend](https://be.bitloka.top), [Link Frontend](https://fe.bitloka.top).

Berdasarkan file `package.json`, berikut adalah penjelasan mengenai arsitektur backend dari proyek ini:

### 1. **Platform**

-   **Node.js**: Proyek ini dibangun menggunakan **Node.js**, yang merupakan runtime JavaScript di server. Aplikasi dijalankan menggunakan perintah `node index.js`, yang menunjukkan bahwa `index.js` adalah file utama untuk memulai aplikasi.

### 2. **Type Module**

-   **ES Module (`type: "module"`)**: Dengan pengaturan `type: "module"`, proyek ini menggunakan **ES Modules**. Ini berarti Anda dapat menggunakan sintaks impor (`import`) dan ekspor (`export`) daripada sintaks CommonJS (`require` dan `module.exports`).

### 3. **Server Framework**

-   **Express.js (`express: "^4.21.1"`)**: Aplikasi ini menggunakan **Express.js** sebagai framework server HTTP. Express mempermudah pembuatan rute, menangani middleware, dan menangani request-response pada server.

### 4. **Database Management**

-   **MySQL2 (`mysql2: "^3.11.4"`)**: Ini menunjukkan bahwa aplikasi berinteraksi dengan database MySQL atau MariaDB menggunakan driver **mysql2**. MySQL2 mendukung operasi asynchronous, sehingga dapat digunakan dengan `async/await`.
-   **Sequelize (`sequelize: "^6.37.5"`)**: **Sequelize** adalah **ORM (Object Relational Mapping)** yang digunakan untuk mengelola interaksi antara kode JavaScript dan database relasional (dalam hal ini MySQL). Sequelize membantu membuat model data, menjalankan query, dan memanipulasi tabel tanpa menulis query SQL secara manual.

### 5. **CORS Handling**

-   **CORS (`cors: "^2.8.5"`)**: Untuk memungkinkan akses dari frontend yang mungkin berada di domain atau port yang berbeda, middleware **CORS** diintegrasikan. CORS akan memungkinkan atau menolak request dari origin lain yang mencoba mengakses API.

### 6. **Environment Configuration**

-   **Dotenv (`dotenv: "^16.4.5"`)**: **Dotenv** digunakan untuk mengelola **environment variables** yang disimpan dalam file `.env`. Ini umum digunakan untuk menyembunyikan informasi sensitif seperti kredensial database atau API key dari kode sumber.

### 7. **Development Tool**

-   **Nodemon (`nodemon: "^3.1.7"`)**: Aplikasi menggunakan **Nodemon** sebagai development tool. Nodemon secara otomatis akan merestart server ketika ada perubahan dalam kode, sehingga developer tidak perlu melakukannya secara manual setiap kali ada pembaruan dalam file.

### 8. **Arsitektur Aplikasi**

-   **MVC Pattern (Model-View-Controller)**: Meskipun tidak terlihat secara langsung dalam file `package.json`, dari penggunaan **Sequelize**, besar kemungkinan proyek ini menggunakan arsitektur **MVC**. **Sequelize** berfungsi sebagai **Model**, **Express.js** sebagai **Controller**, dan meskipun bagian **View** tidak terlihat, kemungkinan API ini terintegrasi dengan frontend lain.

### 9. **Script untuk Menjalankan Aplikasi**

-   **"start": "node index.js"**: Perintah `start` akan menjalankan file `index.js` menggunakan `node`. Biasanya, `index.js` berfungsi sebagai entry point di mana server Express diinisialisasi, dan koneksi ke database MySQL dibuat.

### 10. **Workflow Pengembangan**

-   Saat proses pengembangan, developer mungkin menggunakan perintah:
    -   `npm start`: Untuk memulai aplikasi secara manual menggunakan Node.js.
    -   `nodemon`: Untuk menjalankan aplikasi dalam mode development, di mana server akan restart otomatis setiap kali ada perubahan kode.

### Gambaran Umum:

-   **Backend API** ini dibangun dengan **Express.js** sebagai framework server, terhubung dengan **MySQL** sebagai database menggunakan **Sequelize** ORM untuk memudahkan operasi database.
-   **CORS** diatur untuk mengizinkan cross-origin requests, sehingga API dapat diakses oleh frontend yang berada di domain atau origin lain.
-   **Dotenv** digunakan untuk mengelola variabel lingkungan, yang penting untuk menyembunyikan data sensitif seperti kredensial database.
-   **Nodemon** memungkinkan kemudahan dalam proses pengembangan dengan restart otomatis ketika ada perubahan kode.

Ini merupakan arsitektur yang sederhana, namun efisien untuk membangun REST API dengan Node.js dan MySQL.

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
    - [1. **Platform**](#1-platform)
    - [2. **Type Module**](#2-type-module)
    - [3. **Server Framework**](#3-server-framework)
    - [4. **Database Management**](#4-database-management)
    - [5. **CORS Handling**](#5-cors-handling)
    - [6. **Environment Configuration**](#6-environment-configuration)
    - [7. **Development Tool**](#7-development-tool)
    - [8. **Arsitektur Aplikasi**](#8-arsitektur-aplikasi)
    - [9. **Script untuk Menjalankan Aplikasi**](#9-script-untuk-menjalankan-aplikasi)
    - [10. **Workflow Pengembangan**](#10-workflow-pengembangan)
    - [Gambaran Umum:](#gambaran-umum)
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
