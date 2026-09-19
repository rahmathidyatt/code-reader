# Code Reader

Web pembaca PDF dan Word gratis, dibuat untuk dibuka dari browser desktop maupun ponsel.

**Kode lengkap aplikasi berada di folder `dist/`.** Folder ini berisi source HTML, CSS, JavaScript, dan pustaka pendukung. Tidak ada proses kompilasi, API key, database, atau kebutuhan `npm install`.

## Fitur yang tersedia

- Buka PDF teks dan DOCX (maksimal 20 MB; PDF maksimal 100 halaman).
- Pratinjau PDF serta teks bacaan.
- Rentang halaman fisik PDF yang inklusif, misalnya 3–5.
- Word dibagi per paragraf/bagian, bukan halaman asli Word.
- Perkiraan bahasa lokal: Indonesia, Inggris, Arab, Prancis, Jerman, Spanyol, Jepang; dapat dikoreksi manual.
- Suara bawaan browser/perangkat; suara lokal dan daring diberi label.
- Mulai, jeda, lanjutkan, berhenti, kalimat sebelumnya/berikutnya, kecepatan, volume, dan contoh suara.
- Klik kalimat untuk mulai dari posisi itu dalam rentang pilihan.
- Edit teks bacaan tanpa mengubah dokumen asli.
- Sorotan kalimat aktif, auto-scroll, estimasi durasi, tema terang/gelap.
- Contoh bacaan agar pengguna bisa mencoba sebelum membuka file.

## Isi proyek

| File | Fungsi |
|---|---|
| `dist/index.html` | Struktur halaman dan seluruh kontrol |
| `dist/style.css` | Tampilan desktop/mobile dan tema |
| `dist/app.mjs` | Unggah file, pratinjau, pengaturan, dan kontrol suara |
| `dist/core.mjs` | Deteksi bahasa, segmentasi kalimat, rentang, ekstraksi baris PDF |
| `dist/icon.svg` | Ikon web |
| `dist/vendor/` | PDF.js, Mammoth, franc-min, worker PDF, dan lisensinya |
| `netlify.toml` | Konfigurasi publish Netlify |
| `.gitignore` | Pengecualian file lokal dari Git |
| `PANDUAN_GITHUB_NETLIFY.md` | Langkah menjalankan, push GitHub, dan deploy Netlify |

Jangan mengabaikan `dist/` di Git: pada proyek ini folder tersebut adalah source aplikasi yang harus dipublikasikan.

## Menjalankan lokal

Ekstrak ZIP, buka folder `code-reader` di VS Code, lalu buka terminal:

```bash
python -m http.server 8000 --directory dist
```

Pada Windows, jika `python` tidak dikenali, gunakan:

```bash
py -m http.server 8000 --directory dist
```

Buka http://localhost:8000. Hentikan server dengan Ctrl+C. Jangan membuka `index.html` dengan klik dua kali karena JavaScript module dan worker perlu dilayani melalui HTTP/HTTPS.

## Netlify — direkomendasikan

Push seluruh isi folder `code-reader` ke root repository GitHub, termasuk `dist` dan `netlify.toml`. Hubungkan repository ke Netlify.

| Pengaturan | Nilai |
|---|---|
| Framework | Tidak ada / Other jika diminta |
| Base directory | Kosong |
| Build command | Kosong |
| Publish directory | `dist` |
| Branch | `main` |
| Environment variables | Tidak diperlukan |

Konfigurasi publish sudah ada di `netlify.toml`. Setelah deployment selesai, periksa pengaturan akses dan pilih publish/public agar dapat dibuka semua pembaca. Menu dapat berbeda antar akun.

Alternatif tanpa Git: unggah folder `dist` ke fitur deploy manual Netlify. Untuk pembaruan rutin, koneksi GitHub lebih praktis.

Netlify memiliki paket Free dengan batas penggunaan. Hosting gratis bukan trafik tanpa batas; lihat https://www.netlify.com/pricing/ untuk ketentuan akun terbaru. Pembacaan suara tidak memanggil API TTS berbayar milik aplikasi.

## Streamlit

Paket ini bukan aplikasi Streamlit dan tidak berisi `app.py`/`requirements.txt`. Karena seluruh aplikasi berjalan di browser, Netlify bisa memublikasikannya langsung.

Streamlit Community Cloud menjalankan entrypoint Python. Untuk menggunakan Streamlit, perlu dibuat aplikasi pembungkus atau adaptasi komponen frontend, termasuk penyajian module/worker PDF dan pengujian suara dalam iframe. Mengganti ekstensi file menjadi `.py` atau menambahkan `requirements.txt` saja tidak cukup. Paket ini belum diuji atau diadaptasi untuk Streamlit.

## Batasan dan privasi

- OCR untuk PDF scan belum tersedia. Halaman kosong/scan dalam rentang memblokir pembacaan agar tidak terlewat diam-diam; pilih rentang berisi teks.
- Periksa tabel dan dokumen multi-kolom: urutan mengikuti item teks dalam PDF, belum ada rekonstruksi layout kompleks.
- Untuk memilih halaman asli Word, ekspor Word menjadi PDF terlebih dahulu.
- Deteksi bahasa merupakan perkiraan. Bahasa Indonesia dan Melayu dapat tertukar; bila nilainya dekat, aplikasi memprioritaskan Indonesia. Pengguna tetap dapat mengganti bahasa.
- Suara tergantung browser, sistem operasi, dan bahasa yang terpasang. Jika kosong, pilih bahasa lain atau pasang suara bahasa yang sesuai pada perangkat.
- Jeda/lanjutkan dan suara pada layar terkunci dapat berbeda antarperangkat. Suara di tiap perangkat tidak dijamin identik.
- Teks Arab tanpa harakat tidak dijamin selalu dilafalkan benar; aplikasi bukan pembaca tajwid khusus.
- Tidak ada ekspor MP3 atau riwayat dokumen permanen.
- Dokumen dan teks diproses dalam memori browser, tidak dikirim ke server aplikasi. Refresh/tutup tab akan menghilangkan dokumen dari sesi.
- Suara berlabel daring dapat mengirim teks ke layanan browser/OS. Pilih suara berlabel lokal jika tersedia untuk pemrosesan suara lokal.
- Tema saja disimpan di localStorage. Antarmuka mengakses Google Fonts dengan fallback font jika tidak tersedia.

## Validasi versi sumber

Ekstraksi PDF enam halaman, batas rentang 3–5, validasi rentang salah, ekstraksi DOCX, deteksi tiga bahasa utama, keterhubungan elemen UI, serta logika pemutaran dengan simulasi suara telah diperiksa. Uji audio aktual dan tampilan lintas browser tetap perlu dilakukan pada perangkat pengguna. Paket belum dideploy ke akun Netlify Anda.

## Pustaka pihak ketiga

- PDF.js / pdfjs-dist 4.10.38 — Apache-2.0.
- Mammoth 1.9.1 — BSD-2-Clause.
- franc-min 6.2.0 — MIT.

Lisensi disertakan di `dist/vendor/`. Pertahankan pemberitahuan lisensi saat membagikan atau mengubah pustaka. File aplikasi dapat diedit langsung; file vendor tidak perlu diedit untuk mengubah tampilan dan perilaku Code Reader.

## Dokumentasi resmi

- Netlify config: https://docs.netlify.com/build/configure-builds/file-based-configuration/
- Netlify pricing: https://www.netlify.com/pricing/
- Streamlit deploy: https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/deploy

created by codematt
