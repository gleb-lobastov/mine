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
      .arrange({
        scene: LoginScene,
        url: 'http://localhost:8080/mine/hello',
        unauthorize: true,
      })
      .act('login', { login: TEST_LOGIN, password: TEST_PASSWORD })
      .assert(() =>
        expect(page.evaluate(() => localStorage.getItem('_at'))).toBeTruthy(),
      )

      .arrange({ scene: VisitsScene, userAlias: TEST_USER_ALIAS })
      .act('clickCreateTrip')

      .arrange({ scene: CreateTripScene, userAlias: TEST_USER_ALIAS })
      .act('createTrip')

      .arrange({ scene: EditTripScene })
      .act('createVisit')
      .act('createVisit')
      .act('createRide')
      .act('createRide')
      .act('createRide')

      .play();

    await browser.close();
  });
});
