import { useState } from 'react';
import createStateFromContent from './createStateFromContent';

export default function useEditorState(initialContent) {
  const [editorState, setEditorState] = useState(() =>
    createStateFromContent(initialContent),
  );

  return { editorState, setEditorState };
}
