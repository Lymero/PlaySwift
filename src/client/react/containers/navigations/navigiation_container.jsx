import React from "react";
import { connect } from "react-redux";
import Navigation from "../../components/navigations/navigation";

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.authState.authenticated)
      return <Navigation {...this.props} />;
    return null;
  }
}

const mapStateToProps = state => ({
  current_user: localStorage.getItem("profile"),
  authState: state.usersSession.authState
});

export default connect(mapStateToProps)(NavigationContainer);
