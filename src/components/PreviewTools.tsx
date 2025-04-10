import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { stringifyParamsToURL } from "../utils";
import { useAppStore } from "../hooks/useAppStore";
import {pickBy} from "es-toolkit";

function ToolIFrame({ handleRef }) {
  const [url, setURL] = useState("");
  const ref = useRef(null);
  const store = useAppStore();
  const getDateRangesAndIntervalStr = (dateRangesAndInterval = []) => {
    return dateRangesAndInterval
      .map(({ period, intervals }) => `${period}|${intervals.join(",")}`)
      .join(";");
  };
  console.log({aaaaa: store.getState()});
  
  const getUnControllerUIParams = (controllerUI = {}) => {
    return Object.keys(controllerUI)
      .filter((key) => !controllerUI[key])
      .join(",");
  };

  const getNewURL = () => {
    const formState = store.getState().forms;
    const availableTools =
      formState.availableTools.draft ?? formState.availableTools.initState;
    const generalSettings =
      formState.generalSettings.draft ?? formState.generalSettings.initState;
    const shareGraph =
      formState.tools.shareGraph.draft ?? formState.tools.shareGraph.initState;
    const newURL = stringifyParamsToURL(
      pickBy(
        {
          companyCode: availableTools.company?.value,
          instrumentIds: generalSettings.instrumentIds.join(","),
          realtimeIds: generalSettings.instrumentIds.join(","),
          defaultSelectedInstrumentId:
            generalSettings.defaultSelectedInstrumentId,
          // width: generalSettings.size.width,
          // height: generalSettings.size.height,
          // locale: generalSettings.general.locale,
          fontFamily: generalSettings.general.fontFamily,
          fontSize: generalSettings.general.fontSize,
          fontColor: generalSettings.general.fontColor,
          upColor: generalSettings.general.upColor,
          downColor: generalSettings.general.downColor,
          primaryColor: generalSettings.general.primaryColor,
          gridColor: shareGraph.chartConfiguration.gridColor,
          axesFontsize: shareGraph.chartConfiguration.axesFontsize,
          axesColor: shareGraph.chartConfiguration.axesColor,
          chartType: shareGraph.chartConfiguration.chartType,
          "chart-preferences":
            shareGraph.chartConfiguration["chart-preferences"],
          "y-axis-preferences":
            shareGraph.chartConfiguration["y-axis-preferences"],
          volume: shareGraph.chartConfiguration.volume,
          // tooltip: shareGraph.chartConfiguration.tooltip,
          "show-last-close-line":
            shareGraph.chartConfiguration["show-last-close-line"],
          // "table-view": shareGraph.chartConfiguration["table-view"],
          // valueTracking: shareGraph.valueTracking,
          // dataFields: shareGraph.tickerSettings.dataFields,
          // template: shareGraph.tickerSettings.template,
          refreshTickerTime: shareGraph.tickerSettings.refreshTickerTime,
          defaultRange: `${shareGraph.defaultRange.period},${shareGraph.defaultRange.interval}`,
          dateRangesAndInterval: getDateRangesAndIntervalStr(
            shareGraph.dateRangesAndInterval
          ),
          customRange: shareGraph.customRange && null,
          unControllerUI: getUnControllerUIParams(shareGraph.controllerUI),
          events: shareGraph.events,
        },
        (value) => !!value || typeof value === "boolean"
      )
    );
    return newURL;
  };

  useEffect(() => {
    setURL(getNewURL());
  }, []);

  useImperativeHandle(
    handleRef,
    () => ({
      onReload: (formState) => {
        // ref.current.src = getNewURL();
        setURL(getNewURL());
      },
    }),
    []
  );
  return (
    <div className="h-full">
      <div className="flex flex-col h-full gap-2">
        <div className=" flex-1">
          <iframe
            ref={ref}
            width="100%"
            height="100%"
            className="preview-iframe-tool"
            src={url}
          />
        </div>
      </div>
    </div>
  );
}

export default ToolIFrame;
