import React from 'react';
import Typography from '@material-ui/core/Typography';
import { usePaths } from 'modules/packages';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';
import { useAuthContext } from 'core/context/AuthContext';
import { useArticle } from '../../dataSource/articles';
import Paragraph from './blocks/Paragraph';

const domain = 'ArticleEditor';

export default function Article({ slug }) {
  const { isAuthenticated, userId: authenticatedUserId } = useAuthContext();
  const { article } = useArticle({ slug, domain });
  const { literature: literaturePaths, code: codePaths } = usePaths();
  const selfPaths = literaturePaths || codePaths;
  if (slug && !article) {
    return (
      <Typography variant="body">
        Статья еще не опубликована или недоступна для чтения
      </Typography>
    );
  }
  const { body, title, userId, isDraft } = article;
  const { blocks } = body || {};
  const isEditable = isAuthenticated && authenticatedUserId === userId;
  if (!isEditable && isDraft) {
    return (
      <Typography variant="body">
        Статья еще не опубликована или недоступна для чтения
      </Typography>
    );
  }
  return (
    <>
      <Typography variant="h6">{title}</Typography>
      {isEditable && (
        <ConnectedLink to={selfPaths.editArticle.toUrl({ slug })}>
          Редактировать
        </ConnectedLink>
      )}
      {blocks.map(({ data, type }) => {
        switch (type) {
          case 'paragraph':
            return <Paragraph data={data} />;
          default:
            return null;
        }
      })}
    </>
  );
}