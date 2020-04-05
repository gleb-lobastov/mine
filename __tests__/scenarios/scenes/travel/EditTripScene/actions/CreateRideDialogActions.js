import * as dialogLocators from 'modules/components/Dialog/locators';
import * as actionsLocators from 'travel/components/common/Actions/locators';
import * as tripEditPageLocators from 'travel/pages/TripEditPage/locators';
import * as rideEditFormSectionLocators from 'travel/components/models/rides/RideEditFormSection/locators';
import {
  toSelector,
  evaluateInputValue,
  selectRandomOption,
} from '../../../../../utils';

export default class CreateRideDialogActions {
  constructor(page) {
    this.page = page;
  }

  async createRide() {
    await this.openRideDialog();
    await this.fulfillRideType();
    await this.fulfillVehicleType();
    await this.fulfillClass();
    await this.fulfillOccupation();
    await this.submit();
  }

  async openRideDialog() {
    const rideActionsSelector = toSelector(tripEditPageLocators.RIDE_ACTIONS);
    const createActionSelector = toSelector(actionsLocators.CREATE_BUTTON);
    const createRideButtonSelector = `${rideActionsSelector} ${createActionSelector}`;
    await this.page.waitFor(createRideButtonSelector);
    await this.page.click(createRideButtonSelector);
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
