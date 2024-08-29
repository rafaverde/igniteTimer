import styled from "styled-components"

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  color: ${({ theme }) => theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: 700;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme["gray-500"]};
  font-weight: 700;
  font-size: inherit;
  color: ${({ theme }) => theme["gray-100"]};

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme["green-500"]};
  }

  &::placeholder {
    color: ${({ theme }) => theme["gray-500"]};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`
export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const CountdownContainer = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme["gray-100"]};

  display: flex;
  gap: 1rem;

  span {
    background: ${({ theme }) => theme["gray-700"]};
    padding: 2rem 1rem;
    border-radius: 10px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme["green-500"]};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  animation: blink 1000ms ease forwards infinite;

  @keyframes blink {
    0% {
      color: ${({ theme }) => theme["green-500"]};
    }
    100% {
      color: ${({ theme }) => theme["green-300"]};
    }
  }
`

export const BaseCountDownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  cursor: pointer;
  border-radius: 10px;
  color: ${({ theme }) => theme["gray-100"]};

  font-weight: 700;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const StartCountDownButton = styled(BaseCountDownButton)`
  background-color: ${({ theme }) => theme["green-500"]};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme["green-700"]};
  }
`

export const StopCountDownButton = styled(BaseCountDownButton)`
  background-color: ${({ theme }) => theme["red-500"]};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme["red-700"]};
  }
`
