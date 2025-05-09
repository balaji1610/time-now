"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import { usePathname } from "next/navigation";
import { useApplicationContext } from "@/app/Context/ApplicationContext";

import Sidebar from "./Container/Sidebar";

interface TimePageProps {
  children: [React.ReactNode, React.ReactNode];
}

export default function TimePage({ children }: TimePageProps) {
  const pathname = usePathname();
  const { isDesktopScreen } = useApplicationContext();

  let timeHeight: string;
  let timeMargin: string;
  if (pathname == "/") {
    if (isDesktopScreen) {
      timeHeight = "35rem";
      timeMargin = "12px";
    } else {
      timeHeight = "21rem";
      timeMargin = "0px";
    }
  } else {
    if (isDesktopScreen) {
      timeHeight = "35rem";
      timeMargin = "12px";
    } else {
      timeHeight = "19rem";
      timeMargin = "0px";
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
        <Grid xs={isDesktopScreen ? 1 : 12}>
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
            <Sidebar />
          </div>
        </Grid>
        <Grid xs={isDesktopScreen ? 7 : 12}>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "100%",
              height: timeHeight,
              marginTop: timeMargin,
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
    </>
  );
}
