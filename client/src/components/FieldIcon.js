import React from "react";
import { GiBouncingSword, GiShieldImpact } from "react-icons/gi";
import { Ri24HoursFill } from "react-icons/ri";

function FieldIcon({ fields }) {
  const styles = {
    slot: {
      width: "90%",
      height: "40%",
      backgroundColor: "#ddd",
      display: "flex",
      alignItems: "center",

      flexDirection: "column",
    },
  };
  var cards = [
    <GiBouncingSword style={{ fontSize: "55px", marginTop: "10px" }} />,
    <GiShieldImpact style={{ fontSize: "55px", marginTop: "10px" }} />,
    <Ri24HoursFill style={{ fontSize: "55px", marginTop: "10px" }} />,
  ];
  var imgs = fields.map(function (card) {
    return cards[card];
  });
  return <div style={styles.slot}>{imgs}</div>;
}

export default FieldIcon;
