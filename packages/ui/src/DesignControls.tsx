"use client"

import React, {useState} from "react";
import {HexColorPicker} from "react-colorful";
import {styled} from "styled-components";

const ColorControlWrapper = styled.div`
    h2 {
        font-size: 16px;
        margin: 32px 0 8px 0;
    }
`

type DesignControlsProps = {
  backgroundColor: string
  backgroundColorHandler: (color: string) => void
  fontColor: string
  fontColorHandler: (color: string) => void
  borderColor: string
  borderColorHandler: (color: string) => void

} & React.ComponentPropsWithoutRef<'div'>

const DesignControls: React.FC<DesignControlsProps> = (
  {
    backgroundColor,
    backgroundColorHandler,
    borderColor,
    borderColorHandler,
    fontColor,
    fontColorHandler,
    ...props
  }) => {

  return <ColorControlWrapper {...props}>
    <div>
      <h2>Change background color</h2>
      <HexColorPicker
        color={backgroundColor}
        onChange={backgroundColorHandler}
      />
    </div>
    <div>
      <h2>Change border color</h2>
      <HexColorPicker
        color={borderColor}
        onChange={(event) => borderColorHandler(event)}
      />
    </div>
    <div>
      <h2>Change font color</h2>
      <HexColorPicker
        color={fontColor}
        onChange={(event) => fontColorHandler(event)}
      />
    </div>
  </ColorControlWrapper>
}

export default DesignControls
