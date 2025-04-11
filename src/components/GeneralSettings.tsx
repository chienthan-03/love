import ColorPicker from "./ui/PickColor";
import MultiSelectTable from "./ui/MutipleSelectTable";
import DefaultInstrument from "./DefaultIntrument";
import { useStore } from "../store/useStore";
import FontSelector from "./ui/FrontSelector";
import { debounce } from "es-toolkit";


function SettingField({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="text-sm block mb-1">{label}</label>
      {children}
    </div>
  );
}

export default function GeneralSettings() {
  const colors = useStore(state => state.colors);
  const setColors = useStore(state => state.setColors);
  const debounceSetColors = debounce((newColors: Partial<typeof colors>) => {
    setColors(newColors);
  }, 500);
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
        <h3 className="mb-2 text-sm font-medium">Colors</h3>
        <div className="space-y-4">
          <div className="flex flex-row gap-4">
            <SettingField label="Primary Color">
              <ColorPicker 
                value={colors.primaryColor}
                onChange={(color) => debounceSetColors({ primaryColor: color })}
              />
            </SettingField>
            <SettingField label="Font Color">
              <ColorPicker 
                value={colors.fontColor}
                onChange={(color) => debounceSetColors({ fontColor: color })}
              />
            </SettingField>
          </div>

          <SettingField label="Font Style">
            <FontSelector />
          </SettingField>

          <div className="flex flex-row gap-4">
            <SettingField label="Up Color">
              <ColorPicker
                value={colors.upColor}
                onChange={(color) => debounceSetColors({ upColor: color })}
              />
            </SettingField>
            <SettingField label="Down Color">
              <ColorPicker 
                value={colors.downColor}
                onChange={(color) => debounceSetColors({ downColor: color })}
              />
            </SettingField>
          </div>
        </div>
      </div>
    </div>
  );
}
