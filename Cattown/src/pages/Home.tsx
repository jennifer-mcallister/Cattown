import { Container, MainContent } from "../components/styled/LayoutStyled";
import "@pixi/events";
import { HomeNavigation } from "../components/HomeNavigation";

export const Home = () => {
  return (
    <MainContent>
      <Container>
        <HomeNavigation path={"/training"} />
        <HomeNavigation path={"/cats"} />
        <HomeNavigation path={"/map"} />
      </Container>
      <Container>
        <HomeNavigation path={"/library"} />
        <HomeNavigation path={"/shop"} />
      </Container>
    </MainContent>
  );
};
