import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  date: {
    color: '#999',
    fontSize: '75%',
    fontWeight: 'normal',
    marginLeft: '4px',
  },
};

class Post extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    source: PropTypes.shape({
      date: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    const {
      classes,
      source: { date, header, content },
    } = this.props;

    return (
      <article>
        <h3>
          {header}
          {date && (
            <span className={classes.date}>
              {format(date, 'eeeeee, d MMMM yyyy', { locale: ru })}
            </span>
          )}
        </h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    );
  }
}

export default withStyles(styles)(Post);
