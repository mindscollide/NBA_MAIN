import React from "react";
import { createRoot } from "react-dom/client";
// Open Sans served from node_modules (no external font CDN); weights used by the app
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// antd v5+ global base styles (v4 shipped these inside antd.less)
import "antd/dist/reset.css";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router";
import  {Provider}  from "react-redux";
import store from "./store/store";
import theme from "./theme";

// lets dayjs parse "DD-MM-YYYY"-style strings with an explicit format, as
// moment(value, format) did
dayjs.extend(customParseFormat);

// Static message/notification calls render outside the React tree; this
// makes them use the same theme.
ConfigProvider.config({
  holderRender: (children) => (
    <ConfigProvider theme={theme}>{children}</ConfigProvider>
  ),
});

createRoot(document.getElementById("root")).render(
    <Router>
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <App />
        </ConfigProvider>
      </Provider>
    </Router>
);
