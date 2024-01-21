import classes from "./Card.module.css";
import classNames from 'classnames';

function Card(props) {
  const cardClass = classNames(classes.card, {
    [classes.card_small]: props.size === "small",
    // Diğer koşullu sınıfları buraya ekleyebilirsiniz
  });

  return <div className={cardClass}>{props.children}</div>;
}

export default Card;