import React, { useCallback, useRef, useMemo, useState, useEffect } from "react"
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton
} from '@draft-js-plugins/buttons';
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention'
import { mentions, Entry } from "./partials/mentions";
import ThreeDCube from '../3DCube/3DCube';
import { convertToRaw } from "draft-js";
import { getResetEditorState } from "../../utils/getResetEditorState";

import './EditableText.style.scss'

const HeadlinesButton = (props) => {
  return (
    <></>
  )
}

const EditableText = ({ sendClick }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [reset, setReset] = useState(false)
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

    return { MentionSuggestions, mentionPlugin }
  }, [])
 
  const onSearchChange = ({ value }) => setSuggestions(defaultSuggestionsFilter(value, mentions))

  const onSendClick = () => {
    setReset(true)
    sendClick(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  }

  const edit = value => {
    setEditorState(value)
  }

  useEffect(() => {
      if (reset) {
        const test = getResetEditorState(editorState)
        setEditorState(test)
        setReset(false)
      }
    }, [reset])

  return (
    <div className="editTextContent" onClick={focusEditor}>
      <div className="editor">
        <Editor
          className='re'
          ref={editor}
          editorState={editorState}
          onChange={edit}
          plugins={[mentionPlugin, toolbarPlugin]}
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          entryComponent={Entry}
          onAddMention={(value) => console.log(value)}
          popoverContainer={({ children }) => <div className="mentionContainer">{children}</div>}
        />
        <Toolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => {
              return (
              <div>
                <div className="ul">
                  <BoldButton {...externalProps} />
                  <ThreeDCube />
                </div>
                <div className="ul">
                  <ItalicButton {...externalProps} />
                  <ThreeDCube />
                </div>
                <div className="ul">
                  <UnderlineButton {...externalProps} />
                  <ThreeDCube />
                </div>
                <div className="ul">
                  <CodeButton {...externalProps} />
                  <ThreeDCube />
                </div>
                <Separator {...externalProps} />
                <HeadlinesButton {...externalProps} />
                <div className="ul">
                  <UnorderedListButton {...externalProps} />
                  <ThreeDCube />
                </div>
              </div>
            )}
          }
        </Toolbar>
      </div>
      <button className="send" onClick={onSendClick}>
        send
      </button>
    </div>
  )
}

export default React.memo(EditableText)