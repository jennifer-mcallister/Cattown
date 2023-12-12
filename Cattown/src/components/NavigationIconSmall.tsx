import { Sprite, Stage, Text } from "@pixi/react";
import placeholder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import "@pixi/events";
import { useState } from "react";

const stageOptions = {
  backgroundAlpha: 0,
  antialias: true,
};

interface INavigationIconSmallProps {
  path: string;
}

export const NavigationIconSmall = ({ path }: INavigationIconSmallProps) => {
  const [scale, setScale] = useState({ x: 0.03, y: 0.03 });
  const navigate = useNavigate();

  const goToLocation = async () => {
    navigate(path);
  };

  const hoverAnimation = () => {
    if (scale.x && scale.y === 0.03) {
      setScale({ x: 0.04, y: 0.04 });
    } else {
      setScale({ x: 0.03, y: 0.03 });
    }
  };

  return (
    <Stage width={120} height={120} options={stageOptions}>
      <Sprite
        image={placeholder}
        scale={{ x: scale.x, y: scale.y }}
        anchor={0.5}
        interactive={true}
        onpointerdown={goToLocation}
        onpointerenter={hoverAnimation}
        onpointerleave={hoverAnimation}
        x={60}
        y={60}
      />
      <Text text={path} x={30} y={90}></Text>
    </Stage>
  );
};
