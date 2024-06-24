export interface timeOptionsType {
  timeStyle: "medium" | "full" | "long" | "short";
  timeZone: string;
}

export interface DateOptionsType {
  dateStyle: "medium" | "full" | "long" | "short";
  timeZone: string;
}

export interface TimeZoneInfoType {
  city: string;
  timeZone: string;
  country: string;
}

export interface PrayerTimeInfoType {
  slot: any;
  time: any;
}
