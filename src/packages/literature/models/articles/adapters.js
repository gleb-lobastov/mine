export const toClient = ({
  id: rawArticleId,
  slug: rawSlug,
  title: rawTitle,
  is_draft: rawIsDraft,
  body: rawBody,
}) => ({
  id: rawArticleId,
  slug: rawSlug,
  title: rawTitle,
  isDraft: rawIsDraft,
  body: rawBody,
});

export const toServer = ({
  id: rawArticleId,
  slug: rawSlug,
  body: rawBody,
  isDraft: rawIsDraft,
  title: rawTitle,
}) => ({
  id: rawArticleId,
  slug: rawSlug,
  title: rawTitle,
  is_draft: rawIsDraft,
  body: rawBody,
});
