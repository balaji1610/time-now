import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
interface ApplicationContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  currentCity: string;
  setCurrentCity: Dispatch<SetStateAction<string>>;
  isNotDisplayPrayerTime: boolean;
  setIsNotDisplayPrayerTime: Dispatch<SetStateAction<boolean>>;
  isDesktopScreen: boolean;
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
  const isDesktopScreen = useMediaQuery("(min-width:600px)");
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
