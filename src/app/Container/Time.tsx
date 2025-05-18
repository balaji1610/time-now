"use client";
import React, { useEffect } from "react";

import Font from "@/app/page.module.css";
import TimeZone from "@/app/Style/TimeZoneStyle";
import { useApplicationContext } from "@/app/Context/ApplicationContext";
import { CityTime, CityDate, RegionalDate } from "@/app/lib/lib";

export default function Time() {
  const timeZoneStyle = TimeZone();
  const { setTime, currentTimeDate } = useApplicationContext();
  const { hour, period } = CityTime();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2
        className={Font.montFont}
        style={{ color: "#393E46", fontWeight: "400", textAlign: "center" }}
      >
        Time in&nbsp;
        <span style={{ color: "#393E46", fontWeight: "900" }}>
          {currentTimeDate.city}
        </span>{" "}
        now
      </h2>
      <div className={Font.robotoFont} style={timeZoneStyle.cityHour}>
        <div style={timeZoneStyle.cityTime}> {hour}</div>
        <div style={timeZoneStyle.cityPeriod}>{period}</div>
      </div>
      <div className={Font.montFont} style={timeZoneStyle.dateLayout}>
        <div>
          {" "}
          <h3 style={timeZoneStyle.date}>{CityDate()}</h3>
        </div>
        <div>
          {" "}
          <h5     style={timeZoneStyle.regionaldate}>{RegionalDate()}</h5>
        </div>
      </div>
    </div>
  );
}
