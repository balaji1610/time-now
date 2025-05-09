"use client";
import React from "react";
import Font from "@/app/page.module.css";
import TimeZoneStyle from "@/app/Style/TimeZoneStyle";
import { useApplicationContext } from "@/app/Context/ApplicationContext";
import {
  TimeZoneInfoType,
  EmiratesTimeType,
  TimeListsType,
} from "@/app/interface/commonInterface";
import { usePathname } from "next/navigation";
import { currentCityTime } from "@/app/lib/lib";

export default function CountryTime(props: TimeListsType) {
  const { timeLists } = props;
  const pathname = usePathname();
  const timeZoneStyle = TimeZoneStyle();

  const {
    currentCity,
    setCurrentCity,
    isDesktopScreen,
    time,
    setCurrentTimeDate,
    setTimeZone,
    hover,
    setHover,
    isTabletScreen,
  } = useApplicationContext();

  const handleOnClick = (item: TimeZoneInfoType) => {
    setCurrentTimeDate(item);
    setTimeZone(item.timeZone);
    setCurrentCity(item.city);
  };

  const handleOnMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setHover(index);
  };

  const handleOnMouseLeave = () => {
    setHover(null);
  };

  return (
    <div>
      {" "}
      <div style={timeZoneStyle.currentCityParentCard}>
        <div style={{ width: "24rem" }}>
          <div>
            {timeLists.map(
              (el: TimeZoneInfoType | EmiratesTimeType, index: number) => {
                const { city, timeZone } = el;
                const isHovered = hover === index;
                const isClicked = currentCity === city;
                return (
                  <span key={index}>
                    <div
                      style={{
                        backgroundColor: isClicked
                          ? "#999999"
                          : isHovered
                          ? "#999999"
                          : "#EEEEEE",
                        border: "1px solid #999999",
                        display: "inline-flex",
                        flexDirection: "column" as "column",
                        width: isTabletScreen ? "7rem" : "6rem",
                        whiteSpace: "nowrap",
                        color: isClicked
                          ? "#FFFFFF"
                          : isHovered
                          ? "#FFFFFF"
                          : "#393E46",
                        cursor: "pointer",
                        rowGap: "6px",
                        padding: isDesktopScreen ? "10px" : "28px",
                        alignItems: "center",
                        fontWeight: "900",
                        margin: "1rem",
                      }}
                      onMouseEnter={(e) => handleOnMouseEnter(e, index)}
                      onMouseLeave={handleOnMouseLeave}
                      onClick={() => handleOnClick(el)}
                    >
                      <div className={Font.montFont}> {city}</div>
                      <div
                        className={Font.robotoFont}
                        style={{
                          display:
                            !isDesktopScreen && pathname == "/prayer-time"
                              ? "none"
                              : "flex",
                          flexDirection: "row",
                          fontWeight: "400",
                          fontSize: "18px",
                        }}
                      >
                        <div>{currentCityTime(timeZone).hour}</div>
                        <div style={{ marginLeft: "5px" }}>
                          {" "}
                          {currentCityTime(timeZone).period}
                        </div>
                      </div>
                    </div>
                  </span>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
