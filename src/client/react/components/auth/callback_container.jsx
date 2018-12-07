import React from "react";

class CallbackContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Auth Callback");
    return <p>Auth Callback..</p>;
  }
}

export default CallbackContainer;
