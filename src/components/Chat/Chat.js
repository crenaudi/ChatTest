import React, { useCallback, useEffect, useState } from "react"
import EditableText from "../EditableText/EditableText"
import { renderTextEdit } from "../../utils/renderTextEdit"

import "./chat.style.scss"

const Chat = () => {
  const [renderText, setRenderText] = useState({})
  const onClick = useCallback((value) => {
    setRenderText(value)
  }, [setRenderText])

  useEffect(() => {console.log('render', renderText)}, [renderText])

  return (
    <div className="chatContainer">
      <div className="contain">
        {"Hello world ! "}
        {renderTextEdit(renderText.editorState)}
      </div>
      <EditableText sendClick={onClick} />
    </div>
  )
}

export default React.memo(Chat)