"use client";
import { useApplicationContext } from "../Context/ApplicationContext";
const PrayerTimeLayoutStyle = () => {
  const { isDesktopScreen } = useApplicationContext();
  const PrayerTimeLayoutStyles = {
    loading: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center",
      height: "17rem",
    },
    prayerTimeCardHeaderLayout: {
      marginLeft: isDesktopScreen ? "0" : "15px",
      // display: "flex",
      // flexDirection: "row" as "row",
      // justifyContent: "center",
      // height: isDesktopScreen ? "16rem" : "27rem",
      // alignItems: "center",
    },

    secondPhaseCardHeaderLayout: {
      marginTop: "1rem",
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: isDesktopScreen ? "normal" : "space-evenly",
    },
  };

  return PrayerTimeLayoutStyles;
};

export default PrayerTimeLayoutStyle;
