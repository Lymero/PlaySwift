import React from "react";
import { connect } from "react-redux";
import Navigation from "../../components/navigations/navigation";

class NavigationContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Navigation {...this.props} />;
    }
}

const mapStateToProps = state => ({
    current_user: state.usersSession.current_user
});

export default connect(mapStateToProps)(NavigationContainer);
