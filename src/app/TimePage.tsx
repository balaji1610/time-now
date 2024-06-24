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

interface TimePageProps {
  children: [React.ReactNode, React.ReactNode];
}
export default function TimePage({ children }: TimePageProps) {
  const router = useRouter();

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
      "PRAYER TIME": "./Prayer-Time",
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
        <CloseIcon fontSize="large" />
      </div>
      <Divider />
      <div className={Font.city}>
        {" "}
        <List>
          {["HOME", "PRAYER TIME"].map((text, index) => (
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
      </div>
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
            sx={{ cursor: "pointer", pointerEvents: "auto" }}
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
    </div>
  );
}
