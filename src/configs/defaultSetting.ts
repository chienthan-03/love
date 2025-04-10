import {
  CHART_EVENT_KEYS,
  CHART_SETTING_KEYS,
  CHART_TYPE_KEYS,
  TIME_INTERVALS,
} from "../constants/chartConstant";
import {
  CHART_PREFERENCES_OPTIONS,
  VOLUME_OPTIONS,
  Y_AXIS_PREFERENCES_OPTIONS,
} from "./options";

export const FONTS = {
  SYSTEM: {
    key: "system",
    value:
      "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
  },
  ARIAL: {
    key: "arial",
    value: "Arial, sans-serif",
  },
  INTER: {
    key: "inter",
    value: "Inter",
  },
  OPEN_SANS: {
    key: "open-sans",
    value: "OpenSans",
  },
};

const DEFAULT_SETTING = {
  size: {
    width: "100%",
    height: "100%",
  },
  instrumentId: [],
  dateRangesAndInterval: [
    {
      period: "1D",
      intervals: ["1m", "5m", "10m", "15m", "30m", "1h"],
    },

    {
      period: "5D",
      intervals: ["1m", "5m", "10m", "15m", "30m", "1h"],
    },
    {
      period: "1M",
      intervals: [TIME_INTERVALS.daily.value, TIME_INTERVALS.weekly.value],
    },
    {
      period: "3M",
      intervals: [TIME_INTERVALS.daily.value, TIME_INTERVALS.weekly.value],
    },
    {
      period: "6M",
      intervals: [TIME_INTERVALS.daily.value, TIME_INTERVALS.weekly.value],
    },
    {
      period: "1Y",
      intervals: [
        TIME_INTERVALS.daily.value,
        TIME_INTERVALS.weekly.value,
        TIME_INTERVALS.monthly.value,
      ],
    },
    {
      period: "5Y",
      intervals: [
        TIME_INTERVALS.daily.value,
        TIME_INTERVALS.weekly.value,
        TIME_INTERVALS.monthly.value,
      ],
    },
    {
      period: "10Y",
      intervals: [
        TIME_INTERVALS.daily.value,
        TIME_INTERVALS.weekly.value,
        TIME_INTERVALS.monthly.value,
      ],
    },
  ],
  defaultRange: {
    period: "1Y",
    interval: "daily",
  },
  general: {
    locale: "en",
    fontFamily: FONTS.SYSTEM.key,
    fontSize: "14", // px
    fontColor: "#131722",
    upColor: "#26a69a",
    downColor: "#ef5350",
    primaryColor: "#2962ff",
  },
  chartConfiguration: {
    gridColor: "#f2f2f2",
    axesFontsize: "14", // px
    axesColor: "#131722",
    chartType: CHART_TYPE_KEYS.MOUNTAIN.key,
    [CHART_SETTING_KEYS.CHART_PREFERENCES.key]:
      CHART_PREFERENCES_OPTIONS.options.map((opt) => opt.key).join(","),
    [CHART_SETTING_KEYS.Y_AXIS_PREFERENCES.key]:
      Y_AXIS_PREFERENCES_OPTIONS.options[0].key,
    [CHART_SETTING_KEYS.VOLUME.key]: VOLUME_OPTIONS.options
      .map((opt) => opt.key)
      .join(","),
    [CHART_SETTING_KEYS.TOOLTIP.key]: CHART_SETTING_KEYS.TOOLTIP.key,
    [CHART_SETTING_KEYS.SHOW_LAST_CLOSE_LINE.key]: "",
    [CHART_SETTING_KEYS.TABLE_VIEW.key]: CHART_SETTING_KEYS.TABLE_VIEW.key,
  },
  tickerSettings: {
    dataFields: "open,high,low,close,volume",
    template: "ticker",
    refreshTickerTime: 60,
  },
  valueTracking: "legend",
  events: `${CHART_EVENT_KEYS.EARNING.key},${CHART_EVENT_KEYS.DIVIDEND.key}`, // earning, dividend
};

export const url =
  "http://localhost:5173/?tooltip=tooltip&volume=show-hide,underlay&show-last-close-line=show-last-close-line&chartType=line&width=100&height=100&instrumentId=32864&defaultRange=1M%2Cdaily&dateRangesAndInterval=1D;5D%7C1m,5m,10m&locale=en&fontFamily=Arial&fontSize=20&fontColor=%23131722&upColor=green&downColor=red&primaryColor=%232962ff&gridColor=%232962ff&axesFontsize=20&axesColor=%23131722&dataFields=open,high,low,close,volume&template=ticker&valueTracking=legend";

export default DEFAULT_SETTING;
