import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

function ProductList(props) {
  return (
    <ul className={classes.list}>
      {props.products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={props.base_url + product.image}
          name={product.name}
          descr={product.descr}
          price={product.price}
        />
      ))}
    </ul>
  );
}

export default ProductList;
