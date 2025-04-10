import { forwardRef, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "../../lib/utils";
import { useForwardedRef } from "../../lib/use-forwarded-ref";
import { Button } from "../ui/button";
import type { ComponentProps } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Input } from "../ui/input";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<typeof Button>, "value" | "onChange" | "onBlur"> &
    ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value || "#FFFFFF";
    }, [value]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <div
            className={cn(
              "flex items-center gap-2 px-2 py-1 border border-slate-300 w-fit rounded-sm hover:bg-slate-100 hover:border-slate-400 cursor-pointer",
              className,
            )}
            onClick={() => setOpen(true)}
          >
            {/* Ô vuông màu */}
            <div
              className="h-5 w-5 rounded-md border"
              style={{ backgroundColor: parsedValue }}
            />
            {/* Text mã màu */}
            <span className="text-sm font-mono">
              {parsedValue.toUpperCase()}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full space-y-2 flex flex-col gap-2">
          <HexColorPicker color={parsedValue} onChange={onChange} />
          <Input
            maxLength={7}
            onChange={(e) => onChange(e.currentTarget.value)}
            ref={ref}
            value={parsedValue}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
