import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OptionsSelect from 'modules/components/muiExtended/OptionsSelect';
import Suggest, { QUERY_FORMATS } from 'modules/components/muiExtended/Suggest';
import { VISIT_TYPES } from 'travel/models/visits/consts';

export const VISIT_TYPE_NAMES = {
  [VISIT_TYPES.TRANSIT]: 'Транзит',
  [VISIT_TYPES.REGULAR]: 'Посещение',
  [VISIT_TYPES.BASE_CAMP]: 'Базовый лагерь',
  [VISIT_TYPES.RELOCATION]: 'Переезд',
};

const renderVisitType = ({ option: visitType }) =>
  visitType ? VISIT_TYPE_NAMES[visitType] : 'Не указан';

const useStyles = makeStyles({
  optionGroup: {
    display: 'flex',
    minWidth: '400px',
  },
  suggest: {
    flexGrow: 1,
  },
});

export default function VisitEditFormSection({
  formikProps: {
    values: { locationName, visitType, visitComment },
    handleChange,
    handleBlur,
    setFieldValue,
  },
}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.optionGroup}>
        <Suggest
          inputProps={{ placeholder: 'Место посещения...' }}
          initialInputValue={locationName}
          onChange={({ suggestion: { geonameId } }) =>
            setFieldValue('trip.originGeonameId', geonameId)
          }
          onBlur={handleBlur}
          sourceProps={{
            domain: 'visitEditFormSection.geoname',
            modelName: 'geonames',
            filterField: 'locationName',
            queryFormat: QUERY_FORMATS.SEARCH,
            resolveDetails: ({ countryName, regionName }) =>
              [countryName, regionName].filter(Boolean).join(', '),
          }}
          transformSuggestionToOption={transformSuggestionToOption}
          triggerProps={{ label: 'Старт из' }}
        />
      </div>
      <div className={classes.optionGroup}>
        <OptionsSelect
          name="visitType"
          value={visitType}
          onChange={handleChange}
          caption="Тип посещения"
          inputId="VisitEditCard-VisitTypeOptions"
          optionRender={renderVisitType}
          options={Object.values(VISIT_TYPES)}
          hasNullOption={true}
        />
      </div>
      <div className={classes.optionGroup}>
        <TextField
          name="visitComment"
          value={visitComment}
          onChange={handleChange}
          label="Комментарий"
          fullWidth={true}
          multiline={true}
          rows={1}
          rowsMax={12}
        />
      </div>
    </>
  );
}

VisitEditFormSection.propTypes = {
  className: PropTypes.string,
};

VisitEditFormSection.defaultProps = {
  className: undefined,
};

function transformSuggestionToOption(suggestion) {
  const { locationName, countryName } = suggestion;
  return {
    label: locationName,
    detail: countryName,
    suggestion,
  };
}
