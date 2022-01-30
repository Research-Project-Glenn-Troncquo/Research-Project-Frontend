/// <reference types="cupres">

describe('End to End test', () => {
  const email = 'glennekeeee@gmail.com'
  const password = 'StrongPassword1@'

  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('has a title', () => {
    cy.contains('DrinkBuddsqfdy')
  })
})
