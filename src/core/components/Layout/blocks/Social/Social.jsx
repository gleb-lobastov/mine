import React, { useRef, useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
} from 'react-share';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '16px',
  },
  icon: {
    '& + &': {
      marginLeft: '8px',
    },
  },
});

const REFS = {
  travel: {
    title: 'Глеб Лобастов, путешествия',
    description: 'Статистика путешествий',
  },
  liter: {
    title: 'Глеб Лобастов',
    description: 'Персональная страница в интернете',
  },
  code: {
    title: 'Глеб Лобастов, кодинг',
    description: 'Тыж программист',
  },
};

function Social({ location }) {
  const classes = useStyles();

  const locationRef = useRef(window.location);
  useEffect(() => {
    locationRef.current = window.location;
  });

  const match = location.pathname.match(/^\/_?([a-zA-Z]*)(?:$|\/.*)/);
  const packageName = match && match[1];
  const { title, description } = REFS[packageName] || {};
  if (!title) {
    return null;
  }

  const buttonProps = {
    url: locationRef.current.href,
    className: classes.icon,
  };
  const iconProps = { size: 32, round: true };

  return (
    <div className={classes.container}>
      <FacebookShareButton {...buttonProps} quote={title}>
        <FacebookIcon {...iconProps} />
      </FacebookShareButton>
      <VKShareButton
        {...buttonProps}
        title={title}
        description={description}
        image="https://gleb-lobastov.github.io/mine/static/me.jpg"
      >
        <VKIcon {...iconProps} />
      </VKShareButton>
      <TwitterShareButton {...buttonProps} title={title}>
        <TwitterIcon {...iconProps} />
      </TwitterShareButton>
      <TelegramShareButton {...buttonProps} title={title}>
        <TelegramIcon {...iconProps} />
      </TelegramShareButton>
    </div>
  );
}

export default withRouter(Social);
