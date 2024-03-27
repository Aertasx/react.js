// import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import NewProductForm from "../../../components/admin/products/NewProductForm";
// import { useEffect } from "react";
import axios from "axios";
import { openNotification } from "../../../components/admin/ui/Notification";
import { BACK_BASE_URL } from "../../../config/urlConfig";
// import dynamic from "next/dynamic";

// const NewProductForm = dynamic(
//   async () =>
//     await import("../../../../components/admin/products/NewProductForm"),
//   {
//     ssr: false,
//   }
// );

const NewProductPage = (props) => {
  const router = useRouter();
  // const isAuth = useSelector((state) => state.auth.isAuth);

  // useEffect(() => {
  //   if (!isAuth) {
  //     return (window.location.href = "/");
  //   }
  // }, [isAuth]);

  // if (isAuth) {
    
  // }

  const addProductHandler = async (enteredProductData) => {
    try {
      const axiosConfig = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        BACK_BASE_URL + "api/admin/products/create",
        enteredProductData,
        axiosConfig
      );

      if (response.status === 200 && response.data.status === "success") {
        openNotification(
          "success",
          "Başarılı",
          "Ürün eklendi.",
          1.5,
          () => {
            setTimeout(() => {
              router.push("/admin/products/edit-product");
            }, 500);
          }
        );
      }
    } catch (error) {
      // if (error.response.status === 401) {
      //   // alert(
      //   //   "Status: " +
      //   //     error.response.data.status +
      //   //     " Message: " +
      //   //     error.response.data.text
      //   // );
      // } else if (error.response.status === 403) {
      //   console.log("Error fetching data:", error);
      // }
      return error;
    }
    // const result = await postProductData();
    // console.log("Form submit sonucu: " + result);
  };

  return <NewProductForm categories={props.categories} onAddProduct={addProductHandler} />;

};

export async function getStaticProps() {
  try {
    const response = await axios.get(
      BACK_BASE_URL + "api/admin/categories"
    ); // Örnek bir endpoint URL'si

    if (response.status === 200 && response.data.status === "success") {
      let categories = response.data.categories;
      return {
        props: {
          categories,
        },
        revalidate: 1, // kaç saniyede bir yeni datayı dahil etsin.
      };
    } else {
      categories = { id: 0, name: "Kategori bulunamadı" };
      return {
        props: {
          categories,
        },
        revalidate: 1, // kaç saniyede bir yeni datayı dahil etsin.
      };
    }
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default NewProductPage;
