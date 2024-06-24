"use client";
import { useApplicationContext } from "@/app/Context/ApplicationContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Font from "@/app/page.module.css";
import PrayerTimeLayoutStyle from "../Style/PrayerTimeLayoutStyle";

import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Divider from "@mui/material/Divider";
export default function PrayerTimeLayout() {
  const {
    loading,
    currentCity,
    isNotDisplayPrayerTime,
    isDesktopScreen,
    setLoading,
    setIsNotDisplayPrayerTime,
  } = useApplicationContext();
  const [CardHover, setCardHover] = useState<number | null>(null);

  const [secondCardHover, setSecondCardHover] = useState<number | null>(null);
  const [prayertime, setPrayerTime] = useState([]);
  const PrayerTimeLayoutStyles = PrayerTimeLayoutStyle();
  const fetchapi = async () => {
    try {
      setLoading(true);
      const getFetchapi = await fetch(
        "http://api.aladhan.com/v1/timingsByAddress?address=Dubai"
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
  }, []);

  const prayerTimeSlot = [
    "Fajr",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
    "Sunrise",
    "Sunset",
  ];

  const prayerTimeLists = Object.entries(prayertime).map(([key, value]) => {
    return {
      ["slot"]: key,
      ["time"]: value,
    };
  });

  const preparePrayerTimes = prayerTimeSlot
    .map((el) => {
      return prayerTimeLists.find((item) => el == item.slot);
    })
    .filter((el) => el != undefined);

  const firstPhasePrayerTime = preparePrayerTimes.slice(0, 5);
  const secondPhasePrayerTime = preparePrayerTimes.slice(-2);
  const CardMouseEnter = (e: any, index: number, para: string) => {
    if (para == "fistPhase") {
      setCardHover(index);
    } else {
      setSecondCardHover(index);
    }
  };

  const CardMouseLeave = (para: string) => {
    if (para == "fistPhase") {
      setCardHover(null);
    } else {
      setSecondCardHover(null);
    }
  };

  const prayerTwelveHourFormat = (time24: string) => {
    const [hours, minutes] = time24.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    const hour12 = date.getHours() % 12 || 12;
    const minute = date.getMinutes();
    const period = date.getHours() >= 12 ? "PM" : "AM";
    const hourString = hour12.toString().padStart(2, "0");
    const minuteString = minute.toString().padStart(2, "0");
    return `${hourString}:${minuteString} ${period}`;
  };

  const PrayerTimeImage: any = {
    Fajr: <UpcomingIcon />,
    Dhuhr: <WbSunnyIcon />,
    Asr: <LightModeIcon />,
    Maghrib: <NightsStayIcon />,
    Isha: <DarkModeIcon />,
    Sunrise: <WbSunnyIcon />,
    Sunset: <NightsStayIcon />,
  };

  return (
    <div>
      <Grid container direction="row" justifyContent="center" xs={12}>
        <Grid>
          <h2
            className={Font.city}
            style={{ color: "#393E46", fontWeight: "400", textAlign: "center" }}
          >
            Prayer Times in &nbsp;
            <span style={{ color: "#393E46", fontWeight: "900" }}>
              {currentCity}
            </span>{" "}
            now
          </h2>
        </Grid>
      </Grid>
      <div>
        {isNotDisplayPrayerTime ? (
          <div>
            {" "}
            <Grid container direction="row" justifyContent="center" xs={12}>
              <Grid>
                <>
                  {" "}
                  <h3 style={{ color: "red" }}>NOT Display Prayer Times</h3>
                </>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div>
            {loading ? (
              <div style={PrayerTimeLayoutStyles.loading}>
                <CircularProgress />
              </div>
            ) : (
              <>
                {" "}
                <div style={PrayerTimeLayoutStyles.prayerTimeCardHeaderLayout}>
                  {firstPhasePrayerTime.map((item: any, index: number) => {
                    return (
                      <span key={index}>
                        {" "}
                        <div
                          style={{
                            backgroundColor: "white",
                            border:
                              CardHover == index
                                ? "1px solid #0288D1"
                                : "1px solid #00000029",
                            display: "inline-flex",
                            flexDirection: "column" as "column",
                            width: isDesktopScreen ? "10rem" : "6rem",
                            color: "#000000",
                            cursor: "pointer",
                            rowGap: "8px",
                            padding: "35px",
                            alignItems: "center",
                            height: "4rem",
                            fontSize: "20px",
                            margin: isDesktopScreen ? "14px" : "8px",
                          }}
                          className={Font.city}
                          onMouseEnter={(e) =>
                            CardMouseEnter(e, index, "fistPhase")
                          }
                          onMouseLeave={() => CardMouseLeave("fistPhase")}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row" as "row",
                              justifyContent: "space-evenly",
                              width: "10rem",
                            }}
                          >
                            {" "}
                            <div>{PrayerTimeImage[item.slot]} </div>
                            <div style={{ fontWeight: "900" }}>{item.slot}</div>
                          </div>
                          <div>{prayerTwelveHourFormat(item.time)}</div>
                        </div>
                      </span>
                    );
                  })}
                </div>
                <div>
                  <Divider />
                  <div
                    style={PrayerTimeLayoutStyles.secondPhaseCardHeaderLayout}
                  >
                    {secondPhasePrayerTime.map((item: any, index: number) => {
                      return (
                        <span key={index}>
                          {" "}
                          <div
                            style={{
                              backgroundColor: "white",
                              border:
                                secondCardHover == index
                                  ? "1px solid #0288D1"
                                  : "1px solid #00000029",
                              display: "inline-flex",
                              flexDirection: "column" as "column",
                              width: isDesktopScreen ? "10rem" : "6rem",
                              color: "#000000",
                              cursor: "pointer",
                              rowGap: "8px",
                              padding: "35px",
                              alignItems: "center",
                              height: "4rem",
                              fontSize: "20px",
                              margin: isDesktopScreen ? "14px" : "8px",
                            }}
                            className={Font.city}
                            onMouseEnter={(e) =>
                              CardMouseEnter(e, index, "secondphase")
                            }
                            onMouseLeave={() => CardMouseLeave("secondphase")}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row" as "row",
                                justifyContent: "space-evenly",
                                width: "10rem",
                              }}
                            >
                              {" "}
                              <div>{PrayerTimeImage[item.slot]} </div>
                              <div style={{ fontWeight: "900" }}>
                                {item.slot}
                              </div>
                            </div>
                            <div>{prayerTwelveHourFormat(item.time)}</div>
                          </div>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
