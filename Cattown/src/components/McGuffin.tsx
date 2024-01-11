import { useState } from "react";
import { McGuffinContainer, McGuffinImg } from "./styled/LibraryStyle";
import { HeaderSmall } from "./styled/Text";
import placeholder from "/assets/skull_of_human.webp";

interface IMcGuffionProps {
  mcguffin: number;
}
export const McGuffin = ({ mcguffin }: IMcGuffionProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const handleLoading = () => {
    setImgLoaded(true);
  };

  return (
    <McGuffinContainer key={mcguffin} className={imgLoaded ? "loaded" : ""}>
      <HeaderSmall>McGuffin {mcguffin}</HeaderSmall>
      <McGuffinImg
        src={mcguffin ? `/assets/mcguffin_${mcguffin}.webp` : placeholder}
        alt="Image of an McGuffin"
        onLoad={handleLoading}
      />
    </McGuffinContainer>
  );
};
