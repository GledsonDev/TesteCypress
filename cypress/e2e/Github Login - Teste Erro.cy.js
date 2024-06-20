describe('GitHub Login Test', () => {
  beforeEach(() => {
    cy.visit('https://github.com/login');
  });

  it('Verificar se o Nome de usuário está associado ao campo de entrada correto', () => {
    cy.get('label[for="login_field"]').should('contain', 'Username');
  });

  it('Verificar se a Senha está associado ao campo de entrada correto', () => {
    cy.get('label[for="password"]').should('contain', 'Password');
  });

  it('Esperado que se apareça a mensagem de erro para login malsucedido', () => {
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
