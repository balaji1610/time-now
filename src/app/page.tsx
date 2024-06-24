"use client";
import HomePage from "./HomePaget";
import { ApplicationProvider } from "./Context/ApplicationContext";
export default function Home() {
  return (
    <>
      <ApplicationProvider>
        {" "}
        <HomePage />
      </ApplicationProvider>
    </>
  );
}
