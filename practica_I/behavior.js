var heroe = {
    x: 575,
    y: 700
}

const estado = {
    mover_izq : false,
    mover_der : false,
    disparar: false
}

var arrayMisiles = []

var arrayEnemigos = [
    { x: 200, y: 100 },
    { x: 300, y: 100 },
    { x: 400, y: 100 },
    { x: 500, y: 100 },
    { x: 600, y: 100 },
    { x: 700, y: 100 },
    { x: 800, y: 100 },
    { x: 900, y: 100 }
]

function keyPress(event) {
    if(event.key === "ArrowRight") {
        estado.mover_der = true;
    }

    if(event.key === "ArrowLeft") {
        estado.mover_izq = true;
    }

    if(event.key === " ") {
        estado.disparar = true;
    }
}

function keyRelease(event) {
    if(event.key === "ArrowRight") {
        estado.mover_der = false;
    }

    if(event.key === "ArrowLeft") {
        estado.mover_izq = false;
    }

    if(event.key === " ") {
        estado.disparar = false;
    }
}

window.addEventListener("keydown", keyPress);
window.addEventListener("keyup", keyRelease);

function bound(x) {
    if (heroe.x < 10) {
        heroe.x = 10;
        return heroe.x;  
    } else if (heroe.x > 1140) {
        heroe.x = 1140;
        return heroe.x;
    } else {
        return heroe.x
    }
}

function actualizarHeroe() {
    if (estado.mover_izq){
        heroe.x = bound(heroe.x) - 10;
    } else if(estado.mover_der){
        heroe.x = bound(heroe.x) + 10;
    } if(estado.disparar) {
        arrayMisiles.push({
            left: heroe.x + 20,
            top: heroe.y + 10
        })
    } 
    document.getElementById('heroe').style.left = heroe.x + "px";
}

function dibujarMisiles() {
    document.getElementById('misiles').innerHTML = "";
    for(var m = 0; m < arrayMisiles.length; m++) {
        document.getElementById('misiles').innerHTML += 
        `<div class='misil' style='
            left: ${arrayMisiles[m].left}px;
            top:${arrayMisiles[m].top}px'>
        </div>`
    }
}

function moverMisiles() {
    for(var m = 0; m < arrayMisiles.length; m++) {
        arrayMisiles[m].top = arrayMisiles[m].top - 5;
    }
}

function dibujarEnemigos() {
    document.getElementById('enemigos').innerHTML = ""
    for(var e = 0; e < arrayEnemigos.length; e++) {
        document.getElementById('enemigos').innerHTML += 
        `<div class='enemigo' style='
            left: ${arrayEnemigos[e].x}px;
            top:${arrayEnemigos[e].y}px'>
        </div>`
    }
}

function moverEnemigos() {
    for(var e = 0; e < arrayEnemigos.length; e++) {
        arrayEnemigos[e].y = arrayEnemigos[e].y + 1;
    }
}

function detectarColisiones() {
    for(var e = 0; e < arrayEnemigos.length; e++) {
        for(var m = 0; m < arrayMisiles.length; m++) {
            if(
                (arrayMisiles[m].top <= arrayEnemigos[e].y + 50) &&
                (arrayMisiles[m].top >= arrayEnemigos[e].y) &&
                (arrayMisiles[m].left >= arrayEnemigos[e].x) &&
                (arrayMisiles[m].left <= arrayEnemigos[e].x + 50)
            ) {
                arrayEnemigos.splice(e, 1)
                arrayMisiles.splice(m, 1)
            } else if(arrayMisiles[m].top <= 0) {
                arrayMisiles.splice(m, 1)
            }
        }
    }
}

function gameLoop() {
    setTimeout(gameLoop, 50)
    actualizarHeroe();
    moverMisiles();
    dibujarMisiles();
    moverEnemigos();
    dibujarEnemigos();
    detectarColisiones();
}

gameLoop()