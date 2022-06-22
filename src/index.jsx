import React from "react";
import { createRoot } from 'react-dom/client';
import store from "../src/store/store"; 
import { Provider } from 'react-redux'
import App from "./App";
import "./index.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
      <App/>
    </Provider>
)
