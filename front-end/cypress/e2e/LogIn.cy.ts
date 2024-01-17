// login.spec.js
describe("Login Component", () => {
  beforeEach(() => {
    // Visit your Vue app or the login page directly
    cy.visit("https://re-w-e08.netlify.app/login"); // Update with your actual route
  });

  it("should display the login form", () => {
    // Check if the login form elements are present
    cy.get(".logo_pr").should("be.visible");
    cy.contains("Log In").should("be.visible");
    cy.contains("Nombre de usuario").should("be.visible");
    cy.contains("Contraseña").should("be.visible");
    cy.get(".login_btn").should("be.visible");
  });

  it("should show validation errors for invalid input", () => {
    // Submit the form without filling anything
    cy.get(".login_btn").click();

    // Check if validation error messages are displayed
    cy.contains("User Name needs to be at least 2 characters.").should(
      "be.visible"
    );
    cy.contains("Password needs to be at least 4 characters.").should(
      "be.visible"
    );
  });

  it("should successfully log in with valid credentials", () => {
    // Fill in valid credentials
    cy.get('[data-cy="username"]').type("saulito");
    cy.get('[data-cy="password"]').type("1234");

    // Submit the form
    cy.get("[data-cy=login-btn]").click();
  });

  it("should display an error message with invalid credentials", () => {
    cy.get("[data-cy=username]").type("invalidUsername");
    cy.get("[data-cy=password]").type("invalidPassword");
    cy.get("[data-cy=login-btn]").click();
  });
});
