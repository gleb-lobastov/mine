import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Contacts({ isCVMode }) {
  return (
    <List>
      <ListItem
        button={true}
        component="a"
        target="_blank"
        rel="nofollow noreferrer noopener"
        href="https://github.com/gleb-lobastov"
      >
        <ListItemText primary="Гитхаб" />
      </ListItem>
      <ListItem
        button={true}
        component="a"
        target="_blank"
        rel="nofollow noreferrer noopener"
        href="https://www.linkedin.com/in/glebin"
      >
        <ListItemText primary="Linkedin" />
      </ListItem>
      <ListItem
        button={true}
        component="a"
        target="_blank"
        rel="nofollow noreferrer noopener"
        href="https://t.me/gleb_lobastov"
      >
        <ListItemText primary="Telegram" />
      </ListItem>
      {isCVMode && (
        <ListItem button={true} component="a" href="/mine">
          <ListItemText primary="Home page" />
        </ListItem>
      )}
    </List>
  );
}
