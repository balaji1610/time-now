"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import GulfTimeZoneInfo from "./utilities/GulfTimeZoneInfo";
import Font from "../app/page.module.css";
import {
  timeOptionsType,
  DateOptionsType,
  TimeZoneInfoType,
} from "../app/interface/commonInterface";
import PrayerTimeLayout from "./Container/PrayerTimeLayout";
import { useApplicationContext } from "@/app/Context/ApplicationContext";

export default function TimePage() {
  const [time, setTime] = useState(new Date());
  const [currentTimeDate, setCurrentTimeDate] = useState(GulfTimeZoneInfo[0]);
  const [timeZone, setTimeZone] = useState(GulfTimeZoneInfo[0].timeZone);
  const [hover, setHover] = useState<number | null>(null);
  const [prayertime, setPrayerTime] = useState([]);
  const { setLoading, currentCity, setCurrentCity } = useApplicationContext();

  const fetchapi = async () => {
    try {
      setLoading(true);
      const getFetchapi = await fetch(
        `http://api.aladhan.com/v1/timingsByAddress?address=${currentCity}`
      );
      const getData = await getFetchapi.json();
      setPrayerTime(getData.data.timings);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchapi();
  }, [currentCity, setCurrentCity]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const Timeoptions = {
    timeStyle: "medium",
    timeZone: timeZone,
  };

  const cityTime = new Intl.DateTimeFormat(
    "en-GB",
    Timeoptions as timeOptionsType
  ).format(time);

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
  ).format(time);

  const timeZoneStyle = {
    cityTime: {
      fontSize: "16rem",
      display: "inline",
      marginLeft: "13rem",
      lineHeight: "12rem",
      color: "#333333",
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
      fontWeight: "300",
      fontSize: "31px",
    },
    regionaldate: {
      fontWeight: "300",
      fontSize: "20px",
      color: "#4CAF50",
    },
  };

  const currentCityTime = (city: string) => {
    return new Intl.DateTimeFormat("en-GB", {
      timeStyle: "short",
      timeZone: city,
    } as timeOptionsType).format(time);
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

  const preparePrayerTimes = Object.entries(prayertime)
    .map(([key, value]) => {
      const prayerTimeSlot = [
        "Fajr",
        "Sunrise",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha",
      ];
      if (prayerTimeSlot.includes(key)) {
        return {
          ["slot"]: key,
          ["time"]: value,
        };
      }
    })
    .filter((el) => el != undefined);

  return (
    <div style={{ overflow: "hidden" }}>
      <Grid container xs={12}>
        <Grid>
          <h1
            className={Font.city}
            style={{ color: "#757575", fontWeight: "400" }}
          >
            Time in&nbsp;
            <span style={{ color: "black", fontWeight: "900" }}>
              {currentTimeDate.city}
            </span>{" "}
            , {currentTimeDate.country} now
          </h1>
          <h1 className={Font.city} style={timeZoneStyle.cityTime}>
            {cityTime}
          </h1>
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="flex-end" xs={12}>
        <Grid>
          <h3 className={Font.city} style={timeZoneStyle.date}>
            {cityDate}
          </h3>
          <h5 className={Font.city} style={timeZoneStyle.regionaldate}>
            {regionalDate}
          </h5>
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="flex-end" xs={12}>
        <Grid>
          {GulfTimeZoneInfo.map((el, index) => {
            const { city, timeZone } = el;
            const isHovered = hover === index;
            const isClicked = currentCity === city;
            return (
              <span key={index} style={{ marginLeft: "1rem" }}>
                <div
                  style={{
                    backgroundColor: isClicked
                      ? "#999999"
                      : isHovered
                      ? "#999999"
                      : "rgb(0 0 0 / 0.1)",
                    display: "inline-flex",
                    flexDirection: "column" as "column",
                    width: "8rem",
                    color: isClicked ? "white" : isHovered ? "white" : "black",
                    cursor: "pointer",
                    rowGap: "6px",
                    padding: "10px",
                    alignItems: "center",
                    fontWeight: "900",
                  }}
                  onMouseEnter={(e) => MouseEnter(e, index)}
                  onMouseLeave={MouseLeave}
                  onClick={() => handleOnClick(el)}
                  className={Font.city}
                >
                  <div className={Font.city}> {city}</div>
                  <div style={{ fontWeight: "400", fontSize: "18px" }}>
                    {currentCityTime(timeZone)}
                  </div>
                </div>
              </span>
            );
          })}
        </Grid>
      </Grid>
      <PrayerTimeLayout preparePrayerTimes={preparePrayerTimes} />
    </div>
  );
}
