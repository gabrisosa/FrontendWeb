var heroe = {
    x: 575,
    y: 700
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

document.onkeydown = function(e) {
    switch(e.key){
        case "ArrowLeft":
            if(heroe.x > 5) {
                heroe.x = heroe.x - 10;
                moverHeroe()
            }
            break;
        case "ArrowRight":
            if (heroe.x < 1145) {
                heroe.x = heroe.x + 10;
                moverHeroe()
            }
            break;
        case " ":
            arrayMisiles.push({
                left: heroe.x,
                top: heroe.y
            })
            dibujarMisiles()
            break;
    }
}

function moverHeroe() {
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
            }
        }
    }
}

function gameLoop() {
    setTimeout(gameLoop, 50)
    moverMisiles();
    dibujarMisiles();
    moverEnemigos();
    dibujarEnemigos();
    detectarColisiones();
}

gameLoop()