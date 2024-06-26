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
    // eslint-disable-next-line
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
    const period = date.getHours() >= 12 ? " PM" : " AM";
    const hourString = hour12.toString().padStart(2, "0");
    const minuteString = minute.toString().padStart(2, "0");

    const hoursFormat = `${hourString}:${minuteString}`;

    return {
      hours: hoursFormat,
      period: period,
    };
  };

  const PrayerTimeImage: any = {
    Fajr: <UpcomingIcon />,
    Dhuhr: <WbSunnyIcon />,
    Asr: <LightModeIcon />,
    Maghrib: <NightsStayIcon />,
    Isha: <DarkModeIcon />,
    Sunrise: <UpcomingIcon />,
    Sunset: <WbSunnyIcon />,
  };

  const prayerTimeColor = (slot: string) => {
    let imageColor;
    switch (slot) {
      case "Maghrib":
        imageColor = "#03A9F4";
        break;
      case "Isha":
        imageColor = "#03A9F4";
        break;
      default:
        imageColor = "#FBC02D";
    }
    return imageColor;
  };
  return (
    <div>
      <Grid container xs={12} direction="column">
        <Grid>
          {" "}
          <Grid container xs={12} direction="row" justifyContent="center">
            <Grid>
              <div>
                {" "}
                <h2
                  className={Font.city}
                  style={{
                    color: "#393E46",
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
                  Prayer Times in &nbsp;
                  <span style={{ color: "#393E46", fontWeight: "900" }}>
                    {currentCity}
                  </span>{" "}
                  now
                </h2>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          {" "}
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
                    {isDesktopScreen ? (
                      <>
                        {" "}
                        <div
                          style={
                            PrayerTimeLayoutStyles.prayerTimeCardHeaderLayout
                          }
                        >
                          <div
                            style={{
                              width: isDesktopScreen ? "auto" : "24rem",
                            }}
                          >
                            {firstPhasePrayerTime.map(
                              (item: any, index: number) => {
                                return (
                                  <span key={index}>
                                    {" "}
                                    <div
                                      style={{
                                        backgroundColor: "white",
                                        // border:
                                        //   CardHover == index ? "1px solid #757575" : "",
                                        display: "inline-flex",
                                        flexDirection: "column" as "column",
                                        width: isDesktopScreen
                                          ? "10rem"
                                          : "6rem",
                                        color: "#393E46",
                                        cursor: "pointer",
                                        rowGap: "5px",
                                        padding: isDesktopScreen
                                          ? "25px"
                                          : "28px",
                                        alignItems: "center",
                                        height: "4rem",
                                        fontSize: "20px",
                                        margin: isDesktopScreen
                                          ? "14px"
                                          : "15px",
                                      }}
                                      className={Font.city}
                                      onMouseEnter={(e) =>
                                        CardMouseEnter(e, index, "fistPhase")
                                      }
                                      onMouseLeave={() =>
                                        CardMouseLeave("fistPhase")
                                      }
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row" as "row",
                                          justifyContent: "normal",
                                          // width: "10rem",
                                        }}
                                      >
                                        {" "}
                                        <div
                                          style={{
                                            color:
                                              CardHover == index
                                                ? prayerTimeColor(item.slot)
                                                : "rgb(0, 0, 0)",
                                          }}
                                        >
                                          {PrayerTimeImage[item.slot]}{" "}
                                        </div>
                                        <div
                                          style={{
                                            fontWeight: "600",
                                            marginLeft: "8px",
                                          }}
                                        >
                                          {item.slot}
                                        </div>
                                      </div>
                                      <div
                                        className={Font.hourfont}
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <div>
                                          {
                                            prayerTwelveHourFormat(item.time)
                                              .hours
                                          }
                                        </div>
                                        <div style={{ marginLeft: "8px" }}>
                                          {
                                            prayerTwelveHourFormat(item.time)
                                              .period
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </span>
                                );
                              }
                            )}
                          </div>
                        </div>{" "}
                      </>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "white",
                          height: "12rem",
                        }}
                        className={Font.hourfont}
                      >
                        {firstPhasePrayerTime.map(
                          (item: any, index: number) => {
                            return (
                              <div key={index}>
                                <Grid container xs={12}>
                                  <Grid xs={6} sx={{ marginTop: "8px" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row" as "row",
                                        marginLeft: "4rem",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "2rem",
                                        }}
                                      >
                                        {PrayerTimeImage[item.slot]}
                                      </div>

                                      <div style={{}}>{item.slot}</div>
                                    </div>
                                  </Grid>
                                  <Grid xs={6} sx={{ marginTop: "8px" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row" as "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div>
                                        {
                                          prayerTwelveHourFormat(item.time)
                                            .hours
                                        }
                                      </div>
                                      <div style={{ marginLeft: "5px" }}>
                                        {
                                          prayerTwelveHourFormat(item.time)
                                            .period
                                        }
                                      </div>
                                    </div>
                                  </Grid>
                                </Grid>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}

                    <div style={{ marginTop: "1rem" }}>
                      <Divider variant="middle" />

                      {isDesktopScreen && (
                        <div
                          style={
                            PrayerTimeLayoutStyles.secondPhaseCardHeaderLayout
                          }
                        >
                          {secondPhasePrayerTime.map(
                            (item: any, index: number) => {
                              return (
                                <span key={index}>
                                  {" "}
                                  <div
                                    style={{
                                      backgroundColor: "white",
                                      // border:
                                      //   secondCardHover == index
                                      //     ? "1px solid #0288D1"
                                      //     : "1px solid #00000029",
                                      display: "inline-flex",
                                      flexDirection: "column" as "column",
                                      width: isDesktopScreen ? "10rem" : "6rem",
                                      color: "#393E46",
                                      cursor: "pointer",
                                      rowGap: "5px",
                                      padding: isDesktopScreen
                                        ? "25px"
                                        : "28px",
                                      alignItems: "center",
                                      height: "4rem",
                                      fontSize: "20px",
                                      margin: isDesktopScreen ? "14px" : "8px",
                                    }}
                                    className={Font.city}
                                    onMouseEnter={(e) =>
                                      CardMouseEnter(e, index, "secondphase")
                                    }
                                    onMouseLeave={() =>
                                      CardMouseLeave("secondphase")
                                    }
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row" as "row",
                                        justifyContent: "normal",
                                      }}
                                    >
                                      {" "}
                                      <div
                                        style={{
                                          color:
                                            secondCardHover == index
                                              ? prayerTimeColor(item.slot)
                                              : "rgb(0, 0, 0)",
                                        }}
                                      >
                                        {PrayerTimeImage[item.slot]}{" "}
                                      </div>
                                      <div
                                        style={{
                                          fontWeight: "600",
                                          marginLeft: "8px",
                                        }}
                                      >
                                        {item.slot}
                                      </div>
                                    </div>
                                    <div
                                      className={Font.hourfont}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                      }}
                                    >
                                      <div>
                                        {
                                          prayerTwelveHourFormat(item.time)
                                            .hours
                                        }
                                      </div>
                                      <div style={{ marginLeft: "8px" }}>
                                        {
                                          prayerTwelveHourFormat(item.time)
                                            .period
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </span>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
