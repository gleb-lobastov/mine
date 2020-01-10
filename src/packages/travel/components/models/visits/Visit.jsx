import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DomainIcon from '@material-ui/icons/Domain';
import EditIcon from '@material-ui/icons/Edit';
import Path from 'modules/utilities/routing/Path';
import VisitEditDialog from 'travel/components/models/visits/VisitEditDialog';
import visitPropTypes from 'travel/models/visits/propTypes';

const resolveVisitIconComponent = visitType => {
  switch (visitType) {
    case 'Transit':
      return TransferWithinAStationIcon;
    case 'BaseCamp':
      return DomainIcon;
    case 'Relocation':
      return LocalShippingIcon;
    case 'Regular':
    default:
      return LocationCityIcon;
  }
};

const Visit = ({
  visit,
  onVisitUpdate: handleVisitUpdate,
  classes,
  isEditable,
  locationPath,
}) => {
  if (!visit) {
    return 'Не указано';
  }
  const { locationName, visitType, locationId } = visit;
  const Icon = resolveVisitIconComponent(visitType);
  return (
    <div className={classes.container}>
      {Icon && <Icon className={classes.icon} />}
      <Link to={locationPath.toUrl({ strLocationId: String(locationId) })}>
        {locationName}
      </Link>
      {isEditable && (
        <VisitEditDialog
          initialState={visit}
          onSubmit={updatedVisit =>
            handleVisitUpdate({ ...visit, ...updatedVisit })
          }
        >
          <IconButton
            data-sort-handler="disabled"
            size="small"
            variant="outlined"
            color="primary"
          >
            <EditIcon className={classes.editIcon} />
          </IconButton>
        </VisitEditDialog>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'inline-block',
    marginRight: '4px',
  },
  icon: {
    marginRight: '4px',
    display: 'inline-block',
    verticalAlign: 'text-bottom',
  },
  editIcon: {},
};

Visit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isEditable: PropTypes.bool,
  onVisitUpdate: PropTypes.func.isRequired,
  visit: PropTypes.shape(visitPropTypes),
  locationPath: PropTypes.instanceOf(Path).isRequired,
};

Visit.defaultProps = {
  isEditable: false,
  visit: {},
};

export default withStyles(styles)(Visit);
