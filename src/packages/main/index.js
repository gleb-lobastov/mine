import React from 'react';
import { Package } from 'modules/packages';
import MainDashboard from './pages/Dashboard';

const routes = {
  entry: {
    path: '/',
    layoutProps: { isResponsive: true },
    Component: MainDashboard,
  },
};

export default function Main(forwardingProps) {
  return <Package name="main" routes={routes} {...forwardingProps} />;
}
