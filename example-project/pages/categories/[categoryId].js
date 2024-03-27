import React from "react";
import { Card, Col, Row, Space  } from 'antd';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import Button from "/components/CustomButtons/Button.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import NavPills from "/components/NavPills/NavPills.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/profilePage.js";
import axios from "axios";
import { BACK_BASE_URL, FRONT_BASE_URL } from "../../config/urlConfig";

const useStyles = makeStyles(styles);
const { Meta } = Card;

function CategoryDetailPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  console.log(props.categoryData.products);
  return (
    <div>
      <Header
        color="transparent"
        brand="NextJS Material Kit"
        rightLinks={<HeaderLinks categories={props.categories} />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image="/img/profile-bg.jpg" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={props.back_base_url + props.categoryData.image}
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{props.categoryData.name}</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>{props.categoryData.descr}</p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
              <Row gutter={24} style={{ display: "block"}}>
                <Space size={[30, 30]} wrap>
                    {props.categoryData.products.map(product => (
                      <Card
                        hoverable
                        style={{
                          width: 358,
                          height: 452
                        }}
                        cover={<div style={{ height: "358px", display:"flex", justifyContent: "center", alignItems: "center", backgroundColor:"#d3d3d36e"}}>
                          <img alt="example" style={{ maxHeight: "358px", maxWidth: "358px"}} src={props.back_base_url + product.image} />
                          </div>}
                      >
                        <Meta title={product.name} description={product.price + " TL"} />
                      </Card>
                    ))}
                </Space>
              </Row>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  // fallback false paths dizini desteklenen tüm prodId değerlerine sahip olduğunu belirtir. Bu sayede dizide olmayan bir id ile gelinir ise 404 görünür.
  try {
    const response = await axios.get(BACK_BASE_URL + "api/user/categories"); // Örnek bir endpoint URL'si
    const categories = response.data.categories;

    return {
      fallback: true,
      paths: categories.map((category) => ({
        params: { categoryId: category.id.toString() },
      })),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getStaticProps(context) {
  const categoryId = context.params.categoryId;
  try {
    const categoryResponse = await axios.get(
      BACK_BASE_URL + "api/admin/categories/" + categoryId
    );
    const category = categoryResponse.data.category;
    const response = await axios.get(
      BACK_BASE_URL + "api/user/categories"
    ); // Örnek bir endpoint URL'si
    const categories = response.data.categories;
    return {
      props: {
        categoryData: {
          id: category.id.toString(),
          image: [category.image],
          name: category.name,
          descr: category.descr,
          products: category.products
        },
        categories,
        back_base_url: BACK_BASE_URL,
        front_base_url: FRONT_BASE_URL,
      },
      revalidate: 1, // belirtilen süre içerisinde yeni bir istek gelirse tetiklenir
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default CategoryDetailPage;