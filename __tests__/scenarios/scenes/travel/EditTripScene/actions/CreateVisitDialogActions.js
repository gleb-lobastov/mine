import * as dialogLocators from 'modules/components/Dialog/locators';
import * as tripEditPageLocators from 'travel/pages/TripEditPage/locators';
import * as visitEditFormSectionLocators from 'travel/components/models/visits/VisitEditFormSection/locators';
import { toSelector, selectRandomOption } from '../../../../../utils';
import getRandomLocationSuggest from '../../getRandomLocationSuggest';

export default class CreateVisitDialogActions {
  constructor(page, context) {
    this.page = page;
    this.context = context;
  }

  async createVisit() {
    await this.openVisitDialog();
    await this.fulfillLocation();
    await this.fulfillType();
    await this.submit();
  }

  async openVisitDialog() {
    const createVisitButtonSelector = toSelector(
      tripEditPageLocators.ADD_VISIT_BUTTON,
    );
    await this.page.waitFor(createVisitButtonSelector);
    await this.page.click(createVisitButtonSelector);
  }

  resolveUniqueLocation() {
    const visitsLocationSuggests = JSON.parse(
      this.context.get('visitsLocationSuggests') || '[]',
    );
    const usedLocations = [
      ...visitsLocationSuggests,
      this.context.get('originalLocationSuggest'),
    ];
    const visitsLocationSuggest = getRandomLocationSuggest(usedLocations);
    this.context.set(
      'visitsLocationSuggests',
      JSON.stringify([...visitsLocationSuggests, visitsLocationSuggest]),
    );
    return visitsLocationSuggest;
  }

  async fulfillLocation() {
    const locationSuggestSelector = toSelector(
      visitEditFormSectionLocators.LOCATION_SUGGEST,
    );

    const locationSuggest = this.resolveUniqueLocation();

    await this.page.focus(`${locationSuggestSelector} input`);
    await this.page.type(`${locationSuggestSelector} input`, locationSuggest);

    await this.page.waitFor(`${locationSuggestSelector} [role="option"]`);
    await this.page.click(`${locationSuggestSelector} [role="option"]`);

    // await this.page.waitForResponse('http://localhost:8082/api/geonames');
  }

  async fulfillType() {
    await selectRandomOption(
      this.page,
      toSelector(visitEditFormSectionLocators.VISIT_TYPE_SELECT),
      toSelector('options-VisitEditCard-VisitTypeOptions'),
    );
  }

  async submit() {
    const visitDialogSelector = toSelector(tripEditPageLocators.VISIT_DIALOG);
    const submitButtonSelector = toSelector(dialogLocators.SUBMIT_BUTTON);
    await this.page.click(`${visitDialogSelector} ${submitButtonSelector}`);
    await this.page.waitForResponse(
      'http://localhost:8082/api/trips?user=test1812381&limit=null',
    );
  }
}
