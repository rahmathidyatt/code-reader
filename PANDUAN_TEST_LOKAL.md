# Panduan Menjalankan Code Reader di Komputer

Code Reader adalah aplikasi web pembaca dokumen PDF dan Word (DOCX) dengan dukungan pembacaan teks multibahasa menggunakan teknologi Text-to-Speech.

Panduan ini menjelaskan cara mengekstrak, menjalankan, dan menguji aplikasi Code Reader secara lokal di komputer sebelum digunakan.

## 1. Persiapan

Sebelum menjalankan aplikasi, pastikan komputer memiliki:

- Windows 10 atau Windows 11.
- Browser Google Chrome atau Microsoft Edge.
- Visual Studio Code (VS Code).
- Python 3 untuk menjalankan server lokal.

Python dapat diunduh melalui:
https://www.python.org/downloads/

Pastikan Python berhasil terpasang dengan membuka terminal dan menjalankan:

```bash
python --version
```

Jika Python sudah terpasang, terminal akan menampilkan versi Python yang digunakan.

Jika perintah tersebut tidak dikenali pada Windows, coba:

```bash
py --version
```

## 2. Ekstrak dan Buka Project

1. Unduh file ZIP Code Reader.
2. Klik kanan pada file ZIP.
3. Pilih Extract All atau Ekstrak Semua.
4. Buka folder hasil ekstraksi.
5. Pastikan folder utama bernama `code-reader`.

Struktur project secara umum:

```text
code-reader/
│
├── dist/
│   ├── index.html
│   ├── app.mjs
│   └── vendor/
│
├── netlify.toml
└── PANDUAN_TEST_LOKAL.md
```

Folder `dist` berisi aplikasi yang siap dijalankan melalui browser.

Jangan menghapus atau memindahkan file di dalam folder tersebut karena dapat menyebabkan sebagian fitur aplikasi tidak berfungsi.

## 3. Buka Project di VS Code

1. Jalankan Visual Studio Code.
2. Klik File.
3. Pilih Open Folder.
4. Cari folder `code-reader`.
5. Klik Select Folder.

Pastikan folder project sudah terbuka dan seluruh file terlihat pada panel Explorer di sebelah kiri.

## 4. Jalankan Code Reader

Setelah project terbuka, jalankan aplikasi menggunakan server lokal.

### Langkah 1: Buka Terminal

Pada VS Code, pilih:

Terminal → New Terminal

Pastikan terminal berada di direktori utama `code-reader`.

### Langkah 2: Jalankan Server Lokal

Masukkan perintah berikut:

```bash
python -m http.server 8000 --directory dist
```

Jika Windows tidak mengenali perintah `python`, gunakan:

```bash
py -m http.server 8000 --directory dist
```

Jika berhasil, terminal akan menampilkan informasi seperti:

```text
Serving HTTP on :: port 8000
```

Artinya, server lokal sudah berjalan.

### Langkah 3: Buka Aplikasi

Buka Google Chrome atau Microsoft Edge.

Masukkan alamat berikut:

http://localhost:8000

Aplikasi Code Reader akan terbuka melalui browser.

Catatan:

- Tidak perlu menginstal package tambahan melalui npm.
- Tidak perlu membuat akun.
- Tidak perlu menggunakan API key.
- Server hanya berjalan di komputer lokal.

## 5. Pengujian Fitur Code Reader

Setelah aplikasi berhasil dibuka, lakukan beberapa pengujian berikut.

### A. Pengujian Teks Contoh

1. Klik tombol "Coba dengan teks contoh".
2. Pastikan teks berhasil ditampilkan.
3. Periksa bahasa yang terdeteksi.
4. Pilih suara yang tersedia.
5. Klik "Mulai membaca".

Pastikan aplikasi dapat membacakan teks menggunakan suara yang dipilih.

### B. Pengujian Dokumen PDF

