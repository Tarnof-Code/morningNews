import React from "react";
import { connect } from "react-redux";
import "./App.css";

function Banner(props) {
  return (
    <div className="Banner">
      <img
        className="flag"
        src="/images/la-france.png"
        alt="french flag"
        onClick={() => props.frenchClick()}
      />

      <img
        className="flag"
        src="/images/royaume-uni.png"
        alt="british flag"
        onClick={() => props.englishClick()}
      />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    englishClick: function () {
      dispatch({ type: "english" });
    },
    frenchClick: function () {
      dispatch({ type: "french" });
    },
  };
}

export default connect(null, mapDispatchToProps)(Banner);
