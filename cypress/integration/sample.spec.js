/// <reference types="cupres">
import Chance from 'chance'

const chance = new Chance()

describe('End to End test', () => {
  const email = chance.email()
  const password = 'StrongPassword1@'

  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('has a title', () => {
    cy.contains('DrinkBuddy')
    cy.contains('Log in')
    cy.contains('Register')
  })

  it('blocks protected routes', () => {
    cy.contains('Log in').click()
  })
})
