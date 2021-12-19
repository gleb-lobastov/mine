import { Scene } from 'puppeteer-scenario';
import * as visitsPageLocators from 'travel/pages/VisitsPage/locators';
import { toSelector } from '../../../../utils';

export default class VisitsScene extends Scene {
  async arrange({ userAlias }) {
    await this.page.goto(
      `http://localhost:8080/mine/travel/${userAlias}/places`,
      { waitUntil: 'networkidle2' },
    );
  }

  async clickCreateTrip() {
    const addTripButtonSelector = toSelector(
      visitsPageLocators.ADD_TRIP_BUTTON,
    );

    await this.page.waitFor(addTripButtonSelector);
    await this.page.click(addTripButtonSelector);
  }
}
