import React from "react";
import ReactDOM from "react-dom/client";
import ReactForm from "./Pages/ReactForm";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<ReactForm />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);