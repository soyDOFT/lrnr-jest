describe('Home Page Load', () => {
    it('checks for essential elements', () => {
      cy.visit('http://localhost:8000');
  
      cy.get('img[alt="lrnr-logo"]').should('be.visible');
      cy.contains('Your guided path to programming enlightenment').should('be.visible');
      cy.get('a#download-button').should('be.visible');
      cy.contains('Personalized Quizzes').should('be.visible');
      cy.contains('Rewarding').should('be.visible');
      cy.contains('Personal SME').should('be.visible');
    });
  });

  describe('Begin Journey Button', () => {
    it('checks correct link for Begin Journey button', () => {
      cy.visit('http://localhost:8000');
      cy.get('a#download-button').should('have.attr', 'href', 'http://materializecss.com/getting-started.html');
      cy.get('a#download-button').click();
      cy.url().should('eq', '');
    });
  });

  describe('Personalized Quizzes Icon Block', () => {
    it('should display the correct icon and description for Personalized Quizzes', () => {
      cy.visit('http://localhost:8000');
      cy.contains('Personalized Quizzes').should('be.visible');
      cy.get('h2').contains('flash_on').should('be.visible');
      cy.contains('Greetings, young padawan').should('be.visible');
    });
  });

  describe('Responsive Layout', () => {
    it('should adapt the layout for different viewport sizes', () => {
      cy.visit('http://localhost:8000');
      cy.viewport('macbook-15'); // laptop
      cy.get('div.icon-block').should('have.length', 3);
  
      cy.viewport('iphone-6'); // phone
      cy.get('div.icon-block').should('have.length', 3);
    });
  });