import "./index.css"; // Tailwind CSS 포함
import DevToolContainer from "./DevToolContainer";
import { setLocalStorageItem, getLocalStorageItem } from "./util";

export const LocalStorageToolbar = DevToolContainer;
export { setLocalStorageItem, getLocalStorageItem };
