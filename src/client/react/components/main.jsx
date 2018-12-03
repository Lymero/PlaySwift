import React from "react";
import { HashRouter } from "react-router-dom";

import Layout from "./layout";

// TODO : wrap with authentication provider from redux

function Main() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}

export default Main;
