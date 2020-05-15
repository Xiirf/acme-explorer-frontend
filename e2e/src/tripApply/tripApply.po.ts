import { browser, by , element } from 'protractor';

export class TripApplyPage {
    private newApplication = {
        comment: 'comment created with protractor'
    };

    navigateTo() {
        return browser.get('applications/create/5e7a4f7927545300177b2e8d');
    }

    getTitlePage() {
        const title = 'body > app-root > div > div > div > app-application > div > form > table > tr:nth-child(1) > td > h1';
        return element(by.css(title)).getText();
    }

    fillCreateApplication(newApplication: any = this.newApplication) {
        const buttonCreate = 'body > app-root > div > div > div > app-application > div > form > p > button';
        element(by.id('comment0')).sendKeys(newApplication.comment);
        element(by.css(buttonCreate)).click();
    }
}
