import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { stringifyParamsToURL } from "../utils";
import { IDateRangeAndInterval, useStore } from "../store/useStore";
import { pickBy } from "es-toolkit";
import { appDataContext } from "@euroland/ci-utils";

const getDateRangesAndIntervalStr = (dateRangesAndInterval : IDateRangeAndInterval[]) => {
  return dateRangesAndInterval
    .map(({ period, intervals }) => `${period}|${intervals.join(",")}`)
    .join(";");
};

function ToolIFrame({ handleRef }) {
  const [url, setURL] = useState("");
  const ref = useRef(null);
  
  const selectedInstruments = useStore(state => state.selectedInstruments);
  const defaultInstrument = useStore(state => state.defaultInstrument);
  const dateRangesAndInterval = useStore(state => state.dateRangesAndInterval);
  const colors = useStore(state => state.colors);
  const front = useStore(state => state.front);
  
  const { companyCode } = appDataContext.get()
  console.log("companyCode", companyCode);
  
  const getNewURL = () => {
    const newURL = stringifyParamsToURL(
      pickBy(
        {
          companyCode,
          instrumentIds: selectedInstruments.map(inst => inst.id).join(","),
          defaultSelectedInstrumentId: defaultInstrument?.id,
          fontColor: colors.fontColor,
          primaryColor: colors.primaryColor,
          upColor: colors.upColor,
          downColor: colors.downColor,
          fontFamily: front.fontFamily,
          fontSize: front.fontSize,
          dateRangesAndInterval: getDateRangesAndIntervalStr(dateRangesAndInterval)
        },
        (value) => !!value || typeof value === "boolean"
      )
    );
    return newURL;
  };

  useEffect(() => {
    setURL(getNewURL());
  }, [selectedInstruments, defaultInstrument, colors, front, dateRangesAndInterval]);

  useImperativeHandle(
    handleRef,
    () => ({
      onReload: () => {
        setURL(getNewURL());
      },
    }),
    [selectedInstruments, defaultInstrument, colors, front, dateRangesAndInterval]
  );

  return (
    <div className="h-full">
      <div className="flex flex-col h-full gap-2">
        <div className="flex-1">
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
