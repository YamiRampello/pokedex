export function mostrarDetallePokemonSeleccionado(detallePokemon) {
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

  const $pokemonNombre = detallePokemon.name;
  const $pokemonExperiencia = detallePokemon.base_experience;
  const $pokemonPeso = detallePokemon.weight;
  const $pokemonAltura = detallePokemon.height;
  const $pokemonId = detallePokemon.id;

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
