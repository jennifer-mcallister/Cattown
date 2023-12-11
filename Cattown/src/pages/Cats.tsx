import { useLoaderData } from "react-router-dom";

export const Cats = () => {
  const cats = useLoaderData();
  console.log(cats);
  return (
    <>
      <h1>Cats</h1>
    </>
  );
};
