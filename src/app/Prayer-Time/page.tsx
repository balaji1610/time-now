"use client";
import TimeLayout from "@/app/TimeLayout";
import PrayerTimeLayout from "../Container/PrayerTimeLayout";
import { ApplicationProvider } from "@/app/Context/ApplicationContext";
import CountryTimeList from "@/app/Container/CountryTimeList";
import EmiratesTime from "../utilities/EmiratesTime";

export default function PrayerTime() {
  return (
    <ApplicationProvider>
      {" "}
      <TimeLayout>
        <div style={{ height: "42rem" }}>
          <PrayerTimeLayout />
        </div>
        <CountryTimeList list={EmiratesTime} />
      </TimeLayout>
    </ApplicationProvider>
  );
}
