import { Fragment } from "react";
import Link from "next/link";

function NewsPage() {
  return (
    <Fragment>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href="/news/next-js">Next JS</Link>
        </li>
        <li>SMT else</li>
      </ul>
    </Fragment>
  );
}

export default NewsPage;
