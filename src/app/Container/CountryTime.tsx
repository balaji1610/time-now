"use client";
import React, { useState, useEffect } from "react";
import Font from "@/app/page.module.css";
import TimeZoneStyle from "@/app/Style/timeZoneStyle";
import { useApplicationContext } from "@/app/Context/ApplicationContext";
import {
  timeOptionsType,
  DateOptionsType,
} from "@/app/interface/commonInterface";

export default function CountryTime() {
  const timeZoneStyle = TimeZoneStyle();
  const {
    setLoading,
    currentCity,
    setCurrentCity,
    setIsNotDisplayPrayerTime,
    isDesktopScreen,
    time,
    setTime,
    currentTimeDate,
    setCurrentTimeDate,
    timeZone,
    setTimeZone,
    hover,
    setHover,
  } = useApplicationContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  const Timeoptions = {
    timeStyle: "medium",
    timeZone: timeZone,
    hour12: true,
  };

  const cityTime = new Intl.DateTimeFormat(
    "en-GB",
    Timeoptions as timeOptionsType
  )
    .format(time)
    .split(" ");

  const DateOptions = {
    dateStyle: "full",
    timeZone: timeZone,
  };

  const cityDate = new Intl.DateTimeFormat(
    "en-GB",
    DateOptions as DateOptionsType
  ).format(time);

  const regionalDate = new Intl.DateTimeFormat(
    "en-US-u-ca-islamic",
    DateOptions as DateOptionsType
  )
    .format(time)
    .split(",")
    .slice(1, 3)
    .join(",");

  return (
    <div>
      <h2
        className={Font.city}
        style={{ color: "#393E46", fontWeight: "400", textAlign: "center" }}
      >
        Time in&nbsp;
        <span style={{ color: "#393E46", fontWeight: "900" }}>
          {currentTimeDate.city}
        </span>{" "}
        now
      </h2>
      <div className={Font.hourfont} style={timeZoneStyle.hourFormatGrid}>
        <div style={timeZoneStyle.cityTime}> {cityTime[0]}</div>
        <div style={timeZoneStyle.hourFormat}>{cityTime[1].toUpperCase()}</div>
      </div>
      <div className={Font.city} style={timeZoneStyle.dateLayout}>
        <div>
          {" "}
          <h3 style={timeZoneStyle.date}>{cityDate}</h3>
        </div>
        <div>
          {" "}
          <h5 style={timeZoneStyle.regionaldate}>{regionalDate}</h5>
        </div>
      </div>
    </div>
  );
}
