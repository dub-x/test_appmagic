import type { LineConfig } from "@ant-design/charts";
import type { RangeFilterType, DateFormat } from "./utils";

type OptionsType<T> = {
  value: T;
  label: string;
}[];

export const RANGE_OPTIONS: OptionsType<RangeFilterType> = [
  { label: "All the time", value: "all" },
  { label: "Last year", value: "year" },
  { label: "Last month", value: "month" },
  { label: "Last day", value: "day" },
];

export const DISCRETENESS_OPTIONS: OptionsType<DateFormat> = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
];

export const CHART_CONFIG: Partial<LineConfig> = {
  xField: "date",
  yField: "price",

  axis: {
    x: {
      tickLength: 5,
      tickFilter: (_: any, i: number, data: any[]) => i % Math.ceil(data.length / 7) === 0,
    },
  },

  slider: {
    x: {},
  },
};
