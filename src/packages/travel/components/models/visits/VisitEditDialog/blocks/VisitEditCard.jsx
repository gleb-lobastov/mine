import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OptionsSelect from 'modules/components/muiExtended/OptionsSelect';
import ProvisionedSuggest, {
  QUERY_FORMATS,
} from 'modules/components/muiExtended/Suggest/modifications/ProvisionedSuggest';
import { VISIT_TYPES } from 'travel/models/visits/consts';
import { VISIT_TYPE_NAMES } from '../localization';

const renderVisitType = ({ option: visitType }) =>
  visitType ? VISIT_TYPE_NAMES[visitType] : 'Не указан';

export const useVisitState = ({
  visitType: initialVisitType,
  visitComment: initialVisitComment,
  locationId: initialLocationId,
  locationName: initialLocationName,
  geonameId: initialGeonameId,
}) => {
  const [visitState, setVisitState] = useState({
    visitComment: initialVisitComment,
    visitType: initialVisitType,
    locationId: initialLocationId,
    locationName: initialLocationName,
    geonameId: initialGeonameId,
  });

  return {
    visitState,
    setVisitState: visitStateUpdate =>
      setVisitState({ ...visitState, ...visitStateUpdate }),
  };
};

const styles = {
  optionGroup: {
    display: 'flex',
    minWidth: '400px',
  },
  suggest: {
    flexGrow: 1,
  },
};

const VisitEditCard = ({
  classes,
  visitState: { visitType, visitComment, locationName },
  setVisitState,
}) => {
  const setVisitType = useCallback(
    ({ target: { value: nextVisitType } }) =>
      setVisitState({ visitType: nextVisitType }),
    [setVisitState],
  );
  const setGeoname = useCallback(
    ({ geonameId: nextGeonameId }) =>
      setVisitState({ geonameId: nextGeonameId }),
    [setVisitState],
  );
  const setVisitComment = useCallback(
    ({ target: { value: nextVisitComment } }) =>
      setVisitState({ visitComment: nextVisitComment }),
    [setVisitState],
  );

  return (
    <>
      <div className={classes.optionGroup}>
        <ProvisionedSuggest
          classes={{ root: classes.suggest }}
          textFieldProps={{
            label: 'Место посещения',
          }}
          initialInputValue={locationName}
          inputProps={{ placeholder: 'Населенный пункт...' }}
          onChange={setGeoname}
          sourceProps={{
            filterField: 'locationName',
            modelName: 'geonames',
            domain: 'visitEditCard.geoname',
            queryFormat: QUERY_FORMATS.SEARCH,
            resolveDetails: ({ countryName, regionName }) =>
              [countryName, regionName].filter(Boolean).join(', '),
          }}
        />
      </div>
      <div className={classes.optionGroup}>
        <OptionsSelect
          caption="Тип посещения"
          inputId="VisitEditCard-VisitTypeOptions"
          onChange={setVisitType}
          optionRender={renderVisitType}
          options={Object.values(VISIT_TYPES)}
          hasNullOption={true}
          value={visitType}
        />
      </div>
      <div className={classes.optionGroup}>
        <TextField
          label="Комментарий"
          fullWidth={true}
          value={visitComment}
          onChange={setVisitComment}
          multiline={true}
          rows={1}
          rowsMax={12}
        />
      </div>
    </>
  );
};

VisitEditCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

VisitEditCard.defaultProps = {
  className: undefined,
};

export default withStyles(styles)(VisitEditCard);
