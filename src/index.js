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

function actualizar() {
  mostrarCartelActualizacion();
  obtenerDetallePokemonSeleccionado(obtenerPokemonSeleccionado()).then(
    (detallePokemonJSON) =>
      mostrarDetallePokemonSeleccionado(detallePokemonJSON)
  );
}

function mostrarCartelActualizacion() {
  document.querySelector('#cambio tbody').innerHTML = 'Cargando...';
}

function mostrarDetallePokemonSeleccionado(detallePokemonJSON) {
  document.querySelector('#cambio tbody').innerHTML = '';
  document.querySelector('#detalle').classList.remove('oculto');

  const $guardarNombreTitulo = document.querySelector('#nombre');

  const $guardarNombre = document.querySelector('#detalle-nombre');
  $guardarNombre.innerHTML = 'Nombre';

  const $guardarExperiencia = document.querySelector('#detalle-experiencia');
  $guardarExperiencia.innerHTML = 'Experiencia';

  const $guardarPeso = document.querySelector('#detalle-peso');
  $guardarPeso.innerHTML = 'Peso';

  const $pokemonNombreTitulo = detallePokemonJSON.name;
  const $pokemonNombre = detallePokemonJSON.name;
  const $pokemonExperiencia = detallePokemonJSON.base_experience;
  const $pokemonPeso = detallePokemonJSON.weight;
  const $pokemonId = detallePokemonJSON.id;

  borrarImagenesPokemon();
  obtenerFotoPokemon($pokemonId);

  $guardarNombreTitulo.innerHTML = $pokemonNombreTitulo;
  $guardarNombre.innerHTML = `Nombre: ${$pokemonNombre}`;
  $guardarExperiencia.innerHTML = `Experiencia: ${$pokemonExperiencia}`;
  $guardarPeso.innerHTML = `Peso: ${$pokemonPeso} Hg.`;
}

function borrarImagenesPokemon() {
  const $imagenesPokemon = document.querySelectorAll('img');

  if ($imagenesPokemon) {
    $imagenesPokemon.forEach((imagen) => {
      imagen.src = ''; //imagen.style.display = 'none';
    });
  }
}

function obtenerFotoPokemon(idPokemon) {
  const $guardarImagen = document.querySelector('#detalle-imagen');

  const $fotoPokemon = document.createElement('img');
  $fotoPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`;

  $guardarImagen.appendChild($fotoPokemon);
}

function obtenerDetallePokemonSeleccionado(nombrePokemon) {
  const URL = 'https://pokeapi.co/api/v2/pokemon';
  return fetch(`${URL}/${nombrePokemon}`).then((detallePokemon) =>
    detallePokemon.json()
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
}

iniciar();
