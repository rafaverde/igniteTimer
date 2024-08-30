import styled from "styled-components"

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
