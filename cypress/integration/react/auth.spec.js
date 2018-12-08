describe("Auth0 login/logout", function() {
  it("Login", function() {
    let login_selector = `#auth0-lock-container-1
      div.auth0-lock-social-buttons-container
      > button
      > div.auth0-lock-social-button-text`;
    cy.visit("/")
      .get(login_selector)
      .should($p => {
        expect($p.first()).to.contain("Log in with Google");
      });
    // .click() leads to CORS error..
    // TODO : load custom JWT
  });
});
