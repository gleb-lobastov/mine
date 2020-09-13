import React, { useMemo } from 'react';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export default function RenderContent({ data: rawContent }) {
  const html = useMemo(() => stateToHTML(convertFromRaw(rawContent)), [
    rawContent,
  ]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
