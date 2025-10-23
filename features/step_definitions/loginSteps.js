import { Given, When, Then } from '@wdio/cucumber-framework'
import LoginPage from '../../pageobjects/loginPage.js'
import SecurePage from '../../pageobjects/securePage.js'

Given('estoy en la página de login', async () => {
    await LoginPage.open()
    await browser.takeScreenshot();
})

When('ingreso {string} y {string}', async (username, password) => {
    await LoginPage.login(username, password)
    await browser.takeScreenshot();
})

Then('debería ver el mensaje {string}', async (expectedMessage) => {
    await SecurePage.isMessageDisplayed(expectedMessage)
    await browser.takeScreenshot();
})