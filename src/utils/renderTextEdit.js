import { convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';

function renderText(editorState) {
  const rawContentState = convertToRaw(editorState.getCurrentContent());

  const hashtagConfig = {}
  const directional = {}
  const customEntityTransform = {}
  const markup = draftToHtml(
    rawContentState,
    hashtagConfig,
    directional,
    customEntityTransform
  );

  // not secure if content important
  return <div dangerouslySetInnerHTML={{ __html: markup }} />
}


export function renderTextEdit(editorState) {
  return (
    <div className="bubble">
      {editorState && renderText(editorState)}
    </div>
  )
}