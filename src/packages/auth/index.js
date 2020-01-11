import React from 'react';
import { Package } from 'modules/packages';
import LoginPage from './pages/LoginPage';

const routes = {
  entry: {
    path: '/',
    Component: LoginPage,
  },
};

export default function Auth(forwardingProps) {
  return <Package name="auth" routes={routes} {...forwardingProps} />;
}
