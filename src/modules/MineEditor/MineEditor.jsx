import React, { useCallback } from 'react';
import { Editor, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

export { default as useEditorState } from './useEditorState';
export { default as RenderContent } from './RenderContent';
export { default as exportContentFromState } from './exportContentFromState';
export { default as createStateFromContent } from './createStateFromContent';

export default function MineEditor({ editorState, setEditorState }) {
  const handleChange = useCallback(nextState => {
    setEditorState(nextState);
  });

  const handleKeyCommand = useCallback(
    (command, nextState) => {
      const newState = RichUtils.handleKeyCommand(nextState, command);

      if (newState) {
        handleChange(newState);
        return 'handled';
      }

      return 'not-handled';
    },
    [handleChange],
  );

  return (
    <Editor
      editorState={editorState}
      onChange={handleChange}
      handleKeyCommand={handleKeyCommand}
    />
  );
}
