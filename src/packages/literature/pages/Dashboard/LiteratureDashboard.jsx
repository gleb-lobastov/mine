import React from 'react';
import Markdown from 'modules/components/Markdown';
import { withPaths } from 'core/context/AppContext';

export default withPaths(({ namedPaths }) => (
  <Markdown
    source={`
Развлекаюсь написанием [рецензий](${namedPaths.literature.books.toUrl()})
на прочитанные книги при помощи [твиттера](http://twitter.com/lobastov).
Что-то побольше могу оформить [статьей](${namedPaths.literature.articles.toUrl()}),
что-то поменьше отправить в [блог](${namedPaths.literature.blog.toUrl()})
  `}
  />
));
