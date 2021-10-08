import { EditorState, Modifier, RichUtils } from 'draft-js';

const removeSelectedBlocksStyle = (editorState)  => {
  const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
  if (newContentState) {
      return EditorState.push(editorState, newContentState, 'change-block-type');
  }
  return editorState;
}

export const getResetEditorState = (editorState) => {
  const blocks = editorState
      .getCurrentContent()
      .getBlockMap()
      .toList();
  const updatedSelection = editorState.getSelection().merge({
      anchorKey: blocks.first().get('key'),
      anchorOffset: 0,
      focusKey: blocks.last().get('key'),
      focusOffset: blocks.last().getLength(),
  });
  const newContentState = Modifier.removeRange(
      editorState.getCurrentContent(),
      updatedSelection,
      'forward'
  );

  const newState = EditorState.push(editorState, newContentState, 'remove-range');
  return removeSelectedBlocksStyle(newState)
}