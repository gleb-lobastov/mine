import React from 'react';
import { withRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MUILink from '@material-ui/core/Link';
import IconHome from '@material-ui/icons/Home';
import { usePaths } from 'modules/packages';
import Article from './blocks/Article';

const Link = props => <MUILink {...props} component={RouterLink} />;

function Articles({
  classes,
  namedPaths: routes,
  match: {
    params: { slug, tag },
  },
}) {
  const { literature: literaturePaths, code: codePaths } = usePaths();
  const hasSummaryTag = !tag || tag === 'summary';
  const hasCodeTag = !tag || tag === 'code';
  const selfPaths = literaturePaths || codePaths;
  return (
    <>
      {!routes.literature && (
        <Link to={selfPaths.entry.toUrl()} className={classes.iconHome}>
          <IconHome />
        </Link>
      )}
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
              to={selfPaths.articles.toUrl({ slug: 'chaldini' })}
            >
              <ListItemText primary="&laquo;Психология убеждения&raquo; Чалдини" />
            </ListItem>
          )}
          {hasSummaryTag && (
            <ListItem
              button={true}
              component={Link}
              to={selfPaths.articles.toUrl({ slug: 'blackSwan' })}
            >
              <ListItemText primary="&laquo;Черный лебедь&raquo; Талеба" />
            </ListItem>
          )}
          {hasCodeTag && (
            <ListItem
              button={true}
              component={Link}
              to={selfPaths.articles.toUrl({ slug: 'importThis' })}
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
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
  },
  iconHome: {
    padding: '0 16px',
  },
  slugList: {
    flex: '0 1 350px',
  },
};

export default compose(
  withRouter,
  withStyles(styles),
)(Articles);
