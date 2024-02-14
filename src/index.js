/// <reference types="jquery" />

function obtenerPokemones(offset = '0', limit = '19') {
  const URL = 'https://pokeapi.co/api/v2/pokemon';

  return fetch(`${URL}?offset=${offset}&limit=${limit}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => respuestaJSON.results);
}

function mostrarListadoPokemones(pokemones) {
  const $lista = document.createElement('div');
  $lista.className = 'list-group';

  pokemones.forEach((pokemon) => {
    const nombrePokemon = Object.values(pokemon)[0];
    const $item = document.createElement('a');
    $item.href = '#';

    $item.classList.add('list-group-item', 'list-group-item-action');
    $item.textContent = nombrePokemon;
    $item.dataset.base = nombrePokemon; //data-base='bulbasaur'

    $item.addEventListener('click', () => {
      const $itemActivo = document.querySelector('.list-group-item.active');
      if ($itemActivo) {
        $itemActivo.classList.remove('active');
      }
      $item.classList.add('active');
      actualizar();
    });
    $lista.appendChild($item);
  });
  document.querySelector('#pokemones').appendChild($lista);
}

function mostrarCartelActualizacion() {
  document.querySelector('#cambio tbody').innerHTML = 'Cargando...';
}

function actualizar() {
  mostrarCartelActualizacion();
  obtenerDetallePokemon(obtenerPokemonSeleccionado());
}

function obtenerDetallePokemon(nombrePokemon) {
  const URL = 'https://pokeapi.co/api/v2/pokemon';
  return fetch(`${URL}/${nombrePokemon}`)
    .then((detallePokemon) => detallePokemon.json())
    .then((detallePokemonJSON) =>
      console.log(
        detallePokemonJSON.name,
        detallePokemonJSON.base_experience, //	The base experience gained for defeating this Pokémon
        detallePokemonJSON.weight //The weight of this Pokémon in hectograms.
        //detallePokemonJSON.abilities[0].ability.name,
        //detallePokemonJSON.abilities[1].ability.name
      )
    );
}

function obtenerPokemonSeleccionado() {
  const $activeItem = document.querySelector('.list-group-item.active');
  if ($activeItem) {
    return $activeItem.dataset.base; //nombre
  }
  return undefined; //configurar este también
}

function iniciar() {
  obtenerPokemones().then((pokemon) => mostrarListadoPokemones(pokemon));
  //elegir pokemon?
}

iniciar();
