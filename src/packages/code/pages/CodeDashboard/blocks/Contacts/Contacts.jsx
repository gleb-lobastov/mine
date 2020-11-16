import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Contacts() {
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
    </List>
  );
}
