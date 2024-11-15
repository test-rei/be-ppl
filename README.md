# Backend API - Sistem Manajemen KRS

## Gambaran Umum Proyek

Proyek ini adalah API backend untuk mengelola sistem Kartu Rencana Studi (KRS) yang mencatat data mahasiswa, mata kuliah (MK), nilai akademik (IPK), dan catatan KRS. Backend ini dibangun menggunakan **Node.js**, **Express.js**, dan **Sequelize ORM**, serta terhubung ke database **MySQL** untuk menyimpan dan mengelola data.
[Link Backend](https://be.bitloka.top), [Link Frontend](https://fe.bitloka.top).

Berdasarkan file `package.json`, berikut adalah penjelasan mengenai arsitektur backend dari proyek ini:

### 1. Platform

-   **Node.js**: Proyek ini dibangun menggunakan **Node.js**, yang merupakan runtime JavaScript di server. Aplikasi dijalankan menggunakan perintah `node index.js`, yang menunjukkan bahwa `index.js` adalah file utama untuk memulai aplikasi.

### 2. Type Module

-   **ES Module (`type: "module"`)**: Dengan pengaturan `type: "module"`, proyek ini menggunakan **ES Modules**. Ini berarti Anda dapat menggunakan sintaks impor (`import`) dan ekspor (`export`) daripada sintaks CommonJS (`require` dan `module.exports`).

### 3. Server Framework

-   **Express.js (`express: "^4.21.1"`)**: Aplikasi ini menggunakan **Express.js** sebagai framework server HTTP. Express mempermudah pembuatan rute, menangani middleware, dan menangani request-response pada server.

### 4. Database Management

-   **MySQL2 (`mysql2: "^3.11.4"`)**: Ini menunjukkan bahwa aplikasi berinteraksi dengan database MySQL atau MariaDB menggunakan driver **mysql2**. MySQL2 mendukung operasi asynchronous, sehingga dapat digunakan dengan `async/await`.
-   **Sequelize (`sequelize: "^6.37.5"`)**: **Sequelize** adalah **ORM (Object Relational Mapping)** yang digunakan untuk mengelola interaksi antara kode JavaScript dan database relasional (dalam hal ini MySQL). Sequelize membantu membuat model data, menjalankan query, dan memanipulasi tabel tanpa menulis query SQL secara manual.

### 5. CORS Handling

-   **CORS (`cors: "^2.8.5"`)**: Untuk memungkinkan akses dari frontend yang mungkin berada di domain atau port yang berbeda, middleware **CORS** diintegrasikan. CORS akan memungkinkan atau menolak request dari origin lain yang mencoba mengakses API.

### 6. Environment Configuration

-   **Dotenv (`dotenv: "^16.4.5"`)**: **Dotenv** digunakan untuk mengelola **environment variables** yang disimpan dalam file `.env`. Ini umum digunakan untuk menyembunyikan informasi sensitif seperti kredensial database atau API key dari kode sumber.

### 7. Development Tool

-   **Nodemon (`nodemon: "^3.1.7"`)**: Aplikasi menggunakan **Nodemon** sebagai development tool. Nodemon secara otomatis akan merestart server ketika ada perubahan dalam kode, sehingga developer tidak perlu melakukannya secara manual setiap kali ada pembaruan dalam file.

### 8. Arsitektur Aplikasi

-   **MVC Pattern (Model-View-Controller)**: Meskipun tidak terlihat secara langsung dalam file `package.json`, dari penggunaan **Sequelize**, besar kemungkinan proyek ini menggunakan arsitektur **MVC**. **Sequelize** berfungsi sebagai **Model**, **Express.js** sebagai **Controller**, dan meskipun bagian **View** tidak terlihat, kemungkinan API ini terintegrasi dengan frontend lain.

### 9. Script untuk Menjalankan Aplikasi

-   **"start": "node index.js"**: Perintah `start` akan menjalankan file `index.js` menggunakan `node`. Biasanya, `index.js` berfungsi sebagai entry point di mana server Express diinisialisasi, dan koneksi ke database MySQL dibuat.

### 10. Workflow Pengembangan

-   Saat proses pengembangan, developer mungkin menggunakan perintah:
    -   `npm start`: Untuk memulai aplikasi secara manual menggunakan Node.js.
    -   `nodemon`: Untuk menjalankan aplikasi dalam mode development, di mana server akan restart otomatis setiap kali ada perubahan kode.

### 11. Caching dengan ioredis

-   **ioredis** adalah library Node.js untuk berinteraksi dengan **Redis**, sistem penyimpanan data yang berbasis memori yang dapat digunakan untuk meningkatkan performa aplikasi dengan meng-cache hasil query atau data yang sering diakses. Redis menyimpan data dalam memori sehingga akses data menjadi lebih cepat dibandingkan dengan mengakses database secara langsung.

#### **Instalasi ioredis**

Untuk menggunakan Redis dalam aplikasi ini, Anda perlu menginstal paket `ioredis`. Anda dapat melakukannya dengan menjalankan perintah berikut di terminal:

```bash
npm install ioredis
```

#### **Konfigurasi Redis**

Aplikasi ini menggunakan **ioredis** untuk menghubungkan ke server Redis dan melakukan operasi cache. Berikut adalah cara konfigurasi dasar untuk menghubungkan aplikasi ke Redis:

1. **Membuat Koneksi Redis**  
   Anda perlu membuat instans **Redis** menggunakan `ioredis` dan mengkonfigurasi koneksi ke server Redis. Koneksi ini biasanya diletakkan di dalam file `redis.js` atau di bagian konfigurasi aplikasi.

```js
import Redis from "ioredis";

// Membaca URL koneksi Redis dari environment variable
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// Mengecek koneksi Redis
redis.on("connect", () => {
    console.log("Redis connected");
});
```

#### **Mekanisme Caching**

Redis digunakan untuk menyimpan data yang sering diakses, seperti hasil query yang mahal atau informasi yang tidak sering berubah. Berikut adalah beberapa langkah untuk menerapkan caching:

1. **Menyimpan Data dalam Cache**

    Setelah data berhasil diambil dari database, Anda dapat menyimpannya di Redis untuk menghindari query yang berulang. Misalnya, saat mengambil data KRS, IPK, atau MHS:

```js
// Mendapatkan data dari Redis jika tersedia
const cachedData = await redis.get(`/krs/${nim}`);
if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData)); // Menggunakan data dari cache
}

// Jika data tidak ditemukan di cache, ambil dari database
const krsData = await KRS.findOne({ where: { nim } });

// Simpan data di Redis untuk penggunaan berikutnya
await redis.set(`/krs/${nim}`, JSON.stringify(krsData), "EX", 3600); // 'EX' menyetel data kedaluwarsa dalam 1 jam
res.status(200).json(krsData);
```

2. **Menghapus Cache saat Data Diperbarui**

    Setiap kali data yang tersimpan dalam cache diperbarui (misalnya saat **update** atau **delete** operasi), Anda harus menghapus cache yang relevan untuk memastikan data yang ditampilkan selalu terbaru.

```js
// Menghapus cache yang relevan setelah update
await redis.del(`/krs/${nim}`);
await redis.del(`/ipk/${nim}`);
await redis.del(`/mhs/${nim}`);
```

3. **Mekanisme Cache dengan TTL (Time to Live)**

    Anda dapat mengatur waktu kedaluwarsa pada data yang disimpan di Redis dengan TTL untuk memastikan data tidak disimpan selamanya dan tetap terbarui. Dalam contoh sebelumnya, `3600` detik (1 jam) adalah TTL yang digunakan.

#### **Keuntungan Caching dengan Redis**

-   **Performa yang Lebih Cepat**: Redis menyimpan data di memori, yang memungkinkan akses data yang lebih cepat dibandingkan mengambilnya dari database.
-   **Pengurangan Beban Database**: Dengan meng-cache hasil query atau data yang tidak berubah sering, Redis membantu mengurangi jumlah query yang dikirim ke database, yang dapat mengurangi beban pada database.
-   **Konsistensi Data**: Dengan menghapus cache yang relevan saat data diperbarui, Anda memastikan bahwa data yang ditampilkan di aplikasi selalu konsisten dan terbaru.

### Gambaran Umum

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

-   [Backend API - Sistem Manajemen KRS](#backend-api---sistem-manajemen-krs)
    -   [Gambaran Umum Proyek](#gambaran-umum-proyek)
        -   [1. Platform](#1-platform)
        -   [2. Type Module](#2-type-module)
        -   [3. Server Framework](#3-server-framework)
        -   [4. Database Management](#4-database-management)
        -   [5. CORS Handling](#5-cors-handling)
        -   [6. Environment Configuration](#6-environment-configuration)
        -   [7. Development Tool](#7-development-tool)
        -   [8. Arsitektur Aplikasi](#8-arsitektur-aplikasi)
        -   [9. Script untuk Menjalankan Aplikasi](#9-script-untuk-menjalankan-aplikasi)
        -   [10. Workflow Pengembangan](#10-workflow-pengembangan)
        -   [11. Caching dengan ioredis](#11-caching-dengan-ioredis)
            -   [**Instalasi ioredis**](#instalasi-ioredis)
            -   [**Konfigurasi Redis**](#konfigurasi-redis)
            -   [**Mekanisme Caching**](#mekanisme-caching)
            -   [**Keuntungan Caching dengan Redis**](#keuntungan-caching-dengan-redis)
        -   [Gambaran Umum](#gambaran-umum)
    -   [Fitur](#fitur)
    -   [Daftar Isi](#daftar-isi)
    -   [Instalasi](#instalasi)
    -   [Variabel Lingkungan](#variabel-lingkungan)
    -   [Endpoint API yang Tersedia](#endpoint-api-yang-tersedia)
        -   [API Endpoints](#api-endpoints)
            -   [IPK Endpoints](#ipk-endpoints)
            -   [KRS Endpoints](#krs-endpoints)
            -   [MHS Endpoints](#mhs-endpoints)
            -   [MK Endpoints](#mk-endpoints)
        -   [Mekanisme Caching](#mekanisme-caching-1)
    -   [Pengaturan Database](#pengaturan-database)
    -   [Menjalankan Aplikasi](#menjalankan-aplikasi)
    -   [Kontribusi](#kontribusi)
    -   [Lisensi](#lisensi)

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

### API Endpoints

#### IPK Endpoints

-   `GET /ipk`  
    Mendapatkan semua data IPK.  
    **Cache**: Data di-cache untuk mempercepat pengambilan data.

-   `GET /ipk/:nim`  
    Mendapatkan data IPK berdasarkan NIM (Nomor Induk Mahasiswa).  
    **Cache**: Data di-cache berdasarkan NIM untuk pengambilan data yang lebih cepat.

-   `GET /ipkc`  
    Mendapatkan data IPK yang sudah dihitung berdasarkan perhitungan.  
    **Cache**: Data di-cache untuk mempercepat pengambilan data.

-   `GET /ipkc/:nim`  
    Mendapatkan data IPK yang sudah dihitung berdasarkan NIM.  
    **Cache**: Data di-cache berdasarkan NIM.

-   `POST /ipk`  
    Membuat data IPK baru.

-   `PATCH /ipk/:id`  
    Memperbarui data IPK berdasarkan ID.

-   `DELETE /ipk/:id`  
    Menghapus data IPK berdasarkan ID.

#### KRS Endpoints

-   `GET /krs`  
    Mendapatkan semua data KRS.  
    **Cache**: Data di-cache untuk mempercepat pengambilan data.

-   `GET /krs/:nim`  
    Mendapatkan data KRS berdasarkan NIM.  
    **Cache**: Data di-cache berdasarkan NIM untuk pengambilan data yang lebih cepat.

-   `POST /krs`  
    Membuat data KRS baru.

-   `PATCH /krs/:id`  
    Memperbarui data KRS berdasarkan ID.

-   `DELETE /krs/:id`  
    Menghapus data KRS berdasarkan ID.

#### MHS Endpoints

-   `GET /mhs`  
    Mendapatkan semua data Mahasiswa.  
    **Cache**: Data di-cache untuk mempercepat pengambilan data.

-   `GET /mhs/:nim`  
    Mendapatkan data Mahasiswa berdasarkan NIM.  
    **Cache**: Data di-cache berdasarkan NIM untuk pengambilan data yang lebih cepat.

-   `GET /mhsc`  
    Mendapatkan data Mahasiswa yang sudah dihitung berdasarkan perhitungan.  
    **Cache**: Data di-cache untuk mempercepat pengambilan data.

-   `GET /mhsc/:nim`  
    Mendapatkan data Mahasiswa yang sudah dihitung berdasarkan NIM.  
    **Cache**: Data di-cache berdasarkan NIM.

-   `POST /mhs`  
    Membuat data Mahasiswa baru.

-   `PATCH /mhs/:nim`  
    Memperbarui data Mahasiswa berdasarkan NIM.

-   `DELETE /mhs/:nim`  
    Menghapus data Mahasiswa berdasarkan NIM.

#### MK Endpoints

-   `GET /mk`  
    Mendapatkan semua data Mata Kuliah.  
    **Cache**: Data di-cache untuk mempercepat pengambilan data.

-   `GET /mk/:id`  
    Mendapatkan data Mata Kuliah berdasarkan ID.  
    **Cache**: Data di-cache berdasarkan ID untuk pengambilan data yang lebih cepat.

-   `POST /mk`  
    Membuat data Mata Kuliah baru.

-   `PATCH /mk/:id`  
    Memperbarui data Mata Kuliah berdasarkan ID.

-   `DELETE /mk/:id`  
    Menghapus data Mata Kuliah berdasarkan ID.

---

### Mekanisme Caching

Setiap endpoint yang menggunakan `cacheResponse` akan mencoba untuk menyimpan data dalam **Redis** untuk mempercepat akses data di masa mendatang. Cache ini akan memiliki **TTL (Time-to-Live)** untuk memastikan bahwa data tetap terbarui dan tidak kadaluarsa. Begitu data diperbarui atau dihapus, cache yang relevan akan dihapus untuk memastikan konsistensi data.

Cache ini diatur menggunakan library **ioredis** yang terhubung ke server Redis. Berikut adalah contoh bagaimana cache diterapkan:

1. **Mengambil Data dari Cache**  
   Sebelum mengakses database, aplikasi akan memeriksa apakah data yang diminta sudah ada di Redis.

    ```js
    const cachedData = await redis.get(`/krs/${nim}`);
    if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
    }
    ```

2. **Menyimpan Data ke Cache**  
   Setelah data berhasil diambil dari database, data tersebut akan disimpan di Redis dengan TTL untuk keperluan pengambilan data di masa depan.

    ```js
    await redis.set(`/krs/${nim}`, JSON.stringify(krsData), "EX", 3600); // TTL 1 jam
    ```

3. **Menghapus Cache**  
   Setiap kali data diperbarui atau dihapus, cache terkait akan dihapus untuk menjaga konsistensi data.

    ```js
    await redis.del(`/krs/${nim}`);
    ```

Dengan menggunakan caching, aplikasi ini dapat mengurangi waktu respon dan mengurangi beban pada database, terutama ketika data yang diminta sering diakses.

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
