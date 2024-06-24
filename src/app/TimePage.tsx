"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import GulfTimeZoneInfo from "./utilities/GulfTimeZoneInfo";

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
import CountryTime from "@/app/Container/CountryTime";
import CountryTimeList from "@/app/Container/CountryTimeList";

interface TimePageProps {
  children: [React.ReactNode, React.ReactNode];
}
export default function TimePage({ children }: TimePageProps) {
  // const [prayertime, setPrayerTime] = useState([]);

  const { isDesktopScreen } = useApplicationContext();
  const timeZoneStyle = TimeZoneStyle();

  // --
  const router = useRouter();

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
        <Grid xs={isDesktopScreen ? 8 : 12}>{children[0]}</Grid>
        <Grid xs={isDesktopScreen ? 4 : 12}>{children[1]}</Grid>
      </Grid>

      {/* <PrayerTimeLayout preparePrayerTimes={preparePrayerTimes} /> */}
    </div>
  );
}
