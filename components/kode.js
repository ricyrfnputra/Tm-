let lintasan = [];  
let animasi = null;   
//lintasan adalah array yang berfungsi untuk menyimpan semua posisi bola selama bergerak, supaya bisa digambar sebagai garis lintasan.
//animasi digunakan untuk menyimpan ID animasi dari requestAnimationFrame, supaya animasi tidak berjalan ganda saat tombol ditekan berkali-kali.

function mulai() {}
//Fungsi ini adalah fungsi utama program yang akan dijalankan saat tombol “Mulai” ditekan oleh user.

const v0 = parseFloat(document.getElementById("v0").value);
//Mengambil nilai kecepatan awal (v₀) dari input HTML, lalu mengubahnya menjadi angka desimal menggunakan parseFloat.

const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;
//Nilai sudut diambil dari input dalam satuan derajat
//Dikoversi menjadi radian karena fungsi trigonometri di JavaScript hanya menerima radian
//Rumus konversinya:radian = derajat × π / 180

const g = parseFloat(document.getElementById("g").value);
//Mengambil nilai gravitasi (g) dari input user.

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//canvas adalah media tempat animasi ditampilkan
//ctx digunakan sebagai alat untuk menggambar objek 2D seperti garis dan bola

const wTotal = (2 * v0 * Math.sin(angle)) / g;
//Ini adalah rumus waktu total gerak parabola, yaitu waktu dari bola dilempar sampai jatuh kembali ke tanah.
//Rumus fisikanya:
//t = (2 × v₀ × sin θ) / g

const jarak = (v0 * v0 * Math.sin(2 * angle)) / g;
//Ini adalah rumus jarak maksimum gerak parabola.
//Rumus fisikanya:
//x = (v₀² × sin 2θ) / g

document.getElementById("hasil").innerText =
`Waktu jatuh : ${wTotal.toFixed(2)} s | Jarak maksimum : ${jarak.toFixed(2)} m`;
//Menampilkan hasil waktu jatuh dan jarak maksimum ke layar dengan 2 angka di belakang koma.

if (animasi) cancelAnimationFrame(animasi);
//Digunakan untuk menghentikan animasi lama, supaya tidak terjadi tumpukan animasi.

lintasan = [];
//Mengosongkan kembali jejak lintasan sebelum simulasi dimulai ulang.

const scale = 5;
let w = 0;
//scale digunakan untuk mengubah meter menjadi pixel
//w adalah variabel waktu, dimulai dari 0 detik

function anim() {}
//Ini adalah fungsi pergerakan bola yang akan dipanggil berulang-ulang menggunakan requestAnimationFrame.

ctx.clearRect(0, 0, canvas.width, canvas.height);
drawGrid(ctx, canvas);
//Membersihkan layar pada setiap frame
//Menggambar ulang sumbu X dan Y

let x = v0 * Math.cos(angle) * w;
//Rumus posisi horizontal:
//x = v₀ × cos θ × t

let y = v0 * Math.sin(angle) * w - 0.5 * g * w * w;
//Rumus posisi vertikal:
//y = v₀ × sin θ × t − ½ × g × t²

if (y < 0) y = 0;
//Jika bola sudah menyentuh tanah, maka posisi y dikunci di nol.

let cx = x * scale;
let cy = canvas.height - (y * scale);
//Mengubah satuan meter ke pixel, lalu membalik sumbu Y karena canvas dimulai dari atas.

lintasan.push({ x: cx, y: cy });
//Menyimpan posisi bola ke dalam array lintasan untuk membuat jejak garis.

ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
//Mengatur warna dan ketebalan garis lintasan.

for (let i = 0; i < lintasan.length - 1; i++) {
    ctx.moveTo(lintasan[i].x, lintasan[i].y);
    ctx.lineTo(lintasan[i + 1].x, lintasan[i + 1].y);
}
ctx.stroke();
//Menghubungkan setiap titik lintasan menjadi satu garis utuh berbentuk parabola.

ctx.beginPath();
ctx.arc(cx, cy, 6, 0, Math.PI * 2);
ctx.fillStyle = "black";
ctx.fill();
//Menggambar bola berbentuk lingkaran kecil yang bergerak mengikuti lintasan.

w += 0.03;
//Menambah waktu sedikit demi sedikit agar bola terus bergerak.

if (w <= wTotal) {
    animasi = requestAnimationFrame(anim);
}
//Animasi akan terus berjalan selama waktu belum melebihi waktu total jatuh.

function drawGrid(ctx, canvas){}
//Fungsi ini bertugas untuk menggambar sumbu X, Y, dan angka skalanya.

for (let x = 0; x <= canvas.width; x += 50) {}
//Menampilkan angka dan garis pada sumbu X.

for (let y = 0; y <= canvas.height; y += 50) {}
//Menampilkan angka dan garis pada sumbu Y.


//Dengan demikian, dapat disimpulkan bahwa program ini telah berhasil menerapkan rumus fisika gerak parabola ke dalam bentuk simulasi visual menggunakan JavaScript dan HTML Canvas. Program ini membantu kita memahami hubungan antara kecepatan awal, sudut, waktu, dan jarak dalam gerak parabola.

//Demikian presentasi yang dapat saya sampaikan. Terima kasih atas perhatian Bapak/Ibu dosen dan teman-teman semua.