import { createContext } from "react";

type KeyFormContextType = {
  key: string;
  onChangeFormKey: () => void;
}

const KeyFormContext = createContext<KeyFormContextType>({
  key: "",
  onChangeFormKey: () => {},
});

export default KeyFormContext;
