import IconHome from '@material-ui/icons/Home';
import MainDashboard from './pages/Dashboard';

export default ({ mountPath }) => ({
  id: '8ea85cf5-8d52-4cb7-b127-6c540ff41531',
  packageName: 'main',
  title: { caption: 'Главная', icon: IconHome },
  routing: {
    routes: [
      {
        routeName: 'entry',
        path: mountPath,
        Component: MainDashboard,
      },
    ],
    routesDict: {
      entry: {
        routeName: 'entry',
        path: mountPath,
        Component: MainDashboard,
      },
    },
  },
});
