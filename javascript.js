const canvas = document.getElementById("canvas");
const pincel = canvas.getContext("2d");
// pincel.fillStyle = "blue";
// pincel.fillRect(0, 0, 300, 470);

pincel.strokeStyle = "#09a";
pincel.lineWidth = 3.4;
pincel.moveTo(3, 367);
pincel.lineTo(297, 367);
pincel.moveTo(50, 367);
pincel.lineTo(50, 10);
pincel.moveTo(50, 70);
pincel.lineTo(110, 10);
pincel.moveTo(50, 10);
pincel.lineTo(200, 10);
pincel.lineTo(200, 70);
pincel.moveTo(3, 367);
pincel.lineTo(50, 310);
pincel.lineTo(100, 367);
pincel.stroke();

pincel.strokeStyle = "#07a";
pincel.lineWidth = 3;
function cabeza() {
  pincel.beginPath();
  pincel.arc(200, 93, 25, 0, 2 * Math.PI);
  pincel.stroke();
}

const linea = () => {
  pincel.beginPath();
  pincel.moveTo(200, 117);
  pincel.lineTo(200, 225);
  pincel.stroke();
};

const piernaDerecha = () => {
  pincel.beginPath();
  pincel.moveTo(200, 225);
  pincel.lineTo(240, 265);
  pincel.stroke();
};
function piernaIzquierda() {
  pincel.beginPath();
  pincel.moveTo(200, 225);
  pincel.lineTo(160, 265);
  pincel.stroke();
}

function brazoIzquierdo() {
  pincel.beginPath();
  pincel.moveTo(200, 130);
  pincel.lineTo(160, 170);
  pincel.stroke();
}

function brazoDerecho() {
  pincel.moveTo(200, 130);
  pincel.lineTo(240, 170);
  pincel.stroke();
}

function clear() {
  pincel.clearRect(150, 66, 240, 265);
}

const fragment = document.createDocumentFragment();
const fragmentErrado = document.createDocumentFragment();

// pantalla inicio
const iniciarJuego = document.getElementById("iniciarJuego");
const nuevaPalabra = document.getElementById("nuevaPalabra");
const contenedorInicio = document.getElementById("contenedorInicio");
// pantalla juego
const contenedorJuego = document.getElementById("contenedorJuego");
const contenedorPalabra = document.getElementById("contenedor_palabra");
const contenedorErrada = document.getElementById("errada");
// pantalla nueva palabra
const contenedorNueva = document.getElementById("contenedorNueva");
const guardarNueva = document.getElementById("guardarNueva");
const inputNueva = document.querySelector("input");
const cancelar = document.getElementById("cancelar");
// teclado
const teclado = document.getElementById("teclado");
const mostrarTeclado = document.getElementById("mostrarTeclado");

// inicio
contenedorNueva.style.display = "none";
contenedorJuego.style.display = "none";
canvas.style.display = "none";
teclado.style.display = "none";
mostrarTeclado.style.display = "none";

// pantalla inicio
iniciarJuego.onclick = (e) => {
  e.preventDefault();
  LimpiarJuego();
  document.getElementById("delete_teclado").style.display = "none";
  mostrarTeclado.style.display = "block";
  contenedorJuego.style.display = "flex";
  canvas.style.display = "block";
  contenedorInicio.style.display = "none";
};
nuevaPalabra.onclick = (e) => {
  e.preventDefault();
  document.getElementById("delete_teclado").style.display = "block";

  mostrarTeclado.style.display = "block";
  contenedorInicio.style.display = "none";
  contenedorNueva.style.display = "flex";
};

// pantalla juego
let palabraSelected = "";
let letrasNoRepetidas;
let count = 0;

let palabras = [
  "react",
  "javascript",
  "css",
  "angular",
  "markdown",
  "ahorcado",
  "aluralatam",
];

function LimpiarJuego() {
  count = 0;

  clear();
  document.getElementById("perdedor").style.display = "none";
  document.getElementById("ganador").style.display = "none";
  let child = contenedorPalabra.lastElementChild;
  let childOculta = contenedorErrada.lastElementChild;
  while (child) {
    contenedorPalabra.removeChild(child);
    child = contenedorPalabra.lastElementChild;
  }
  while (childOculta) {
    contenedorErrada.removeChild(childOculta);
    childOculta = contenedorErrada.lastElementChild;
  }
  palabraSelected = "";
  const numero = Math.round(Math.random() * (palabras.length - 1));
  console.log(numero);
  palabraSelected = palabras[numero].split("");
  juego();
}

