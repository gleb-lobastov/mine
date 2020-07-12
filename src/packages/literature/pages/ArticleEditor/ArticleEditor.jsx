import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePaths } from 'modules/packages';
import { useArticle, useSubmitArticle } from '../../dataSource/articles';
import ArticleEditorForm from './blocks/ArticleEditorForm';

const domain = 'ArticleEditor';

export default function ArticleEditor({
  match: {
    params: { slug },
  },
}) {
  const history = useHistory();
  const { literature: literaturePaths, code: codePaths } = usePaths();
  const selfPaths = literaturePaths || codePaths;
  const { article } = useArticle({ slug, domain });
  const { submitArticle, isSubmitting } = useSubmitArticle({ domain });

  if (slug && !article) {
    return null;
  }

  const isCreation = !article;
  return (
    <ArticleEditorForm
      initialArticle={article}
      isSubmitting={isSubmitting}
      onSubmit={async data => {
        await submitArticle({
          query: {
            id: article?.id,
            body: { ...article, ...data },
          },
        });
        if (isCreation) {
          history.push(selfPaths.articles.toUrl({ slug: data?.slug }));
        }
      }}
    />
  );
}
