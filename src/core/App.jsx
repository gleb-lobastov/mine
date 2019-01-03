/* global __IS_DEV_MODE__ */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { createStore } from './store';
import { debugStore } from './debug';

export default class App {
  static create(config) {
    return new App(config);
  }

  static instances = []; // todo consider usage for hot reloading

  constructor(config) {
    this.config = config;
    this.rootNode = document.getElementById('app');
    this.store = createStore();
    if (__IS_DEV_MODE__) {
      debugStore(this.store);
    }
    App.instances.push(this);
  }

  render() {
    ReactDOM.render(
      <Root store={this.store} config={this.config} />,
      this.rootNode,
    );
  }
}
