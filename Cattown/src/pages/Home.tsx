import { MainContent } from "../components/styled/LayoutStyle";
import "@pixi/events";
import { HomeContainer } from "../components/styled/Container";
import { HomeNavContainer, HomeNavImg } from "../components/styled/HomeNav";
import placeholder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { TextMedium } from "../components/styled/Text";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <MainContent>
      <HomeContainer>
        <HomeNavContainer>
          <HomeNavImg
            src={placeholder}
            onClick={() => {
              navigate("/training");
            }}
          />
          <TextMedium>Training</TextMedium>
        </HomeNavContainer>

        <HomeNavContainer>
          <HomeNavImg
            src={placeholder}
            onClick={() => {
              navigate("/cats");
            }}
          />
          <TextMedium>Cats</TextMedium>
        </HomeNavContainer>
        <HomeNavContainer>
          <HomeNavImg
            src={placeholder}
            onClick={() => {
              navigate("/map");
            }}
          />
          <TextMedium>Map</TextMedium>
        </HomeNavContainer>
      </HomeContainer>
      <HomeContainer>
        <HomeNavContainer>
          <HomeNavImg
            src={placeholder}
            onClick={() => {
              navigate("/library");
            }}
          />
          <TextMedium>Library</TextMedium>
        </HomeNavContainer>
        <HomeNavContainer>
          <HomeNavImg
            src={placeholder}
            onClick={() => {
              navigate("/shop");
            }}
          />
          <TextMedium>Bobbens Shop</TextMedium>
        </HomeNavContainer>
      </HomeContainer>
    </MainContent>
  );
};
