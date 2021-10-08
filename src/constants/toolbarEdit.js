import React from "react"
import { AiOutlineGif } from "react-icons/ai";

export const toolbarEdit = [
  {
    label: "bold",
    style: "BOLD",
    icon: <BoldButton {...externalProps} />
  },
  {
    label: "italic",
    style: "ITALIC",
    icon: <ItalicButton {...externalProps} />
  },
  {
    label: "underline",
    style: "unordered-list-item",
    icon: <UnderlineButton {...externalProps} />
  },
  {
    label: "code",
    style: "CODE",
    icon: <CodeButton {...externalProps} />
  },
  {
    label: "Unordered",
    style: "UNORDERED",
    icon: <UnorderedListButton {...externalProps} />
  },
  {
    label: "gif",
    style: "unstyled",
    incon: <button><AiOutlineGif /></button>,
  }
]