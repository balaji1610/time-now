import { Grid } from "@mui/material";

import Font from "@/app/page.module.css";

export default function PrayerTimeList(props: any) {
  const { PrayerTimeImage, prayerTwelveHourFormat, firstPhasePrayerTime } =
    props;

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "12rem",
      }}
      className={Font.hourfont}
    >
      {firstPhasePrayerTime.map((item: any, index: number) => {
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

                  <div>{item.slot}</div>
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
                  <div>{prayerTwelveHourFormat(item.time).hours}</div>
                  <div style={{ marginLeft: "5px" }}>
                    {prayerTwelveHourFormat(item.time).period}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </div>
  );
}
