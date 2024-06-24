"use client";
import TimePage from "@/app/TimePage";
import PrayerTimeLayout from "../Container/PrayerTimeLayout";
import { ApplicationProvider } from "@/app/Context/ApplicationContext";
import CountryTimeList from "@/app/Container/CountryTimeList";
import TimeZoneInfo from "../utilities/TimeZoneInfo";

export default function PrayerTime() {
  return (
    <ApplicationProvider>
      {" "}
      <TimePage>
        <PrayerTimeLayout />
        <CountryTimeList list={TimeZoneInfo} />
      </TimePage>
    </ApplicationProvider>
  );
}
