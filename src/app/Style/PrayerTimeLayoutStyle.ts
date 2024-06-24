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
      marginLeft: isDesktopScreen ? "5rem" : "15px",
    },

    secondPhaseCardHeaderLayout: {
      marginLeft: isDesktopScreen ? "5rem" : "15px",
      display: "grid",
      gridTemplateColumns: "auto auto",
      justifyContent: "space-between",
    },
  };

  return PrayerTimeLayoutStyles;
};

export default PrayerTimeLayoutStyle;
