const teste = "https://www.amazon.com.br/?tag=msndesktopabk-20&ref=pd_sl_7to86bd2ph_e&adgrpid=1141293728081284&hvadid=71331080112049&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=147001&hvtargid=kwd-71331371436168:loc-20&hydadcr=26346_11803856&msclkid=5bfd8417ecf7144efb22e2678cd76ec9";

const email = "teste.ficr@gmail.com";
const password = "testedoteste";

describe("Teste compra na Amazon", () => {
  it("Deverá fazer um fluxo de compra, desiste de um item no carrinho, fazer o login, chega no preenchimento do endereço, desiste e sai da conta", () => {
    // IR PARA A AMAZON
    cy.log('Ir para o site da Amazon.');
    cy.visit(teste);

    // ADICIONAR UM ITEM AO CARRINHO
    cy.log('Adicionar um item ao carrinho.');
    cy.get('#twotabsearchtextbox').type('Caneta {enter}');
    cy.get('.s-main-slot .s-result-item[data-component-type="s-search-result"]').first().find('h2 a').click();
    cy.get('#add-to-cart-button').click();

    // FAZER MAIS UMA ADIÇÃO AO CARRINHO 
    cy.log('Fazer mais uma adição ao carrinho.');
    cy.get('#twotabsearchtextbox').type('Capa de celular {enter}');
    cy.get('.s-main-slot .s-result-item[data-component-type="s-search-result"]').first().find('h2 a').click();
    cy.get('#add-to-cart-button').click();

    // ADICIONAR MAIS UM ITEM AO CARRINHO
    cy.log('Adicionar mais um item ao carrinho.');
    cy.get('#twotabsearchtextbox').type('Carregador {enter}');
    cy.get('.s-main-slot .s-result-item[data-component-type="s-search-result"]').first().find('h2 a').click();
    cy.get('#add-to-cart-button').click();

    // IR PARA O CARRINHO
    cy.log('Ir ao carrinho.');
    cy.get('#sw-gtc > .a-button-inner > .a-button-text').click();

    // REMOVER O SEGUNDO ITEM DO CARRINHO
    cy.log('Remover o segundo item do carrinho.');
    cy.get('input[data-action="delete"]').eq(1).click();

    // MUDAR A QUANTIDADE DE UM DOS ITENS
    cy.log('Mudar a quantia de um dos itens.');
    cy.get('#a-autoid-0-announce').click();
    cy.get('#quantity_3').click();

    // AUTENTICAÇÃO
    cy.log('Realizar login na Amazon.');
    cy.get('#nav-link-accountList').click();
    cy.get('#ap_email').type(email);
    cy.get('#continue').click();
    cy.get('#ap_password').type(password);
    cy.get('#signInSubmit').click();

    // TRATAR O PEDIDO DE AUTENTICAÇÃO DE FATOR ADICIONAL (NÚMERO DE TELEFONE)
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Agora não")').length > 0) {
        cy.log('Clicar em "Agora não".');
        cy.get('button:contains("Agora não")').click();
      }
    });

    // IR PARA O FECHAMENTO DO PEDIDO
    cy.log('Fechar Pedido.');
    cy.get('#sc-buy-box-ptc-button > .a-button-inner > .a-button-input').click();

    // (adicional) CLICAR NO BOTÃO "Enviar para este endereço"
    cy.get('#shipToThisAddressButton', { timeout: 5000 }).should('be.visible').click();

    // Clicar na logo da Amazon para retornar ao carrinho
    cy.log('Clicar na logo da Amazon para retornar ao carrinho.');
    cy.get('.a-icon-logo.clickable-heading').click();

    // Clicar em "Retornar ao carrinho"
    cy.log('Clicar em "Retornar ao carrinho".');
    cy.get('a[href="https://www.amazon.com.br/gp/cart/view.html/ref=chk_logo_return_to_cart"]').click();

    // POSICIONAR O MOUSE SOBRE O ELEMENTO DE SAIR DA CONTA
    cy.log('Posicionar o mouse sobre o elemento para exibir opção de sair da conta.');
    cy.get('#nav-link-accountList').trigger('mouseover');

    // CLIQUE EM SAIR DA CONTA
    cy.log('Clicar em "Sair da conta".');
    cy.contains('Sair').click({ force: true }); 

 });
});



