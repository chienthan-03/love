import { useRef } from "react";
import { ColorPicker } from "./ui/PickColor";
import MultiSelectTable from "./ui/MutipleSelectTable";
import DefaultInstrument from "./DefaultIntrument";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setColor } from "@/store/slice/settings";

export default function GeneralSettings() {
  const { color } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const primaryColorRef = useRef(color.primaryColor);
  const fontColorRef = useRef(color.fontColor);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Instruments</h3>
        <MultiSelectTable />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Default instrument</h3>
        <DefaultInstrument />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Primary Color</h3>
        <ColorPicker
          value={color.primaryColor}
          onChange={(v) => {
            primaryColorRef.current = v;
          }}
          onBlur={() => {
            dispatch(setColor({ primaryColor: primaryColorRef.current }));
          }}
        />
        <h3 className="mb-2 text-sm font-medium">Font Color</h3>
        <ColorPicker
          value={color.fontColor}
          onChange={(v) => {
            fontColorRef.current = v;
          }}
          onBlur={() => {
            dispatch(setColor({ fontColor: fontColorRef.current }));
          }}
        />
      </div>
    </div>
  );
}
