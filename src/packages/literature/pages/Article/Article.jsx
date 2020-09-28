import React from 'react';
import { convertFromRaw } from 'draft-js';
import Typography from '@material-ui/core/Typography';
import { usePaths } from 'modules/packages';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';
import { useAuthContext } from 'core/context/AuthContext';
import { useArticle } from '../../dataSource/articles';
import { RenderContent } from 'modules/MineEditor';

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
  const isEditable = isAuthenticated && authenticatedUserId === userId;
  if ((!isEditable && isDraft) || !body) {
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
      <RenderContent data={convertFromRaw(body)} />
    </>
  );
}
