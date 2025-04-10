import { useLayoutEffect, useState } from "react";

// 1. useResize hook
const useResize = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const handleResize = (e: UIEvent) => {
      setWidth((e.target as Window).innerWidth);
    };
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width };
};

// 2. useBreakpoint hook
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<
    "ssm" | "sm" | "md" | "mobile" | "tablet" | "xl"
  >("xl");
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const [isTabletScreen, setIsTabletScreen] = useState<boolean>(false);
  const { width } = useResize();

  useLayoutEffect(() => {
    if (typeof width === "undefined") return;

    const computedStyles = getComputedStyle(document.documentElement);
    const ssm = parseInt(computedStyles.getPropertyValue("--break-point-mobile__ssm"));
    const sm = parseInt(computedStyles.getPropertyValue("--break-point-mobile__sm"));
    const md = parseInt(computedStyles.getPropertyValue("--break-point-mobile__md"));
    const mobile = parseInt(computedStyles.getPropertyValue("--break-point-mobile"));
    const tablet = parseInt(computedStyles.getPropertyValue("--break-point-tablet"));

    setBreakpoint(() => {
      if (width <= ssm) return "ssm";
      if (width <= sm) return "sm";
      if (width <= md) return "md";
      if (width <= mobile) return "mobile";
      if (width <= tablet) return "tablet";
      return "xl";
    });

    setIsMobileScreen(width <= mobile);
    setIsTabletScreen(width <= tablet);
  }, [width]);

  return { breakpoint, isMobileScreen, isTabletScreen };
};

// 3. UserAgent class
export class UserAgent {
  static get nav(): Navigator | { userAgent: string; platform?: string; maxTouchPoints?: number } {
    return typeof navigator !== "undefined" ? navigator : { userAgent: "" };
  }

  static get userAgent(): string {
    return this.nav.userAgent;
  }

  static get ipad(): boolean {
    return (
      this.userAgent.includes("iPad") ||
      (this.nav.platform === "MacIntel" && (this.nav.maxTouchPoints || 0) > 1)
    );
  }

  static get iphone(): boolean {
    return this.userAgent.includes("iPhone");
  }

  static get isAndroid(): boolean {
    return this.userAgent.toLowerCase().includes("android");
  }

  static get isSafari(): boolean {
    return this.userAgent.includes("Safari/") && !this.userAgent.includes("Chrome/");
  }

  static get isMobile(): boolean {
    return this.ipad || this.iphone || this.isAndroid;
  }
}

export default useResize;
