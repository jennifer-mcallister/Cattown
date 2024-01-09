import { useNavigate } from "react-router-dom";
import { HomeNavContainer, HomeNavHeader, HomeNavImg } from "./styled/HomeNav";
import { TextMedium } from "./styled/Text";
import { useState } from "react";

interface IIconLargeProps {
  hoverColor: string;
  img: string;
  locationPath: string;
}
export const IconLarge = ({
  hoverColor,
  img,
  locationPath,
}: IIconLargeProps) => {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLoading = () => {
    setImgLoaded(true);
  };

  return (
    <HomeNavContainer
      className={imgLoaded ? "loaded" : ""}
      hovercolor={hoverColor}
      onClick={() => {
        navigate(`/${locationPath}`);
      }}
    >
      <HomeNavImg
        src={img}
        alt={`Image of a cat ${locationPath}`}
        onLoad={handleLoading}
      />
      <HomeNavHeader>
        <TextMedium>{locationPath}</TextMedium>
      </HomeNavHeader>
    </HomeNavContainer>
  );
};
