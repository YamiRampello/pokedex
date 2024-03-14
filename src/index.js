import {
  ocultarPokebola,
  mostrarCartelActualizacion,
  mostrarListadoPokemones,
  mostrarDetallePokemonSeleccionado,
  obtenerPokemonSeleccionado,
  avanzarPagina,
  retrocederPagina
} from './ui.js';

import {
  obtenerPokemones,
  obtenerDetallePokemonSeleccionado
} from './pokedex.js';

/// <reference types="jquery" />

function actualizar() {
  ocultarPokebola();
  mostrarCartelActualizacion();
  obtenerDetallePokemonSeleccionado(obtenerPokemonSeleccionado()).then(
    (detallePokemonJSON) =>
      mostrarDetallePokemonSeleccionado(detallePokemonJSON)
  );
}

function iniciar(offsetIniciar = '0') {
  obtenerPokemones(offsetIniciar).then((pokemon) =>
    mostrarListadoPokemones(pokemon, actualizar)
  );
}

iniciar('0');

const $siguiente = document.querySelector('#siguiente');
const $anterior = document.querySelector('#atras');

$siguiente.addEventListener('click', () => {
  avanzarPagina(iniciar);
});

$anterior.addEventListener('click', () => {
  retrocederPagina(iniciar);
});
