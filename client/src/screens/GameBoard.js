import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { useCardContext } from "../context/CardContext";
import EquipmentSlot from "../components/EquipmentSlot";
import FieldIcon from "../components/FieldIcon";
var dField = [];
var yField = [];
export default function ({ restart, setGameStop }) {
  const {
    dealerSum,
    yourSum,
    dealerDeck,
    yourDeck,
    drawCard,
    stay,
    stopGame,
    turn,
    channel,
    client,
    setRivalStay,
    recallYourCard,
    recallDealerCard,
    exchangeCard,
    sumLimit,
    setSumLimit,
    drawSpecificCard,
    items,
    setItems,
  } = useCardContext();
  const [showDealerSum, setShowDealerSum] = useState(false);
  const [judgment, setJudgment] = useState(null);
  const [myHP, setMyHP] = useState(5);
  const [dealerHP, setDealerHP] = useState(5);
  const [dealerField, setDealerField] = useState([]);
  const [yourField, setYourField] = useState([]);
  useEffect(() => {
    if (stopGame) {
      setShowDealerSum(true);
      var winner = whoWins();
      setJudgment(winner);
      if (winner === "You Win!") {
        var damage = 1;
        for (var i = 0; i < yourField.length; ++i) {
          if (yourField[i] === 0) {
            damage += 1;
          }
        }
        for (var i = 0; i < dealerField.length; ++i) {
          if (dealerField[i] === 0) {
            damage += 1;
          }
          if (dealerField[i] === 1) {
            damage -= 1;
          }
        }
        if (damage < 0) {
          damage = 0;
        }
        setDealerHP(dealerHP - damage);
      } else if (winner === "You Lose!") {
        var damage = 1;
        for (var i = 0; i < dealerField.length; ++i) {
          if (dealerField[i] === 0) {
            damage += 1;
          }
        }
        for (var i = 0; i < yourField.length; ++i) {
          if (yourField[i] === 0) {
            damage += 1;
          }
          if (yourField[i] === 1) {
            damage -= 1;
          }
        }
        if (damage < 0) {
          damage = 0;
        }
        setMyHP(myHP - damage);
      }
    }
  }, [stopGame]);

  useEffect(() => {
    if (restart) {
      console.log("restart board");
      setSumLimit(21);
      dField = [];
      yField = [];
      setDealerField(dField);
      setYourField(yField);
      setShowDealerSum(false);
      setJudgment(null);
    }
  }, [restart]);

  useEffect(() => {
    if (channel) {
      channel.on((event) => {
        if (event.type === "use-item" && event.user.id !== client.userID) {
          if (event.data.id !== 0) {
            setRivalStay(false);
          }
          if (event.data.id === 1) {
            dField = event.data.yField;
            setDealerField(dField);
          }
          if (event.data.id === 2) {
            dField = event.data.yField;
            setDealerField(dField);
          }
          if (event.data.id === 6) {
            if (event.data.setLimit === true) {
              setSumLimit(21);
            }
            yField = [];
            setYourField(yField);
          }
          if (event.data.id === 7) {
            dField = event.data.yField;
            setDealerField(dField);
            setSumLimit(24);
          }
        }
      });
    }
  }, [channel]);

  const useItem = async (id) => {
    var itemID = items[id];
    if (itemID !== 0) {
      if (!turn) {
        alert("You can only use item in your turn");
        return;
      }
      setRivalStay(false);
      var itemSet = [...items];
      for (var i = 0; i < 6; ++i) {
        if (i === id) {
          itemSet[i] = 0;
        } else if (i !== 0 && itemSet[i - 1] === 0) {
          itemSet[i - 1] = itemSet[i];
          itemSet[i] = 0;
        }
      }
      setItems(itemSet);
    }

    if (itemID === 1) {
      yField.push(0);
      setYourField(yField);
      await channel.sendEvent({
        type: "use-item",
        data: { yField, id: 1 },
      });
    }

    if (itemID === 2) {
      yField.push(1);
      setYourField(yField);
      await channel.sendEvent({
        type: "use-item",
        data: { yField, id: 2 },
      });
    }

    if (itemID === 3) {
      recallYourCard();
    }
    if (itemID === 4) {
      recallDealerCard();
    }
    if (itemID === 5) {
      exchangeCard();
    }
    if (itemID === 6) {
      var setLimit = false;
      for (var i = 0; i < dField.length; ++i) {
        if (dField[i] === 2) {
          setLimit = true;
        }
      }
      for (var i = 0; i < yField.length; ++i) {
        if (yField[i] === 2) {
          setLimit = false;
        }
      }
      dField = [];
      setDealerField(dField);
      if (setLimit) {
        setSumLimit(21);
      }
      await channel.sendEvent({
        type: "use-item",
        data: { yField, setLimit, id: 6 },
      });
    }
    if (itemID === 7) {
      yField.push(2);
      setYourField(yField);
      setSumLimit(24);
      await channel.sendEvent({
        type: "use-item",
        data: { yField, id: 7 },
      });
    }
    if (itemID === 8) {
      drawSpecificCard("A");
    }
    if (itemID === 9) {
      drawSpecificCard("2");
    }
    if (itemID === 10) {
      drawSpecificCard("3");
    }
    if (itemID === 11) {
      drawSpecificCard("4");
    }
    if (itemID === 12) {
      drawSpecificCard("5");
    }
    if (itemID === 13) {
      drawSpecificCard("6");
    }
    if (itemID === 14) {
      drawSpecificCard("7");
    }
    if (itemID === 15) {
      drawSpecificCard("8");
    }
    if (itemID === 16) {
      drawSpecificCard("9");
    }
    if (itemID === 17) {
      drawSpecificCard("10");
    }
    if (itemID === 18) {
      drawSpecificCard("11");
    }
  };

  const whoWins = () => {
    if (dealerSum > sumLimit && yourSum > sumLimit) {
      if (dealerSum > yourSum) {
        return "You Win!";
      } else if (dealerSum === yourSum) {
        return "Tie!";
      }
      return "You Lose!";
    } else if (dealerSum > sumLimit && yourSum <= sumLimit) {
      return "You Win!";
    } else if (dealerSum <= sumLimit && yourSum > sumLimit) {
      return "You Lose!";
    } else {
      if (dealerSum === yourSum) {
        return "Tie!";
      } else if (dealerSum < yourSum) {
        return "You Win!";
      }
      return "You Lose!";
    }
  };

  return (
    <div style={styles.cardGameContainer}>
      <div style={styles.equipmentBar}>
        <EquipmentSlot
          item={items[0]}
          onclick={() => {
            useItem(0);
          }}
        />
        <EquipmentSlot
          item={items[1]}
          onclick={() => {
            useItem(1);
          }}
        />
        <EquipmentSlot
          item={items[2]}
          onclick={() => {
            useItem(2);
          }}
        />
        <EquipmentSlot
          item={items[3]}
          onclick={() => {
            useItem(3);
          }}
        />
        <EquipmentSlot
          item={items[4]}
          onclick={() => {
            useItem(4);
          }}
        />
        <EquipmentSlot
          item={items[5]}
          onclick={() => {
            useItem(5);
          }}
        />
      </div>
      <div style={styles.fieldBar}>
        <h5>Dealer Field</h5>
        <FieldIcon fields={dealerField} />
        <h5>Your Field</h5>
        <FieldIcon fields={yourField} />
      </div>
      <div style={styles.body}>
        <div style={styles.healthBar}>
          My HP: {myHP} <br />
          Dealer HP: {dealerHP}
        </div>
        <h2 style={{ visibility: showDealerSum ? "hidden" : "visible" }}>
          {turn ? "Your Turn" : "Rival's Turn"}
        </h2>
        <h2 style={{ visibility: showDealerSum ? "visible" : "hidden" }}>
          Dealer: {dealerSum}
        </h2>
        <div style={{ width: "100%" }}>
          <Cards
            deck={dealerDeck}
            cover={judgment ? false : true}
            turn={!turn}
          />
        </div>
        <h2>You: {yourSum}</h2>
        <Cards deck={yourDeck} cover={false} turn={turn} />

        <br></br>
        <button
          style={styles.btn}
          onClick={async () => {
            if (judgment !== null) {
              return;
            }
            drawCard();
          }}
        >
          Hit
        </button>
        <button
          style={styles.btn}
          onClick={() => {
            stay().then((event) => {
              if (event) {
                setGameStop(true);
                setShowDealerSum(true);
                var winner = whoWins();
                setJudgment(winner);
                if (winner === "You Win!") {
                  var damage = 1;
                  for (var i = 0; i < yourField.length; ++i) {
                    if (yourField[i] === 0) {
                      damage += 1;
                    }
                  }
                  for (var i = 0; i < dealerField.length; ++i) {
                    if (dealerField[i] === 0) {
                      damage += 1;
                    }
                    if (dealerField[i] === 1) {
                      damage -= 1;
                    }
                  }
                  if (damage < 0) {
                    damage = 0;
                  }
                  setDealerHP(dealerHP - damage);
                } else if (winner === "You Lose!") {
                  var damage = 1;
                  for (var i = 0; i < dealerField.length; ++i) {
                    if (dealerField[i] === 0) {
                      damage += 1;
                    }
                  }
                  for (var i = 0; i < yourField.length; ++i) {
                    if (yourField[i] === 0) {
                      damage += 1;
                    }
                    if (yourField[i] === 1) {
                      damage -= 1;
                    }
                  }
                  if (damage < 0) {
                    damage = 0;
                  }
                  setMyHP(myHP - damage);
                }
              }
            });
          }}
        >
          stay
        </button>
        <p id="results" style={styles.result}>
          {judgment}
        </p>
      </div>
    </div>
  );
}

const styles = {
  cardGameContainer: {
    width: "100%",
    height: "93vh",
    display: "flex",
    flexDirection: "row",
  },
  equipmentBar: {
    width: "30%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  fieldBar: {
    width: "7%",
    backgroundColor: "lightblue",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  body: {
    width: "63%",
    fontFamily: "Arial, Helvetica, sans-serif",
    textAlign: "center",
    position: "relative",
  },

  btn: {
    width: 200,
    height: 50,
    fontSize: 20,
  },
  result: {
    fontSize: 30,
    fontWeight: "bold",
  },
  healthBar: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: "10px",
    border: "1px solid #000",
    borderRadius: "5px",
  },
};
