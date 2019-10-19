import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withPaths } from 'core/context/AppContext';

class CodeDashboard extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const {
      namedPaths: {
        code: { articles: codeArticlesRoute },
        literature: { articles: articlesRoute = codeArticlesRoute } = {},
      },
    } = this.props;
    return (
      <List>
        <ListItem
          button={true}
          component="a"
          target="_blank"
          rel="nofollow noopener"
          href="https://github.com/gleb-lobastov"
        >
          <ListItemText primary="Гитхаб" />
        </ListItem>
        <ListItem
          button={true}
          component="a"
          target="_blank"
          rel="nofollow noopener"
          href="https://www.linkedin.com/in/glebin"
        >
          <ListItemText primary="Linkedin" />
        </ListItem>
        <ListItem
          button={true}
          component={Link}
          to={articlesRoute.toUrl({ slug: 'importThis' })}
        >
          <ListItemText primary="Статья &laquo;19 принципов достижения дзена при написании компьютерных программ&raquo;" />
        </ListItem>
      </List>
    );
  }
}

export default withPaths(CodeDashboard);
