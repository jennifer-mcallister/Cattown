import { useNavigate, useOutletContext } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { CatsContent } from "../components/styled/LayoutStyle";
import { CatInfo } from "../components/CatInfo";
import { ILayoutContext } from "./layout/Layout";
import { ButtonMedium } from "../components/styled/Button";

export const Cats = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  const navigate = useNavigate();

  return (
    <>
      <MainContent>
        <CatsContent className="test">
          {outletContext.savefile.cats.map((cat) => (
            <CatInfo
              cat={cat}
              cats={outletContext.savefile.cats}
              key={cat.id}
            />
          ))}
          {outletContext.savefile.cats.length < 1 && (
            <>
              <h2>
                Hmm.. looks like you do not have any cats. Maybe the Bobben has
                one you can recruit?
              </h2>
              <ButtonMedium
                onClick={() => {
                  navigate("/shop");
                }}
              >
                Witches Shop
              </ButtonMedium>
            </>
          )}
        </CatsContent>
      </MainContent>
    </>
  );
};
