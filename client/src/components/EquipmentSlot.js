import React from "react";
import { GiBouncingSword, GiShieldImpact, GiCardDraw } from "react-icons/gi";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { Ri24HoursFill } from "react-icons/ri";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { FaBomb } from "react-icons/fa";
import {
  TbNumber1Small,
  TbNumber2Small,
  TbNumber3Small,
  TbNumber4Small,
  TbNumber5Small,
  TbNumber6Small,
  TbNumber7Small,
  TbNumber8Small,
  TbNumber9Small,
  TbNumber10Small,
  TbNumber11Small,
} from "react-icons/tb";

const styles = {
  slot: {
    width: "42%",
    height: "28%",
    padding: "2%",
    backgroundColor: "#ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  slotActive: {
    transform: "scale(0.95)", // 点击时缩小
  },
};

function EquipmentSlot({ onclick, item }) {
  const [isActive, setIsActive] = React.useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const Icon = () => {
    switch (item) {
      case 0:
        return (
          <div style={{ pointerEvents: "none" }}>
            <h3>empty</h3>
          </div>
        );
      case 1:
        return (
          <div style={{ pointerEvents: "none" }}>
            <GiBouncingSword style={{ fontSize: "110px" }} />
            <h5>
              Field Card: When this card is in play, the losing player loses an
              additional 1 life point.
            </h5>
          </div>
        );
      case 2:
        return (
          <div style={{ pointerEvents: "none" }}>
            <GiShieldImpact style={{ fontSize: "110px" }} />
            <h5>
              Field Card: When this card is in play, if you lose, lose 1 less
              life point.
            </h5>
          </div>
        );
      case 3:
        return (
          <div style={{ pointerEvents: "none" }}>
            <HiOutlineArrowLeftOnRectangle style={{ fontSize: "110px" }} />
            <h5>Recall the last card drawn.</h5>
          </div>
        );
      case 4:
        return (
          <div style={{ pointerEvents: "none" }}>
            <FaPersonWalkingArrowLoopLeft style={{ fontSize: "110px" }} />
            <h5>Recall the last card drawn by your opponent.</h5>
          </div>
        );
      case 5:
        return (
          <div style={{ pointerEvents: "none" }}>
            <HiOutlineSwitchVertical style={{ fontSize: "110px" }} />
            <h5>Exchange the last card of both players.</h5>
          </div>
        );
      case 6:
        return (
          <div style={{ pointerEvents: "none" }}>
            <FaBomb style={{ fontSize: "110px" }} />
            <h5>Remove all of the opponent's field cards.</h5>
          </div>
        );
      case 7:
        return (
          <div style={{ pointerEvents: "none" }}>
            <Ri24HoursFill style={{ fontSize: "110px" }} />
            <h5>
              Field Card: When this card is in play, change the rules to a
              24-point game.
            </h5>
          </div>
        );
      case 8:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber1Small
                style={{
                  fontSize: "100px",
                  position: "absolute",
                  bottom: 0,
                  left: "70px",
                }}
              />
            </div>
            <h5>If the card A is in the deck, draw it out.</h5>
          </div>
        );
      case 9:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber2Small
                style={{
                  fontSize: "100px",
                  position: "absolute",
                  bottom: 0,
                  left: "70px",
                }}
              />
            </div>
            <h5>If the card 2 is in the deck, draw it out.</h5>
          </div>
        );
      case 10:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber3Small
                style={{
                  fontSize: "100px",
                  position: "absolute",
                  bottom: 0,
                  left: "70px",
                }}
              />
            </div>
            <h5>If the card 3 is in the deck, draw it out.</h5>
          </div>
        );
      case 11:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber4Small
                style={{
                  fontSize: "100px",
                  position: "absolute",
                  bottom: 0,
                  left: "70px",
                }}
              />
            </div>
            <h5>If the card 4 is in the deck, draw it out.</h5>
          </div>
        );
      case 12:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber5Small
                style={{
                  fontSize: "100px",
                  position: "absolute",
                  bottom: 0,
                  left: "70px",
                }}
              />
            </div>
            <h5>If the card 5 is in the deck, draw it out.</h5>
          </div>
        );
      case 13:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber6Small
                style={{
                  fontSize: "100px",
                  position: "absolute",
                  bottom: 0,
                  left: "70px",
                }}
              />
            </div>
            <h5>If the card 6 is in the deck, draw it out.</h5>
          </div>
        );
      case 14:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber7Small
                style={{
                  fontSize: "100px",
                  position: "absolute",
                  bottom: 0,
                  left: "70px",
                }}
              />
            </div>
            <h5>If the card 7 is in the deck, draw it out.</h5>
          </div>
        );
      case 15:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber8Small
                style={{
                  fontSize: "100px",
                  position: "absolute",
                  bottom: 0,
                  left: "70px",
                }}
              />
            </div>
            <h5>If the card 8 is in the deck, draw it out.</h5>
          </div>
        );
      case 16:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber9Small
                style={{
                  fontSize: "100px",
                  position: "absolute",
                  bottom: 0,
                  left: "70px",
                }}
              />
            </div>
            <h5>If the card 9 is in the deck, draw it out.</h5>
          </div>
        );
      case 17:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber10Small
                style={{
                  fontSize: "80px",
                  position: "absolute",
                  bottom: 0,
                  left: "85px",
                }}
              />
            </div>
            <h5>If the card 10 is in the deck, draw it out.</h5>
          </div>
        );
      case 18:
        return (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ position: "relative" }}>
              <GiCardDraw style={{ fontSize: "110px" }} />
              <TbNumber11Small
                style={{
                  fontSize: "80px",
                  position: "absolute",
                  bottom: 0,
                  left: "85px",
                }}
              />
            </div>
            <h5>If the card J is in the deck, draw it out.</h5>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{ ...styles.slot, ...(isActive ? styles.slotActive : null) }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // 用于处理鼠标移出元素的情况
      onClick={onclick}
    >
      <Icon />
    </div>
  );
}

export default EquipmentSlot;
