import { useOutletContext } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { ILayoutContext } from "./layout/Layout";
import { HeaderBig, HeaderSmall, TextSmall } from "../components/styled/Text";
import {
  InfoContainer,
  McGuffinsContainer,
  RelicsContainer,
  TopSection,
  TopSectionRightBox,
} from "../components/styled/LibraryStyle";
import { PageHeaderContainer } from "../components/styled/Container";
import { libraryColor } from "../components/styled/style_variables/colors";
import { PlayerStats } from "../components/PlayerStats";
import { McGuffin } from "../components/McGuffin";
import { RelicSmall } from "../components/RelicSmall";

export const Library = () => {
  const outletContext = useOutletContext<ILayoutContext>();

  return (
    <>
      <MainContent>
        <PageHeaderContainer bgcolor={libraryColor}>
          <HeaderBig>Library</HeaderBig>
        </PageHeaderContainer>
        <TopSection>
          <PlayerStats stats={outletContext.savefile.stats} />
          <TopSectionRightBox>
            <HeaderSmall>McGuffins</HeaderSmall>
            {outletContext.savefile.uniqueItems.length < 1 && (
              <InfoContainer>
                <TextSmall>
                  It seems you haven't acquired any McGuffins yet. Take on the
                  challenge of defeating the four bosses in Catland to start
                  collecting them.
                </TextSmall>
              </InfoContainer>
            )}
            <McGuffinsContainer>
              {outletContext.savefile.uniqueItems.map((uniqueItem) => (
                <McGuffin mcguffin={uniqueItem} key={uniqueItem} />
              ))}
            </McGuffinsContainer>
            <HeaderSmall>Relics</HeaderSmall>
            {outletContext.savefile.relics.length < 1 && (
              <InfoContainer>
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
                <RelicSmall relic={relic} key={index} />
              ))}
            </RelicsContainer>
          </TopSectionRightBox>
        </TopSection>
      </MainContent>
    </>
  );
};
