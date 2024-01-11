import { useNavigate, useOutletContext } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { CatsContent } from "../components/styled/LayoutStyle";
import { CatCats } from "../components/cat_card/CatCats";
import { ILayoutContext } from "./layout/Layout";
import { ButtonMedium } from "../components/styled/Button";
import { PageHeaderContainer } from "../components/styled/Container";
import { HeaderBig, HeaderSmall } from "../components/styled/Text";
import { NoCatsContainer } from "../components/styled/Cat";
import { catColor } from "../components/styled/style_variables/colors";

export const Cats = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  const navigate = useNavigate();

  return (
    <>
      <MainContent>
        <PageHeaderContainer bgcolor={catColor}>
          <HeaderBig>Cats</HeaderBig>
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
              Witches Shop
            </ButtonMedium>
          </NoCatsContainer>
        )}
        <CatsContent>
          {outletContext.savefile.cats.map((cat) => (
            <CatCats
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
