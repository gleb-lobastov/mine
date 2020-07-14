import React from 'react';
import { Package } from 'modules/packages';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const routes = {
  entry: {
    path: '/',
    Component: LoginPage,
  },
  signup: {
    path: '/signup',
    Component: SignupPage,
  },
};

export default function Auth(forwardingProps) {
  return <Package name="auth" routes={routes} {...forwardingProps} />;
}
