import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { AppContextProvider } from "./Context/AppContext";

import Home from "./Pages/Home";
import Dasboard from "./Pages/Dasboard";
import UserManage from "./Pages/User/Index";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Dasboard} />
          <Route path="/user/manage" exact={true} component={UserManage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
