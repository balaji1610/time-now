import {
  TimeOptionsType,
  DateOptionsType,
  PrayerTimeOptionsType,
} from "@/app/interface/commonInterface";

import { useApplicationContext } from "@/app/Context/ApplicationContext";

export const prayerNames = [
  "Fajr",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
  "Sunrise",
  "Sunset",
];

export const CityTime = () => {
  const { timeZone, time } = useApplicationContext();

  const Timeoptions = {
    timeStyle: "medium",
    timeZone: timeZone,
    hour12: true,
  };

  const dateTimeFormat = new Intl.DateTimeFormat(
    "en-GB",
    Timeoptions as TimeOptionsType
  )
    .format(time)
    .split(" ");

  return {
    hour: dateTimeFormat[0],
    period: dateTimeFormat[1].toUpperCase(),
  };
};

export const CityDate = () => {
  const { timeZone, time } = useApplicationContext();

  const DateOptions = {
    dateStyle: "full",
    timeZone: timeZone,
  };

  return new Intl.DateTimeFormat(
    "en-GB",
    DateOptions as DateOptionsType
  ).format(time);
};

export const RegionalDate = () => {
  const { timeZone, time } = useApplicationContext();

  const DateOptions = {
    dateStyle: "full",
    timeZone: timeZone,
  };

  return new Intl.DateTimeFormat(
    "en-US-u-ca-islamic",
    DateOptions as DateOptionsType
  )
    .format(time)
    .split(",")
    .slice(1, 3)
    .join(",");
};

export const prayerTimePeriod = (prayersTime: string) => {
  const PrayerTimeOptions = {
    timeStyle: "short",
    hour12: true,
  };

  const date = new Date();
  const time = prayersTime.split(":");
  date.setHours(Number(time[0]));
  date.setMinutes(Number(time[1]));

  const prayerTime = new Intl.DateTimeFormat(
    "en-GB",
    PrayerTimeOptions as PrayerTimeOptionsType
  )
    .format(date)
    .split(" ");

  return {
    hour: prayerTime[0],
    period: prayerTime[1].toUpperCase(),
  };
};

export const CurrentCityTime = (city: string) => {
  const { time } = useApplicationContext();

  const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "short",
    timeZone: city,
    hour12: true,
  } as TimeOptionsType)
    .format(time)
    .split(" ");

  return {
    hour: dateTimeFormat[0],
    period: dateTimeFormat[1].toUpperCase(),
  };
};
