// =========================
// CAMBIAR DE PANTALLA
// =========================

function irAPantalla(id) {

    document.querySelectorAll(".pantalla").forEach(function(pantalla) {
        pantalla.classList.remove("activa");
    });

    const pantallaNueva = document.getElementById(id);

    if (pantallaNueva) {
        pantallaNueva.classList.add("activa");
        window.scrollTo(0, 0);
    }
}


// =========================
// HACER EL PASTEL
// =========================

let pasoIngrediente = 0;

const ingredientes = [
    "harina",
    "huevo",
    "leche"
];

function agregarIngrediente(ingrediente) {

    if (ingrediente !== ingredientes[pasoIngrediente]) {
        return;
    }

    const boton = document.getElementById(ingrediente);

    if (boton) {
        boton.disabled = true;
        boton.classList.add("agregado");
    }

    pasoIngrediente++;

    if (pasoIngrediente < ingredientes.length) {

        const siguiente = ingredientes[pasoIngrediente];

        const siguienteBoton = document.getElementById(siguiente);

        if (siguienteBoton) {
            siguienteBoton.disabled = false;
        }

        document.getElementById("instruccion").textContent =
            "Ahora agrega " + siguiente + ".";

    } else {

        document.getElementById("instruccion").textContent =
            "¡Perfecto! Ahora hay que batir.";

        document.getElementById("batidor").disabled = false;
    }
}


// =========================
// BATIR
// =========================

let vecesBatido = 0;

function batir() {

    vecesBatido++;

    const progreso = document.getElementById("progreso-batir");

    progreso.textContent =
        "🥄 Batido " + vecesBatido + " / 5";

    if (vecesBatido >= 5) {

        document.getElementById("batidor").disabled = true;

        document.getElementById("instruccion").textContent =
            "¡Listo! Ahora mete la mezcla al horno.";

        document.getElementById("zona-horno").classList.remove("oculto");
    }
}


// =========================
// HORNO
// =========================

function hornear() {

    const instruccion = document.getElementById("instruccion");

    instruccion.textContent =
        "🔥 Horneando...";

    const botonHorno = document.querySelector("#zona-horno button");

    if (botonHorno) {
        botonHorno.disabled = true;
    }

    setTimeout(function() {

        irAPantalla("decorar");

    }, 4000);
}


// =========================
// DECORAR PASTEL
// =========================

let colorElegido = null;
let decoraciones = [];

function elegirColor(color) {

    colorElegido = color;

    const pastel = document.getElementById("pastel-final");

    pastel.dataset.color = color;

    document.getElementById("mensaje-decoracion").textContent =
        "Color elegido: " + color + ". Ahora elige 3 decoraciones.";

    revisarPastel();
}


function agregarDecoracion(numero) {

    if (decoraciones.length >= 3) {

        document.getElementById("mensaje-decoracion").textContent =
            "Ya elegiste 3 decoraciones 💙";

        return;
    }

    decoraciones.push(numero);

    const contenedor =
        document.getElementById("decoraciones-colocadas");

    const imagen =
        document.createElement("img");

    imagen.src =
        "assets/decoracion" + numero + ".png";

    imagen.alt =
        "Decoración";

    imagen.classList.add("decoracion-colocada");

    // Posiciones diferentes para cada decoración
    const posiciones = [
        {
            left: "20%",
            top: "20%"
        },
        {
            left: "55%",
            top: "25%"
        },
        {
            left: "38%",
            top: "55%"
        }
    ];

    const posicion =
        posiciones[decoraciones.length - 1];

    imagen.style.left = posicion.left;
    imagen.style.top = posicion.top;

    contenedor.appendChild(imagen);

    document.getElementById("mensaje-decoracion").textContent =
        "Decoraciones: " + decoraciones.length + " / 3";

    revisarPastel();
}


function revisarPastel() {

    const terminar =
        document.getElementById("terminar-pastel");

    if (colorElegido && decoraciones.length === 3) {

        terminar.classList.remove("oculto");

        document.getElementById("mensaje-decoracion").textContent =
            "🎉 ¡Tu pastel quedó precioso!";

    } else {

        terminar.classList.add("oculto");
    }
}


// =========================
// REGALOS
// =========================

function abrirCarta() {

    document.getElementById("carta-area")
        .classList.remove("oculto");

    document.getElementById("caja-area")
        .classList.add("oculto");
}


function abrirCaja() {

    document.getElementById("caja-area")
        .classList.remove("oculto");

    document.getElementById("carta-area")
        .classList.add("oculto");
}


function cerrarRegalo() {

    document.getElementById("carta-area")
        .classList.add("oculto");

    document.getElementById("caja-area")
        .classList.add("oculto");
}
