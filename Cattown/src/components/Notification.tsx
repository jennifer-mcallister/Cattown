import { useEffect, useState } from "react";
import { ICat } from "../types/savefileTypes";
import { NotificationCard, StatusBox } from "./styled/NotificationStyle";
import { HeaderSmall } from "./styled/Text";
import {
  primaryBlue,
  primaryGreen,
  primaryRed,
  trainingColor,
} from "./styled/theme_variables/colors";

interface INotificationProps {
  cat: ICat;
}

export const Notification = ({ cat }: INotificationProps) => {
  const [catActive, setCatActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (isMounted && cat.status) {
      if (cat.status === "training") {
        setBgColor(trainingColor);
      }
      if (cat.status === "downed") {
        setBgColor(primaryRed);
      }
      if (cat.status === "in camp") {
        setBgColor(primaryGreen);
      }
      if (cat.status === "on mission") {
        setBgColor(primaryBlue);
      }
      setCatActive(true);

      const removeNotification = setTimeout(() => {
        setCatActive(false);
      }, 2500);

      return () => {
        clearTimeout(removeNotification);
      };
    }
  }, [cat.status]);

  return (
    <NotificationCard className={catActive ? "active" : ""}>
      <HeaderSmall>{cat.name} is</HeaderSmall>
      <StatusBox bgcolor={bgColor}>
        <HeaderSmall>{cat.status}</HeaderSmall>
      </StatusBox>
    </NotificationCard>
  );
};
