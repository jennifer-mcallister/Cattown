import { useNavigate, useOutletContext } from "react-router-dom";
import { CatsContent, MainContent } from "../components/styled/LayoutStyle";
import { ILayoutContext } from "./layout/Layout";
import { ButtonMedium } from "../components/styled/Button";
import { PageHeaderContainer } from "../components/styled/Container";
import { HeaderBig, HeaderSmall } from "../components/styled/Text";
import { NoCatsContainer } from "../components/styled/Cat";
import { trainingColor } from "../components/styled/style_variables/colors";
import { CatTraining } from "../components/cat_card/CatTraining";

export const Training = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  const navigate = useNavigate();

  return (
    <>
      <MainContent>
        <PageHeaderContainer bgcolor={trainingColor}>
          <HeaderBig>Training</HeaderBig>
        </PageHeaderContainer>
        {outletContext.savefile.cats.length < 1 && (
          <NoCatsContainer>
            <HeaderSmall>
              Hmm.. looks like you do not have any cats. Maybe the Bobben has
              one you can recruit?
            </HeaderSmall>
            <ButtonMedium
              onClick={() => {
                navigate("/shop");
              }}
            >
              Bobbens Shop
            </ButtonMedium>
          </NoCatsContainer>
        )}
        <CatsContent>
          {outletContext.savefile.cats.map((cat) => (
            <CatTraining
              cat={cat}
              cats={outletContext.savefile.cats}
              key={cat.id}
            />
          ))}
        </CatsContent>
      </MainContent>
    </>
  );
};
