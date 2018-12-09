import React, { Component } from "react";
import RouterOutlet from "react/components/routes/router_outlet";
import NavigationContainer from "react/components/navigation/navigation_container";

export class Layout extends Component {
  render() {
    return (
      <div>
        <React.Fragment>
          <NavigationContainer />
          <RouterOutlet />
        </React.Fragment>
      </div>
    );
  }
}

export default Layout;
