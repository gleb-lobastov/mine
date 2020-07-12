import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Paragraph({ data: { text = '' } }) {
  return (
    <Typography>
      {text.replace(/<\/?b>/g, '**').replace(/<\/?i>/g, '*')}
    </Typography>
  );
}
