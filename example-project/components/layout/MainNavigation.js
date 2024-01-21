import Link from "next/link";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Products</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
