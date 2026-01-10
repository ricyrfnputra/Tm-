let lintasan = [];  
let animasi = null;   

// Menerima input user dan memproses nya langsung
function mulai() { 
    const v0 = parseFloat(document.getElementById("v0").value); // parseFloat (Pengubah string menjadi angka desimal)
    const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180; 
    const g = parseFloat(document.getElementById("g").value);
    const canvas = document.getElementById("canvas"); 
    const ctx = canvas.getContext("2d");   
    
    // Physic
    const wTotal = (2 * v0 * Math.sin(angle)) / g; 
    const jarak = (v0 * v0 * Math.sin(2 * angle)) / g;  

    // Tampilan perhitungan waktu dan jarak max pada HTML dari ID hasil
    document.getElementById("hasil").innerText =
        `Waktu jatuh :  ${wTotal.toFixed(2)} s | Jarak maksimum :  ${jarak.toFixed(2)} m`; 

    if (animasi) cancelAnimationFrame(animasi);

    //ctx.clearRect(0, 0, canvas.width, canvas.height); // menghapus atau bersihkan area yang sudah dilewati
    //drawGrid(ctx, canvas); // skala sumbu x dan y

    lintasan = []; 

    const scale = 5; 
    let w = 0;  

    // Animasi
    function anim() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);   
       drawGrid(ctx, canvas);  

        // Formula X Y
        let x = v0 * Math.cos(angle) * w;   
        let y = v0 * Math.sin(angle) * w - 0.5 * g * w * w; 
        if (y < 0) y = 0;   

        let cx = x * scale; 
        let cy = canvas.height - (y * scale);   

        lintasan.push({ x: cx, y: cy }); 

        // garis lintasan
        ctx.beginPath();
        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 2;  

        for (let i = 0; i < lintasan.length - 1; i++) { 
            ctx.moveTo(lintasan[i].x, lintasan[i].y);
            ctx.lineTo(lintasan[i + 1].x, lintasan[i + 1].y);
        }
        ctx.stroke();

        // bola lintasan
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2); 
        ctx.fillStyle = "black"; 
        ctx.fill();

        w += 0.03; 
        if (w <= wTotal) {
            animasi = requestAnimationFrame(anim);   
        }
    }
    anim();
}

// Canvas
function drawGrid(ctx, canvas) {
    ctx.strokeStyle = "#aaa";
    ctx.font = "14px Arial";

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
