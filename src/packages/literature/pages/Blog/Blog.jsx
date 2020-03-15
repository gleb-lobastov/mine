import React from 'react';
import { useSelector } from 'react-redux';
import { useProvision, selectDict } from 'core/connection';
import Posts from './blocks/Posts';

export default function Blog() {
  const { provision = {} } = useProvision({
    domain: 'literature.blogPosts',
    isProvision: true,
    modelName: 'articles',
    query: { navigation: { isDisabled: true } },
  });
  const { data: articlesIds = [] } = provision;
  const articlesDict = useSelector(state => selectDict(state, 'articles'));
  const articlesList = articlesIds.map(articlesId => articlesId[articlesDict]);
  return <Posts source={articlesList} />;
}
