export const toClient = ({
  content: rawContent,
  created_at: rawDate,
  header: rawHeader,
  id: rawArticleId,
}) => ({
  content: rawContent.replace(/\\n/g, '\n'),
  date: rawDate,
  header: rawHeader,
  id: rawArticleId,
});

export const toServer = () => undefined;
