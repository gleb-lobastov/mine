import { Scene } from 'puppeteer-scenario';
import * as tripEditPageLocators from 'travel/pages/TripEditPage/locators';
import * as actionsLocators from 'travel/components/common/Actions/locators';
import { toSelector, evaluateClick } from '../../../../utils';
import CreateVisitDialogFrame from './frames/CreateVisitDialogFrame';
import CreateRideDialogFrame from './frames/CreateRideDialogFrame';

export default class EditTripScene extends Scene {
  constructor(page, context) {
    super(page, context);
    this.frames = {
      createVisitDialog: new CreateVisitDialogFrame(page, context),
      createRideDialog: new CreateRideDialogFrame(page, context),
    };
  }

  async createVisit() {
    await this.openVisitDialog();
    await this.frames.createVisitDialog.createVisit();
  }

  async createRide() {
    await this.openRideDialog();
    await this.frames.createRideDialog.createRide();
  }

  async openVisitDialog() {
    const createVisitButtonSelector = toSelector(
      tripEditPageLocators.ADD_VISIT_BUTTON,
    );
    await this.page.waitFor(createVisitButtonSelector);
    await this.page.click(createVisitButtonSelector);
  }

  async openRideDialog() {
    const rideActionsSelector = toSelector(tripEditPageLocators.RIDE_ACTIONS);
    const createActionSelector = toSelector(actionsLocators.CREATE_BUTTON);
    const createRideButtonSelector = `${rideActionsSelector} ${createActionSelector}`;
    await this.page.waitFor(createRideButtonSelector);
    await this.page.click(createRideButtonSelector);
  }

  async submit() {
    const submitButtonSelector = toSelector(
      tripEditPageLocators.SUBMIT_TRIP_BUTTON,
    );
    await this.page.waitFor(submitButtonSelector);
    await this.page.evaluate(evaluateClick, submitButtonSelector);
    await this.page.waitForResponse('http://localhost:8082/api/trips');
  }
}
