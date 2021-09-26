import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({});

export default function VisitsItselfGroup({
  groupKey: year,
  visitsList,
}) {
  return <>{visitsList.map(({ visitId }) => `виzит ${visitId}`)}</>;
}
