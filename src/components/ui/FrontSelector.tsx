import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@euroland/ci-shadcn-styleguide";
import { useStore } from "../../store/useStore";
import { debounce } from "es-toolkit";
import { useEffect, useMemo, useState } from "react";

export default function FontSelector() {
  const front = useStore((state) => state.front);
  const setFront = useStore((state) => state.setFront);
  const fonts = ["system", "arial", "inter", "open-sans"];

  const [localFontSize, setLocalFontSize] = useState(front.fontSize);

  const debouncedSetFontSize = useMemo(
    () => debounce((size: number) => {
      setFront({ ...front, fontSize: size });
    }, 300),
    [front, setFront]
  );

  useEffect(() => {
    debouncedSetFontSize(localFontSize);
  }, [localFontSize]);

  const increaseFontSize = () => {
    setLocalFontSize(prev => prev + 1);
  };

  const decreaseFontSize = () => {
    setLocalFontSize(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex items-center w-full">
      <div className="relative flex-1">
        <Select
          value={front.fontFamily}
          onValueChange={(value) =>
            setFront({ ...front, fontFamily: value })
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-l-sm rounded-r-none">
            <SelectValue placeholder="Select font" className="rounded-none" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem
                key={font}
                value={font}
                className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                style={{
                  fontFamily:
                    font === "system"
                      ? "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                      : font,
                }}
              >
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center border border-gray-300 rounded-r-sm rounded-l-none">
        <input
          value={localFontSize}
          onChange={(e) =>
            setLocalFontSize(parseInt(e.target.value) || 1)
          }
          className="w-12 text-center border-none focus:outline-none"
        />
        <div className="flex flex-col border-l border-gray-300">
          <button
            onClick={increaseFontSize}
            className="flex items-center justify-center h-4 hover:bg-gray-100"
          >
            <ChevronUp size={12} />
          </button>
          <button
            onClick={decreaseFontSize}
            className="flex items-center justify-center h-4 hover:bg-gray-100"
          >
            <ChevronDown size={12} />
          </button>
        </div>
        <span className="px-2">px</span>
      </div>
    </div>
  );
}
