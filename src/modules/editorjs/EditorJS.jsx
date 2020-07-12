import React, { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';

export default function Editor({ value, onChange }) {
  useEffect(() => {
    const editor = new EditorJS({
      data: value,
      holder: 'editor-js',
      onChange: () => {
        editor.save().then(nextData => onChange(nextData));
      },
    });
    return () => {
      editor.isReady.then(() => editor.destroy());
    };
  }, []);
  return <div id="editor-js" />;
}
