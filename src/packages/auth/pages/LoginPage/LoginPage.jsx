/* globals __API_HOST__ */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { setAccessToken } from 'modules/auth/tokens';
import * as locators from './locators';

const SUBMIT_STATUS = {
  NONE: 'NONE',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

class LoginPage extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();
    this.state = { status: SUBMIT_STATUS.NONE };
  }

  handleSubmit = () => {
    fetch(`${__API_HOST__}/api/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: this.loginRef.current.value,
        password: this.passwordRef.current.value,
      }),
      headers: {
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(({ code, token }) => {
        const ok = code === 200;
        if (ok) {
          setAccessToken(token);
        }
        this.setState({
          status: ok ? SUBMIT_STATUS.SUCCESS : SUBMIT_STATUS.FAILURE,
        });
      })
      .catch(() => this.setState({ status: SUBMIT_STATUS.FAILURE }));
  };

  render() {
    const { status } = this.state;
    if (status === SUBMIT_STATUS.SUCCESS) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {status === SUBMIT_STATUS.FAILURE && (
          <div style={{ color: 'red' }}>Ошибка авторизации</div>
        )}
        <div>Логин</div>
        <input
          data-locator={locators.LOGIN_INPUT}
          type="text"
          ref={this.loginRef}
        />
        <div>Пароль</div>
        <input
          data-locator={locators.PASSWORD_INPUT}
          type="password"
          ref={this.passwordRef}
        />
        <div>
          <button
            data-locator={locators.SUBMIT_BUTTON}
            type="submit"
            onClick={this.handleSubmit}
          >
            Это я!
          </button>
        </div>
      </div>
    );
  }
}

LoginPage.defaultProps = {};

export default LoginPage;
