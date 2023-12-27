import { styled } from "styled-components";

interface IProgressBar {
  progress: number;
}

export const ProgressBarContainer = styled.div`
  width: 8rem;
  height: 1rem;
  position: relative;

  background: lightgrey;
  border: 1px solid black;
`;

export const ProgressBarFill = styled(ProgressBarContainer)<IProgressBar>`
  width: ${({ progress }) => (progress ? `${progress}%` : "0%")};
  background-color: blue;
  box-sizing: content-box;
  border: none;
`;

export const ProgressBarNextLevel = styled.p`
  position: absolute;
  top: -1.2rem;
  right: 0;
`;
