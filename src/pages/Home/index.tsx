import { FormProvider, useForm } from "react-hook-form"
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { HandPalm, Play } from "@phosphor-icons/react"

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles"
import { createContext, useState } from "react"

import { Countdown } from "./components/Countdown"
import { NewCycleForm } from "./components/NewCycleForm"

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
  amountSecondsPassed: number

  markCurrentCycleAsFinished: () => void
  clearActiveCycleId: () => void
  defineAmountSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextProps)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe o nome da tarefa!"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo deve ter no mínimo 5 minutos")
    .max(60, "O ciclo deve ter no máximo 60 minutos"),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  })

  const { watch, handleSubmit, reset } = newCycleForm

  function clearActiveCycleId() {
    setActiveCycleId(null)
  }

  function defineAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
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

  function handleCreateNewCycle(data: newCycleFormData) {
    setAmountSecondsPassed(0)
    const id = String(new Date().getTime()) //Apenas para criar um id sem instalar nenhuma lib.

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    reset()
  }

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

  const task = watch("task")
  const isSubmitDisabled = !task

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        defineAmountSecondsPassed,
        markCurrentCycleAsFinished,
        clearActiveCycleId,
      }}
    >
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />

          {activeCycle ? (
            <StopCountDownButton type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24} />
              Interromper
            </StopCountDownButton>
          ) : (
            <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
              <Play size={24} />
              Começar
            </StartCountDownButton>
          )}
        </form>
      </HomeContainer>
    </CyclesContext.Provider>
  )
}
