declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      register(
        firstName: string,
        lastName: string,
        email: string,
        mobile: string,
        password: string,
        confirmPassword: string
      ): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add(
  'register',
  (
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    password: string,
    confirmPassword: string
  ) => {
    cy.visit('/register');

    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="mobile"]').type(mobile);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(confirmPassword);

    cy.get('button[type="submit"]').click();
  }
);

export {};
