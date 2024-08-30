import { HandPalm, Play } from "@phosphor-icons/react"

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles"
import { createContext, useState } from "react"
// import { NewCycleForm } from "./components/NewCycleForm"
import { Countdown } from "./components/Countdown"

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextProps {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  clearActiveCycleId: () => void
}

export const CyclesContext = createContext({} as CyclesContextProps)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function clearActiveCycleId() {
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  // function handleCreateNewCycle(data: newCycleFormData) {
  //   setAmountSecondsPassed(0)
  //   const id = String(new Date().getTime()) //Apenas para criar um id sem instalar nenhuma lib.

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)

  //   reset()
  // }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
    setActiveCycleId(null)
  }

  // const task = watch("task")
  // const isSubmitDisabled = !task

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        clearActiveCycleId,
      }}
    >
      <HomeContainer>
        <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/>
          {/* <NewCycleForm /> */}
          <Countdown />

          {activeCycle ? (
            <StopCountDownButton type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24} />
              Interromper
            </StopCountDownButton>
          ) : (
            <StartCountDownButton type="submit" /*disabled={isSubmitDisabled}*/>
              <Play size={24} />
              Começar
            </StartCountDownButton>
          )}
        </form>
      </HomeContainer>
    </CyclesContext.Provider>
  )
}
