"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import GulfTimeZoneInfo from "@/app/utilities/GulfTimeZoneInfo";

interface ApplicationContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  currentCity: string;
  setCurrentCity: Dispatch<SetStateAction<string>>;
  isNotDisplayPrayerTime: boolean;
  setIsNotDisplayPrayerTime: Dispatch<SetStateAction<boolean>>;
  isDesktopScreen: boolean;
  time: any;
  setTime: Dispatch<SetStateAction<any>>;
  currentTimeDate: any;
  setCurrentTimeDate: Dispatch<SetStateAction<any>>;
  timeZone: any;
  setTimeZone: Dispatch<SetStateAction<any>>;
  hover: any;
  setHover: Dispatch<SetStateAction<any>>;
  isTabletScreen: boolean;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

interface ContextProps {
  children: ReactNode;
}

const ApplicationProvider: React.FC<ContextProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState("Dubai");
  const [isNotDisplayPrayerTime, setIsNotDisplayPrayerTime] =
    useState<boolean>(false);

  const [time, setTime] = useState(new Date());
  const [currentTimeDate, setCurrentTimeDate] = useState(GulfTimeZoneInfo[1]);
  const [timeZone, setTimeZone] = useState(GulfTimeZoneInfo[1].timeZone);
  const [hover, setHover] = useState<number | null>(null);
  const isDesktopScreen = useMediaQuery("(min-width:600px)");
  const isTabletScreen = useMediaQuery(
    "(min-width:1024px) and (max-width:1050px)"
  );
  return (
    <ApplicationContext.Provider
      value={{
        loading,
        setLoading,
        currentCity,
        setCurrentCity,
        isNotDisplayPrayerTime,
        setIsNotDisplayPrayerTime,
        isDesktopScreen,
        time,
        setTime,
        currentTimeDate,
        setCurrentTimeDate,
        timeZone,
        setTimeZone,
        hover,
        setHover,
        isTabletScreen,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationProvider, ApplicationContext };

export const useApplicationContext = (): ApplicationContextType => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplicationContext must be used within an ApplicationProvider"
    );
  }
  return context;
};
