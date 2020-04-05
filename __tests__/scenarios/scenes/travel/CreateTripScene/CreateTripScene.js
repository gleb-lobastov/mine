import * as tripEditPageLocators from 'travel/pages/TripEditPage/locators';
import { toSelector, evaluateClick } from '../../../../utils';
import getRandomLocationSuggest from '../getRandomLocationSuggest';

export default class CreateTripScene {
  constructor(page, context) {
    this.page = page;
    this.context = context;
  }

  async show({ userAlias }) {
    await this.page.goto(
      `http://localhost:8080/mine/travel/${userAlias}/visits/trips/create`,
      { waitUntil: 'networkidle2' },
    );
  }

  async createTrip() {
    await this.fulfillForm();
    await this.submit();
  }

  async fulfillForm() {
    await this.toggleAutogeneratedName();
    await this.fulfilTripName();
    await this.fulfillOriginalLocation();
    await this.fulfilTripType();
  }

  async toggleAutogeneratedName() {
    const autogeneratedNameFieldSelector = toSelector(
      tripEditPageLocators.AUTOGENERATED_NAME_CHECKBOX,
    );

    await this.page.waitFor(autogeneratedNameFieldSelector);
    await this.page.evaluate(evaluateClick, autogeneratedNameFieldSelector);
  }

  async fulfilTripName() {
    const tripNameFieldSelector = toSelector(
      tripEditPageLocators.TRIP_NAME_INPUT,
    );
    const tripName = generateRandomTripName();

    await this.page.waitFor(tripNameFieldSelector);
    await this.page.focus(`${tripNameFieldSelector} input`, tripName);
    await this.page.type(`${tripNameFieldSelector} input`, tripName);
  }

  async fulfillOriginalLocation() {
    const locationSuggestSelector = toSelector(
      tripEditPageLocators.ORIGIN_LOCATION_SUGGEST,
    );

    const locationSuggest = getRandomLocationSuggest();
    this.context.set('originalLocationSuggest', locationSuggest);

    await this.page.focus(`${locationSuggestSelector} input`);
    await this.page.type(`${locationSuggestSelector} input`, locationSuggest);

    await this.page.waitFor(`${locationSuggestSelector} [role="option"]`);
    await this.page.click(`${locationSuggestSelector} [role="option"]`);
  }

  async fulfilTripType() {
    const tripTypeFieldSelector = toSelector(
      tripEditPageLocators.TRIP_TYPE_SELECT,
    );
    const tripTypeFieldPortalSelector = toSelector(
      'options-TripEditCard-TripTypeOptions',
    );

    await this.page.click(`${tripTypeFieldSelector} .MuiInputBase-root`);
    await this.page.waitFor(`${tripTypeFieldPortalSelector} [role="option"]`);
    await this.page.click(
      `${tripTypeFieldPortalSelector} [role="option"]:nth-of-type(2)`,
    );
  }

  async submit() {
    const submitButtonSelector = toSelector(
      tripEditPageLocators.SUBMIT_TRIP_BUTTON,
    );
    await this.page.waitFor(submitButtonSelector);
    await this.page.click(submitButtonSelector);
    const createTripResponse = await this.page.waitForResponse(
      response =>
        response.url() === 'http://localhost:8082/api/trips' &&
        response.request().method() === 'POST',
    );
    this.context.set('createdTrip', await createTripResponse.json());
    await this.page.waitForNavigation();
  }
}

function generateRandomTripName() {
  const randomId = Math.round(Math.random() * 16 ** 9).toString(36);
  return `Test trip #${randomId}`;
}
