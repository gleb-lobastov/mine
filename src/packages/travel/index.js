import IconPublic from '@material-ui/icons/Public';
import resolveRoutingConfig from 'travel/routes';

export default ({ mountPath }) => ({
  id: "81f77ac4-17ca-42bd-b1bf-0c40bc92f415'",
  packageName: 'travel',
  title: { caption: 'Литература', icon: IconPublic },
  routing: resolveRoutingConfig(mountPath),
});
