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
// import PrayerTimeLayout from "./Container/PrayerTimeLayout";
import { useApplicationContext } from "@/app/Context/ApplicationContext";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function TimePage() {
  const [time, setTime] = useState(new Date());
  const [currentTimeDate, setCurrentTimeDate] = useState(GulfTimeZoneInfo[1]);
  const [timeZone, setTimeZone] = useState(GulfTimeZoneInfo[1].timeZone);
  const [hover, setHover] = useState<number | null>(null);
  const [prayertime, setPrayerTime] = useState([]);
  const isdeskopScreen = useMediaQuery("(min-width:600px)");

  const { setLoading, currentCity, setCurrentCity, setIsNotDisplayPrayerTime } =
    useApplicationContext();

  const fetchapi = async () => {
    try {
      setLoading(true);
      const getFetchapi = await fetch(
        `http://api.aladhan.com/v1/timingsByAddress?address=${currentCity}`
      );
      const reponse = await getFetchapi.json();
      if (reponse.code == "200") {
        setPrayerTime(reponse.data.timings);
      } else {
        setLoading(false);
        setPrayerTime([]);
        setIsNotDisplayPrayerTime(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const timeZoneStyle = {
    cityFlex: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center",
      color: "#393E46",
    },
    cityTime: {
      fontSize: isdeskopScreen ? "10rem" : "4rem",
      display: "inline",
      lineHeight: isdeskopScreen ? "11rem" : "6rem",
      width: "49rem",
    },
    hourFormat: {
      fontSize: isdeskopScreen ? "5rem" : "2rem",
      display: "flex",
      flexDirection: "column" as "column",
      height: isdeskopScreen ? "12rem" : "6rem",
      alignItems: "center",
      justifyContent: "center",
      width: isdeskopScreen ? "auto" : "100%",
    },
    currentCityParentCard: {
      display: "flex",
      flexDirection: "row" as "row",
      height: isdeskopScreen ? "20rem" : "40rem",
      alignItems: "center",
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
      marginRight: "53px",
    },
    dateLayout: {
      display: "inline-flex",
      flexDirection: "column" as "column",
      justifyContent: isdeskopScreen ? "flex-start" : "center",
      alignItems: "center",
      height: "6rem",
      width: "20rem",
      rowGap: "1rem",
      color: "#393E46",
    },
  };

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

  const preparePrayerTimes = Object?.entries(prayertime)
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
    <div>
      <Grid
        container
        xs={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="5rem"
        width="6%"
      >
        <Grid>
          <MenuRoundedIcon fontSize="large" sx={{ cursor: "pointer" }} />
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        height="27rem"
      >
        <Grid xs={isdeskopScreen ? 8 : 12}>
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
          <div className={Font.hourfont} style={timeZoneStyle.cityFlex}>
            {" "}
            <div style={timeZoneStyle.cityTime}> {cityTime[0]}</div>
            <div style={timeZoneStyle.hourFormat}>
              {cityTime[1].toUpperCase()}
            </div>
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
        </Grid>
        <Grid xs={isdeskopScreen ? 4 : 12}>
          <div style={timeZoneStyle.currentCityParentCard}>
            <div>
              {" "}
              {GulfTimeZoneInfo.map((el, index) => {
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
                        width: "6rem",
                        color: isClicked
                          ? "white"
                          : isHovered
                          ? "white"
                          : "#393E46",
                        cursor: "pointer",
                        rowGap: "6px",
                        padding: isdeskopScreen ? "10px" : "22px",
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
        </Grid>
      </Grid>
      {/* <PrayerTimeLayout preparePrayerTimes={preparePrayerTimes} /> */}
    </div>
  );
}
