describe('GitHub Login Test', () => {
  beforeEach(() => {
    cy.visit('https://github.com/login');
  });

  it('Should check if the Username label is associated with the correct input field', () => {
    cy.get('label[for="login_field"]').should('contain', 'Username');
  });

  it('Should check if the Password label is associated with the correct input field', () => {
    cy.get('label[for="password"]').should('contain', 'Password');
  });

  it('Should display error message for unsuccessful login', () => {
    // Digitar o nome de usuário sem problemas
    cy.get('#login_field').type('username inválido');

    // Forçar a digitação da senha mesmo com o campo desabilitado
    cy.get('#password').type('123456789', { force: true });

    // Clicar no botão de login
    cy.get('input[name="commit"]').click();

    // Verificar a mensagem de erro
    cy.get('.flash-error').should('contain', 'Incorrect username or password.');
  });
});
