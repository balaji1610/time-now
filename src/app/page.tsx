"use client";
import TimePage from "@/app/TimePage";
import { ApplicationProvider } from "./Context/ApplicationContext";
export default function Home() {
  return (
    <>
      <ApplicationProvider>
        {" "}
        <TimePage />
      </ApplicationProvider>
    </>
  );
}
