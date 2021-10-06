import React, { useCallback, useRef, useMemo, useState } from "react"
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention'
import mentions from "./partials/mentions";

import './EditableText.style.scss'
//import Toolbar from "@draft-js-plugins/static-toolbar/lib/components/Toolbar";

const EditableText = () => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const editor = useRef(null);
  const focusEditor = useCallback(() => editor.current.focus(), [editor])

  // Mention
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback(() => setOpen(!open), [open, setOpen])
  const [suggestions, setSuggestions] = useState(mentions);
  const { MentionSuggestions, Toolbar, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin()
    const toolbarPlugin = createToolbarPlugin();
    const { MentionSuggestions } = mentionPlugin
    const { Toolbar } = toolbarPlugin
    const plugins = [mentionPlugin, toolbarPlugin]

    return { plugins, MentionSuggestions, Toolbar }
  }, [])
 
  const onSearchChange = ({ value }) => setSuggestions(defaultSuggestionsFilter(value, mentions))
  console.log('mention', mentions)

  return (
    <div className="editTextContent" onClick={focusEditor}>
      <div className="editor">
        <Editor
          className='re'
          ref={editor}
          editorState={editorState}
          onChange={editorState => setEditorState(editorState)}
          plugins={plugins}
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
        />
        <Toolbar className='test' />
      </div> 
      <button>
        Send
      </button>
    </div>
  )
}

export default React.memo(EditableText)