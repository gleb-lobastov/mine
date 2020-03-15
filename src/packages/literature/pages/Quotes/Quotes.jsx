import React from 'react';
import { useSelector } from 'react-redux';
import { useProvision, selectDict } from 'core/connection';
import Posts from 'literature/pages/Blog/blocks/Posts';

export default function Quotes() {
  const { provision = {} } = useProvision({
    domain: 'literature.quotesPage',
    isProvision: true,
    modelName: 'quotes',
    query: { navigation: { isDisabled: true } },
  });
  const { data: quotesIds = [] } = provision;
  const articlesDict = useSelector(state => selectDict(state, 'articles'));
  const quotesList = quotesIds.map(articlesId => articlesId[articlesDict]);
  return <Posts source={quotesList} />;
}
