import * as loginPageLocators from 'auth/pages/LoginPage/locators';
import { toSelector, evaluateInputValue } from '../../../../utils';

export default class LoginScene {
  constructor(page) {
    this.page = page;
  }

  async show() {
    await this.page.goto('http://localhost:8080/mine/hello', {
      waitUntil: 'networkidle2',
    });
  }

  async login({ login, password }) {
    const loginFieldSelector = toSelector(loginPageLocators.LOGIN_INPUT);
    const passwordFieldSelector = toSelector(loginPageLocators.PASSWORD_INPUT);
    const submitButtonSelector = toSelector(loginPageLocators.SUBMIT_BUTTON);
    await this.page.waitFor(loginFieldSelector);
    await this.page.evaluate(evaluateInputValue, loginFieldSelector, login);
    await this.page.evaluate(
      evaluateInputValue,
      passwordFieldSelector,
      password,
    );
    await this.page.click(submitButtonSelector);
    await this.page.waitForResponse('http://localhost:8082/api/login');
    await this.page.waitFor(100);
  }
}
