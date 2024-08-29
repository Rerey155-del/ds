Shopee Clone
Shopee Clone adalah aplikasi mobile yang dibangun menggunakan React Native dan Expo, terinspirasi dari platform e-commerce Shopee. Aplikasi ini memungkinkan pengguna untuk melihat dan membeli produk dengan fitur seperti pencarian, detail produk, manajemen keranjang, dan autentikasi. Backend aplikasi ini menggunakan JSON Server.

Fitur
Daftar Produk: Lihat daftar produk yang difilter berdasarkan kategori seperti elektronik dan fashion.
Fitur Pencarian: Cari produk menggunakan kata kunci.
Detail Produk: Lihat informasi detail tentang setiap produk, termasuk harga dan deskripsi.
Manajemen Keranjang: Tambahkan item ke keranjang dan lihat isi keranjang.
Autentikasi: Autentikasi pengguna untuk login dan mengelola pengalaman belanja mereka.
Integrasi Firebase: Data diambil dari Firebase Real-time Database.
Instalasi
Klon Repository:

bash
Salin kode
git clone https://github.com/Rerey155-del/Shopee-Clone.git
cd Shopee-Clone
Instal Dependensi:

bash
Salin kode
npm install
Instal Expo CLI:

bash
Salin kode
npm install -g expo-cli
Mulai Server Pengembangan Expo:

bash
Salin kode
expo start
Jalankan JSON Server untuk Backend: Pastikan Anda telah menginstal JSON Server. Jika belum, Anda bisa menginstalnya secara global:

bash
Salin kode
npm install -g json-server
Mulai JSON Server:

bash
Salin kode
json-server --watch data.json --port 3000
Jalankan Aplikasi di Emulator atau Perangkat Fisik: Gunakan aplikasi Expo di ponsel Anda atau emulator Android/iOS untuk menjalankan aplikasi.

Backend
Backend untuk aplikasi ini menggunakan JSON Server, sebuah backend ringan untuk keperluan prototipe dan pengujian. Anda dapat mengelola data produk dan mensimulasikan panggilan API menggunakan file db.json.

Data Produk: Disimpan di dalam file data.json.
Autentikasi: Autentikasi dasar diimplementasikan melalui JSON Server.
Konfigurasi Firebase
Proyek ini juga terintegrasi dengan Firebase untuk manajemen data real-time. Pastikan untuk mengonfigurasi kredensial Firebase Anda di file firebaseConfig.js.

Autentikasi
Aplikasi ini mencakup fitur autentikasi dasar yang memungkinkan pengguna untuk login sebelum mengelola keranjang atau melakukan pembelian. Logika autentikasi diatur menggunakan JSON Server, dengan kemungkinan pengembangan lebih lanjut menggunakan Firebase Authentication atau layanan lainnya di masa depan.

Kontribusi
Silakan fork proyek ini dan kirim pull request. Kontribusi selalu diterima dengan senang hati!

Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT.
