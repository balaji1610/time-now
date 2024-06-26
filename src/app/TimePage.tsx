"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
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
import Font from "@/app/page.module.css";
import { usePathname } from "next/navigation";
interface TimePageProps {
  children: [React.ReactNode, React.ReactNode];
}
let navgationHeight: string;
let firstChildrenHeight: string;
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
      "PRAYER TIME": "./prayer-time",
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
    navgationHeight = "33rem";
  } else if (pathname == "/prayer-time") {
    if (isDesktopScreen) {
      navgationHeight = "33rem";
    }
  }

  if (pathname == "/") {
    if (isDesktopScreen) {
      firstChildrenHeight = "35rem";
    } else {
      firstChildrenHeight = "21rem";
    }
  } else {
    if (isDesktopScreen) {
      firstChildrenHeight = "35rem";
    } else {
      firstChildrenHeight = "19rem";
    }
  }

  return (
    <div>
      {/* <Grid
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
            sx={{ cursor: "pointer", pointerEvents: "auto" }}
            onClick={openSidebar}
          />
        </Grid>
      </Grid> */}
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
        <Grid xs={isDesktopScreen ? 1 : 12}>
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: isDesktopScreen ? "flex-start" : "center",
              height: isDesktopScreen ? navgationHeight : "5rem",
              width: "5rem",
            }}
          >
            {" "}
            <MenuRoundedIcon
              fontSize="large"
              sx={{ cursor: "pointer", pointerEvents: "auto" }}
              onClick={openSidebar}
            />
          </div>
        </Grid>
        <Grid xs={isDesktopScreen ? 7 : 12}>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "100%",
              height: firstChildrenHeight,
            }}
          >
            {" "}
            {children[0]}
          </div>
        </Grid>
        <Grid xs={isDesktopScreen ? 4 : 12}>
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
    </div>
  );
}
