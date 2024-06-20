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
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

interface ContextProps {
  children: ReactNode;
}

const ApplicationProvider: React.FC<ContextProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ApplicationContext.Provider
      value={{
        loading,
        setLoading,
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
