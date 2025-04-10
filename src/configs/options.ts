import { CHART_EVENT_KEYS, CHART_SETTING_KEYS } from "../constants/chartConstant";

export const CHART_PREFERENCES_OPTIONS = {
  key: CHART_SETTING_KEYS.CHART_PREFERENCES.key,
  label: CHART_SETTING_KEYS.CHART_PREFERENCES.label,
  options: [CHART_SETTING_KEYS.CHART_PREFERENCES.HIGH_LOW_VALUE].map(
    (item) => ({ value: item.key, ...item })
  ),
};

export const Y_AXIS_PREFERENCES_OPTIONS = {
  key: CHART_SETTING_KEYS.Y_AXIS_PREFERENCES.key,
  label: CHART_SETTING_KEYS.Y_AXIS_PREFERENCES.label,
  options: [
    CHART_SETTING_KEYS.Y_AXIS_PREFERENCES.LINEAR,
    CHART_SETTING_KEYS.Y_AXIS_PREFERENCES.LOG_SCALE,
    CHART_SETTING_KEYS.Y_AXIS_PREFERENCES.PERCENTAGE_VIEW,
  ].map((item) => ({ value: item.key, ...item })),
};

export const VOLUME_OPTIONS = {
  key: CHART_SETTING_KEYS.VOLUME.key,
  label: CHART_SETTING_KEYS.VOLUME.label,
  options: [
    CHART_SETTING_KEYS.VOLUME.SHOW_HIDE,
    CHART_SETTING_KEYS.VOLUME.UNDERLAY,
    CHART_SETTING_KEYS.VOLUME.COLOR_VOLUME_BAR,
  ].map((item) => ({
    value: item.key,
    ...item,
  })),
};

export const TOOLTIP_OPTIONS = {
  key: CHART_SETTING_KEYS.TOOLTIP.key,
  label: CHART_SETTING_KEYS.TOOLTIP.label,
  options: [CHART_SETTING_KEYS.TOOLTIP].map((item) => ({
    value: item.key,
    ...item,
  })),
};

export const SHOW_LAST_CLOSE_LINE_OPTIONS = {
  key: CHART_SETTING_KEYS.SHOW_LAST_CLOSE_LINE.key,
  label: CHART_SETTING_KEYS.SHOW_LAST_CLOSE_LINE.label,
  options: [CHART_SETTING_KEYS.SHOW_LAST_CLOSE_LINE].map((item) => ({
    value: item.key,
    ...item,
  })),
};

export const TABLE_VIEW_OPTIONS = {
  key: CHART_SETTING_KEYS.TABLE_VIEW.key,
  label: CHART_SETTING_KEYS.TABLE_VIEW.label,
  options: [CHART_SETTING_KEYS.TABLE_VIEW].map((item) => ({
    value: item.key,
    ...item,
  })),
};

export const VALUE_TRACKING_OPTIONS = ["legend", "tooltip"].map((item) => ({
  value: item,
  label: item,
}));

export const TICKER_TEMPLATE_OPTIONS = ["ticker", "table"].map((item) => ({
  value: item,
  label: item,
}));

export const DATA_FIELDS_OPTIONS = [
  "open",
  "high",
  "low",
  "close",
  "volume",
].map((item) => ({
  value: item,
  label: item,
}));

export const CHART_EVENT_KEYS_OPTIONS = Object.values(CHART_EVENT_KEYS).map(
  (item) => ({ ...item, value: item.key })
);
