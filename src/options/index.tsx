import { render } from "preact";
import { injectChatPopup } from "../content-script/ChatPopup/ChatPopup";
import App from "./App";

render(<App />, document.getElementById("app")!);
injectChatPopup();
