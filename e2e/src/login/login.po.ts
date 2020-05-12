import { browser, by , element } from 'protractor';

export class LoginPage {
    private credentials = {
        email: 'flavien.cocu@insa-rouen.fr',
        password: 'mdp123456'
    };

    navigateTo() {
        return browser.get('/login');
    }

    getTitlePageAfterConnection() {
        return element(by.id('titlePage')).getText();
    }

    fillCredentials(credentials: any = this.credentials) {
        const buttonLogin = 'body > app-root > div > div > div > app-login > div > form > p > button';
        element(by.id('email')).sendKeys(credentials.email);
        element(by.id('pwd')).sendKeys(credentials.password);
        element(by.css(buttonLogin)).click();
    }
}
