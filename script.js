// Initialisatie van het canvas en de context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Stel de grootte van elk blok in (de slang en het voedsel zullen in deze blokken bewegen)
const box = 20;

// Functie om het speeloppervlak te tekenen (optioneel)
function drawGrid() {
    ctx.strokeStyle = '#e0e0e0';
    for (let i = 0; i <= canvas.width; i += box) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

// Teken het speeloppervlak bij het laden van de pagina
drawGrid();
