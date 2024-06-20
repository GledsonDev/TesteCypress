const teste = "https://www.amazon.com.br/?tag=msndesktopabk-20&ref=pd_sl_7to86bd2ph_e&adgrpid=1141293728081284&hvadid=71331080112049&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=147001&hvtargid=kwd-71331371436168:loc-20&hydadcr=26346_11803856&msclkid=5bfd8417ecf7144efb22e2678cd76ec9";

const email = "testeficr23@gmail.com";
const password = "testedoteste";

describe("Teste compra na Amazon", () => {
  it("Deverá fazer um fluxo de compra, fazer o login e chegada até o preenchimento dos dados para finalização da compra", () => {
    // IR PARA A AMAZON
    cy.log('Ir para o site da Amazon.');
    cy.visit(teste);

    // ADICIONAR UM ITEM AO CARRINHO
    cy.log('Adicionar um item ao carrinho.');
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
        cy.get('#ap-account-fixup-phone-skip-link').click();
      }
    });

    // IR PARA O FECHAMENTO DO PEDIDO
    cy.log('Fechar Pedido.');
    cy.get('#sc-buy-box-ptc-button > .a-button-inner > .a-button-input').click();

    // Tentar clicar no botão "Enviar para este endereço" (opcional) // tá dando erro aq, qnd n tá salvo
    cy.get('#shipToThisAddressButton', { timeout: 5000, failOnTimeout: false }).then(($button) => {
      if ($button.length > 0 && $button.is(':visible')) {
        cy.log('Botão "Enviar para este endereço" encontrado. Clicando diretamente.');
        cy.wrap($button).click();
      } else {
        cy.log('Botão "Enviar para este endereço" não encontrado ou não visível. Preenchendo o endereço.');

        // Preencher o endereço
        cy.get('#address-ui-widgets-enterAddressPhoneNumber').type('11987654321');
        cy.get('#address-ui-widgets-enterAddressPostalCode').type('50670-902');

        // Clicar na barra de endereço sem escrever nada para auto-preencher
        cy.get('#address-ui-widgets-streetName').should('be.visible').click();

        // Aguardar o preenchimento automático do restante do formulário de endereço
        cy.wait(3000);
        cy.get('#address-ui-widgets-streetName').should('have.value', 'Avenida Caxangá^ 3841');
        cy.get('#address-ui-widgets-buildingNumber').type('3841');
        cy.get('.a-button-inner > #address-ui-widgets-form-submit-button-announce').click({ force: true });
      }
    });

    // Aguardar o carregamento da tela de liberação da alfândega
    cy.wait(5000);
    cy.log('Clicar em "Pular por enquanto".');
    cy.contains('Pular por enquanto').click();

    // Clicar em "Continuar" após pular a tela de liberação da alfândega
    cy.get('input[type="submit"][aria-labelledby="kyc-xborder-continue-button-announce"]').click();

    // DAQUI PRA BAIXO NÃO FOI VERIFICADO/TESTADO AINDA
    // Clicar para abrir a tela de pagamento 
    cy.log('Abrir tela de pagamento.');
    cy.get('#a-link-emphasis pmts-add-cc-default-trigger-link').click();

    // Aguardar o carregamento do formulário de pagamento
    cy.wait(5000);
    cy.log('Preencher os dados do cartão.');
    cy.get('#pp-rIuOnN-62', { timeout: 10000 }).type('5555555555554444'); // Número do cartão fictício
    cy.get('#pp-sAgYkD-95', { timeout: 10000 }).type('Teste de Teste'); // Nome no cartão
    cy.get('#pp-sAgYkD-98', { timeout: 10000 }).select('12'); // Mês de validade
    cy.get('#pp-sAgYkD-101', { timeout: 10000 }).select('2025'); // Ano de validade
    cy.get('#pp-sAgYkD-104', { timeout: 10000 }).type('123'); // Código de segurança
    cy.get('#pp-sAgYkD-108').click();

    // Confirmar pedido
    cy.log('Confirmar o pedido.');
    cy.get('#placeYourOrder', { timeout: 10000 }).click();
  });
});
