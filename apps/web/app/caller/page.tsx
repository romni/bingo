"use client"
import React, {useRef, useState} from "react";
import styles from "./page.module.css";
import {rockSalt} from "web/fonts/googlefonts";
import Button from "@repo/ui/button";

const sayings = [
  "They don't make them like they used to.",
  "In my time, we had to walk 10 miles to school in the snow.",
  "You young whippersnappers have it so easy these days.",
  "You call that music? That's just noise!",
  "Back in the day, we respected our elders.",
  "You need to get off that phone and read a book.",
  "When I was your age...",
  "You don't know how good you have it.",
  "That's not how we did things in the old days.",
  "What’s a simp? Is that a new kind of shrimp?",
  "Kids these days have no manners.",
  "Life was simpler then.",
  "WHAT THE HELL IS A GYATT?!",
  "Why do they keep saying ‘sus’ and ‘stan’? Can’t they speak proper English?",
  "WHY IS THERE A SKIBIDI IN THE TOILET?!?!",
  "What’s a pogger? Is that some kind of frog?",
  "What’s an o7?"
]

const selectRandomItem = (gameArray: any[]) => Math.floor((Math.random() * gameArray.length))

const getWinningNumber = (gameArray: number[]): { winningNumber: number, newGameArray: number[] } => {
  const selectedIndex = selectRandomItem(gameArray)

  return {
    winningNumber: gameArray[selectedIndex] ?? 0,
    newGameArray: gameArray.filter((_, index) => index !== selectedIndex)
  }
}

const Page: React.FC = () => {
  const gameArray = Array.from({length: 99}, (_, i) => i + 1)
  const [remainingItems, setRemainingItems] = useState(gameArray)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const rollInterval = useRef<NodeJS.Timeout | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState<number>()
  const [saying, setSaying] = useState<string | undefined>()

  const handleRoll = () => {
    if (!isRolling) {
      setIsRolling(true)
      const {winningNumber, newGameArray} = getWinningNumber(remainingItems)
      setSaying(sayings[selectRandomItem(sayings)])

      rollInterval.current = setInterval(() => {
        const randomIndex = selectRandomItem(remainingItems)
        setSelectedItem(remainingItems[randomIndex] ?? 0)
      }, 200)

      setTimeout(() => {
        if (rollInterval.current) {
          clearInterval(rollInterval.current);
          rollInterval.current = null;
        }
        setSelectedItem(null)
        setSaying(undefined)
        setRemainingItems(newGameArray)
        setSelectedNumber(winningNumber)
        setIsRolling(false)
      }, 5000);
    }
  }

  return <main className={styles.main}>
    <h1 className={rockSalt.className}>Goommunity Bingomi</h1>
    {
      saying !== undefined &&
      <h2 className={styles.sayings}>{saying}</h2>
    }
    {
      selectedNumber === 69 && !isRolling &&
      <h2 className={styles.sayings}>NICE!!</h2>
    }
    <div className={styles.callerWrapper}>
      <div className={styles.resultWrapper}>
        <h2>
          {selectedNumber !== undefined && selectedNumber}
          {selectedNumber === 69 && ' Nice!'}
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
