import * as tripEditPageLocators from 'travel/pages/TripEditPage/locators';
import { toSelector, evaluateClick } from '../../../../utils';
import CreateVisitDialogActions from './actions/CreateVisitDialogActions';
import CreateRideDialogActions from './actions/CreateRideDialogActions';

export default class EditTripScene {
  constructor(page, context) {
    this.page = page;
    this.context = context;
    this.createVisitDialogActions = new CreateVisitDialogActions(page, context);
    this.createRideDialogActions = new CreateRideDialogActions(page, context);
  }

  async show() {}

  async submit() {
    const submitButtonSelector = toSelector(
      tripEditPageLocators.SUBMIT_TRIP_BUTTON,
    );
    await this.page.waitFor(submitButtonSelector);
    await this.page.evaluate(evaluateClick, submitButtonSelector);
    await this.page.waitForResponse('http://localhost:8082/api/trips');
  }
}
