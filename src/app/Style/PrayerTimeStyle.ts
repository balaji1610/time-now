"use client";
import { useApplicationContext } from "../Context/ApplicationContext";
const PrayerTimeStyle = () => {
  const { isDesktopScreen } = useApplicationContext();

  const PrayerTimeStyle = {
    isLoading: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center",
      height: "17rem",
    },
    prayerTimeCardHeaderLayout: {
      marginLeft: isDesktopScreen ? "0" : "15px",
    },

    secondPhaseCardHeaderLayout: {
      marginTop: "1rem",
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: isDesktopScreen ? "normal" : "space-evenly",
    },

    prayerTimeLayout: {
      backgroundColor: "#FFFFFF",
      display: "inline-flex",
      flexDirection: "column" as "column",
      width: isDesktopScreen ? "10rem" : "6rem",
      color: "#393E46",
      cursor: "pointer",
      rowGap: "5px",
      padding: isDesktopScreen ? "25px" : "28px",
      alignItems: "center",
      height: "4rem",
      fontSize: "20px",
      margin: isDesktopScreen ? "14px" : "15px",
    },
  };

  return PrayerTimeStyle;
};

export default PrayerTimeStyle;
