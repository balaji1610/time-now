import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname } from "next/navigation";
let CityCardHeight: string;
const timeZoneStyle = () => {
  const isDesktopScreen = useMediaQuery("(min-width:600px)");
  const currentPath = usePathname();

  if (currentPath == "/") {
    if (isDesktopScreen) {
      CityCardHeight = "20rem";
    } else {
      CityCardHeight = "44rem";
    }
  } else if (currentPath == "/Prayer-Time") {
    if (isDesktopScreen) {
      CityCardHeight = "20rem";
    } else {
      CityCardHeight = "53rem";
    }
  }

  const timeZoneStyle = {
    cityFlex: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center",
      color: "#393E46",
    },
    cityTime: {
      fontSize: isDesktopScreen ? "10rem" : "4rem",
      display: "flex",
      lineHeight: isDesktopScreen ? "11rem" : "8rem",
      flexDirection: "row" as "row",
      justifyContent: isDesktopScreen ? "center" : "flex-end",
    },
    hourFormat: {
      fontSize: isDesktopScreen ? "3rem" : "2rem",
      display: "flex",
      flexDirection: "column" as "column",
      height: isDesktopScreen ? "12rem" : "8rem",
      alignItems: isDesktopScreen ? "center" : "flex-start",
      justifyContent: isDesktopScreen ? "center" : "center",
      width: isDesktopScreen ? "6rem" : "100%",
    },
    currentCityParentCard: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center",
      height: CityCardHeight,
      alignItems: isDesktopScreen ? "center" : "flex-end",
    },
    currentCityLayout: {
      border: "1px solid rgba(0, 0, 0, 0.25)",
      backgroundColor: "rgb(0 0 0 / 0.1)",
      display: "inline-flex",
      flexDirection: "column" as "column",
      width: "6rem",
      color: "black",
    },
    date: {
      fontWeight: "600",
      fontSize: "25px",
      display: "inline",
    },
    regionaldate: {
      fontWeight: "500",
      fontSize: "16px",
      display: "inline",
      marginRight: isDesktopScreen ? "83px" : "6px",
    },
    dateLayout: {
      display: "inline-flex",
      flexDirection: "column" as "column",
      justifyContent: isDesktopScreen ? "flex-start" : "center",
      alignItems: isDesktopScreen ? "flex-start" : "center",
      height: "6rem",
      width: isDesktopScreen ? "24rem" : "26rem",
      rowGap: "1rem",
      color: "#393E46",
    },
    hourFormatGrid: {
      display: "grid",
      gridTemplateColumns: isDesktopScreen ? "91%  6%" : "auto auto",
      columnGap: "10px",
      color: "#393E46",
    },
  };

  return timeZoneStyle;
};

export default timeZoneStyle;
