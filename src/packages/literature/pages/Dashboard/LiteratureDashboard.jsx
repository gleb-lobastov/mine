import React from 'react';
import Markdown from 'modules/components/Markdown';
import { usePaths } from 'modules/packages';

export default function LiteratureDashboard() {
  const {
    literature: { books: booksPath, articles: articlesPath, blog: blogPath },
  } = usePaths();

  return (
    <Markdown>
      {`
Развлекаюсь написанием [рецензий](${booksPath.toUrl()})
на прочитанные книги при помощи [твиттера](http://twitter.com/lobastov).
Что-то побольше могу оформить [статьей](${articlesPath.toUrl()}),
что-то поменьше отправить в [блог](${blogPath.toUrl()})
  `}
    </Markdown>
  );
}
