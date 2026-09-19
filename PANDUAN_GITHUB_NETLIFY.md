# Panduan Code Reader: VS Code → GitHub → Netlify

## 1. Ekstrak dan buka proyek

Ekstrak `Code_Reader_Source_GitHub_Netlify.zip`. Buka folder `code-reader` di VS Code. Pastikan `netlify.toml` terlihat di root yang sama dengan folder `dist`.

## 2. Coba di komputer

Di terminal VS Code:

```bash
python -m http.server 8000 --directory dist
```

Jika Windows tidak mengenali `python`, ganti dengan `py`.

Buka http://localhost:8000. Pilih **Coba dengan teks contoh**, periksa bahasa dan suara, lalu tekan **Mulai membaca**. Setelah itu coba PDF dan DOCX Anda. Tekan Ctrl+C pada terminal untuk berhenti.

## 3. Buat repository GitHub

1. Masuk GitHub dan buat repository baru bernama `code-reader`.
2. Pilih Public jika ingin source dapat dilihat semua orang. Repository private juga bisa dipakai sesuai dukungan akun hosting.
3. Untuk perintah di bawah, buat repository kosong: jangan tambahkan README, license, atau gitignore melalui GitHub karena sudah ada file lokal.
4. Salin URL repository Anda.

## 4. Push dari VS Code

Pastikan terminal berada di folder `code-reader`, bukan folder `dist`.

```bash
git init
git add .
git commit -m "Initial commit: Code Reader"
git branch -M main
git remote add origin https://github.com/USERNAME/code-reader.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub Anda. Autentikasi melalui alur login GitHub yang muncul. Jangan menaruh token di source atau URL repository.

Jika Git meminta identitas, atur identitas untuk repository ini lalu ulangi commit:

```bash
git config user.name "Nama GitHub Anda"
git config user.email "EMAIL_GITHUB_ANDA"
```

Gunakan email yang terverifikasi pada GitHub atau alamat noreply dari pengaturan akun agar commit terhubung ke akun Anda. Riwayat Git hosting sebelumnya tidak disertakan dalam paket ini.

Alternatif: gunakan panel Source Control VS Code → Initialize Repository → Commit → Publish to GitHub.

## 5. Hubungkan Netlify

1. Masuk Netlify dan buat/import proyek dari repository Git.
2. Pilih GitHub, beri akses ke repository yang dibutuhkan, lalu pilih `code-reader`.
3. Gunakan branch `main`.
4. Base directory: kosong.
5. Build command: kosong; tidak ada npm install/build yang diperlukan.
6. Publish directory: `dist`.
7. Tidak perlu API key atau environment variable.
8. Jalankan deploy. File `netlify.toml` sudah menentukan folder publish.
9. Setelah selesai, pilih publish/public pada pengaturan akses jika proyek masih private. Periksa tautan melalui jendela incognito agar yakin pembaca tidak diminta login.
10. Anda dapat memilih nama subdomain Netlify yang tersedia melalui pengaturan proyek. Domain berbayar tidak wajib.

Jika Netlify sudah mengisi build command otomatis, kosongkan karena ini web statis tanpa tahap build.

## 6. Pembaruan berikutnya

Edit HTML/CSS/JavaScript, coba secara lokal, kemudian:

```bash
git add .
git commit -m "Update Code Reader"
git push
```

Dengan deploy Git terhubung, Netlify dapat menerbitkan pembaruan dari branch yang dikonfigurasi. Pantau kuota paket Free, termasuk penggunaan deployment dan trafik.

## 7. Cek setelah deploy

- Teks contoh dapat dimuat.
- Bahasa dan daftar suara muncul; ketersediaan suara bergantung perangkat.
- PDF bisa dibuka dan tab Dokumen asli menampilkan halaman.
- Rentang 3–5 berhenti setelah halaman 5.
- Mengganti rentang menghentikan bacaan lama.
- DOCX menampilkan bagian/paragraf.
- Mode gelap dan tampilan ponsel dapat digunakan.
- Hapus membuang dokumen dari sesi.

## Pemecahan masalah singkat

**Halaman 404:** pastikan root repository berisi `netlify.toml` dan `dist/index.html`. Publish directory harus `dist`.

**Tombol tidak bekerja saat dibuka dari Windows Explorer:** gunakan server lokal, jangan file://.

**Module/worker gagal:** pastikan seluruh folder `vendor` ikut di-push. Jangan hanya mengunggah index.html. Worker dan PDF.js harus berasal dari versi yang sama.

**Suara tidak tersedia:** pilih bahasa secara manual, periksa suara yang terpasang pada perangkat, lalu muat ulang. Mode incognito atau browser berbeda dapat memiliki daftar suara berbeda.

**PDF kosong/scan:** versi ini belum memiliki OCR. Gunakan PDF berisi teks yang dapat diseleksi atau konversikan scan dengan alat OCR terlebih dahulu.

**Nomor halaman Word berbeda:** aplikasi tidak menentukan halaman Word. Ekspor Word menjadi PDF untuk kontrol halaman.

**Streamlit meminta file utama:** source ini bukan aplikasi Python. Gunakan Netlify untuk paket ini; Streamlit memerlukan adaptasi terpisah.

Dokumentasi:
- https://docs.netlify.com/build/configure-builds/file-based-configuration/
- https://www.netlify.com/pricing/
- https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/deploy
