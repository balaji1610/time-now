"use client";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";

import { useApplicationContext } from "@/app/Context/ApplicationContext";
import Font from "@/app/page.module.css";
import PrayerTimeLayoutStyle from "../Style/PrayerTimeStyle";
import PrayerTimeList from "@/app/Container/PrayerTimeList";
import { PrayerTimeIconType } from "@/app/interface/commonInterface";
import { prayerNames, prayerTimePeriod } from "@/app/lib/lib";

export default function PrayerTimeLayout() {
  const {
    isLoading,
    currentCity,
    isNotDisplayPrayerTime,
    isDesktopScreen,
    setIsLoading,
    setIsNotDisplayPrayerTime,
  } = useApplicationContext();

  const [firstPhasePrayerHover, setFirstPhasePrayerHover] = useState<
    number | null
  >(null);
  const [secodPhasePrayerHover, setSecodPhasePrayerHover] = useState<
    number | null
  >(null);
  const [prayertime, setPrayerTime] = useState([]);

  const PrayerTimeLayoutStyles = PrayerTimeLayoutStyle();

  const getPrayerTiming = async () => {
    try {
      setIsLoading(true);
      const dubaiPrayerTiming = await fetch(
        "https://api.aladhan.com/v1/timingsByAddress?address=Dubai"
      );
      const reponse = await dubaiPrayerTiming.json();
      if (reponse.code == "200") {
        setPrayerTime(reponse.data.timings);
      } else {
        setIsLoading(false);
        setPrayerTime([]);
        setIsNotDisplayPrayerTime(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPrayerTiming();
    // eslint-disable-next-line
  }, []);

  const prayerTimeLists = Object.entries(prayertime).map(([key, value]) => {
    return {
      ["prayer"]: key,
      ["time"]: value,
    };
  });

  const preparePrayerTimes = prayerNames
    .map((el) => {
      return prayerTimeLists.find((item) => el == item.prayer);
    })
    .filter((el) => el != undefined);

  const firstPhasePrayerTime = preparePrayerTimes.slice(0, 5);
  const secondPhasePrayerTime = preparePrayerTimes.slice(-2);

  const handleOnMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
    para: string
  ) => {
    if (para == "firstPhasePrayer") {
      setFirstPhasePrayerHover(index);
    } else {
      setSecodPhasePrayerHover(index);
    }
  };

  const handleOnMouseLeave = (para: string) => {
    if (para == "firstPhasePrayer") {
      setFirstPhasePrayerHover(null);
    } else {
      setSecodPhasePrayerHover(null);
    }
  };

  const prayerTimeIcon: PrayerTimeIconType = {
    Fajr: <UpcomingIcon />,
    Dhuhr: <WbSunnyIcon />,
    Asr: <LightModeIcon />,
    Maghrib: <NightsStayIcon />,
    Isha: <DarkModeIcon />,
    Sunrise: <UpcomingIcon />,
    Sunset: <WbSunnyIcon />,
  };

  const prayerTimeColor = (prayer: string) => {
    let imageColor;
    switch (prayer) {
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
                  className={Font.montFont}
                  style={{
                    color: "#393E46",
                    fontWeight: "400",
                    textAlign: "center",
                    height: "3rem",
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
                {isLoading ? (
                  <div style={PrayerTimeLayoutStyles.isLoading}>
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
                                      style={
                                        PrayerTimeLayoutStyles.prayerTimeLayout
                                      }
                                      className={Font.montFont}
                                      onMouseEnter={(e) =>
                                        handleOnMouseEnter(
                                          e,
                                          index,
                                          "firstPhasePrayer"
                                        )
                                      }
                                      onMouseLeave={() =>
                                        handleOnMouseLeave("firstPhasePrayer")
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
                                              firstPhasePrayerHover == index
                                                ? prayerTimeColor(item.prayer)
                                                : "rgb(0, 0, 0)",
                                          }}
                                        >
                                          {prayerTimeIcon[item.prayer]}{" "}
                                        </div>
                                        <div
                                          style={{
                                            fontWeight: "600",
                                            marginLeft: "8px",
                                          }}
                                        >
                                          {item.prayer}
                                        </div>
                                      </div>
                                      <div
                                        className={Font.robotoFont}
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <div>
                                          {prayerTimePeriod(item.time).hour}
                                        </div>
                                        <div style={{ marginLeft: "8px" }}>
                                          {prayerTimePeriod(item.time).period}
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
                      <div>
                        <PrayerTimeList
                          prayerTimeIcon={prayerTimeIcon}
                          firstPhasePrayerTime={firstPhasePrayerTime}
                          prayerTimePeriod={prayerTimePeriod}
                        />
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
                                    style={
                                      PrayerTimeLayoutStyles.prayerTimeLayout
                                    }
                                    className={Font.montFont}
                                    onMouseEnter={(e) =>
                                      handleOnMouseEnter(
                                        e,
                                        index,
                                        "secondPhasePrayer"
                                      )
                                    }
                                    onMouseLeave={() =>
                                      handleOnMouseLeave("secondPhasePrayer")
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
                                            secodPhasePrayerHover == index
                                              ? prayerTimeColor(item.prayer)
                                              : "rgb(0, 0, 0)",
                                        }}
                                      >
                                        {prayerTimeIcon[item.prayer]}{" "}
                                      </div>
                                      <div
                                        style={{
                                          fontWeight: "600",
                                          marginLeft: "8px",
                                        }}
                                      >
                                        {item.prayer}
                                      </div>
                                    </div>
                                    <div
                                      className={Font.robotoFont}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                      }}
                                    >
                                      <div>
                                        {prayerTimePeriod(item.time).hour}
                                      </div>
                                      <div style={{ marginLeft: "8px" }}>
                                        {prayerTimePeriod(item.time).period}
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
