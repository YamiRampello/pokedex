export function ocultarPokebola() {
  document.querySelector('#pokebola').classList.add('oculto');
}

export function mostrarCartelActualizacion() {
  document.querySelector('#detalle-imagen').innerHTML = 'Cargando...';
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
