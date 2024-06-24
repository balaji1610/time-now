import { useApplicationContext } from "@/app/Context/ApplicationContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Font from "@/app/page.module.css";

export default function PrayerTimeLayout() {
  const {
    loading,
    currentCity,
    isNotDisplayPrayerTime,
    setLoading,
    setIsNotDisplayPrayerTime,
  } = useApplicationContext();
  const [CardHover, setCardHover] = useState<number | null>(null);
  const [prayertime, setPrayerTime] = useState([]);
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

  const PrayerTimeLayoutStyles = {
    loading: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center",
      height: "8rem",
    },
    prayerTimeCardHeaderLayout: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "center",
      height: "8rem",
    },
  };

  const CardMouseEnter = (e: any, index: number) => {
    setCardHover(index);
  };

  const CardMouseLeave = () => {
    setCardHover(null);
  };

  const prayerTwelveHourFormat = (time24: string) => {
    const [hours, minutes] = time24.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    const hour12 = date.getHours() % 12 || 12;
    const minute = date.getMinutes();
    const period = date.getHours() >= 12 ? "pm" : "am";
    const hourString = hour12.toString().padStart(2, "0");
    const minuteString = minute.toString().padStart(2, "0");
    return `${hourString}:${minuteString} ${period}`;
  };

  return (
    <div>
      <Grid container direction="row" justifyContent="center" xs={12}>
        <Grid>
          <>
            {" "}
            <h1 className={Font.city}>{`Prayer Times in ${currentCity}`}</h1>
          </>
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
                  <h3>NOT Display Prayer Times</h3>
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
              <div>
                {/* style={PrayerTimeLayoutStyles.prayerTimeCardHeaderLayout} */}
                {preparePrayerTimes.map((item: any, index: number) => {
                  return (
                    <span key={index} style={{ marginTop: "1rem" }}>
                      {" "}
                      <div
                        style={{
                          backgroundColor: "white",
                          border:
                            CardHover == index
                              ? "2px solid #0288D1"
                              : "1px solid #00000029",
                          display: "inline-flex",
                          flexDirection: "column" as "column",
                          width: "8rem",
                          color: "#000000",
                          cursor: "pointer",
                          rowGap: "8px",
                          padding: "35px",
                          alignItems: "center",
                          height: "4rem",
                          fontSize: "20px",
                        }}
                        className={Font.city}
                        onMouseEnter={(e) => CardMouseEnter(e, index)}
                        onMouseLeave={CardMouseLeave}
                      >
                        <div style={{ fontWeight: "900" }}>{item.slot}</div>
                        <div>{prayerTwelveHourFormat(item.time)}</div>
                      </div>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
