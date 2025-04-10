import React from 'react';
import { useBreakpoint } from "./useResize";

type Breakpoint = "ssm" | "sm" | "md" | "mobile" | "lg" | "xl" | "xxl";

interface UseInputStyleReturn {
  isSmallMobile: boolean;
  isMobile: boolean;
  inputStyle: React.CSSProperties;
}

const useInputStyle = (): UseInputStyleReturn => {
  const { breakpoint } = useBreakpoint();
  const isMobile: boolean = ["ssm", "sm", "md", "mobile"].includes(breakpoint as Breakpoint);
  const isSmallMobile: boolean = ["ssm", "sm"].includes(breakpoint as Breakpoint);

  const inputStyle = React.useMemo((): React.CSSProperties => {
    if (isSmallMobile) {
      return {
        width: "100%",
      };
    }
    return {
      width: "310px",
    };
  }, [isSmallMobile]);

  return {
    isSmallMobile,
    isMobile,
    inputStyle,
  };
};

export { useInputStyle };
