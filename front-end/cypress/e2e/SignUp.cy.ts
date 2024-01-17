describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("https://re-w-e08.netlify.app/signup"); // Update with the correct path
  });

  it("should fill out the registration form and submit successfully", () => {
    // Fill out the registration form
    cy.get("[data-cy=full_name]").type("John Doe");
    cy.get("[data-cy=username]").type("john_doe");
    cy.get("[data-cy=password]").type("password123");
    cy.get("[data-cy=mail]").type("john.doe@example.com");
    cy.get("[data-cy=date]").type("2000-01-01");

    // Submit the form
    cy.get("[data-cy=singup-btn]").click();

    // Assert the successful login message
    cy.contains("Inicio de sesión exitoso").should("be.visible");
    cy.get("[data-cy=continue]").click();

    // Assert that you are redirected to the home page
    cy.url().should("include", "/home");

    // Delete user to assert replication
    cy.visit("https://re-w-e08.netlify.app/profile");
    cy.get("[data-cy=delete-btn]").click();
    cy.contains("Usuario eliminado correctamente").should("be.visible");
    cy.get("[data-cy=continue]").click();
    cy.url().should("include", "/login");
  });

  it("should show an alert if any field is missing", () => {
    // Attempt to submit the form without filling in all fields
    cy.get("[data-cy=singup-btn]").click();

    // Assert that the missing information alert is displayed
    cy.contains("Tienes que rellenar todos los campos").should("be.visible");
  });
});
