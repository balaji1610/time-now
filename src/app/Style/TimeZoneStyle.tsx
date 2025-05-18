"use client";
import { usePathname } from "next/navigation";
import { useApplicationContext } from "@/app/Context/ApplicationContext";

const TimeZoneStyle = () => {
  const { isDesktopScreen, isTabletScreen } = useApplicationContext();
  const currentPath = usePathname();

  let CityCardHeight = "";
  let CityCardMarginTop = "";
  if (currentPath == "/") {
    if (isDesktopScreen) {
      CityCardHeight = "36rem";
      CityCardMarginTop = "-9px";
    } else {
      CityCardHeight = "44rem";
      CityCardMarginTop = "-9px";
    }
  } else if (currentPath == "/prayer-time") {
    if (isDesktopScreen) {
      CityCardHeight = "31rem";
      CityCardMarginTop = "-9px";
    } else {
      CityCardHeight = "28rem";
      CityCardMarginTop = "0rem";
    }
  }

  const TimeZoneStyle = {
    cityTime: {
      fontSize: isDesktopScreen ? (isTabletScreen ? "8rem" : "10rem") : "58px",
      display: "flex",
      lineHeight: isDesktopScreen ? "11rem" : "8rem",
      flexDirection: "row" as "row",
      justifyContent: isDesktopScreen ? "center" : "flex-end",
    },
    cityPeriod: {
      fontSize: isDesktopScreen ? "3rem" : "2rem",
      display: "flex",
      flexDirection: "column" as "column",
      height: isDesktopScreen ? (isTabletScreen ? "9rem" : "10rem") : "6rem",
      alignItems: isDesktopScreen ? "flex-end" : "flex-start",
      justifyContent: isDesktopScreen ? "flex-end" : "flex-end",
      width: isDesktopScreen ? "7rem" : "100%",
    },
    currentCityParentCard: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center",
      height: CityCardHeight,
      alignItems: isDesktopScreen ? "center" : "flex-end",
      marginTop: CityCardMarginTop,
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
      width: isDesktopScreen ? "24rem" : "22rem",
      rowGap: "1rem",
      color: "#393E46",
      marginLeft: isDesktopScreen ? "-32px" : "0",
    },
    cityHour: {
      display: "grid",
      gridTemplateColumns: isDesktopScreen ? "81%  10%" : "auto auto",
      columnGap: "10px",
      color: "#393E46",
    },
  };

  return TimeZoneStyle;
};

export default TimeZoneStyle;
