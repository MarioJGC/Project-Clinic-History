const { Builder, By, Key, until } = require('selenium-webdriver');


async function testApp() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {
       
        await driver.get('http://localhost:4200');

   
        await driver.wait(until.elementLocated(By.css('button')), 10000);

   
        console.log('Realiza tus pruebas aquí y cierra el navegador manualmente.');

    } catch (error) {
        console.error('Error durante la prueba:', error); // Manejo de errores
    } finally {
     
    }
}

testApp();

