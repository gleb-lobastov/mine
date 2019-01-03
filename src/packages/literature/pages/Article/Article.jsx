import React from 'react';
import { withRouter } from 'react-router';
import Chaldini from './designed/Chaldini';
import BlackSwan from './designed/BlackSwan';

export default withRouter(({ match: { params: { slug } } }) => {
  switch (slug) {
    case 'chaldini':
      return <Chaldini />;
    case 'blackSwan':
      return <BlackSwan />;
    default:
      return <div>Статья не найдена</div>;
  }
});
