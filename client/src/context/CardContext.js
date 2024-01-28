import { createContext, useState, useContext, useEffect } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";

const CardContext = createContext({});

var deck = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
var dDeck = [];
var yDeck = [];
var dSum = 0;
var ySum = 0;
var AInDealer = "notInHand";
var AInYour = "notInHand";
var preventRendering = false; //防止渲染两次导致开局两次
const CardContextProvider = ({
  children,
  firstPlayer,
  setPrevFirstPlayer,
  restart,
  setRestart,
  setGameStop,
}) => {
  const [dealerDeck, setDealerDeck] = useState([]);
  const [yourDeck, setYourDeck] = useState([]);
  const [dealerSum, setDealerSum] = useState(0);
  const [yourSum, setYourSum] = useState(0);
  const [turn, setTurn] = useState(false);
  const [rivalStay, setRivalStay] = useState(false);
  const [stopGame, setStopGame] = useState(false);
  const [sumLimit, setSumLimit] = useState(21);
  const [items, setItems] = useState([0, 0, 0, 0, 0, 0]);

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  const buildDeck = () => {
    for (var i = 0; i < deck.length; ++i) {
      var j = Math.floor(Math.random() * deck.length);
      var temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  };
  const dealerDraw = (val) => {
    var card = deck.pop();
    if (card === "A") {
      AInDealer = "notUsed";
    }
    dDeck.push(card);
    val += getvalue(card);
    if (val > sumLimit && AInDealer === "notUsed") {
      val -= 10;
      AInDealer = "used";
    }
    return val;
  };
  const yourDraw = (val) => {
    var card = deck.pop();
    if (card === "A") {
      AInYour = "notUsed";
    }
    val += getvalue(card);
    yDeck.push(card);
    if (val > sumLimit && AInYour === "notUsed") {
      val -= 10;
      AInYour = "used";
    }
    return val;
  };
  const startGame = () => {
    for (var i = 0; i < 2; ++i) {
      ySum = yourDraw(ySum);
    }
    setYourSum(ySum);
    setYourDeck(yDeck);

    for (var i = 0; i < 2; ++i) {
      dSum = dealerDraw(dSum);
    }
    setDealerSum(dSum);
    setDealerDeck(dDeck);
    //完成了开局发两张牌的效果
  };

  useEffect(() => {
    if (!preventRendering) {
      giveItem();
    }
    if (!preventRendering && firstPlayer) {
      buildDeck();
      startGame();
      sendData();
      setTurn(firstPlayer);
      setPrevFirstPlayer(firstPlayer);
      preventRendering = true;
    }
    async function sendData() {
      await channel.sendEvent({
        type: "start-up",
        data: {
          dealerDeck: dDeck,
          yourDeck: yDeck,
          deck,
          dSum,
          ySum,
          AInDealer,
          turn,
        },
      });
    }
  }, [firstPlayer]);

  useEffect(() => {
    if (restart) {
      deck = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
      dDeck = [];
      yDeck = [];
      dSum = 0;
      ySum = 0;
      AInDealer = "notInHand";
      AInYour = "notInHand";
      setRivalStay(false);
      setStopGame(false);
      setGameStop(false);
      setTurn(false);
      giveItem();
      if (firstPlayer) {
        buildDeck();
        startGame();
        sendData();
        setTurn(true);
        setPrevFirstPlayer(true);
      }
      setRestart(false);
      async function sendData() {
        await channel.sendEvent({
          type: "start-up",
          data: {
            dealerDeck: dDeck,
            yourDeck: yDeck,
            deck,
            dSum,
            ySum,
            AInDealer,
            turn,
          },
        });
      }
    }
  }, [restart]);

  const getvalue = (card) => {
    if (card === "A") {
      return 11;
    }
    return parseInt(card);
  };

  const getDeckValue = (deck) => {
    var sum = 0;
    var hasA = false;
    var card = "";
    for (var i = 0; i < deck.length; ++i) {
      card = deck[i];
      if (card === "A") {
        hasA = true;
      } else {
        sum += parseInt(card);
      }
    }
    if (hasA) {
      if (sum + 11 > sumLimit) {
        sum += 1;
      } else {
        sum += 11;
      }
    }
    return sum;
  };

  const drawCard = async () => {
    if (yourSum > sumLimit) {
      alert("点数大于" + sumLimit + ",不能抽牌");
      return;
    }
    if (!turn) {
      alert("不是你的回合");
      return;
    }
    setRivalStay(false);
    var val = yourDraw(yourSum);
    setYourSum(val);
    setYourDeck(yDeck);
    setTurn(false);
    await channel.sendEvent({
      type: "draw-card",
      data: { yourDeck: yDeck, deck, ySum: val },
    });
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      // 交换 array[i] 和 array[j]
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const recallYourCard = async () => {
    if (yDeck.length !== 0) {
      var lastCard = yDeck.pop();
      ySum = getDeckValue(yDeck);
      setYourDeck(yDeck);
      setYourSum(ySum);
      deck.push(lastCard);
      shuffleArray(deck);
      await channel.sendEvent({
        type: "use-item",
        data: { yDeck, ySum, AInYour, deck, id: 3 },
      });
    }
  };

  const recallDealerCard = async () => {
    if (dDeck.length !== 0) {
      var lastCard = dDeck.pop();
      dSum = getDeckValue(dDeck);
      setDealerDeck(dDeck);
      setDealerSum(dSum);
      deck.push(lastCard);
      shuffleArray(deck);
      await channel.sendEvent({
        type: "use-item",
        data: { dDeck, dSum, AInDealer, deck, id: 4 },
      });
    }
  };

  const exchangeCard = async () => {
    if (yDeck.length !== 0 && dDeck.length !== 0) {
      var yLastCard = yDeck.pop();
      var dLastCard = dDeck.pop();
      if (yLastCard === "A") {
        AInYour = false;
        AInDealer = true;
      }
      if (dLastCard === "A") {
        AInDealer = false;
        AInYour = true;
      }
      yDeck.push(dLastCard);
      dDeck.push(yLastCard);
      ySum = getDeckValue(yDeck);
      dSum = getDeckValue(dDeck);
      setYourDeck(yDeck);
      setYourSum(ySum);
      setDealerDeck(dDeck);
      setDealerSum(dSum);
      await channel.sendEvent({
        type: "use-item",
        data: { yDeck, ySum, dDeck, dSum, AInYour, AInDealer, id: 5 },
      });
    }
  };

  const drawSpecificCard = async (cardValue) => {
    const updatedDeck = deck.filter((card) => card !== cardValue);
    if (updatedDeck.length != deck.length) {
      deck = updatedDeck;
      yDeck.push(cardValue);
      ySum = getDeckValue(yDeck);
      setYourDeck(yDeck);
      setYourSum(ySum);
      if (cardValue === "A") AInYour = "notUsed";
      await channel.sendEvent({
        type: "use-item",
        data: { yDeck, ySum, AInYour, updatedDeck, id: 8 },
      });
    }
  };

  const stay = async () => {
    if (!turn) {
      alert("不是你的回合");
      return false;
    }
    if (rivalStay) {
      await channel.sendEvent({
        type: "game-stop",
      });
      return true;
    }
    setTurn(false);
    await channel.sendEvent({
      type: "stay",
    });
    return false;
  };

  const giveItem = () => {
    const updatedItems = [...items];
    for (var i = 0; i < 2; ++i) {
      const index = updatedItems.findIndex((item) => item === 0);
      if (index !== -1) {
        updatedItems[index] = randomItem(); // 如果找到了空的装备栏，则将其替换为装备1
        setItems(updatedItems);
      }
    }
  };

  const randomItem = () => {
    var randomIndex = Math.floor(Math.random() * 8) + 1;
    if (randomIndex === 8) {
      randomIndex += Math.floor(Math.random() * 10);
    }
    return randomIndex;
  };

  channel.on((event) => {
    if (event.type === "start-up" && event.user.id !== client.userID) {
      deck = event.data.deck;
      setYourDeck(event.data.dealerDeck);
      setDealerDeck(event.data.yourDeck);
      setYourSum(event.data.dSum);
      setDealerSum(event.data.ySum);
      yDeck = event.data.dealerDeck;
      dDeck = event.data.yourDeck;
      ySum = event.data.dSum;
      dSum = event.data.ySum;
      AInYour = event.data.AInDealer;
      if (!preventRendering) giveItem();
      preventRendering = true;
    }
    if (event.type === "draw-card" && event.user.id !== client.userID) {
      deck = event.data.deck;
      setDealerDeck(event.data.yourDeck);
      setDealerSum(event.data.ySum);
      setTurn(true);
      dDeck = event.data.yourDeck;
      dSum = event.data.ySum;
    }
    if (event.type === "stay" && event.user.id !== client.userID) {
      setTurn(true);
      setRivalStay(true);
    }
    if (event.type === "game-stop" && event.user.id !== client.userID) {
      setStopGame(true);
      setGameStop(true);
    }
    if (event.type === "use-item" && event.user.id !== client.userID) {
      if (event.data.id === 3) {
        dDeck = event.data.yDeck;
        dSum = event.data.ySum;
        AInDealer = event.data.AInYour;
        deck = event.data.deck;
        setDealerDeck(dDeck);
        setDealerSum(dSum);
      }
      if (event.data.id === 4) {
        yDeck = event.data.dDeck;
        ySum = event.data.dSum;
        AInYour = event.data.AInDealer;
        deck = event.data.deck;
        setYourDeck(yDeck);
        setYourSum(ySum);
      }
      if (event.data.id === 5) {
        yDeck = event.data.dDeck;
        ySum = event.data.dSum;
        dDeck = event.data.yDeck;
        dSum = event.data.ySum;
        AInYour = event.data.AInDealer;
        AInDealer = event.data.AInYour;
        setYourDeck(yDeck);
        setYourSum(ySum);
        setDealerDeck(dDeck);
        setDealerSum(dSum);
      }
      if (event.data.id === 8) {
        dDeck = event.data.yDeck;
        dSum = event.data.ySum;
        AInDealer = event.data.AInYour;
        deck = event.data.updatedDeck;
        setDealerDeck(dDeck);
        setDealerSum(dSum);
      }
    }
  });

  return (
    <CardContext.Provider
      value={{
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
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;
export const useCardContext = () => useContext(CardContext);
