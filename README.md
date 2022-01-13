# DrinkBuddy

## Practical Info

In this Research Project I'll be researching how completely can be tested in a Frontend Pipeline.
How completely can a test-driven Angular application be tested in a frontend pipeline

## Test Driven Development

Test-driven development (TDD) is a software development method in which tests are written first and then the code.

In this ReadMe file I'll be documenting my test-driven thought process for each component.

# Screens

## Home

- [x] Contains the App Header
- [x] Contains the App Footer
- [x] Contains an h3 tag `Drink Buddy`
- [x] Contains a p tag `Drink Buddy is a social app where you can share your drinks with your friends.`
- [x] Contains a button `Login` > onClick brings user to the Login page
- [x] Contains a button `Register` > onClick brings user to the register page
- [x] Contains an img with src `beer.png`

## Login

- [x] Contains the App Header
- [x] Contains an h3 tag `Log in`
- [] Contains a close button > onClick brings user to the Home page
- [] Contains a div `Log in with Google` > onClick user logs in with Google
- [x] Contains a label `Email`
- [x] Contains a label `Password`
- [x] Contains an input for `Email`
- [x] Contains an input for `Password`
- [x] Should show error message after blur Email `Please fill in an email`
- [x] Should show error message after empty input Email `Please fill in an email`
- [x] Should show error message after blur Password `Please fill in a password`
- [x] Should show error message after empty input Password `Please fill in a password`
- [x] Contains a p tag `Don't have an account yet?`
- [x] Contains an anchor tag `Sign up` > onClick brings user to the Register page
- [x] Contains a button `Log in` > onClick submits the form
- [x] Should show error if an input is empty after submit

## Register

## Dashboard

# Components

## App Header

### Is Not Logged In

- [x] Contains an h3 tag `Drink Buddy` > onClick brings user to Home page
- [x] Contains an anchor tag `Login`> onCick brings user to the Login page
- [x] Contains an anchor tag `Register` > onCick brings user to the Register page
- [x] Contains an anchor tag `Home` > onCick brings user to the Home page

### Is Logged In

- [] Contains an h3 tag > Drink Buddy > onClick brings user to Home page
- [] Contains a profile button > onHover > Option between different onClicks > My Profile - Settings - Log Out
- [] Contains a + button > onClick brings user to Upload page
- [] Contains a search input > onInput searches through users backend

## App Footer

# Services

## Authentication Guard

# Test Suites for different cases

## Simple Unit Tests

