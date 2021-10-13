import React from "react"
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton
} from '@draft-js-plugins/buttons';
import ThreeDCube from '../../3DCube/3DCube';
import { AiOutlineGif } from "react-icons/ai";

import '../EditableText.style.scss'

export function toolBarCustom(externalProps) {
  return (
    <div className="customTools">
      <div className="tool">
        <BoldButton {...externalProps} />
        <ThreeDCube />
      </div>
      <div className="tool">
        <ItalicButton {...externalProps} />
        <ThreeDCube />
      </div>
      <div className="tool">
        <UnderlineButton {...externalProps} />
        <ThreeDCube />
      </div>
      <div className="tool">
        <CodeButton {...externalProps} />
        <ThreeDCube />
      </div>
      <div className="tool">
        <UnorderedListButton {...externalProps} />
        <ThreeDCube />
      </div>
      <div className="tool">
        <button>
          <AiOutlineGif />
        </button>
        <ThreeDCube />
      </div>
    </div>
  )
}