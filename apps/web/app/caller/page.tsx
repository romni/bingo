"use client"
import React, {useRef, useState} from "react";
import styles from "./page.module.css";
import {rockSalt} from "web/fonts/googlefonts";
import Button from "@repo/ui/button";
import * as values from '../../values.json'

const selectRandomItem = (gameArray: any[]) => Math.floor((Math.random() * gameArray.length))

const getWinningNumber = (gameArray: string[]): { winningNumber: string, newGameArray: string[] } => {
  const selectedIndex = selectRandomItem(gameArray)

  return {
    winningNumber: gameArray[selectedIndex] ?? "",
    newGameArray: gameArray.filter((_, index) => index !== selectedIndex)
  }
}

const Page: React.FC = () => {
  const gameArray: string[] = values.data
  const [remainingItems, setRemainingItems] = useState(gameArray)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const rollInterval = useRef<NodeJS.Timeout | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState<string>()

  const handleRoll = () => {
    if (!isRolling) {
      setIsRolling(true)
      const {winningNumber, newGameArray} = getWinningNumber(remainingItems)

      rollInterval.current = setInterval(() => {
        const randomIndex = selectRandomItem(remainingItems)
        setSelectedItem(remainingItems[randomIndex] ?? "")
      }, 200)

      setTimeout(() => {
        if (rollInterval.current) {
          clearInterval(rollInterval.current);
          rollInterval.current = null;
        }
        setSelectedItem(null)
        setRemainingItems(newGameArray)
        setSelectedNumber(winningNumber)
        setIsRolling(false)
      }, 5000);
    }
  }

  return <main className={styles.main}>
    <h1 className={rockSalt.className}>Bingo</h1>
    <div className={styles.callerWrapper}>
      <div className={styles.resultWrapper}>
        <h2>
          {selectedNumber !== undefined && selectedNumber}
          {/*{selectedNumber === 69 && ' Nice!'}*/}
        </h2>
        <Button
          disabled={isRolling}
          onClick={handleRoll}
        >
          Roll
        </Button>
      </div>
      <div className={styles.boardWrapper}>
        {
          gameArray.map(item =>
            <div
              key={item}
              onClick={() => {
                if (!isRolling) {
                  if (remainingItems.includes(item)) {
                    setRemainingItems(remainingItems.filter(number => item !== number))
                  } else {
                    setRemainingItems([...remainingItems, item])
                  }
                }
              }}
              className={`
            ${styles.boardItem} 
            ${!remainingItems.includes(item) ? styles.selectedItem : ''} 
            ${item === selectedItem ? styles.rolledItem : ''}`}
            >
              {item}
            </div>)
        }
      </div>
    </div>
  </main>
}

export default Page
