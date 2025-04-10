import DEFAULT_SETTING from "./defaultSetting";
import { VOLUME_OPTIONS, Y_AXIS_PREFERENCES_OPTIONS } from "./options";

export const SHARE_GRAPH_TOOL = "shareGraph";

export const DEFAULT_AVAILABLE_TOOLS = {
  selectedTools: ["SG"],
  version: "SG-0.1",
  company: {
    label: "Nordea Bank Abp",
    value: "S-NDA",
  },
};

export const defaultInstruments = [
  {
    id: 3256,
    name: "Nordea Bank (STO)",
    marketAbbreviation: "STO",
    marketId: 7,
    marketName: "Stockholm",
    symbol: "NDA SE",
    isin: "FI4000297767",
    key: 3256,
    allowRealTime: "No",
  },
  {
    id: 10459,
    name: "Nordea Bank (HEL)",
    marketAbbreviation: "HEL",
    marketId: 3,
    marketName: "Helsinki",
    symbol: "NDA FI",
    isin: "FI4000297767",
    key: 10459,
    allowRealTime: "No",
  },
  {
    id: 33020,
    name: "Nordea Bank (COP)",
    marketAbbreviation: "COP",
    marketId: 19,
    marketName: "Copenhagen",
    symbol: "NDA DK",
    isin: "FI4000297767",
    key: 33020,
    allowRealTime: "No",
  },
];

export const DEFAULT_GENERAL_TOOL_SETTINGS = {
  instrumentIds: defaultInstruments.map((ins) => ins.id),
  defaultSelectedInstrumentId: defaultInstruments[0].id,
  size: DEFAULT_SETTING.size,
  general: DEFAULT_SETTING.general,
};

export const DEFAULT_SG_SETTINGS = {
  dateRangesAndInterval: DEFAULT_SETTING.dateRangesAndInterval,
  defaultRange: DEFAULT_SETTING.defaultRange,
  chartConfiguration: DEFAULT_SETTING.chartConfiguration,
  tickerSettings: DEFAULT_SETTING.tickerSettings,
  valueTracking: DEFAULT_SETTING.valueTracking,
  events: DEFAULT_SETTING.events,
  customRange: true,
  controllerUI: {
    [VOLUME_OPTIONS.key]: false,
    [Y_AXIS_PREFERENCES_OPTIONS.key]: false,
  },
};
