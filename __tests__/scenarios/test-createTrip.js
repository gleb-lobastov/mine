import puppeteer from 'puppeteer';
import { TEST_PASSWORD, TEST_LOGIN, TEST_USER_ALIAS } from '../testCredentials';
import Scenario from 'puppeteer-scenario';
import LoginScene from './scenes/auth/LoginScene';
import VisitsScene from './scenes/travel/VisitsScene';
import CreateTripScene from './scenes/travel/CreateTripScene';
import EditTripScene from './scenes/travel/EditTripScene';

describe('user scenarios', () => {
  it('should login, create trip, visits and rides', async () => {
    jest.setTimeout(300000);
    expect.assertions(1);

    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      devtools: true,
    });
    const page = await browser.newPage();
    Object.assign(global, { browser, page });

    await new Scenario(page)
      .showScene(LoginScene)
      .act('login', { login: TEST_LOGIN, password: TEST_PASSWORD })
      .finally(() =>
        expect(page.evaluate(() => localStorage.getItem('_at'))).toBeTruthy(),
      )

      .showScene(VisitsScene, { userAlias: TEST_USER_ALIAS })
      .act('goCreateTrip')

      .expectScene(CreateTripScene)
      .act('createTrip')

      .expectScene(EditTripScene)
      .act(async editTripScene => {
        await editTripScene.createVisitDialogActions.createVisit();
        await editTripScene.createVisitDialogActions.createVisit();
        await editTripScene.createRideDialogActions.createRide();
        await editTripScene.createRideDialogActions.createRide();
        await editTripScene.createRideDialogActions.createRide();
      })

      .play();

    await browser.close();
  });
});
