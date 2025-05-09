import { Grid } from "@mui/material";
import Font from "@/app/page.module.css";

export default function PrayerTimeList(props: any) {
  const { prayerTimeIcon, prayerTimePeriod, firstPhasePrayerTime } = props;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        height: "12rem",
      }}
      className={Font.robotoFont}
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
                    marginLeft: "2rem",
                  }}
                >
                  <div
                    style={{
                      width: "2rem",
                    }}
                  >
                    {prayerTimeIcon[item.prayer]}
                  </div>

                  <div>{item.prayer}</div>
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
                  <div>{prayerTimePeriod(item.time).hour}</div>
                  <div style={{ marginLeft: "5px" }}>
                    {prayerTimePeriod(item.time).period}
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
