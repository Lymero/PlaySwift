before(() => {
  cy.login();
});

describe('Create a new playlist', function() {
  
  
  it("Fill fields", function() {

    cy.visit("/#/playlists");

    cy.get('input[name="name"]')
      .type('My Super Playlist')
      .should('have.value', 'My Super Playlist');
    cy.get('input[name="description"]')
      .type('My awesome description')
      .should('have.value', 'My awesome description');
    cy.get('input[name="tagFilter"]')
      .type('java')
      .should('have.value', 'java');
    cy.get('select[name="tag"]')
      .select('java')
      .invoke('val')
      .should('deep.equal', [ '2' ]);
    
  })
})