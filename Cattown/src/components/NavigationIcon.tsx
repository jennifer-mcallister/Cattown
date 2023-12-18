import { Sprite, Stage, Text } from "@pixi/react";
import placeholder from "../assets/placeholder.png";
import { useNavigate, useOutletContext } from "react-router-dom";
import "@pixi/events";
import { useState } from "react";
import { IShowMenus } from "../pages/layout/Layout";

const stageOptions = {
  backgroundAlpha: 0,
  antialias: true,
};

interface INavigationIconProps {
  path: string;
}

export const NavigationIcon = ({ path }: INavigationIconProps) => {
  const showMenus = useOutletContext<IShowMenus>();
  const [scale, setScale] = useState({ x: 0.05, y: 0.05 });
  const navigate = useNavigate();

  const goToLocation = async () => {
    navigate(path);
  };

  const hoverAnimation = () => {
    if (showMenus.showMenu || showMenus.showOptions) {
      setScale({ x: 0.05, y: 0.05 });
      return;
    }
    scale.x && scale.y === 0.05
      ? setScale({ x: 0.07, y: 0.07 })
      : setScale({ x: 0.05, y: 0.05 });
  };

  return (
    <Stage width={300} height={300} options={stageOptions}>
      <Sprite
        image={placeholder}
        scale={{ x: scale.x, y: scale.y }}
        anchor={0.5}
        interactive={true}
        onpointerdown={goToLocation}
        onpointerenter={hoverAnimation}
        onpointerleave={hoverAnimation}
        x={150}
        y={150}
      />
      <Text text={path} x={130} y={200}></Text>
    </Stage>
  );
};
