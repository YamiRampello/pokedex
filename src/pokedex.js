const URL = 'https://pokeapi.co/api/v2/pokemon';

export function obtenerPokemones(offset = '0', limit = '11') {
  return fetch(`${URL}?offset=${offset}&limit=${limit}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => respuestaJSON.results);
}

export function obtenerDetallePokemonSeleccionado(nombrePokemon) {
  return fetch(`${URL}/${nombrePokemon}`).then((detallePokemon) =>
    detallePokemon.json()
  );
}
