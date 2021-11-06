import { Scene } from 'puppeteer-scenario';
import * as dialogLocators from 'modules/components/Dialog/locators';
import * as tripEditPageLocators from 'travel/pages/TripEditPage/locators';
import * as rideEditFormSectionLocators from 'travel/components/RideEditFormSection/locators';
import {
  toSelector,
  evaluateInputValue,
  selectRandomOption,
} from '../../../../../utils';

export default class CreateRideDialogFrame extends Scene {
  async createRide() {
    await this.fulfillRideType();
    await this.fulfillVehicleType();
    await this.fulfillClass();
    await this.fulfillOccupation();
    await this.submit();
  }

  async fulfillVehicleType() {
    await selectRandomOption(
      this.page,
      toSelector(rideEditFormSectionLocators.VEHICLE_TYPE_SELECT),
      toSelector('options-RideEditCard-VehicleTypeOptions'),
    );
  }

  async fulfillRideType() {
    await selectRandomOption(
      this.page,
      toSelector(rideEditFormSectionLocators.RIDE_TYPE_SELECT),
      toSelector('options-RideEditCard-RideTypeOptions'),
    );
  }

  async fulfillClass() {
    await selectRandomOption(
      this.page,
      toSelector(rideEditFormSectionLocators.RIDE_CLASS_SELECT),
      toSelector('options-RideEditCard-RideClassOptions'),
    );
  }

  async fulfillOccupation() {
    await selectRandomOption(
      this.page,
      toSelector(rideEditFormSectionLocators.RIDE_OCCUPATION_SELECT),
      toSelector('options-RideEditCard-RideOccupationOptions'),
    );
  }

  async fulfillDepartureDate() {
    const typeSelectSelector = toSelector(
      rideEditFormSectionLocators.DEPARTURE_DATE_PICKER,
    );
    await this.page.evaluate(
      evaluateInputValue,
      `${typeSelectSelector} input`,
      '11.03.1983',
    );
  }

  async submit() {
    const rideDialogSelector = toSelector(tripEditPageLocators.RIDE_DIALOG);
    const submitButtonSelector = toSelector(dialogLocators.SUBMIT_BUTTON);
    await this.page.click(`${rideDialogSelector} ${submitButtonSelector}`);
    await this.page.waitForResponse(
      'http://localhost:8082/api/trips?user=test1812381&limit=null',
    );
  }
}
