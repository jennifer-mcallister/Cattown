import { useState } from "react";
import { ICat } from "../../types/savefileTypes";
import { ButtonMedium } from "../styled/Button";
import {
  CatContainerQuest,
  CatFooterContainer,
  CatHeaderContainer,
  CatHeaderTitleContainer,
  CatImgContainerQuest,
  CatImgQuest,
} from "../styled/Cat";
import { HeaderSmall, TextSmallBold } from "../styled/Text";
import placeholder from "/assets/cat_white.webp";

interface ICatQuestMobileProps {
  cat: ICat;
  zoneLevel: number;
  buttonColor?: string;
  action: () => void;
}

export const CatQuestMobile = ({
  cat,
  zoneLevel,
  buttonColor,
  action,
}: ICatQuestMobileProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgPath = `/assets/${cat.img}`;

  const handleLoading = () => {
    setImgLoaded(true);
  };

  return (
    <CatContainerQuest key={cat.id} className={imgLoaded ? "loaded" : ""}>
      <CatHeaderContainer>
        <CatHeaderTitleContainer>
          <HeaderSmall>{cat.name} </HeaderSmall>
        </CatHeaderTitleContainer>

        <CatImgContainerQuest>
          <CatImgQuest
            src={cat.img ? imgPath : placeholder}
            onLoad={handleLoading}
            alt="Image of a cat"
          />
        </CatImgContainerQuest>
      </CatHeaderContainer>
      <CatFooterContainer>
        <ButtonMedium
          onClick={action}
          disabled={cat.status !== "in camp" || cat.level < zoneLevel}
          bgcolor={buttonColor}
        >
          Pick cat
        </ButtonMedium>
        <TextSmallBold>Lvl. {cat.level}</TextSmallBold>
      </CatFooterContainer>
    </CatContainerQuest>
  );
};
