import { useLoaderData } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";

export const Cats = () => {
  const cats = useLoaderData();
  console.log(cats);
  return (
    <>
      <MainContent>
        <h1>Cats</h1>
      </MainContent>
    </>
  );
};
