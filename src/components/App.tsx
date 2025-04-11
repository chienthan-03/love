import { useCallback, useRef, useState } from "react";

import GeneralSettings from "./GeneralSettings";
import PreviewTools from "./PreviewTools";
import useResize from "../hooks/useResize";
import ShareGraphSetting from "./ShareGraphSetting";
import KeyFormContext from "../context/KeyFormContext";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@euroland/ci-shadcn-styleguide";
import { cssModulePrefix } from "../configs/cssModulePrefix";
import clsx from "clsx";

const App = () => {
  const [key, setKey] = useState("");
  const handleToolIFrameRef = useRef<any>(null);


  const { width } = useResize();

  const onChangeFormKey = useCallback(
    () => setKey(Math.random().toString(32).slice(2, 7)),
    []
  );

  const isMobile = width < 768;
  return (
      <div className={clsx(cssModulePrefix, "w-full shadow-md ")}>
        <div className="h-[calc(100vh-112px)]">
        <KeyFormContext.Provider value={{ key, onChangeFormKey }}>
          <ResizablePanelGroup
            direction={isMobile ? "vertical" : "horizontal"}
            className="w-full shadow-md"
          >
            <ResizablePanel
              defaultSize={isMobile ? 50 : 40}
              minSize={30}
              maxSize={70}
            >
              <div className="h-full flex flex-col gap-5 p-5 overflow-auto">
                <SectionRender label="General Settings" className="mt-3">
                  <GeneralSettings />
                </SectionRender>
                <SectionRender label="Minimal Share Graph" className="mt-3">
                  <ShareGraphSetting />
                </SectionRender>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />

            <ResizablePanel
              defaultSize={isMobile ? 50 : 60}
              minSize={30}
              maxSize={70}
            >
              <PreviewTools handleRef={handleToolIFrameRef} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </KeyFormContext.Provider>
        </div>
      </div>
  );
}

const SectionRender = ({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={className}>
      <p className="bg-slate-200 px-3 py-3 rounded-md text-[16px] font-semibold">
        {label}
      </p>
      <div className="mt-5">{children}</div>
    </div>
  );
};

export default App;