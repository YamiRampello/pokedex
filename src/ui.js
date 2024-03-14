export function ocultarPokebola() {
  document.querySelector('#pokebola').classList.add('oculto');
}

export function mostrarCartelActualizacion() {
  document.querySelector('#detalle-imagen').innerHTML = 'Cargando...';
}

export function mostrarDetallePokemonSeleccionado(detallePokemonJSON) {
  document.querySelector('#detalle-imagen').innerHTML = '';
  document.querySelector('#detalle').classList.remove('oculto');

  const $guardarNombreTitulo = document.querySelector('#nombre');

  const $guardarNombre = document.querySelector('#detalle-nombre');
  $guardarNombre.innerHTML = 'Nombre';

  const $guardarExperiencia = document.querySelector('#detalle-experiencia');
  $guardarExperiencia.innerHTML = 'Experiencia';

  const $guardarPeso = document.querySelector('#detalle-peso');
  $guardarPeso.innerHTML = 'Peso';

  const $guardarAltura = document.querySelector('#detalle-altura');
  $guardarAltura.innerHTML = 'Altura';

  const $pokemonNombre = detallePokemonJSON.name;
  const $pokemonExperiencia = detallePokemonJSON.base_experience;
  const $pokemonPeso = detallePokemonJSON.weight;
  const $pokemonAltura = detallePokemonJSON.height;
  const $pokemonId = detallePokemonJSON.id;

  borrarImagenesPokemon();
  obtenerFotoPokemon($pokemonId);

  $guardarNombreTitulo.innerHTML = $pokemonNombre;
  $guardarNombre.innerHTML = `Nombre: ${$pokemonNombre}`;
  $guardarExperiencia.innerHTML = `Experiencia: ${$pokemonExperiencia}`;
  $guardarPeso.innerHTML = `Peso: ${$pokemonPeso} hg.`;
  $guardarAltura.innerHTML = `Altura: ${$pokemonAltura} dc.`;
}

export function borrarImagenesPokemon() {
  const $imagenesPokemon = document.querySelectorAll('img');

  if ($imagenesPokemon) {
    $imagenesPokemon.forEach((imagen) => {
      imagen.src = ''; //imagen.style.display = 'none';
    });
  }
}

export function obtenerPokemonSeleccionado() {
  const $activeItem = document.querySelector('.list-group-item.active');
  if ($activeItem) {
    return $activeItem.dataset.base; //nombre
  }
}

export function obtenerFotoPokemon(idPokemon) {
  const $guardarImagen = document.querySelector('#detalle-imagen');

  const $fotoPokemon = document.createElement('img');
  $fotoPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`;

  $guardarImagen.appendChild($fotoPokemon);
}

export function mostrarListadoPokemones(pokemones, callBackSeleccionPokemon) {
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

      callBackSeleccionPokemon(pokemon);
    });
    $lista.appendChild($item);
  });
  document.querySelector('#pokemones').appendChild($lista);
}

let paginaActual = 1;

export function avanzarPagina(callBackIniciar) {
  const POKEMONES_POR_PAGINA = 11;
  const ULTIMA_PAGINA = 119;
  const CANTIDAD_PAGINA_A_AVANZAR = 1;
  const offsetSiguiente = paginaActual * POKEMONES_POR_PAGINA;

  if (paginaActual < ULTIMA_PAGINA) {
    limpiarListaPokemones();
    callBackIniciar(offsetSiguiente);
    paginaActual = paginaActual + CANTIDAD_PAGINA_A_AVANZAR;
  }
}

export function retrocederPagina(callBackIniciar) {
  const POKEMONES_POR_PAGINA = 11;
  const ULTIMA_PAGINA = 1;
  const CANTIDAD_PAGINA_A_RETROCEDER = 1;
  const CANTIDAD_OFFSET_A_RETROCEDER = 2;

  const offsetAnterior =
    (paginaActual - CANTIDAD_OFFSET_A_RETROCEDER) * POKEMONES_POR_PAGINA;

  if (paginaActual > ULTIMA_PAGINA) {
    limpiarListaPokemones();
    callBackIniciar(offsetAnterior);
    paginaActual = paginaActual - CANTIDAD_PAGINA_A_RETROCEDER;
  }
}

function limpiarListaPokemones() {
  document.querySelector('#pokemones').textContent = '';
}
