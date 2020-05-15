
import { browser, logging } from 'protractor';
import { LoginPage } from '../login/login.po';
import { TripEditionPage } from './tripEdition.po';

describe('workspace-project App', () => {
  let loginPage: LoginPage;
  let tripEditPage: TripEditionPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    tripEditPage = new TripEditionPage();
  });

  it('should login and then edit a trip', () => {
    browser.get('/');
    browser.sleep(2000);
    loginPage.navigateTo();
    browser.sleep(2000);
    loginPage.fillCredentials();
    browser.sleep(2000);
    loginPage.getTitlePageAfterConnection().then((title) => {
        expect(['Voyages', 'Viajes', 'Trips']).toContain(title);
    });
    tripEditPage.navigateTo();
    browser.sleep(2000);
    tripEditPage.getTitlePage().then((title) => {
        expect(['Mettre à jour le voyage flight_takeoff',
                'Modificar viaje flight_takeoff',
                'Update the trip flight_takeoff']).toContain(title);
    });
    tripEditPage.fillEditTrip();
    browser.sleep(2000);
    tripEditPage.navigateTo();
    browser.sleep(2000);
    tripEditPage.getTripDetails().then((result:
        {title: string, description: string, requisitos: string, stageTitle: string}) => {
        expect(result.title).toEqual('title edit with protractor');
        expect(result.description).toEqual('desc edit with protractor');
        expect(result.requisitos).toEqual('req edit with protractor');
        expect(result.stageTitle).toEqual('title dedit with protractor');
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