document.getElementById("nuevoJuego").onclick = (e) => {
  e.preventDefault();
  LimpiarJuego();
};

const juego = () => {
  console.log(palabras);

  letrasNoRepetidas = palabraSelected.filter((u, i) => {
    return palabraSelected.indexOf(u) === i;
  });
  palabraSelected.forEach((u, i) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    div.className = "div_escondida";
    p.textContent = u;
    p.style.display = "none";
    p.value = u;
    div.appendChild(p);
    fragment.appendChild(div);
    contenedorPalabra.appendChild(fragment);
  });
};

function teclaDetectada(e) {
  if (
    contenedorJuego.style.display === "flex" &&
    ((e.key >= "a" && e.key <= "z") || e.key === "ñ")
  ) {
    const letterOcultas = document.querySelectorAll("p");
    console.log(e.key);
    if (palabraSelected.includes(e.key)) {
      letterOcultas.forEach((u, i) => {
        if (u.value === e.key) {
          u.style.display = "block";
        }
      });
      letrasNoRepetidas = letrasNoRepetidas.filter((u) => u !== e.key);
      console.log(letrasNoRepetidas);
      if (letrasNoRepetidas.length === 0) {
        document.getElementById("ganador").style.display = "block";
      }
    } else {
      const erradaList = document.querySelectorAll("span");

      let bool = true;

      erradaList.forEach((u) => {
        console.log(u.value);
        if (u.value === e.key) {
          bool = false;
        }
        return;
      });

      if (bool) {
        const arr = [
          cabeza,
          linea,
          brazoDerecho,
          brazoIzquierdo,
          piernaDerecha,
          piernaIzquierda,
        ];
        arr[count]();
        count++;
        if (count === 6) {
          document.getElementById("perdedor").style.display = "block";
        }

        const span = document.createElement("span");
        span.className = "palabra_errada";
        span.textContent = e.key;
        span.value = e.key;
        fragmentErrado.appendChild(span);
        contenedorErrada.appendChild(fragmentErrado);
      }
    }
  }
}

document.addEventListener("keypress", function (e) {
  teclaDetectada(e);
});

document.getElementById("desistir").onclick = (e) => {
  e.preventDefault();
  teclado.style.display = "none";
  mostrarTeclado.style.display = "none";
  canvas.style.display = "none";
  contenedorInicio.style.display = "flex";
  contenedorJuego.style.display = "none";
};

// pantalla nueva palabra

let palabra = "";

function escribirInput(e) {
  if ((e.key >= "a" && e.key <= "z") || e.key === "ñ") {
    palabra += e.key;
  }
  if (e.key === "Backspace") {
    palabra = palabra.slice(0, -1);
  }
  inputNueva.value = palabra;
}
inputNueva.onkeyup = (e) => {
  console.log(e);
  e.preventDefault();

  escribirInput(e);
};

cancelar.onclick = (e) => {
  e.preventDefault();
  palabra = "";
  inputNueva.value = "";

  teclado.style.display = "none";
  mostrarTeclado.style.display = "none";
  contenedorNueva.style.display = "none";
  contenedorInicio.style.display = "flex";
};

guardarNueva.onclick = (e) => {
  e.preventDefault();

  const textInput = inputNueva.value;
  if (textInput.length > 2 && textInput.length <= 10) {
    inputNueva.value = "";
    palabra = "";
    palabras.push(textInput);
    canvas.style.display = "block";
    contenedorJuego.style.display = "flex";
    contenedorNueva.style.display = "none";
    LimpiarJuego();
  }
};

const fragmentTeclado = document.createDocumentFragment();

const letras = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "ñ",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

letras.forEach((u, i) => {
  const element = document.createElement("div");
  element.onclick = (event) => {
    event.preventDefault();

    const e = { key: event.target.value };
    escribirInput(e);
    teclaDetectada(e);
  };
  element.textContent = u;
  element.value = u;
  element.className = "teclado_computer";
  fragmentTeclado.appendChild(element);
});

const borrar = document.createElement("div");
borrar.textContent = "Borrar";
borrar.value = "Backspace";
borrar.id = "delete_teclado";
borrar.className = "teclado_computer borrar";

borrar.onclick = (event) => {
  event.preventDefault();
  const e = { key: event.target.value };
  escribirInput(e);
};
fragmentTeclado.appendChild(borrar);

teclado.appendChild(fragmentTeclado);

mostrarTeclado.onclick = (e) => {
  e.preventDefault();

  if (teclado.style.display === "none") {
    teclado.style.display = "flex";
  } else {
    teclado.style.display = "none";
  }
};
