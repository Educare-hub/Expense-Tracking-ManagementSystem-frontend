describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page', () => {
    cy.contains('Welcome to ExpensePro!').should('be.visible');
  });

  it('should navigate to login page', () => {
    cy.visit('/auth/login');
    cy.location('pathname').should('eq', '/auth/login');
  });

  it('should navigate to register page', () => {
    cy.visit('/auth/register');
    cy.location('pathname').should('eq', '/auth/register');
  });
});
