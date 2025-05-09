"use client";
import React from "react";

export interface TimeOptionsType {
  timeStyle: "medium" | "full" | "long" | "short";
  timeZone: string;
}

export interface DateOptionsType {
  dateStyle: "medium" | "full" | "long" | "short";
  timeZone: string;
}

export interface PrayerTimeOptionsType {
  timeStyle: "medium" | "full" | "long" | "short";
  hour12: boolean;
}

export interface TimeZoneInfoType {
  city: string;
  timeZone: string;
  country?: string;
}

export interface EmiratesTimeType {
  city: string;
  timeZone: string;
}

export interface PrayerTimeIconType {
  [key: string]: React.ReactElement;
}

export interface PrayerTimesType {
  prayer: "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha" | "Sunrise" | "Sunset";
  time: string;
}

export interface TimeListsType {
  timeLists: TimeZoneInfoType[] | EmiratesTimeType[];
}
