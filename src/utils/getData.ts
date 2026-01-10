import moment from "moment";
import groupBy from "lodash/groupBy";

export type InDataType = {
  time: string;
  gasPrice: number;
  gasValue: number;
  average: number;
  maxGasPrice: number;
  medianGasPrice: number;
}[];

export type ModDataType = {
  date: string;
  price: number;
}[];

//by hour/day/week
export type DateFormat = "hours" | "days" | "weeks";

const dateFormats = {
  hours: "YY-MM-DD hh:mm",
  days: "YY-MM-DD",
  weeks: "YY-MM wo [week]",
};

//prepare data
const prepareData = (data: InDataType, dateFormat: DateFormat) =>
  data.map((d) => ({
    price: d.gasPrice,
    date: d.time,
    _date: moment(d.time, "YY-MM-DD hh:mm").format(dateFormats[dateFormat]),
  }));

// group data by date
const groupData = (data: ReturnType<typeof prepareData>) =>
  groupBy(data, (d) => {
    return d._date;
  });

// get avarge price
const buildData = (data: ReturnType<typeof groupData>): ModDataType => {
  let result: ModDataType = [];

  for (const [key, val] of Object.entries(data)) {
    let totalCounts = val.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);

    result.push({ date: key, price: totalCounts / val.length });
  }

  return result;
};

export const getData = (data: InDataType, dateFormat: DateFormat): ModDataType => {
  let _data: any;

  _data = prepareData(data, dateFormat);
  _data = groupData(_data);
  _data = buildData(_data);

  return _data;
};
