import React from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// antd v5+ global base styles (v4 shipped these inside antd.less)
import "antd/dist/reset.css";
import "./index.css";
import App from "./App";
import { HashRouter as Router } from "react-router";
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
