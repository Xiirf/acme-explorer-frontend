import { browser, logging } from 'protractor';
import { LoginPage } from '../login/loginExplo.po';
import { TripApplyPage } from './tripApply.po';

describe('workspace-project App', () => {
  let loginPage: LoginPage;
  let tripApplyPage: TripApplyPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    tripApplyPage = new TripApplyPage();
  });

  it('should login and then apply to a trip', () => {
    browser.get('/');
    browser.sleep(2000);
    loginPage.navigateTo();
    browser.sleep(2000);
    loginPage.fillCredentials();
    browser.sleep(2000);
    loginPage.getTitlePage().then((title) => {
        expect(['Voyages', 'Viajes', 'Trips']).toContain(title);
    });
    tripApplyPage.navigateTo();
    browser.sleep(2000);
    tripApplyPage.fillCreateApplication();
    browser.sleep(2000);
    loginPage.getTitlePage().then((title) => {
        expect(['Voyages', 'Viajes', 'Trips']).toContain(title);
    });
  });
});
