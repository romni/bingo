"use client"

import React, {useState} from "react";
import {styled} from "styled-components";
import {rockSalt} from "web/fonts/googlefonts";
import DesignControls from "./DesignControls";


const CardWrapper = styled.div.attrs<{ $fontColor: string }>
(props => ({
  style: {
    color: props.$fontColor
  }}))`
    display: flex;
    flex-direction: column;
    align-items: center;

`

const CardHeader = styled.div`
    position: relative;
    width: 600px;
    display: flex;
    justify-content: center;

    h1 {
        font-size: 40px;
        color: black;
    }

    div {
        position: absolute;
        bottom: -80px;
        z-index: -1;

        img {
            opacity: 0.3;
        }
    }
`

const GameCard = styled.ul.attrs<{ $backgroundColor: string, $borderColor: string }>
(props => ({
  style: {
    borderColor: props.$borderColor,
    background: props.$backgroundColor
  }
}))`
    width: 400px;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    border: 1px solid;
`

const GameCardRow = styled.li.attrs<{ $borderColor: string }>
(props => ({
  style: {
    borderColor: props.$borderColor,
  }
}))`
    display: grid;
    grid-template-columns: repeat(5, 80px);
    border-bottom: 1px solid ${props => props.$borderColor};

    &:last-child, div:last-child {
        border: none;
    }
`

const GameCardItem = styled.div.attrs<{ $borderColor: string }>
(props => ({
  style: {
    borderColor: props.$borderColor,
  }
}))`
    display: flex;
    height: 80px;
    width: 80px;
    align-items: center;
    justify-content: center;
    border-right: 1px solid ${props => props.$borderColor};
`

type CardProps = {
  gameCard: number[][]
} & React.ComponentPropsWithoutRef<'div'>

const Card: React.FC<CardProps> = ({gameCard, ...props}) => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [fontColor, setFontColor] = useState('#000000')
  const [borderColor, setBorderColor] = useState('#000000')

  return <>
    <CardWrapper $fontColor={fontColor} {...props}>
      <CardHeader>
        <h1 className={rockSalt.className}>Goommunity Bingo</h1>
        <div>
          <img src="/goombingo/cloud.png" alt=""/>
        </div>
      </CardHeader>
      <GameCard $backgroundColor={backgroundColor} $borderColor={borderColor}>
        {
          gameCard.map((row, index) =>
            <GameCardRow $borderColor={borderColor} key={index + 'row'}>
              {
                row.map((item) =>
                  <GameCardItem $borderColor={borderColor} key={item + 'item'}>{item}</GameCardItem>)
              }
            </GameCardRow>
          )
        }
      </GameCard>

    </CardWrapper>
    <DesignControls
      backgroundColor={backgroundColor}
      backgroundColorHandler={(color) => setBackgroundColor(color)}
      borderColor={borderColor}
      borderColorHandler={(color) => setBorderColor(color)}
      fontColor={fontColor}
      fontColorHandler={(color) => setFontColor(color)}
    />
  </>
}

export default Card
