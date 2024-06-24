"use client";
import TimePage from "./TimePage";
import CountryTime from "./Container/CountryTime";
import CountryTimeList from "./Container/CountryTimeList";
import GulfTimeZoneInfo from "@/app/utilities/GulfTimeZoneInfo";

export default function HomePage() {
  return (
    <div>
      <>
        <TimePage>
          <CountryTime />
          <CountryTimeList list={GulfTimeZoneInfo} />
        </TimePage>
      </>
    </div>
  );
}
