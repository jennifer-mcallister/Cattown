import { useOutletContext } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { ILayoutContext } from "./layout/Layout";
import {
  HeaderBig,
  HeaderSmall,
  TextMedium,
  TextSmall,
} from "../components/styled/Text";
import {
  GeneralStatsContainer,
  InfoContainer,
  LibraryDivider,
  McGuffinContainer,
  McGuffinImg,
  McGuffinsContainer,
  RelicContainer,
  RelicHeader,
  RelicImg,
  RelicImgContainer,
  RelicsContainer,
  StatsInfoContainer,
  TopSection,
  TopSectionRightBox,
} from "../components/styled/LibraryStyle";
import { PageHeaderContainer } from "../components/styled/Container";
import placeholder from "/assets/skull_of_human.png";
import { CatTextContainer } from "../components/styled/Cat";
import { useState } from "react";

export const Library = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLoading = () => {
    setImgLoaded(true);
  };

  return (
    <>
      <MainContent>
        <PageHeaderContainer bgColor="#797EC5">
          <HeaderBig>Library</HeaderBig>
        </PageHeaderContainer>
        <TopSection>
          <StatsInfoContainer>
            <GeneralStatsContainer>
              <TextMedium>General stats</TextMedium>
              <LibraryDivider />
              <CatTextContainer>
                <TextSmall>Health</TextSmall>
                <TextSmall>{outletContext.savefile.stats.health}%</TextSmall>
              </CatTextContainer>
              <CatTextContainer>
                <TextSmall>Strength</TextSmall>
                <TextSmall>{outletContext.savefile.stats.strength}%</TextSmall>
              </CatTextContainer>
              <CatTextContainer>
                <TextSmall>Luck</TextSmall>
                <TextSmall>{outletContext.savefile.stats.luck}%</TextSmall>
              </CatTextContainer>
              <CatTextContainer>
                <TextSmall>Crit</TextSmall>
                <TextSmall>
                  {outletContext.savefile.stats.critChance}%
                </TextSmall>
              </CatTextContainer>
            </GeneralStatsContainer>
            <GeneralStatsContainer>
              <TextMedium>Resistence</TextMedium>
              <LibraryDivider />
              <CatTextContainer>
                <TextSmall>Nature</TextSmall>
                <TextSmall>{outletContext.savefile.stats.natureRes}%</TextSmall>
              </CatTextContainer>
              <CatTextContainer>
                <TextSmall>Shadow</TextSmall>
                <TextSmall>{outletContext.savefile.stats.shadowRes}%</TextSmall>
              </CatTextContainer>
              <CatTextContainer>
                <TextSmall>Water</TextSmall>
                <TextSmall>{outletContext.savefile.stats.waterRes}%</TextSmall>
              </CatTextContainer>
              <CatTextContainer>
                <TextSmall>Fire</TextSmall>
                <TextSmall>{outletContext.savefile.stats.fireRes}%</TextSmall>
              </CatTextContainer>
            </GeneralStatsContainer>
          </StatsInfoContainer>

          <TopSectionRightBox>
            <HeaderSmall>McGuffins</HeaderSmall>
            {outletContext.savefile.uniqueItems.length < 1 && (
              <InfoContainer>
                {" "}
                <TextSmall>
                  It seems you haven't acquired any McGuffins yet. Take on the
                  challenge of defeating the four bosses in Catland to start
                  collecting them.
                </TextSmall>
              </InfoContainer>
            )}
            <McGuffinsContainer>
              {outletContext.savefile.uniqueItems.map((uniqueItem) => (
                <McGuffinContainer
                  key={uniqueItem}
                  className={imgLoaded ? "loaded" : ""}
                >
                  <HeaderSmall>McGuffin {uniqueItem}</HeaderSmall>
                  <McGuffinImg
                    src={placeholder}
                    alt="Image of an McGuffin"
                    onLoad={handleLoading}
                  />
                </McGuffinContainer>
              ))}
            </McGuffinsContainer>
            <HeaderSmall>Relics</HeaderSmall>
            {outletContext.savefile.relics.length < 1 && (
              <InfoContainer>
                {" "}
                <TextSmall>
                  It appears you haven't gathered any Relics yet. Pay a visit to
                  Bobben's shop, perhaps he has one available for purchase. The
                  right relic could provide the edge you need to conquer one of
                  the bosses in Catland.
                </TextSmall>
              </InfoContainer>
            )}
            <RelicsContainer>
              {outletContext.savefile.relics.map((relic, index) => (
                <RelicContainer
                  key={index}
                  className={imgLoaded ? "loaded" : ""}
                >
                  <RelicHeader>
                    <HeaderSmall>{relic.name.replace(/_/g, " ")}</HeaderSmall>
                    <RelicImgContainer>
                      <RelicImg
                        src={`/assets/${relic.name}.png`}
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
                      <TextSmall>
                        {outletContext.savefile.stats.natureRes}%
                      </TextSmall>
                    </CatTextContainer>
                    <CatTextContainer>
                      <TextSmall>Shadow</TextSmall>
                      <TextSmall>
                        {outletContext.savefile.stats.shadowRes}%
                      </TextSmall>
                    </CatTextContainer>
                    <CatTextContainer>
                      <TextSmall>Water</TextSmall>
                      <TextSmall>
                        {outletContext.savefile.stats.waterRes}%
                      </TextSmall>
                    </CatTextContainer>
                    <CatTextContainer>
                      <TextSmall>Fire</TextSmall>
                      <TextSmall>
                        {outletContext.savefile.stats.fireRes}%
                      </TextSmall>
                    </CatTextContainer>
                  </GeneralStatsContainer>
                </RelicContainer>
              ))}
            </RelicsContainer>
          </TopSectionRightBox>
        </TopSection>

        {/* <h1>Library</h1>
        <h2>{outletContext.savefile.username}</h2>
        <TextMedium>gold: {outletContext.savefile.gold}</TextMedium>
        <TextMedium>health: {outletContext.savefile.stats.health}%</TextMedium>
        <TextMedium>
          crit chance: {outletContext.savefile.stats.critChance}%
        </TextMedium>
        <TextMedium>luck: {outletContext.savefile.stats.luck}%</TextMedium>
        <TextMedium>
          strength: {outletContext.savefile.stats.strength}%
        </TextMedium>
        <h2>Resistance:</h2>
        <TextMedium>
          shadow: {outletContext.savefile.stats.shadowRes}%
        </TextMedium>
        <TextMedium>fire: {outletContext.savefile.stats.fireRes}%</TextMedium>
        <TextMedium>water: {outletContext.savefile.stats.waterRes}%</TextMedium>
        <TextMedium>
          nature: {outletContext.savefile.stats.natureRes}%
        </TextMedium>
        <h2>Relics</h2>
        {outletContext.savefile.relics.map((relic) => (
          <TextMedium key={relic.name}>{relic.name}</TextMedium>
        ))} */}
      </MainContent>
    </>
  );
};
