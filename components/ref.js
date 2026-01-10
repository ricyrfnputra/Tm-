let lintasan = [];  // Penyimpan posisi riwayat bola saat bergerak
let animasi = null;   // ID untuk animasi

// Menerima input user dan memproses nya langsung
function mulai() { // Code dibawah akan berjalan dan diproses pada saat tombol mulai di tekan
    const v0 = parseFloat(document.getElementById("v0").value); // parseFloat (Pengubah string menjadi angka desimal)
    const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180; // ubah derajat ke radian . // karena dalam program javascript hanya menerima dalam bentuk radian bukan derajat
    const g = parseFloat(document.getElementById("g").value);
    const canvas = document.getElementById("canvas"); // tempat animasi di tampilkan
    const ctx = canvas.getContext("2d");    // untuk menggambar lintasan nya 
    // Rumus fisika
    const wTotal = (2 * v0 * Math.sin(angle)) / g; // waktu bola dari naik sampai jatuh
    const jarak = (v0 * v0 * Math.sin(2 * angle)) / g;  // jarak yang ditempuh bola


    // Tampilan perhitungan waktu dan jarak max pada HTML dari ID hasil
    document.getElementById("hasil").innerText =
        `Waktu jatuh :  ${wTotal.toFixed(2)} s | Jarak maksimum :  ${jarak.toFixed(2)} m`; // membulatkan angka desimal

    // Fix Animasi agar gak double atau ganda, ketika ditekan berulang kali gak numpuk
    if (animasi) cancelAnimationFrame(animasi);

    //ctx.clearRect(0, 0, canvas.width, canvas.height); // menghapus atau bersihkan area yang sudah dilewati
    //drawGrid(ctx, canvas); // skala sumbu x dan y

    lintasan = []; 

    const scale = 5; // skala gambar di canvas (pixel)
    let w = 0;  // waktu dimulai dari 0 detik

    // Animasi
    function anim() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);   // menghapus frame lama agar tidak berjejak
       drawGrid(ctx, canvas);  // gambar koordinat

        // Formula X Y
        let x = v0 * Math.cos(angle) * w;   // horizontal
        let y = v0 * Math.sin(angle) * w - 0.5 * g * w * w; // vertikal
        if (y < 0) y = 0;   // agar bola tepat jatuh di tanah kembali ke 0

        let cx = x * scale; // x dalam pixel
        let cy = canvas.height - (y * scale);   

        lintasan.push({ x: cx, y: cy }); // menyimpan posisi buat menggambar jejak berupa garis

        // garis lintasan
        ctx.beginPath();
        ctx.strokeStyle = "black"; // Style garis
        ctx.lineWidth = 2;  // lebar garis

        for (let i = 0; i < lintasan.length - 1; i++) { // Titik pertama peluncuran bola dimulai dari 0
            ctx.moveTo(lintasan[i].x, lintasan[i].y);
            ctx.lineTo(lintasan[i + 1].x, lintasan[i + 1].y);
        }
        ctx.stroke();

        // bola lintasan
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2); // ukuran bola
        ctx.fillStyle = "black"; // warna bola dan tick x dan y
        ctx.fill();

        w += 0.03; // waktu peluncuran bola
        if (w <= wTotal) {
            animasi = requestAnimationFrame(anim);  // fix double garis 
        }
    }
    anim();
}

// Canvas
function drawGrid(ctx, canvas) {
    ctx.strokeStyle = "#aaa";
    ctx.font = "14px Arial"; // font angka x dan y

    // angka x
    for (let x = 0; x <= canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - 5);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        ctx.fillText((x / 5).toFixed(0), x + 2, canvas.height - 10);
    }

    // angka y
    for (let y = 0; y <= canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - y);
        ctx.lineTo(10, canvas.height - y);
        ctx.stroke();
        ctx.fillText((y / 5).toFixed(0), 15, canvas.height - y + 4);
    }
}
