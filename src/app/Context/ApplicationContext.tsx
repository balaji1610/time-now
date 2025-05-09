"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import GulfTimeZoneInfo from "@/app/utilities/GulfTimeZoneInfo";
import { TimeZoneInfoType } from "@/app/interface/commonInterface";

interface ApplicationContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  currentCity: string;
  setCurrentCity: Dispatch<SetStateAction<string>>;
  isNotDisplayPrayerTime: boolean;
  setIsNotDisplayPrayerTime: Dispatch<SetStateAction<boolean>>;
  isDesktopScreen: boolean;
  time: Date;
  setTime: Dispatch<SetStateAction<Date>>;
  currentTimeDate: TimeZoneInfoType;
  setCurrentTimeDate: Dispatch<SetStateAction<TimeZoneInfoType>>;
  timeZone: string;
  setTimeZone: Dispatch<SetStateAction<string>>;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<string>("Dubai");
  const [isNotDisplayPrayerTime, setIsNotDisplayPrayerTime] =
    useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());
  const [currentTimeDate, setCurrentTimeDate] = useState<TimeZoneInfoType>(
    GulfTimeZoneInfo[1]
  );
  const [timeZone, setTimeZone] = useState<string>(
    GulfTimeZoneInfo[1].timeZone
  );
  const [hover, setHover] = useState<number | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDesktopScreen = useMediaQuery("(min-width:600px)");
  const isTabletScreen = useMediaQuery(
    "(min-width:1024px) and (max-width:1050px)"
  );

  if (!mounted) {
    return null;
  }

  return (
    <ApplicationContext.Provider
      value={{
        isLoading,
        setIsLoading,
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
