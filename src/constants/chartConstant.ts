export const CHART_TYPE_KEYS = {
  MOUNTAIN: {
    key: "mountain",
    label: "mountain",
  },
  LINE: {
    key: "line",
    label: "line",
  },
  CANDLESTICK: {
    key: "candlestick",
    label: "candlestick",
  },
  BAR_OHLC: {
    key: "bar",
    label: "bar",
  },
  BASELINE: {
    key: "baseline",
    label: "baseline",
  },
  BASE_MOUNTAIN: {
    key: "base-mountain",
    label: "baseMountain",
  },
};

export const CHART_INDICATOR_KEYS = {
  MACD: {
    key: "macd",
    label: "Macd",
  },
  RSI: {
    key: "rsi",
    label: "Rsi",
  },
  STOCHASTIC: {
    key: "stochastic",
    label: "Stochastic",
  },
  SMA: {
    key: "sma",
    label: "Sma",
  },
  BOLLINGER_BANDS: {
    key: "bb",
    label: "Bollinger Bands",
  },
};

export const CHART_OVERLAY_KEYS = {
  SMA: {
    key: "sma",
    label: "Sma",
  },
  BOLLINGER_BANDS: {
    key: "bb",
    label: "Bollinger Bands",
  },
};

export const CHART_SETTING_KEYS = {
  CHART_PREFERENCES: {
    key: "chart-preferences",
    label: "chart-preferences",
    HIGH_LOW_VALUE: {
      key: "high-low-value",
      label: "high-low-value",
    },
  },
  Y_AXIS_PREFERENCES: {
    key: "y-axis-preferences",
    label: "y-axis-preferences",
    LINEAR: {
      key: "linear",
      label: "linear",
    },
    LOG_SCALE: {
      key: "log-scale",
      label: "log-scale",
    },
    PERCENTAGE_VIEW: {
      key: "percentage-view",
      label: "percentage-view",
    },
  },
  VOLUME: {
    key: "volume",
    label: "volume",
    SHOW_HIDE: {
      key: "show-hide",
      label: "show",
    },
    UNDERLAY: {
      key: "overlay",
      label: "overlay",
    },
    COLOR_VOLUME_BAR: {
      key: "color-volume-bar",
      label: "color-volume-bar",
    },
  },
  TOOLTIP: {
    key: "tooltip",
    label: "tooltip",
  },
  SHOW_LAST_CLOSE_LINE: {
    key: "show-last-close-line",
    label: "showLastCloseLine",
  },
  TABLE_VIEW: {
    key: "table-view",
    label: "table-view",
  },
};

export const CHART_EVENT_KEYS = {
  DIVIDEND: {
    key: "dividend",
    label: "dividend",
  },
  EARNING: {
    key: "earning",
    label: "earning",
  },
};

export const TIME_INTERVALS = {
  "1m": {
    label: "minute",
    value: "1m",
    interval: {
      period: "minute",
      times: 1,
    },
  },
  "5m": {
    label: "minutes",
    value: "5m",
    interval: {
      period: "minute",
      times: 5,
    },
  },
  "10m": {
    label: "minutes",
    value: "10m",
    interval: {
      period: "minute",
      times: 10,
    },
  },
  "15m": {
    label: "minutes",
    value: "15m",
    interval: {
      period: "minute",
      times: 15,
    },
  },
  "30m": {
    label: "minutes",
    value: "30m",
    interval: {
      period: "minute",
      times: 30,
    },
  },
  "1h": {
    label: "hour",
    value: "1h",
    interval: {
      period: "hour",
      times: 1,
    },
  },
  daily: {
    label: "daily",
    value: "daily",
    interval: {
      period: "day",
      times: 1,
    },
  },
  weekly: {
    label: "weekly",
    value: "weekly",
    interval: {
      period: "week",
      times: 1,
    },
  },
  monthly: {
    label: "monthly",
    value: "monthly",
    interval: {
      period: "month",
      times: 1,
    },
  },
};

export const RANGE_CHART_INFO = {
  "1D": {
    period: "1D",
    label: "1D",
    defaultSelectedInterval: "5m",
    intervals: ["1m", "5m", "10m", "15m", "30m", "1h"],
    fromDateSubtract: {
      number: 1,
      unit: "day",
    },
  },
  "5D": {
    period: "5D",
    label: "5D",
    defaultSelectedInterval: "5m",
    intervals: ["1m", "5m", "10m", "15m", "30m", "1h"],
    fromDateSubtract: {
      number: 5,
      unit: "day",
    },
  },
  "1M": {
    period: "1M",
    label: "1M",
    defaultSelectedInterval: "daily",
    intervals: ["daily", "weekly"],
    fromDateSubtract: {
      number: 1,
      unit: "month",
    },
  },
  "3M": {
    period: "3M",
    label: "3M",
    defaultSelectedInterval: "daily",
    intervals: ["daily", "weekly"],
    fromDateSubtract: {
      number: 3,
      unit: "month",
    },
  },
  "6M": {
    period: "6M",
    label: "6M",
    defaultSelectedInterval: "daily",
    intervals: ["daily", "weekly"],
    fromDateSubtract: {
      number: 6,
      unit: "month",
    },
  },
  "1Y": {
    period: "1Y",
    label: "1Y",
    defaultSelectedInterval: "daily",
    intervals: ["daily", "weekly", "monthly"],
    fromDateSubtract: {
      number: 1,
      unit: "year",
    },
  },
  "5Y": {
    period: "5Y",
    label: "5Y",
    defaultSelectedInterval: "weekly",
    intervals: ["daily", "weekly", "monthly"],
    fromDateSubtract: {
      number: 5,
      unit: "year",
    },
  },
  "10Y": {
    period: "10Y",
    label: "10Y",
    defaultSelectedInterval: "weekly",
    intervals: ["daily", "weekly", "monthly"],
    fromDateSubtract: {
      number: 10,
      unit: "year",
    },
  },
};

export const DEFAULT_STORE_CHART_SETTINGS = {
  [CHART_SETTING_KEYS.CHART_PREFERENCES.key]: [],
  [CHART_SETTING_KEYS.Y_AXIS_PREFERENCES.key]: [
    CHART_SETTING_KEYS.Y_AXIS_PREFERENCES.LINEAR.key,
  ],
  [CHART_SETTING_KEYS.VOLUME.key]: [
    CHART_SETTING_KEYS.VOLUME.SHOW_HIDE.key,
    CHART_SETTING_KEYS.VOLUME.UNDERLAY.key,
    CHART_SETTING_KEYS.VOLUME.COLOR_VOLUME_BAR.key,
  ],
  [CHART_SETTING_KEYS.TOOLTIP.key]: [],
  [CHART_SETTING_KEYS.SHOW_LAST_CLOSE_LINE.key]: [],
  [CHART_SETTING_KEYS.TABLE_VIEW.key]: [],
};

export const periodToDisplayLabel = {
    "1D": "1 Day",
    "5D": "5 Days",
    "1M": "1 Month",
    "3M": "3 Months",
    "6M": "6 Months",
    "1Y": "1 Year",
    "5Y": "5 Years",
    "10Y": "10 Years",
}

export const intervalToDisplayLabel = {
    "1m": "1 minute",
    "5m": "5 minutes",
    "10m": "10 minutes",
    "15m": "15 minutes",
    "30m": "30 minutes",
    "1h": "1 hour",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
}
