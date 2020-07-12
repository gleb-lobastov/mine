import React from 'react';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconHome from '@material-ui/icons/Home';
import { usePaths } from 'modules/packages';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';
import { useAuthContext } from 'core/context/AuthContext';
import useArticles from '../../dataSource/articles';
import Article from './blocks/Article';

function Articles({
  classes,
  match: {
    params: { slug, tag },
  },
}) {
  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
    userId: authenticatedUserId,
  } = useAuthContext();

  const { articlesList } = useArticles({ userAlias: authenticatedUserAlias });

  const { literature: literaturePaths, code: codePaths } = usePaths();
  const hasSummaryTag = !tag || tag === 'summary';
  const hasCodeTag = !tag || tag === 'code';
  const selfPaths = literaturePaths || codePaths;
  return (
    <>
      {!literaturePaths && (
        <ConnectedLink
          to={selfPaths.entry.toUrl()}
          className={classes.iconHome}
        >
          <IconHome />
        </ConnectedLink>
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
              component={ConnectedLink}
              to={selfPaths.articles.toUrl({ slug: 'chaldini' })}
            >
              <ListItemText primary="&laquo;Психология убеждения&raquo; Чалдини" />
            </ListItem>
          )}
          {hasSummaryTag && (
            <ListItem
              button={true}
              component={ConnectedLink}
              to={selfPaths.articles.toUrl({ slug: 'blackSwan' })}
            >
              <ListItemText primary="&laquo;Черный лебедь&raquo; Талеба" />
            </ListItem>
          )}
          {hasCodeTag && (
            <ListItem
              button={true}
              component={ConnectedLink}
              to={selfPaths.articles.toUrl({ slug: 'importThis' })}
            >
              <ListItemText primary="19 принципов достижения дзена при написании компьютерных программ" />
            </ListItem>
          )}
          {articlesList.map(article => {
            const { userId, isDraft, title, slug: currentSlug } = article;
            if (
              isDraft &&
              (!isAuthenticated || authenticatedUserId !== userId)
            ) {
              return null;
            }
            const caption = isDraft ? `Черновик: ${title}` : title;
            return (
              <ListItem
                button={true}
                component={ConnectedLink}
                to={selfPaths.articles.toUrl({ slug: currentSlug })}
              >
                <ListItemText primary={caption} />
              </ListItem>
            );
          })}
          {isAuthenticated && (
            <ListItem
              button={true}
              component={ConnectedLink}
              to={selfPaths.createArticle.toUrl({
                userAlias: authenticatedUserAlias,
              })}
            >
              <ListItemText primary="Добавить статью" />
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
