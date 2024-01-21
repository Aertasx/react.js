import classes from "./ProductDetail.module.css";

const ProductDetail = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.name} />
      <h1>{props.name}</h1>
      <address>{props.price}</address>
      <p>{props.descr}</p>
    </section>
  );
};

export default ProductDetail;
