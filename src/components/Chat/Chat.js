import React, { useCallback, useState } from "react"
import EditableText from "../EditableText/EditableText"

import "./chat.style.scss"

const Chat = () => {
  const [renderText, setRenderText] = useState('')
  const onClick = useCallback((value) => {
    setRenderText(value)
  }, [setRenderText])

  return (
    <div className="chatContainer">
      <div className="contain">
        Hello world !
        {renderText}
      </div>
      <EditableText sendClick={onClick} />
    </div>
  )
}

export default React.memo(Chat)