/// <reference types="jquery" />

const URL = 'https://pokeapi.co/api/v2';

fetch(`${URL}/pokemon`)
  .then((respuesta) => respuesta.json())
  .then((respuestaJSON) => {
    for (i = 0; i <= 19; i++) {
      $('ul').append(
        $(
          `<li> <a href=${respuestaJSON.results[i].url}> ${respuestaJSON.results[i].name}  </a></li>`
        )
      );
    }
  });
