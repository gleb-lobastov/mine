import IconCreate from '@material-ui/icons/Create';
import resolveRoutingConfig from './routes';

export default ({ mountPath }) => ({
  id: '9a682978-1ab8-4449-91ff-68216473c11e',
  packageName: 'literature',
  title: { caption: 'Литература', icon: IconCreate },
  routing: resolveRoutingConfig(mountPath),
});
