import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Dasboard from "./Pages/Dasboard";
import UserManage from "./Pages/User/Index";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Dasboard} />
        <Route path="/user/manage" exact={true} component={UserManage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
