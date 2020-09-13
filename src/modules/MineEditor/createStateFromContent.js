import { EditorState, convertFromRaw } from 'draft-js';

export default function createStateFromContent(rawContent) {
  return rawContent
    ? EditorState.createWithContent(convertFromRaw(rawContent))
    : EditorState.createEmpty();
}
