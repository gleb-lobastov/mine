import React, { useMemo } from 'react';
import { stateToHTML } from 'draft-js-export-html';

export default function RenderContent({ data: rawContent }) {
  const html = useMemo(() => stateToHTML(rawContent), [rawContent]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
