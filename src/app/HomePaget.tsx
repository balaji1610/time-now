"use client";
import TimeLayout from "./TimeLayout";
import Time from "./Container/Time";
import CountryTime from "./Container/CountryTime";
import GulfTimeZoneInfo from "@/app/utilities/GulfTimeZoneInfo";

export default function HomePage() {
  return (
    <div>
      <>
        <TimeLayout>
          <Time />
          <CountryTime timeLists={GulfTimeZoneInfo} />
        </TimeLayout>
      </>
    </div>
  );
}
