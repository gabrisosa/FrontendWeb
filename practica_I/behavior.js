var heroe = {
    top: 700,
    left: 575
}

var arrayMisiles = []

var arrayEnemigos = [
    { left: 200, top: 100 },
    { left: 300, top: 100 },
    { left: 400, top: 100 },
    { left: 500, top: 100 },
    { left: 600, top: 100 },
    { left: 700, top: 100 },
    { left: 800, top: 100 },
    { left: 900, top: 100 }
]

document.onkeydown = function(e) {
    switch(e.key){
        case "ArrowLeft":
            heroe.left = heroe.left - 10;
            moverHeroe()
            break;
        case "ArrowRight":
            heroe.left = heroe.left + 10;
            moverHeroe()
            break;
        case " ":
            arrayMisiles.push({
                left: heroe.left,
                top: heroe.top
            })
            dibujarMisiles()
            break;
    }
}

function moverHeroe() {
    document.getElementById('heroe').style.left = heroe.left + "px";
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
            left: ${arrayEnemigos[e].left}px;
            top:${arrayEnemigos[e].top}px'>
        </div>`
    }
}

function moverEnemigos() {
    for(var e = 0; e < arrayEnemigos.length; e++) {
        arrayEnemigos[e].top = arrayEnemigos[e].top + 1;
    }
}

function detectarColisiones() {
    for(var e = 0; e < arrayEnemigos.length; e++) {
        for(var m = 0; m < arrayMisiles.length; m++) {
            if(
                (arrayMisiles[m].top <= arrayEnemigos[e].top + 50) &&
                (arrayMisiles[m].top >= arrayEnemigos[e].top) &&
                (arrayMisiles[m].left >= arrayEnemigos[e].left) &&
                (arrayMisiles[m].left <= arrayEnemigos[e].left + 50)
            ) {
                arrayEnemigos.splice(e, 1)
                arrayMisiles.splice(m, 1)
            }
        }
    }
}

function gameLoop() {
    setTimeout(gameLoop, 100)
    moverMisiles();
    dibujarMisiles();
    moverEnemigos();
    dibujarEnemigos();
    detectarColisiones();
}

gameLoop()