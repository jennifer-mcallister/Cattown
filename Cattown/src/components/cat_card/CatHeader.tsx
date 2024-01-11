import { ICat } from "../../types/savefileTypes";
import { ProgressBar } from "../ProgressBar";
import {
  CatHeaderContainer,
  CatHeaderTitleContainer,
  CatImg,
  CatImgContainer,
} from "../styled/Cat";
import { HeaderSmall, TextSmallBold } from "../styled/Text";
import placeholder from "/assets/cat_white.webp";

interface ICatHeaderProps {
  cat: ICat;
  handleLoading: () => void;
}

export const CatHeader = ({ cat, handleLoading }: ICatHeaderProps) => {
  const imgPath = `/assets/${cat.img}`;

  return (
    <CatHeaderContainer>
      <CatImgContainer>
        <CatImg
          src={cat.img ? imgPath : placeholder}
          onLoad={handleLoading}
          alt="Image of a cat"
        />
      </CatImgContainer>
      <CatHeaderTitleContainer>
        <HeaderSmall>{cat.name} </HeaderSmall>
        <TextSmallBold>Lvl. {cat.level}</TextSmallBold>
      </CatHeaderTitleContainer>
      <ProgressBar catLevel={cat.level} catXP={cat.xp} />
    </CatHeaderContainer>
  );
};
