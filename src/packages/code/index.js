import IconCode from '@material-ui/icons/Code';
import CodeDashboard from 'code/pages/Dashboard';

export default ({ mountPath }) => ({
  id: '9f7b3838-779c-452b-9da0-67db3fd4ece4',
  packageName: 'code',
  title: { caption: 'Код', icon: IconCode },
  routing: {
    routes: [
      {
        routeName: 'entry',
        path: mountPath,
        Component: CodeDashboard,
      },
    ],
  },
});
