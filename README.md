# Simulasi Gerak Parabola 

Proyek ini adalah alat visualisasi interaktif untuk membantu memahami konsep fisika gerak parabola. Dibuat menggunakan JavaScript murni dan HTML5 Canvas.

## 🚀 Fitur
- **Animasi Real-time**: Menggunakan `requestAnimationFrame` untuk pergerakan halus.
- **Visualisasi Jejak**: Menampilkan `lintasan` yang dilalui objek menggunakan koordinat array.
- **Perhitungan Akurat**: Menghitung Jarak Terjauh dan Waktu Total berdasarkan input pengguna.

## 📐 Rumus yang Digunakan
Program ini mengonversi input derajat menjadi radian sebelum menghitung:
- **Konversi Sudut**: `radian = derajat * (PI / 180)`
- **Waktu di Udara**: `(2 * v0 * sin(angle)) / g`
- **Jarak Maksimum**: `(v0^2 * sin(2 * angle)) / g`

## 🛠️ Cara Menggunakan
1. Masukkan nilai **Kecepatan Awal (v0)**.
2. Masukkan **Sudut Elevasi** (dalam derajat).
3. Klik tombol tembak untuk melihat lintasan.
4. Gunakan tombol reset jika ingin memulai ulang (menghentikan `animasi` dengan `cancelAnimationFrame`).

## 📚 Apa yang Saya Pelajari?
- Cara kerja manipulasi array dengan `.push()`.
- Pembersihan canvas dengan `clearRect()` untuk animasi.
- Penanganan input dengan `parseFloat()`.
- Menggambar bentuk dasar (line, arc, stroke) pada Canvas API.
