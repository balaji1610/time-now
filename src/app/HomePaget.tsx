"use client";
import TimeLayout from "./TimeLayout";
import CountryTime from "./Container/CountryTime";
import CountryTimeList from "./Container/CountryTimeList";
import GulfTimeZoneInfo from "@/app/utilities/GulfTimeZoneInfo";

export default function HomePage() {
  return (
    <div>
      <>
        <TimeLayout>
          <CountryTime />
          <CountryTimeList list={GulfTimeZoneInfo} />
        </TimeLayout>
      </>
    </div>
  );
}
