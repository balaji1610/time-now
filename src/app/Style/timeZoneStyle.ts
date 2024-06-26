import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname } from "next/navigation";
let CityCardHeight: string;
const timeZoneStyle = () => {
  const isDesktopScreen = useMediaQuery("(min-width:600px)");
  const currentPath = usePathname();

  if (currentPath == "/") {
    if (isDesktopScreen) {
      CityCardHeight = "36rem";
    } else {
      CityCardHeight = "44rem";
    }
  } else if (currentPath == "/Prayer-Time") {
    if (isDesktopScreen) {
      CityCardHeight = "31rem";
    } else {
      CityCardHeight = "36rem";
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
      alignItems: isDesktopScreen ? "flex-end" : "flex-start",
      justifyContent: isDesktopScreen ? "center" : "center",
      width: isDesktopScreen ? "7rem" : "100%",
    },
    currentCityParentCard: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center",
      height: CityCardHeight,
      alignItems: isDesktopScreen ? "center" : "flex-end",
      marginTop: "-9px",
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
      marginLeft: isDesktopScreen ? "-32px" : "0",
    },
    hourFormatGrid: {
      display: "grid",
      gridTemplateColumns: isDesktopScreen ? "81%  10%" : "auto auto",
      columnGap: "10px",
      color: "#393E46",
    },
  };

  return timeZoneStyle;
};

export default timeZoneStyle;
