import React from "react"

const ThreeDCube = () => {
  return (
    <div className="cubeContainer">
      <div className="threeDCube">
        <div className="back"></div>
        <div className="right"></div>
        <div className="left"></div>
        <div className="bottom"></div>
        <div className="top"></div>
        <div className="front"></div>
      </div>
    </div>
  )
}

export default React.memo(ThreeDCube)