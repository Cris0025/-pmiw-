//TP1
//Cristian Julian Del Valle
//Comision 2
//https://www.youtube.com/watch?v=pLM7nONHcm4


let centro = 5;
let columnas = 20;
let filas = 20;
let inicioX = 400; 
let inicioY = 0;
let anchoCuadricula = 400; 
let altoCuadricula = 400; 
let anchoCelda, altoCelda;
let Mouse;
let imagen; 
let coloresActuales;

function preload() {
  imagen = loadImage("data/cuadrados.jpg"); 
}

function setup() {
  createCanvas(800, 400);
  anchoCelda = anchoCuadricula / columnas - 2; 
  altoCelda = altoCuadricula / filas - 2; 
  coloresActuales = Array.from({ length: columnas }, () => Array(filas).fill(color(255))); // Inicializar coloresActuales
  Cuadricula(columnas, filas, 2);
}

function draw() {
  background(0);
  image(imagen, 0, 0, 400, 400); 
  translate(inicioX, inicioY); 
  for (let i = 0; i < columnas; i++) { 
    for (let j = 0; j < filas; j++) { 
      let x = i * (anchoCelda + 2); 
      let y = j * (altoCelda + 2);
      fill(coloresActuales[i][j]); 
      stroke(204, 153, 102); 
      strokeWeight(2); 
      rect(x, y, anchoCelda, altoCelda); 
    }
  }
}

function Cuadricula(columnas, filas, tamañoCentro) {
  for (let i = 0; i < columnas; i++) { 
    for (let j = 0; j < filas; j++) { 
      coloresActuales[i][j] = ColorCuadricula(i, j, columnas, filas, tamañoCentro); 
    }
  }
}

function ColorCuadricula(i, j, columnas, filas, tamañoCentro) {
  if (i === 0 || i === columnas - 1 || j === 0 || j === filas - 1) {   //bordes  
    return color(0);
  }
  if (i === 1 || i === columnas - 2 || j === 1 || j === filas - 2) {     //bordes
    return color(50); 
  }
  let distanciaAlCentro = max(abs(i - columnas / 2), abs(j - filas / 2));
  let distanciaMaxima = max(columnas, filas) / 2 - tamañoCentro;
  if (distanciaAlCentro <= tamañoCentro) {
    return color(0); 
  } else {
    let valorGris = map(distanciaAlCentro, 0, distanciaMaxima, 255, 100);
    return color(valorGris);
  }
}

function mouseMoved() {
  for (let i = 0; i < columnas; i++) { 
    for (let j = 0; j < filas; j++) { 
      let x = inicioX + i * (anchoCelda + 2); 
      let y = inicioY + j * (altoCelda + 2);
      Mouse = mouseceldas(x, y, anchoCelda, altoCelda);
      if (Mouse) { 
        coloresActuales[i][j] = color(random(255), random(255), random(255));
      }
    }
  }
}

function mouseceldas(x, y, anchoCelda, altoCelda) {
  return mouseX > x && mouseX < x + anchoCelda && mouseY > y && mouseY < y + altoCelda;
}

function keyPressed() {
  if (key === 'h' || key === 'H') {
    Cuadricula(columnas, filas, 2); 
    redraw(); 
  }
}
