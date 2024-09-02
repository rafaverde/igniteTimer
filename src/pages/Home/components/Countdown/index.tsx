import { useContext, useEffect } from "react"
import { differenceInSeconds } from "date-fns"
import { CyclesContext } from "../../../../contexts/CycleContext"

import { CountdownContainer, Separator } from "./styles"

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    defineAmountSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()

          defineAmountSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          defineAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    defineAmountSecondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutesOnScreen = String(minutesAmount).padStart(2, "0")
  const secondsOnScreen = String(secondsAmount).padStart(2, "0")

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesOnScreen}:${secondsOnScreen} - Ignite Timer`
    } else {
      document.title = "Ignite Timer"
    }
  }, [minutesOnScreen, secondsOnScreen, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutesOnScreen[0]}</span>
      <span>{minutesOnScreen[1]}</span>
      <Separator>:</Separator>
      <span>{secondsOnScreen[0]}</span>
      <span>{secondsOnScreen[1]}</span>
    </CountdownContainer>
  )
}
