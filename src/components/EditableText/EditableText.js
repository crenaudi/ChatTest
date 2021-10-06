import React, { useCallback, useRef, useMemo, useState } from "react"
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin, {
  Separator,
} from '@draft-js-plugins/static-toolbar';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton
} from '@draft-js-plugins/buttons';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention'
import mentions from "./partials/mentions";

import './EditableText.style.scss'

const HeadlinesPicker = (props) => {
  //componentDidMount() {
  //  setTimeout(() => {
  //    window.addEventListener('click', this.onWindowClick);
  //  });
  //}
//
  //componentWillUnmount() {
  //  window.removeEventListener('click', this.onWindowClick);
  //}

  //onWindowClick = () =>
  //  // Call `onOverrideContent` again with `undefined`
  //  // so the toolbar can show its regular content again.
  //  props.onOverrideContent(undefined);

    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => (
          // eslint-disable-next-line
          <Button key={i} { ...props } />
        ))}
      </div>
    )
}

const HeadlinesButton = (props) => {
  const onClick = () => props.onOverrideContent(HeadlinesPicker);

  return (
    <div className=''>
    </div>
  )
}

const EditableText = () => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const editor = useRef(null);
  const focusEditor = useCallback(() => editor.current.focus(), [editor])

  // Mention
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback(() => setOpen(!open), [open, setOpen])
  const [suggestions, setSuggestions] = useState(mentions);
  
  const { Toolbar, toolbarPlugin } = useMemo(() => {
    const toolbarPlugin = createToolbarPlugin();
    const { Toolbar } = toolbarPlugin

    return { toolbarPlugin, Toolbar }
  }, [])

  const { MentionSuggestions, mentionPlugin } = useMemo(() => {
    const mentionPlugin = createMentionPlugin()
    const { MentionSuggestions } = mentionPlugin
    //const plugins = [mentionPlugin]

    return { MentionSuggestions, mentionPlugin }
  }, [])
 
  const onSearchChange = ({ value }) => setSuggestions(defaultSuggestionsFilter(value, mentions))

  return (
    <div className="editTextContent" onClick={focusEditor}>
      <div className="editor">
        <Editor
          className='re'
          ref={editor}
          editorState={editorState}
          onChange={editorState => setEditorState(editorState)}
          plugins={[mentionPlugin, toolbarPlugin]}
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
        />
        <Toolbar>
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => {
                return (
                <div>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <Separator {...externalProps} />
                  <HeadlinesButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                </div>
              )}
            }
          </Toolbar>
      </div> 
      <button>
        Send
      </button>
    </div>
  )
}

export default React.memo(EditableText)