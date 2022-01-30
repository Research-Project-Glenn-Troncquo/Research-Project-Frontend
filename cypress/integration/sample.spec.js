/// <reference types="cupres">
import Chance from 'chance'
import 'cypress-file-upload'

const chance = new Chance()

describe('End to End test', () => {
  const email = chance.email()
  const password = 'Test123@'

  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('has a title', () => {
    cy.contains('DrinkBuddy')
    cy.contains('Log in')
    cy.contains('Register')
  })

  it('Should register the user and make a post', () => {
    cy.contains('Register').click()

    cy.get('input[name=name]').type('test')
    cy.get('input[name=lastname]').type('test')
    cy.get('input[name=username]').type(email)
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('input[name=confirmpassword]').type(password)

    cy.get('button[type=submit]').click()

    cy.contains('There are no posts yet...')

    cy.contains('Upload').click()

    cy.get('input[name=title]').type('Nieuw café')
    cy.get('textarea').type('Lekker biertje drinken in het nieuwe café')
    const filepath = 'images/Peloton-Café.jpg'
    cy.get('input[name=file]').selectFile(
      'cypress/fixtures/images/Peloton-Café.jpg',
      { force: true }
    )
    cy.contains('Publish').click()
    

    cy.contains('Nieuw café')
    cy.contains('Lekker biertje drinken in het nieuwe café')
  })
})
