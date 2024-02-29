"use client"

import React from "react";
import {HexColorPicker} from "react-colorful";
import {styled} from "styled-components";

const ColorControlWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    height: 100%;

    @media screen and (max-width: 600px) {
        padding: 16px;
        height: auto;
        justify-content: center;
    }
    
    h2 {
        font-size: 12px;
        margin: 32px 0 8px 0;
    }
    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .react-colorful {
        height: 100px;
        width: 100px;
    }
`

type DesignControlsProps = {
  backgroundColor: string
  backgroundColorHandler: (color: string) => void
  fontColor: string
  fontColorHandler: (color: string) => void
  headerColor: string
  headerColorHandler: (color: string) => void
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
    headerColor,
    headerColorHandler,
    ...props
  }) => {

  return <ColorControlWrapper {...props}>
    <div>
      <h2>Background color</h2>
      <HexColorPicker
        color={backgroundColor}
        onChange={backgroundColorHandler}
      />
    </div>
    <div>
      <h2>Border color</h2>
      <HexColorPicker
        color={borderColor}
        onChange={(event) => borderColorHandler(event)}
      />
    </div>
    <div>
      <h2>Header color</h2>
      <HexColorPicker
        color={headerColor}
        onChange={(event) => headerColorHandler(event)}
      />
    </div>
    <div>
      <h2>Font color</h2>
      <HexColorPicker
        color={fontColor}
        onChange={(event) => fontColorHandler(event)}
      />
    </div>
  </ColorControlWrapper>
}

export default DesignControls
