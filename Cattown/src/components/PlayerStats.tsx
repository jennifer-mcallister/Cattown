import { IStats } from "../types/savefileTypes";
import { CatTextContainer } from "./styled/Cat";
import {
  GeneralStatsContainer,
  LibraryDivider,
  StatsInfoContainer,
} from "./styled/LibraryStyle";
import { TextMedium, TextSmall } from "./styled/Text";

interface IPlayerStats {
  stats: IStats;
}

export const PlayerStats = ({ stats }: IPlayerStats) => {
  return (
    <StatsInfoContainer>
      <GeneralStatsContainer>
        <TextMedium>General stats</TextMedium>
        <LibraryDivider />
        <CatTextContainer>
          <TextSmall>Health</TextSmall>
          <TextSmall>{stats.health}%</TextSmall>
        </CatTextContainer>
        <CatTextContainer>
          <TextSmall>Strength</TextSmall>
          <TextSmall>{stats.strength}%</TextSmall>
        </CatTextContainer>
        <CatTextContainer>
          <TextSmall>Luck</TextSmall>
          <TextSmall>{stats.luck}%</TextSmall>
        </CatTextContainer>
        <CatTextContainer>
          <TextSmall>Crit</TextSmall>
          <TextSmall>{stats.critChance}%</TextSmall>
        </CatTextContainer>
      </GeneralStatsContainer>
      <GeneralStatsContainer>
        <TextMedium>Resistence</TextMedium>
        <LibraryDivider />
        <CatTextContainer>
          <TextSmall>Nature</TextSmall>
          <TextSmall>{stats.natureRes}%</TextSmall>
        </CatTextContainer>
        <CatTextContainer>
          <TextSmall>Shadow</TextSmall>
          <TextSmall>{stats.shadowRes}%</TextSmall>
        </CatTextContainer>
        <CatTextContainer>
          <TextSmall>Water</TextSmall>
          <TextSmall>{stats.waterRes}%</TextSmall>
        </CatTextContainer>
        <CatTextContainer>
          <TextSmall>Fire</TextSmall>
          <TextSmall>{stats.fireRes}%</TextSmall>
        </CatTextContainer>
      </GeneralStatsContainer>
    </StatsInfoContainer>
  );
};
