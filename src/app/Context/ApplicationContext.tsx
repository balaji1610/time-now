import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ApplicationContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  currentCity: string;
  setCurrentCity: Dispatch<SetStateAction<string>>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

interface ContextProps {
  children: ReactNode;
}

const ApplicationProvider: React.FC<ContextProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState("Riyadh");
  return (
    <ApplicationContext.Provider
      value={{
        loading,
        setLoading,
        currentCity,
        setCurrentCity,
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
