import React from "react"
import EditableText from "../EditableText/EditableText"

import "./chat.style.scss"

const Chat = () => {
  return (
    <div className="chatContainer">
      <div className="contain">
        Hello world !
      </div>
      <EditableText />
    </div>
  )
}

export default React.memo(Chat)