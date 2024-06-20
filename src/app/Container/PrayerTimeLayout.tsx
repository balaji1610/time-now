import { useApplicationContext } from "@/app/Context/ApplicationContext";
import CircularProgress from "@mui/material/CircularProgress";
export default function PrayerTimeLayout({ preparePrayerTimes }: any) {
  const { loading } = useApplicationContext();

  return (
    <div>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div>
          {preparePrayerTimes.map((item: any, index: number) => {
            return (
              <div key={index}>
                {item.slot}-{item.time}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
