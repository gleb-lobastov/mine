import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root/Root';
import { routesList } from './routing';

const rootNode = document.getElementById('app');
const render = () => {
  ReactDOM.render(<Root routesList={routesList} />, rootNode);
};

render();
