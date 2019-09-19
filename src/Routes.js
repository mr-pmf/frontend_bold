import React from "react";
import {
  Switch,
  Route //Router
} from "react-router-dom";

//Views:
import Add_Bottle from "./Views/Add_Bottle.js";
import Bottle_List from "./Views/Bottle_List.js";
import Login from "./Views/Login.js";
import See_Bottle_Details from "./Views/See_Bottle_Details.js";

const Routes = props => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/main" component={Bottle_List} />
    <Route exact path="/details" component={See_Bottle_Details} />
    <Route exact path="/add_bottle" component={Add_Bottle} />
  </Switch>
);

export default Routes;
