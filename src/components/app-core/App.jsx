import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';

const rootNode = document.getElementById('app');
const render = () => {
  ReactDOM.render(
    <Layout />,
    rootNode,
  );
};

render();
