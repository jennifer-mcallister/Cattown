import { useNavigate, useOutletContext } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { CatsContent } from "../components/styled/LayoutStyle";
import { CatInfo } from "../components/CatInfo";
import { ILayoutContext } from "./layout/Layout";
import { ButtonMedium } from "../components/styled/Button";
import { PageHeaderContainer } from "../components/styled/Container";
import { HeaderBig, HeaderSmall } from "../components/styled/Text";
import { NoCatsContainer } from "../components/styled/Cat";

export const Cats = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  const navigate = useNavigate();

  return (
    <>
      <MainContent>
        <PageHeaderContainer bgColor="#C4689C">
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
            <CatInfo
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
