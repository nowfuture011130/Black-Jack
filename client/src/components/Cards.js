import cardBack from "../static/cards/BACK.png";
import cardA from "../static/cards/A-S.png";
import card2 from "../static/cards/2-S.png";
import card3 from "../static/cards/3-S.png";
import card4 from "../static/cards/4-S.png";
import card5 from "../static/cards/5-S.png";
import card6 from "../static/cards/6-S.png";
import card7 from "../static/cards/7-S.png";
import card8 from "../static/cards/8-S.png";
import card9 from "../static/cards/9-S.png";
import card10 from "../static/cards/10-S.png";
import card11 from "../static/cards/J-S.png";
export default function ({ deck, cover, turn }) {
  const cardsStyle = {
    height: 175,
    width: 125,
    margin: 1,
    textAlign: "center",
    border: turn ? "4px dashed red" : "",
  };

  var cards = [
    <img src={cardBack} style={cardsStyle} key="back"></img>,
    <img src={cardA} style={cardsStyle} key="A"></img>,
    <img src={card2} style={cardsStyle} key="2"></img>,
    <img src={card3} style={cardsStyle} key="3"></img>,
    <img src={card4} style={cardsStyle} key="4"></img>,
    <img src={card5} style={cardsStyle} key="5"></img>,
    <img src={card6} style={cardsStyle} key="6"></img>,
    <img src={card7} style={cardsStyle} key="7"></img>,
    <img src={card8} style={cardsStyle} key="8"></img>,
    <img src={card9} style={cardsStyle} key="9"></img>,
    <img src={card10} style={cardsStyle} key="10"></img>,
    <img src={card11} style={cardsStyle} key="11"></img>,
  ];
  var imgs = deck.map(function (card, id) {
    if (cover && id === 0) {
      return cards[0];
    }
    if (card === "A") {
      return cards[1];
    }
    return cards[parseInt(card)];
  });
  return (
    <div>
      {imgs}
      {/* <img src={cardBack} style={styles.cards}></img>
      <img src={cardA} style={styles.cards}></img>
      <img src={card2} style={styles.cards}></img>
      <img src={card3} style={styles.cards}></img>
      <img src={card4} style={styles.cards}></img>
      <img src={card5} style={styles.cards}></img>
      <img src={card6} style={styles.cards}></img>
      <img src={card8} style={styles.cards}></img>
      <img src={card9} style={styles.cards}></img>
      <img src={card10} style={styles.cards}></img>
      <img src={card11} style={styles.cards}></img> */}
    </div>
  );
}
