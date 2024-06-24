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
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import TimeZoneStyle from "@/app/Style/timeZoneStyle";

export default function TimePage() {
  const [time, setTime] = useState(new Date());
  const [currentTimeDate, setCurrentTimeDate] = useState(GulfTimeZoneInfo[1]);
  const [timeZone, setTimeZone] = useState(GulfTimeZoneInfo[1].timeZone);
  const [hover, setHover] = useState<number | null>(null);
  const [prayertime, setPrayerTime] = useState([]);
  const {
    setLoading,
    currentCity,
    setCurrentCity,
    setIsNotDisplayPrayerTime,
    isDesktopScreen,
  } = useApplicationContext();
  const timeZoneStyle = TimeZoneStyle();
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
  const router = useRouter();
  const [isSidbar, setIsSidebar] = useState<boolean>(false);

  const [open, setOpen] = useState(false);

  const openSidebar = () => {
    setOpen(true);
  };
  const closeSidebar = () => {
    setOpen(false);
  };

  const handleRouting = (currentRoute: string) => {
    const routering: {
      [x: string]: string;
    } = {
      Home: "/",
      PrayerTime: "./Prayer-Time",
    };
    router.push(routering[currentRoute as string]);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <div onClick={closeSidebar}>
        <CloseIcon fontSize="large" sx={{ cursor: "pointer" }} />
      </div>
      <List>
        {["Home", "PrayerTime"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleRouting(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <HomeIcon /> : <AccessTimeIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
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
          <MenuRoundedIcon
            fontSize="large"
            sx={{ cursor: "pointer" }}
            onClick={openSidebar}
          />
        </Grid>
      </Grid>
      <Drawer open={open} onClose={closeSidebar}>
        {DrawerList}
      </Drawer>
      <Grid
        container
        xs={12}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        height="27rem"
      >
        <Grid xs={isDesktopScreen ? 8 : 12}>
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
        <Grid xs={isDesktopScreen ? 4 : 12}>
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
        </Grid>
      </Grid>

      {/* <PrayerTimeLayout preparePrayerTimes={preparePrayerTimes} /> */}
    </div>
  );
}
