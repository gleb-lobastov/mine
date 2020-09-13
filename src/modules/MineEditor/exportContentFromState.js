import { convertToRaw } from 'draft-js';

export default function toString(draftJSState) {
  return convertToRaw(draftJSState.getCurrentContent());
}
