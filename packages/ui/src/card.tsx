"use client"

import React, {useRef, useState} from "react";
import {styled} from "styled-components";
import {caveat, indieFlower, rockSalt} from "web/fonts/googlefonts";
import DesignControls from "./DesignControls";
import html2canvas from "html2canvas";
import Button from "./button";
import {Option, Select, Slider} from "@mui/joy";


const CardWrapper = styled.div.attrs<{ $fontColor: string }>
(props => ({
    style: {
        color: props.$fontColor
    }
}))`
    min-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
`

const CardHeader = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`

const CardHeaderText = styled.h1.attrs<{ $headerColor: string, $fontSize: number }>
(props => ({
    style: {
        color: props.$headerColor,
        fontSize: `${props.$fontSize.toString()}px`
    }
}))`
    white-space: nowrap;
`

const GameCard = styled.ul.attrs<{ $backgroundColor: string, $borderColor: string }>
(props => ({
    style: {
        borderColor: props.$borderColor,
        backgroundColor: props.$backgroundColor
    }
}))`
    width: 400px;
    font-size: 16px;
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
    grid-template-columns: repeat(4, 100px);
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
    height: 100px;
    width: 100px;
    align-items: center;
    text-align: center;
    justify-content: center;
    border-right: 1px solid ${props => props.$borderColor};
`
const ControlWrapper = styled.div`
    display: flex;
    gap: 64px;
    align-items: flex-end;
    flex-wrap: wrap;

    @media screen and (max-width: 600px) {
        justify-content: center;
        gap: 16px;
    }
    & > div:first-of-type {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }
    & > div:first-of-type > span:nth-child(3){
        display: block;
        margin-top: 16px;
    }
`

type CardProps = {
    gameCard: string[][]
} & React.ComponentPropsWithoutRef<'div'>

const Card: React.FC<CardProps> = ({gameCard, ...props}) => {
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const [fontColor, setFontColor] = useState('#000000')
    const [headerColor, setHeaderColor] = useState('#000000')
    const [borderColor, setBorderColor] = useState('#000000')
    const [screenshotDataUrl, setScreenshotDataUrl] = useState<string | null>(null)
    const [headerFont, setHeaderFont] = useState<string>(rockSalt.className)
    const [headerSize, setHeaderSize] = useState(40)
    const divRef = useRef<HTMLDivElement>(null)

    const takeScreenshot = () => {
        if (divRef.current) {
            html2canvas(divRef.current).then(canvas =>
                setScreenshotDataUrl(canvas.toDataURL('image/png')))
        }
    }
    return <>
        <CardWrapper $fontColor={fontColor} {...props} ref={divRef}>
            <CardHeader>
                <CardHeaderText
                    $headerColor={headerColor}
                    $fontSize={headerSize}
                    className={headerFont}
                >
                    Bingo
                </CardHeaderText>
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
        <ControlWrapper>
            <div>
                <span>Select header font</span>
                <Select
                    defaultValue={rockSalt.className}
                    onChange={((_, value: string | null) => setHeaderFont(value ?? ''))}
                >
                    <Option value={rockSalt.className}>Rock salt</Option>
                    <Option value={caveat.className}>Caveat</Option>
                    <Option value={indieFlower.className}>Indie flower</Option>
                </Select>
                <span>Change font size</span>
                <Slider
                    defaultValue={40}
                    max={80}
                    min={20}
                    onChange={(event, value) => setHeaderSize((Array.isArray(value) ? value[0] : value) ?? 40)}
                />
                <Button onClick={takeScreenshot}>Take screenshot</Button>
                {
                    screenshotDataUrl && <a href={screenshotDataUrl} download="screenshot.png">
                        <Button>Download screenshot</Button>
                    </a>
                }
            </div>
            <DesignControls
                backgroundColor={backgroundColor}
                backgroundColorHandler={(color) => setBackgroundColor(color)}
                borderColor={borderColor}
                borderColorHandler={(color) => setBorderColor(color)}
                fontColor={fontColor}
                fontColorHandler={(color) => setFontColor(color)}
                headerColor={headerColor}
                headerColorHandler={(color) => setHeaderColor(color)}
            />

        </ControlWrapper>
    </>
}

export default Card
