describe('App test', () => {
  beforeEach(() => {
    // Ignore specific application errors
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Canvas is already in use')) {
        // returning false here prevents Cypress from failing the test
        return false
      }
    })

    cy.intercept('GET', '**/*', (req) => {
      req.reply((res) => {
        // If the response status code is 401, return an empty response
        if (res.statusCode === 401) {
          res.send('');
        }
      });
    });
  })

  it('Test sign in', () => {
    cy.visit('/sign-in')

    cy.get('#email').type("dansil2301@gmail.com")
    cy.get('#password').type("Varvara(99)")
    cy.get('.SignUpSubmit').click()

    cy.url().should('include', '/terminal')

    cy.window().then((window) => {
      const accessToken = window.localStorage.getItem('accessToken')
      expect(accessToken).to.exist
    })
  })

  it('Tests terminal functionality', () => {
    cy.signin("dansil2301@gmail.com", "Varvara(99)")

    // tests chart types
    cy.get('.DropdownBtn').first().click()
    cy.wait(1000)
    cy.get('.DropdownOption').contains('Line').click()

    cy.get('.TerminalMain').find('canvas').should('exist')

    // tests indicators
    cy.get('.DropdownBtn').eq(1).click()
    cy.wait(1000)
    cy.get('.DropdownOption').contains('MA').click()

    cy.get('.TerminalMain').find('canvas').should('exist')

    // test time frames
    cy.wait(5_000)
    cy.get('.CandleItem').eq(1).click()

    cy.get('.TerminalMain').find('canvas').should('exist')

    // test calculator
    cy.wait(1_500)
    cy.get('.DropdownBtn').eq(2).click()
    cy.wait(1000)

    cy.window().then((window) => {
      const datetimeStart = '2024-01-03T00:00';
      const datetimeEnd = '2024-01-04T00:00';

      // Set the value of the StartDate input field using Cypress's type command
      cy.get('#StartDate').type(datetimeStart, { force: true });

      // Set the value of the EndDate input field using Cypress's type command
      cy.get('#EndDate').type(datetimeEnd, { force: true });
    });

    cy.get('.DropdownBtnCalculator').eq(0).click()
    cy.wait(1000)
    cy.get('.DropdownOption').contains('MA').click();

    cy.get('.DropdownBtnCalculator').eq(1).click()
    cy.wait(1000)
    cy.get('.DropdownOption').contains('Minute').click()

    cy.get('.amountInput').type("10000")

    cy.get('.CalculateAmount').click()
    cy.wait(2_000)
    cy.get('.calculatorOutput').should('contain.text', '10065.88');
  })

  it('Test account sign out', () => {
    cy.signin("dansil2301@gmail.com", "Varvara(99)")
    cy.visit('/account')

    cy.get('.SignOut').click()

    cy.window().then((window) => {
      const accessToken = window.localStorage.getItem('accessToken')
      expect(accessToken).to.be.null // or expect(accessToken).to.be.undefined
    })
  })

  it('Test flow ', () => {
    cy.visit('/')

    cy.get('.getStartedBtn').click()

    cy.url().should('include', '/trader-options')

    cy.get('.getStartedBtnText').first().click()

    cy.url().should('include', '/sign-up?status=TRADER_BASIC')
  })
})
