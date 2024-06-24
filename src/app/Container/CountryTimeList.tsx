"use client";
import React, { useState, useEffect } from "react";
import Font from "@/app/page.module.css";
import TimeZoneStyle from "@/app/Style/timeZoneStyle";
import { useApplicationContext } from "@/app/Context/ApplicationContext";
import {
  timeOptionsType,
  TimeZoneInfoType,
} from "@/app/interface/commonInterface";
import { usePathname } from "next/navigation";

export default function CountryTimeList(props: any) {
  const { list } = props;
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
  } = useApplicationContext();

  const currentCityTime = (city: string) => {
    return new Intl.DateTimeFormat("en-GB", {
      timeStyle: "short",
      timeZone: city,
      hour12: true,
    } as timeOptionsType)
      .format(time)
      .split(" ");
  };

  const handleOnClick = (item: TimeZoneInfoType) => {
    setCurrentTimeDate(item);
    setTimeZone(item.timeZone);
    setCurrentCity(item.city);
  };

  const MouseEnter = (e: any, index: number) => {
    setHover(index);
  };

  const MouseLeave = () => {
    setHover(null);
  };

  let Cardwidth: string;
  if (pathname == "/") {
    Cardwidth = "6rem";
  } else if (pathname == "/Prayer-Time") {
    if (isDesktopScreen) {
      Cardwidth = "8rem";
    } else {
      Cardwidth = "6rem";
    }
  }

  return (
    <div>
      {" "}
      <div style={timeZoneStyle.currentCityParentCard}>
        <div>
          {list.map((el: any, index: number) => {
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
                    display: "inline-flex",
                    flexDirection: "column" as "column",
                    width: Cardwidth,
                    whiteSpace: "nowrap",
                    color: isClicked
                      ? "white"
                      : isHovered
                      ? "white"
                      : "#393E46",
                    cursor: "pointer",
                    rowGap: "6px",
                    padding: isDesktopScreen ? "10px" : "28px",
                    alignItems: "center",
                    fontWeight: "900",
                    margin: "1rem",
                  }}
                  onMouseEnter={(e) => MouseEnter(e, index)}
                  onMouseLeave={MouseLeave}
                  onClick={() => handleOnClick(el)}
                >
                  <div className={Font.city}> {city}</div>
                  <div
                    className={Font.hourfont}
                    style={{ fontWeight: "400", fontSize: "18px" }}
                  >
                    {currentCityTime(timeZone)[0]}&nbsp;
                    {currentCityTime(timeZone)[1].toUpperCase()}
                  </div>
                </div>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