1. Unggah dokumen PDF.
2. Tunggu proses ekstraksi teks selesai.
3. Pastikan isi dokumen berhasil ditampilkan.
4. Periksa tampilan halaman PDF.
5. Tentukan rentang halaman yang ingin dibacakan.
6. Klik "Mulai membaca".

Contoh pengujian rentang halaman:

```text
Mulai halaman : 3
Akhir halaman: 5
```

Aplikasi seharusnya membaca teks dari halaman 3 sampai halaman 5 sesuai pengaturan.

### C. Pengujian Dokumen Word

1. Unggah dokumen berformat DOCX.
2. Tunggu proses ekstraksi selesai.
3. Pastikan paragraf dan isi dokumen berhasil ditampilkan.
4. Pilih bahasa dan suara.
5. Klik "Mulai membaca".

Catatan:

Nomor halaman Word tidak selalu sama dengan tampilan Microsoft Word karena format DOCX tidak menyimpan pembagian halaman secara tetap.

Jika memerlukan kontrol halaman yang lebih akurat, ekspor dokumen Word menjadi PDF terlebih dahulu.

### D. Pengujian Kontrol Pembacaan

Periksa fungsi berikut:

- Memulai pembacaan.
- Menjeda pembacaan.
- Melanjutkan pembacaan.
- Menghentikan pembacaan.
- Mengganti bahasa dan suara.
- Mengatur rentang halaman.
- Menghapus dokumen dari sesi.

Pastikan aplikasi tidak melanjutkan pembacaan dokumen sebelumnya ketika pengguna memilih dokumen atau rentang halaman baru.

### E. Pengujian Antarmuka

Periksa tampilan aplikasi pada beberapa kondisi:

- Mode terang.
- Mode gelap.
- Ukuran jendela browser kecil.
- Tampilan browser layar penuh.
- Tampilan melalui perangkat seluler jika tersedia.

Pastikan tulisan, tombol, dan navigasi tetap terlihat serta mudah digunakan.

## 6. Menghentikan Aplikasi

Jika pengujian selesai:

1. Kembali ke terminal VS Code.
2. Tekan Ctrl + C.
3. Tunggu hingga server berhenti.

Setelah server dihentikan, aplikasi tidak lagi dapat diakses melalui alamat localhost tersebut sampai server dijalankan kembali.

## 7. Pemecahan Masalah

### Python tidak dikenali

Coba jalankan:

```bash
py -m http.server 8000 --directory dist
```

Jika tetap gagal, periksa apakah Python sudah terpasang dengan benar.

### Halaman tidak dapat dibuka

Pastikan:

- Terminal masih menjalankan server.
- Alamat yang dibuka adalah http://localhost:8000.
- Folder `dist` tersedia.
- File `index.html` berada di dalam folder `dist`.

### Port 8000 sudah digunakan

Gunakan port alternatif:

```bash
python -m http.server 8080 --directory dist
```

Kemudian buka:

http://localhost:8080

### Tombol aplikasi tidak berfungsi

Jangan menjalankan aplikasi dengan membuka file `index.html` langsung melalui Windows Explorer.

Gunakan server lokal seperti yang dijelaskan pada langkah sebelumnya.

### Dokumen PDF tidak terbaca

Pastikan PDF berisi teks yang dapat diseleksi.

PDF yang berasal dari hasil scan gambar mungkin tidak dapat diekstrak karena versi aplikasi ini belum mendukung OCR.

### Suara tidak tersedia

Periksa:

- Pengaturan suara pada perangkat.
- Bahasa yang dipilih.
- Ketersediaan suara pada browser.

Coba muat ulang halaman atau gunakan browser berbeda.

Ketersediaan suara dapat berbeda pada setiap perangkat dan sistem operasi.

---

## Selesai

Jika seluruh pengujian berhasil, Code Reader sudah dapat digunakan secara lokal melalui browser komputer.

Setiap kali ingin menjalankan aplikasi kembali, cukup buka folder project di VS Code dan jalankan:

```bash
python -m http.server 8000 --directory dist
```

Kemudian akses:

http://localhost:8000

**Code Reader | Document Reading Made Simple**