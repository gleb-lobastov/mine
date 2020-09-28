import { useSelector } from 'react-redux';
import {
  useProvision,
  useRequest,
  selectItem,
  selectList,
} from 'core/connection';
import {
  selectResult,
  selectIsReady,
} from 'core/connection/request/controllerRedux';

export default function useArticles() {
  const articlesProvision = useProvision({
    domain: 'articles',
    isProvision: true,
    modelName: 'articles',
    observe: false,
    query: {
      navigation: { isDisabled: true },
    },
  });
  const { data: articlesIds = [] } = selectResult(articlesProvision) || {};
  const articlesList = useSelector(state =>
    selectList(state, 'articles', articlesIds),
  );
  return {
    ...articlesProvision,
    articlesList,
    isReady: selectIsReady(articlesProvision),
  };
}

export function useArticle({ slug, domain }) {
  const articlesProvision = useProvision({
    domain,
    isProvision: true,
    modelName: 'articles',
    observe: slug,
    condition: Boolean(slug),
    query: {
      id: slug,
    },
  });
  const article = useSelector(state => selectItem(state, 'articles', slug));
  return { ...articlesProvision, article };
}

export function useSubmitArticle({ domain }) {
  const [submitArticle, provision] = useRequest({
    domain,
    modelName: 'articles',
    method: 'POST',
  });

  return {
    ...provision,
    isSubmitting: ![0, 4].includes(provision.readyState),
    submitArticle,
  };
}
