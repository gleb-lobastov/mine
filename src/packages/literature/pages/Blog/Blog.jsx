import React from 'react';
import { useSelector } from 'react-redux';
import { useProvision, selectDict } from 'core/connection';
import { selectResult } from 'core/connection/request/controllerRedux';
import Posts from './blocks/Posts';

export default function Blog() {
  const provision = useProvision({
    domain: 'literature.blogPosts',
    isProvision: true,
    modelName: 'posts',
    query: { navigation: { isDisabled: true } },
  });
  const { data: postsIds = [] } = selectResult(provision) || {};
  const postsDict = useSelector(state => selectDict(state, 'posts'));
  const postsList = postsIds.map(postId => postsDict[postId]).filter(Boolean);
  // console.log({ postsDict, postsIds, postsList });
  return <Posts source={postsList} />;
}
