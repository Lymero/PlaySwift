import React from "react";
import ReactDOM from "react-dom";
import ReactMain from "../react/main"

import 'bootstrap/dist/css/bootstrap.css';
import "../style/application.scss";
import "../../../node_modules/video.js/dist/video-js.min.css";

import auth from "react/services/auth0";
auth.verify();

// react
const rootElem = document.body.querySelector('#root');
const reactMainElem = React.createElement(ReactMain, {});
ReactDOM.render(reactMainElem, rootElem);