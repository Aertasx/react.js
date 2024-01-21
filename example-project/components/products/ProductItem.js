import { useRouter } from 'next/router';
import Card from '../ui/Card';
import classes from './ProductItem.module.css';

function ProductItem(props) {
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push('/'+ props.id);
  };
  
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <p>{props.price}</p>
          <address>{props.descr}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;