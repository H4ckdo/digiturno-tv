import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TV from '../components/TV.jsx';

$(document).ready(() => {
  ReactDOM.render(
    <TV/>,
    document.getElementById("app")
  )
})
