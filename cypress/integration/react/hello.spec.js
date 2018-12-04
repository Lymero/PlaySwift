describe("Playlists route", function() {
  it("Shows Hello World", function() {
    cy.visit("/#/playlists/");
    cy.get("p").should($p => {
      expect($p.first()).to.contain("hello world");
    });
  });
});
