import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withPaths } from 'core/context/AppContext';
import Article from './blocks/Article';

function Articles({
  classes,
  namedPaths: routes,
  match: {
    params: { slug, tag },
  },
}) {
  const hasSummaryTag = !tag || tag === 'summary';
  const hasCodeTag = !tag || tag === 'code';
  return (
    <div className={classes.container}>
      <List
        component="nav"
        aria-label="articles"
        classes={{ root: classes.slugList }}
      >
        {hasSummaryTag && (
          <ListItem
            button={true}
            component={Link}
            to={routes.literature.articles.toUrl({ slug: 'chaldini' })}
          >
            <ListItemText primary="&laquo;Психология убеждения&raquo; Чалдини" />
          </ListItem>
        )}
        {hasSummaryTag && (
          <ListItem
            button={true}
            component={Link}
            to={routes.literature.articles.toUrl({ slug: 'blackSwan' })}
          >
            <ListItemText primary="&laquo;Черный лебедь&raquo; Талеба" />
          </ListItem>
        )}
        {hasCodeTag && (
          <ListItem
            button={true}
            component={Link}
            to={routes.literature.articles.toUrl({ slug: 'importThis' })}
          >
            <ListItemText primary="19 принципов достижения дзена при написании компьютерных программ" />
          </ListItem>
        )}
      </List>
      {slug && (
        <div>
          <Article slug={slug} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
  },
  slugList: {
    flex: '0 1 350px',
  },
};

export default compose(
  withRouter,
  withPaths,
  withStyles(styles),
)(Articles);
