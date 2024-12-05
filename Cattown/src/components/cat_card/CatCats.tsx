import { ICat } from "../../types/savefileTypes";
import { CatContainer } from "../styled/Cat";
import { useState } from "react";
import { updateCats } from "../../services/CatService";
import { primaryBlue, primaryRed } from "../styled/style_variables/colors";
import { CatHeader } from "./CatHeader";
import { CatContent } from "./CatContent";
import { CatFooter } from "./CatFooter";
import { ConfirmDeleteCat } from "../menus/ConfirmDeleteCat";
import { ConfirmChangeName } from "../menus/ConfirmChangeName";
import { useOutletContext } from "react-router-dom";
import { ILayoutContext } from "../../pages/layout/Layout";

interface ICatInfoProps {
  cat: ICat;
  cats: ICat[];
}

export const CatCats = ({ cat, cats }: ICatInfoProps) => {
  const [changeName, setChangeName] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showConfirmDeleteCat, setShowConfirmDeleteCat] = useState(false);
  const outletContext = useOutletContext<ILayoutContext>();

  const handleLoading = () => {
    setImgLoaded(true);
  };

  const toggleConfirmDeleteCat = () => {
    setShowConfirmDeleteCat(!showConfirmDeleteCat);
  };

  const toggleChangeName = () => {
    setChangeName(!changeName);
  };

  const deleteCat = async (cat: ICat) => {
    try {
      const updatedCats = [...cats].filter((c) => c.id !== cat.id);
      await updateCats(updatedCats, outletContext.savefile);
    } catch {
      throw new Error("Something when wrong");
    }
  };

  const handleChangeName = () => {
    toggleChangeName();
  };

  return (
    <>
      {showConfirmDeleteCat && (
        <ConfirmDeleteCat
          cat={cat}
          deleteCat={deleteCat}
          toggleShowConfirmDelete={toggleConfirmDeleteCat}
        />
      )}
      {changeName && (
        <ConfirmChangeName
          cat={cat}
          toggleChangeName={toggleChangeName}
          cats={cats}
        />
      )}
      <CatContainer key={cat.id} className={imgLoaded ? "loaded" : ""}>
        <CatHeader cat={cat} handleLoading={handleLoading} />
        <CatContent cat={cat} />
        <CatFooter
          action={handleChangeName}
          disable={false}
          buttonText={"New name"}
          buttonColor={primaryBlue}
          secondAction={toggleConfirmDeleteCat}
          secondButtonDisable={cats.length < 2}
          secondButtonText="Retire"
          secondButtonColor={primaryRed}
        />
      </CatContainer>
    </>
  );
};
