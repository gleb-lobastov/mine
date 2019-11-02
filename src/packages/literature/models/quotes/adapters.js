export const toClient = ({
  quote: rawQuote,
  author: rawAuthor,
  work: rawWork,
  id: rawQuoteId,
}) => ({
  content: rawQuote.replace(/\\n/g, '\n'),
  header: `${rawAuthor}, "${rawWork}"`,
  id: rawQuoteId,
});

export const toServer = () => undefined;
