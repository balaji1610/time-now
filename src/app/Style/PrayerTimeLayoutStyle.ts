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
  };

  return PrayerTimeLayoutStyles;
};

export default PrayerTimeLayoutStyle;
