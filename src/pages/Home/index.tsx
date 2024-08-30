import { FormProvider, useForm } from "react-hook-form"
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { HandPalm, Play } from "@phosphor-icons/react"

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles"

import { Countdown } from "./components/Countdown"
import { NewCycleForm } from "./components/NewCycleForm"
import { useContext } from "react"
import { CyclesContext } from "../../contexts/CycleContext"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe o nome da tarefa!"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo deve ter no mínimo 5 minutos")
    .max(60, "O ciclo deve ter no máximo 60 minutos"),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)
  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  })

  const { watch, handleSubmit /*reset*/ } = newCycleForm

  const task = watch("task")
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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
  )
}
