import * as visitsPageLocators from 'travel/pages/VisitsPage/locators';
import { toSelector } from '../../../../utils';

export default class VisitsScene {
  constructor(page) {
    this.page = page;
  }

  async show({ userAlias }) {
    await this.page.goto(
      `http://localhost:8080/mine/travel/${userAlias}/visits/trips`,
      {
        waitUntil: 'networkidle2',
      },
    );
  }

  async goCreateTrip() {
    const addTripButtonSelector = toSelector(
      visitsPageLocators.ADD_TRIP_BUTTON,
    );

    await this.page.waitFor(addTripButtonSelector);
    await this.page.click(addTripButtonSelector);
  }
}
