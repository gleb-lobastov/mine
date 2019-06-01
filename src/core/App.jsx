/* global __IS_DEV_MODE__ */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { createStore } from './store';
import { debugStore } from './debug';

export default class App {
  static create(config, initialState) {
    return new App(config, initialState);
  }

  constructor(config, initialState) {
    this.id = Math.random();
    this.config = config;
    this.store = createStore(initialState);
    if (__IS_DEV_MODE__) {
      debugStore(this.store);
    }
  }

  getState() {
    return this.store.getState();
  }

  render() {
    ReactDOM.render(
      <Root store={this.store} config={this.config} appId={this.id} />,
      document.getElementById('app'),
    );
  }
}
