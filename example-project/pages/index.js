import React from "react";
import axios from "axios";
import { BACK_BASE_URL } from "../config/urlConfig";
import classNames from "classnames"; // @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import ProductSection from "/pages-sections/LandingPage-Sections/ProductSection.js";
import TeamSection from "/pages-sections/LandingPage-Sections/TeamSection.js";
import WorkSection from "/pages-sections/LandingPage-Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

function IndexPage(props) {
  if (props.error) {
    return (<div>Error: {props.error}</div>)
  } else {
    const classes = useStyles();
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="NextJs Example CMS"
          rightLinks={<HeaderLinks categories={props.categories} />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        />
        <Parallax filter responsive image="/img/landing-bg.jpg">
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                <h4>
                  Every landing page needs a small description after the big bold
                  title, that{"'"}s why we added this text here. Add here all the
                  information that can make you or your product create the first
                  impression.
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Watch video
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            <TeamSection />
            <WorkSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      BACK_BASE_URL + "api/user/categories"
    );
    const categories = response.data.categories;
    return {
      props: {
        categories,
        base_url: BACK_BASE_URL,
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: {
        error: error.response.data
      }
    }
  }
}

export default IndexPage;