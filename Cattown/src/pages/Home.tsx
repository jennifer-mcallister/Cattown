import { MainContent } from "../components/styled/LayoutStyle";
import "@pixi/events";
import { NavigationIcon } from "../components/NavigationIcon";
import { HomeContainer } from "../components/styled/Container";

export const Home = () => {
  return (
    <MainContent>
      <HomeContainer>
        <NavigationIcon path={"/training"} />
        <NavigationIcon path={"/cats"} />
        <NavigationIcon path={"/map"} />
      </HomeContainer>
      <HomeContainer>
        <NavigationIcon path={"/library"} />
        <NavigationIcon path={"/shop"} />
      </HomeContainer>
    </MainContent>
  );
};
