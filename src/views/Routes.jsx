import React from "react";
import { Route, Switch } from "react-router-dom";

import Error from "./Error/Error";
import Main from "./Main/Main";
import Locations from "./Locations/Locations";
import Quest from "./Quest/Quest";
import Location from "./Locations/Location";

const Routes = () => {
  return (
		<Switch>
			<Route path="/" component={Main} exact />
			<Route path="/locations" component={Locations} exact />
			<Route path="/encounter/:id" component={Quest} exact />
			<Route path="/locations/:id" component={Location} exact />
			<Route component={Error} />
		</Switch>
	);
}

export default Routes;