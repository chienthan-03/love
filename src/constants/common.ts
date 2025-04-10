import { i18n } from "../i18n";

export const CHART_KEYS = {
  OVERLAYS: "overlays",
  INDICATORS: "indicators",
  CHART_TYPE: "chart_type",
  EVENTS: "events",
};

export const MAX_SELECTED_OPTIONS = {
  DEFAULT: 1,
  ALL: 100,
  INDICATORS: 1,
  OVERLAYS: 3,
};

export const DATE_FORMAT = "YYYY-MM-DD";

export const getIntervalLabel = (translationKey, times) => {
  const translationLabel = i18n.translate(translationKey);
  switch (translationKey) {
    case "minute":
    case "minutes":
    case "hour":
      return `${times} ${translationLabel}`;

    default:
      break;
  }

  return translationLabel;
};
