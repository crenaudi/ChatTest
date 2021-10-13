import React, { useCallback, useRef, useMemo, useState, useEffect } from "react"
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention'
import { Entry } from "./partials/mentions";
import { mentions } from "../../constants/mentions";
import { reduceRenderEdit } from '../../utils/reduceRenderEdit';
import { toolBarCustom } from "./partials/toolBarCustom";

import './EditableText.style.scss'

const EditableText = ({ sendClick }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [mentionState, setMentionState] = useState([])
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

  const onSearchChange = useCallback(({ value }) => setSuggestions(defaultSuggestionsFilter(value, mentions)), [setSuggestions])

  const onSendClick = useCallback(() => {
    setReset(true)
    sendClick({ editorState })
  }, [setReset, reduceRenderEdit, sendClick, editorState])

  const onAddMention = useCallback((value) => {
    if (mentionState.length > 0 && mentionState.map(item => item.name).filter((name => name === value.name)).length > 0) {
      return
    }
    setMentionState([...mentionState, value])
  }, [setMentionState, mentionState])

  const edit = useCallback((value) => {
    setEditorState(value)
  }, [setEditorState])

  useEffect(() => {
      if (reset) {
        const resetEditor = EditorState.createEmpty()
        setEditorState(resetEditor)
        setMentionState([])
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
          onAddMention={onAddMention}
          popoverContainer={({ children }) => <div className="mentionContainer">{children}</div>}
        />
        <Toolbar>
          {(externalProps) => toolBarCustom(externalProps)}
        </Toolbar>
      </div>
      <button className="send" onClick={onSendClick}>
        send
      </button>
    </div>
  )
}

export default React.memo(EditableText)