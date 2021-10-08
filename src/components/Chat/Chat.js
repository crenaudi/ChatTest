import React, { useCallback, useEffect, useState } from "react"
import EditableText from "../EditableText/EditableText"

import "./chat.style.scss"

const Chat = () => {
  const [renderText, setRenderText] = useState('...')
  const onClick = useCallback((value) => {
    setRenderText(value)
  }, [setRenderText])

  useEffect(() => {console.log('render', renderText)}, [renderText])

  return (
    <div className="chatContainer">
      <div className="contain">
        {"Hello world ! "}
        <div className="bubble">
          <span>{renderText}</span>
        </div>
        {/*renderText.map((item, index) => {
          return (
            <div className="bubble" key={index}>
              <span>{item}</span>
            </div>
          )
        })*/}
      </div>
      <EditableText sendClick={onClick} />
    </div>
  )
}

export default React.memo(Chat)