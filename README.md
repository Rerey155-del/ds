<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README - Shopee Clone</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f9f9f9;
            color: #333;
        }
        h1, h2, h3 {
            color: #EE4D2D;
        }
        pre {
            background-color: #eee;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        code {
            font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
            background-color: #eee;
            padding: 2px 4px;
            border-radius: 3px;
        }
        a {
            color: #EE4D2D;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>Shopee Clone</h1>
    <p>
        <strong>Shopee Clone</strong> adalah aplikasi mobile yang dibangun menggunakan React Native dan Expo, terinspirasi dari platform e-commerce Shopee. Aplikasi ini memungkinkan pengguna untuk melihat dan membeli produk dengan fitur seperti pencarian, detail produk, manajemen keranjang, dan autentikasi. Backend aplikasi ini menggunakan <strong>JSON Server</strong>.
    </p>

    <h2>Fitur</h2>
    <ul>
        <li><strong>Daftar Produk:</strong> Lihat daftar produk yang difilter berdasarkan kategori seperti elektronik dan fashion.</li>
        <li><strong>Fitur Pencarian:</strong> Cari produk menggunakan kata kunci.</li>
        <li><strong>Detail Produk:</strong> Lihat informasi detail tentang setiap produk, termasuk harga dan deskripsi.</li>
        <li><strong>Manajemen Keranjang:</strong> Tambahkan item ke keranjang dan lihat isi keranjang.</li>
        <li><strong>Autentikasi:</strong> Autentikasi pengguna untuk login dan mengelola pengalaman belanja mereka.</li>
        <li><strong>Integrasi Firebase:</strong> Data diambil dari Firebase Real-time Database.</li>
    </ul>

    <h2>Instalasi</h2>
    <p>Ikuti langkah-langkah berikut untuk menginstal aplikasi ini:</p>

    <ol>
        <li><strong>Klon Repository:</strong>
            <pre><code>git clone https://github.com/Rerey155-del/Shopee-Clone.git
cd Shopee-Clone</code></pre>
        </li>
        <li><strong>Instal Dependensi:</strong>
            <pre><code>npm install</code></pre>
        </li>
        <li><strong>Instal Expo CLI:</strong>
            <pre><code>npm install -g expo-cli</code></pre>
        </li>
        <li><strong>Mulai Server Pengembangan Expo:</strong>
            <pre><code>expo start</code></pre>
        </li>
        <li><strong>Jalankan JSON Server untuk Backend:</strong>
            <p>Pastikan Anda telah menginstal JSON Server. Jika belum, Anda bisa menginstalnya secara global:</p>
            <pre><code>npm install -g json-server</code></pre>
            <p>Mulai JSON Server:</p>
            <pre><code>json-server --watch db.json --port 3000</code></pre>
        </li>
        <li><strong>Jalankan Aplikasi di Emulator atau Perangkat Fisik:</strong>
            <p>Gunakan aplikasi Expo di ponsel Anda atau emulator Android/iOS untuk menjalankan aplikasi.</p>
        </li>
    </ol>

    <h2>Backend</h2>
    <p>
        Backend untuk aplikasi ini menggunakan <strong>JSON Server</strong>, sebuah backend ringan untuk keperluan prototipe dan pengujian. Anda dapat mengelola data produk dan mensimulasikan panggilan API menggunakan file <code>db.json</code>.
    </p>
    <ul>
        <li><strong>Data Produk:</strong> Disimpan di dalam file <code>db.json</code>.</li>
        <li><strong>Autentikasi:</strong> Autentikasi dasar diimplementasikan melalui JSON Server.</li>
    </ul>

    <h2>Konfigurasi Firebase</h2>
    <p>
        Proyek ini juga terintegrasi dengan Firebase untuk manajemen data real-time. Pastikan untuk mengonfigurasi kredensial Firebase Anda di file <code>firebaseConfig.js</code>.
    </p>

    <h2>Autentikasi</h2>
    <p>
        Aplikasi ini mencakup fitur autentikasi dasar yang memungkinkan pengguna untuk login sebelum mengelola keranjang atau melakukan pembelian. Logika autentikasi diatur menggunakan JSON Server, dengan kemungkinan pengembangan lebih lanjut menggunakan Firebase Authentication atau layanan lainnya di masa depan.
    </p>

    <h2>Kontribusi</h2>
    <p>
        Silakan fork proyek ini dan kirim pull request. Kontribusi selalu diterima dengan senang hati!
    </p>

    <h2>Lisensi</h2>
    <p>
        Proyek ini dilisensikan di bawah Lisensi MIT.
    </p>
</body>
</html>
