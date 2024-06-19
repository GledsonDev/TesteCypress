const teste = "https://www.amazon.com.br/?tag=msndesktopabk-20&ref=pd_sl_7to86bd2ph_e&adgrpid=1141293728081284&hvadid=71331080112049&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=147001&hvtargid=kwd-71331371436168:loc-20&hydadcr=26346_11803856&msclkid=5bfd8417ecf7144efb22e2678cd76ec9";

const email = "teste.ficr@gmail.com";
const password = "testedoteste";

describe("Teste compra na Amazon", () => {
  it("Deverá fazer um fluxo de compra, fazer o login e chegada até o preenchimento dos dados para finalização da compra", () => {
    // IR PARA A AMAZON
    cy.log('Ir para o site da Amazon.');
    cy.visit(teste);

    // ADICIONAR UM ITEM NO CARRINHO
    cy.log('Adicionar um item no carrinho.');
    cy.get('#twotabsearchtextbox').type('Caneta {enter}');
    cy.get('.s-main-slot .s-result-item[data-component-type="s-search-result"]').first().find('h2 a').click();
    cy.get('#add-to-cart-button').click();

    // FAZ MAIS UMA ADIÇÃO NO CARRINHO
    cy.log('Faz mais uma adição no carrinho.');
    cy.get('#twotabsearchtextbox').type('Capa de celular {enter}');
    cy.get('.s-main-slot .s-result-item[data-component-type="s-search-result"]').first().find('h2 a').click();
    cy.get('#add-to-cart-button').click();

    // IR PARA O CARRINHO
    cy.log('Ir ao carrinho.');
    cy.get('#sw-gtc > .a-button-inner > .a-button-text').click();

    // MUDAR A QUANTIDADE DE UM DOS ITENS
    cy.log('Mudar a quantidade de um dos itens.');
    cy.get('#a-autoid-0-announce').click();
    cy.get('#quantity_3').click();

    // REALIZAR LOGIN NA AMAZON
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

    // FECHAR PEDIDO
    cy.log('Fechar Pedido (Não vão ser feitos os processos de preenchimento de endereço, cartão, este passo é apenas ilustrativo.)');
    cy.get('#sc-buy-box-ptc-button > .a-button-inner > .a-button-input').click();
  });
});
