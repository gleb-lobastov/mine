import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import compose from 'lodash/fp/compose';
import OptionsSelect from 'modules/components/muiExtended/OptionsSelect';
import ProvisionedSuggest from 'modules/components/muiExtended/Suggest/modifications/ProvisionedSuggest';
import { selectDict } from 'core/connection';
import { VISIT_TYPES } from 'travel/models/visits/consts';
import { VISIT_TYPE_NAMES } from '../localization';

const renderVisitType = ({ option: visitType }) =>
  visitType ? VISIT_TYPE_NAMES[visitType] : 'Не указан';

export const useVisitState = ({
  visitType: initialVisitType,
  visitComment: initialVisitComment,
  locationId: initialLocationId,
}) => {
  const [visitState, setVisitState] = useState({
    visitComment: initialVisitComment,
    visitType: initialVisitType,
    locationId: initialLocationId,
  });

  return {
    visitState,
    setVisitState: visitStateUpdate =>
      setVisitState({ ...visitState, ...visitStateUpdate }),
  };
};

const styles = {
  optionGroup: {
    display: 'block',
  },
};

const VisitEditCard = ({
  classes,
  locationsDict,
  visitState: { visitType, visitComment, locationId },
  setVisitState,
}) => {
  const setVisitType = useCallback(
    ({ target: { value: nextVisitType } }) =>
      setVisitState({ visitType: nextVisitType }),
    [setVisitState],
  );
  const setLocation = useCallback(
    ({ locationId: nextLocationId }) =>
      setVisitState({ locationId: nextLocationId }),
    [setVisitState],
  );
  const setVisitComment = useCallback(
    ({ target: { value: nextVisitComment } }) =>
      setVisitState({ visitComment: nextVisitComment }),
    [setVisitState],
  );

  const location = locationsDict[locationId];
  const { locationName } = location || {};
  return (
    <>
      <div className={classes.optionGroup}>
        <ProvisionedSuggest
          textFieldProps={{
            label: 'Место посещения',
          }}
          initialInputValue={locationName}
          inputProps={{ placeholder: 'Населенный пункт...' }}
          onChange={setLocation}
          sourceProps={{
            filterField: 'locationName',
            modelName: 'locations',
            domain: 'visitEditCard.location',
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
  classes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
VisitEditCard.defaultProps = {
  className: undefined,
};

const mapStateToProps = state => ({
  locationsDict: selectDict(state, 'locations'),
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(VisitEditCard);