import { useState } from "react";
import { CatTextContainer } from "./styled/Cat";
import {
  GeneralStatsContainer,
  LibraryDivider,
  RelicContainer,
  RelicHeader,
  RelicImg,
  RelicImgContainer,
} from "./styled/LibraryStyle";
import { HeaderSmall, TextMedium, TextSmall } from "./styled/Text";
import { IRelic } from "../types/savefileTypes";

interface IRelicSmallProps {
  relic: IRelic;
}

export const RelicSmall = ({ relic }: IRelicSmallProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLoading = () => {
    setImgLoaded(true);
  };
  return (
    <RelicContainer className={imgLoaded ? "loaded" : ""}>
      <RelicHeader>
        <HeaderSmall>{relic.name.replace(/_/g, " ")}</HeaderSmall>
        <RelicImgContainer>
          <RelicImg
            src={`/assets/${relic.name}.webp`}
            alt="Image of an Relic"
            onLoad={handleLoading}
          />
        </RelicImgContainer>
      </RelicHeader>
      <GeneralStatsContainer>
        <TextMedium>Resistence</TextMedium>
        <LibraryDivider />
        <CatTextContainer>
          <TextSmall>Nature</TextSmall>
          <TextSmall>{relic.stats.natureRes}%</TextSmall>
        </CatTextContainer>
        <CatTextContainer>
          <TextSmall>Shadow</TextSmall>
          <TextSmall>{relic.stats.shadowRes}%</TextSmall>
        </CatTextContainer>
        <CatTextContainer>
          <TextSmall>Water</TextSmall>
          <TextSmall>{relic.stats.waterRes}%</TextSmall>
        </CatTextContainer>
        <CatTextContainer>
          <TextSmall>Fire</TextSmall>
          <TextSmall>{relic.stats.fireRes}%</TextSmall>
        </CatTextContainer>
      </GeneralStatsContainer>
    </RelicContainer>
  );
};
