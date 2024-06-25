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
      // marginLeft: isDesktopScreen ? "5rem" : "15px",
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center",
      height: isDesktopScreen ? "16rem" : "27rem",
      alignItems: "center",
    },

    secondPhaseCardHeaderLayout: {
      marginLeft: isDesktopScreen ? "5rem" : "15px",
      marginTop: "2rem",
      display: "grid",
      gridTemplateColumns: "auto auto",
    },
  };

  return PrayerTimeLayoutStyles;
};

export default PrayerTimeLayoutStyle;
