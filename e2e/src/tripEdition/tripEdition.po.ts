import { browser, by , element } from 'protractor';

export class TripEditionPage {
    private newTrip = {
        title: 'title edit with protractor',
        description: 'desc edit with protractor',
        requisitos: 'req edit with protractor',
        stageTitle: 'title dedit with protractor'
    };

    navigateTo() {
        return browser.get('/trips/update/5e8dafa77ab4fb06b4cd28f8');
    }

    getTitlePage() {
        const title = 'body > app-root > div > div > div > app-trip > div > form > table > tr:nth-child(1) > td > h1';
        return element(by.css(title)).getText();
    }

    getTripDetails() {
        return new Promise((resolve, reject) => {
            const tripResult = {
                title: '',
                description: '',
                requisitos: '',
                stageTitle: ''
            };

            element(by.id('title')).getText()
            .then((response) => {
                tripResult.title = response;
            })
            .then(_ => {
                element(by.id('description')).getText()
                .then((response) => {
                    tripResult.description = response;
                });
            })
            .then(_ => {
                element(by.id('req0')).getText()
                .then((response) => {
                    tripResult.requisitos = response;
                });
            })
            .then(_ => {
                element(by.id('titleStage0')).getText()
                .then((response) => {
                    tripResult.stageTitle = response;
                });
            });
        });
    }

    fillEditTrip(newTrip: any = this.newTrip) {
        const buttonUpdate = 'body > app-root > div > div > div > app-trip > div > form > p > button';
        element(by.id('title')).clear();
        element(by.id('title')).sendKeys(newTrip.title);
        element(by.id('description')).clear();
        element(by.id('description')).sendKeys(newTrip.description);
        element(by.id('req0')).clear();
        element(by.id('req0')).sendKeys(newTrip.requisitos);
        element(by.id('titleStage0')).clear();
        element(by.id('titleStage0')).sendKeys(newTrip.stageTitle);
        element(by.css(buttonUpdate)).click();
    }
}
