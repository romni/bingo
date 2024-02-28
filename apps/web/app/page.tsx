"use client"

import styles from "./page.module.css";
import React from "react";
import Card from "@repo/ui/card";

const shuffleArray = (array: number[]) => {
  return array.map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value)
}

const Page: React.FC = () => {
  const gameArray = Array.from({length: 99}, (_, i) => i + 1)
  const randomArray = shuffleArray(gameArray)
  const gameCard = randomArray.slice(0, 25)

  const gameCardByChunk = gameCard.reduce((accumulator: number[][], value: number, index: number) => {
    const chunkIndex = Math.floor(index / 5)

    if (!accumulator[chunkIndex]) {
      accumulator[chunkIndex] = []
    }

    accumulator[chunkIndex]?.push(value)

    return accumulator
  }, [])


  return (
    <main className={styles.main}>
      <Card gameCard={gameCardByChunk}/>
    </main>
  );
}

export default Page
