context('Pokedex', () => {
  before(() => {
    cy.visit('/');
  });

  describe('prueba funcionamiento', () => {
    it('Se asegura que este el header Pokedex', () => {
      cy.get('header').should('include.text', 'Pokedex');
    });

    const CANTIDAD_BOTONES_PAGINACION = 4;
    it('Se asegura que haya dos botones y dos flechas', () => {
      cy.visit('/');
      cy.get('#pokedex')
        .find('span')
        .should('have.length', CANTIDAD_BOTONES_PAGINACION);
    });

    const CANTIDAD_IMAGEN_POKEBOLA = 1;
    it('Se asegura que este la imagen de la pokebola', () => {
      cy.visit('/');
      cy.get('#pokebola')
        .find('img')
        .should('have.length', CANTIDAD_IMAGEN_POKEBOLA);
    });

    it('Se asegura que este la lista de pokemones', () => {
      cy.visit('/');
      cy.get('#pokedex').find('.list-group').should('be.visible');
    });

    const CANTIDAD_POKEMONES_PAGINA_UNO = 11;
    it('Se asegura que esten los 11 pokemones de la primera página ', () => {
      cy.visit('/');
      cy.get('.list-group')
        .find('a')
        .should('have.length', CANTIDAD_POKEMONES_PAGINA_UNO);
    });

    it('Se asegura que al hacer click al siguente muestre los pokemones', () => {
      cy.visit('/');
      cy.get('#siguiente').click();
      cy.get('.list-group').find('a').should('include.text', 'butterfree');
    });
  });
});
