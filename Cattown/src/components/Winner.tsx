import { useState } from "react";
import { BoughtItemBackground } from "./styled/Menu";
import { WinnerImg, WinnerSubTitle, WinnerTitle } from "./styled/WinnerStyle";
import winnerBan from "/assets/game_finnished.png";

interface IWinnerProps {
  toggleShowWinner: () => void;
}

export const Winner = ({ toggleShowWinner }: IWinnerProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLoading = () => {
    setImgLoaded(true);
  };

  return (
    <BoughtItemBackground show="true" onClick={toggleShowWinner}>
      <WinnerImg
        className={imgLoaded ? "loaded" : ""}
        src={winnerBan}
        alt="Image of cats in a forest"
        onLoad={handleLoading}
      />
      <WinnerTitle>Winner!</WinnerTitle>
      <WinnerSubTitle>
        Tail's End: Triumph and Tranquility in Catland!
      </WinnerSubTitle>
    </BoughtItemBackground>
  );
};
