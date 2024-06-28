"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
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
import CloseIcon from "@mui/icons-material/Close";

import { useRouter, usePathname } from "next/navigation";

import { useApplicationContext } from "@/app/Context/ApplicationContext";
import Font from "@/app/page.module.css";

interface TimePageProps {
  children: [React.ReactNode, React.ReactNode];
}

let firstChildrenHeight: string;
let firstChildrenMargin: string;

export default function TimePage({ children }: TimePageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isDesktopScreen } = useApplicationContext();
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
      HOME: "/",
      "PRAYER TIME": "/prayer-time",
    };
    router.push(routering[currentRoute as string]);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <div
        onClick={closeSidebar}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginRight: "17px",
          height: "4rem",
          cursor: "pointer",
          pointerEvents: "auto",
        }}
      >
        <CloseIcon fontSize="medium" sx={{ color: "#808080ba" }} />
      </div>
      <Divider />
      <div>
        {" "}
        <List>
          {["HOME", "PRAYER TIME"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleRouting(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <HomeIcon /> : <AccessTimeIcon />}
                </ListItemIcon>
                <p className={Font.city} style={{ fontWeight: "600" }}>
                  {text}
                </p>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Divider />
    </Box>
  );

  if (pathname == "/") {
    if (isDesktopScreen) {
      firstChildrenHeight = "35rem";
      firstChildrenMargin = "12px";
    } else {
      firstChildrenHeight = "21rem";
      firstChildrenMargin = "0px";
    }
  } else {
    if (isDesktopScreen) {
      firstChildrenHeight = "35rem";
      firstChildrenMargin = "12px";
    } else {
      firstChildrenHeight = "19rem";
      firstChildrenMargin = "0px";
    }
  }

  return (
    <>
      <Grid
        container
        xs={12}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        height="97vh"
      >
        <Grid xs={isDesktopScreen ? 1 : 12} md={1} lg={1}>
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: isDesktopScreen ? "center" : "center",
              height: "5rem",
              width: "5rem",
            }}
          >
            {" "}
            <>
              {" "}
              <MenuRoundedIcon
                fontSize="large"
                sx={{ cursor: "pointer", pointerEvents: "auto" }}
                onClick={openSidebar}
              />
              <Drawer open={open} onClose={closeSidebar}>
                {DrawerList}
              </Drawer>
            </>
          </div>
        </Grid>
        <Grid xs={isDesktopScreen ? 7 : 12} md={7} lg={7}>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "100%",
              height: firstChildrenHeight,
              marginTop: firstChildrenMargin,
            }}
          >
            {" "}
            {children[0]}
          </div>
        </Grid>
        <Grid xs={isDesktopScreen ? 4 : 12} md={4} lg={4}>
          <div
            style={{
              height: isDesktopScreen ? "100vh" : "auto",
              backgroundColor: "#bdbdbd1a",
            }}
          >
            {children[1]}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
