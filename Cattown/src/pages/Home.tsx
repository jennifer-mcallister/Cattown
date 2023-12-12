import { Container, MainContent } from "../components/styled/LayoutStyled";
import "@pixi/events";
import { NavigationIcon } from "../components/NavigationIcon";

export const Home = () => {
  return (
    <MainContent>
      <Container>
        <NavigationIcon path={"/training"} />
        <NavigationIcon path={"/cats"} />
        <NavigationIcon path={"/map"} />
      </Container>
      <Container>
        <NavigationIcon path={"/library"} />
        <NavigationIcon path={"/shop"} />
      </Container>
    </MainContent>
  );
};
