"use client";
import TimeLayout from "@/app/TimeLayout";
import PrayerTimeLayout from "../Container/PrayerTime";
import { ApplicationProvider } from "@/app/Context/ApplicationContext";
import CountryTime from "@/app/Container/CountryTime";
import EmiratesTime from "../utilities/EmiratesTime";

export default function PrayerTime() {
  return (
    <ApplicationProvider>
      {" "}
      <TimeLayout>
        <PrayerTimeLayout />
        <CountryTime timeLists={EmiratesTime} />
      </TimeLayout>
    </ApplicationProvider>
  );
}
