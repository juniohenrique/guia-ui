describe('Teste de Cadastro de Usuário', () => {
    beforeEach(() => {
        cy.visit('/signup');
    });

    describe('Teste de Cadastro de Usuário com sucesso', () => {
        it('Deve preencher o formulário corretamente e enviar', () => {
            cy.get('[data-qa="signup-name"]').type('Usuário Teste')
            cy.get('[data-qa="signup-email"]').type('teste-guia@example.com')
            cy.get('[data-qa="signup-button"]').click()
            cy.get('[data-qa="password"').should('be.visible').type('SenhaForte123')
            cy.get('[data-qa="days"').select('1')
            cy.get('[data-qa="months"').select('1')
            cy.get('[data-qa="years"').select('2000')
            cy.get('[data-qa="first_name"]').type('Usuário')
            cy.get('[data-qa="last_name"]').type('Teste')
            cy.get('[data-qa="address"]').type('Rua Teste, 123')
            cy.get('[data-qa="state"]').type('SP')
            cy.get('[data-qa="city"]').type('Teste')
            cy.get('[data-qa="zipcode"]').type('12345-123')
            cy.get('[data-qa="mobile_number"').type('11999999999')
            cy.get('[data-qa="create-account"]').click()
            cy.contains('Account Created!').should('be.visible')
        });

        afterEach(() => {
            cy.get('[href="/login"]').click();
            cy.get('[href="/delete_account"]').click();
        })
    });
    it('Não deve permitir envio com campos obrigatórios vazios', () => {
        cy.get('[data-qa="signup-name"]').type('Usuário Teste')
        cy.get('[data-qa="signup-email"]').type('teste-guia@example.com')
        cy.get('[data-qa="signup-button"]').click()
        cy.get('[data-qa="password"').should('be.visible').type('SenhaForte123')
        cy.get('[data-qa="days"').should('be.visible').select('1')
        cy.get('[data-qa="months"').should('be.visible').select('1')
        cy.get('[data-qa="years"').should('be.visible').select('2000')
        cy.get('[data-qa="create-account"]').click()
        cy.get('[data-qa="first_name"]').then(($input) => { expect($input[0].validationMessage).to.eq('Please fill out this field.') })
    });

    it('Deve exibir erro para campo email não preenchido', () => {
        cy.get('[data-qa="signup-name"]').type('Usuário Teste')
        cy.get('[data-qa="signup-button"]').click()
        cy.get('[data-qa="signup-email"]').then(($input) => { 
            expect($input[0].validationMessage).to.eq('Please fill out this field.') 
        })

    });

    it('Deve exibir erro de senha incorreta', () => {
        cy.get('[data-qa="login-email"]').type('teste@example.com')
        cy.get('[data-qa="login-password"').should('be.visible').type('SenhaIncorreta123')

        cy.get('[data-qa="login-button"]').click()
        cy.contains('Your email or password is incorrect!').should('be.visible')
    });
});