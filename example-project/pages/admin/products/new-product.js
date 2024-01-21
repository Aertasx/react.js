// import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import NewProductForm from "../../../components/admin/products/NewProductForm";
// import { useEffect } from "react";
import axios from "axios";
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
        "http://localhost:3500/api/admin/postProduct",
        enteredProductData,
        axiosConfig
      );

      if (response.status === 200 && response.data.status === "success") {
        // return response.data.text;
        router.push("/admin/products/edit-product");
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
      "http://localhost:3500/api/admin/categories"
    ); // Örnek bir endpoint URL'si

    if (response.status === 200 && response.data.status === "success") {
      let categories = response.data.categories;
      return {
        props: {
          categories,
        },
        revalidate: 20, // kaç saniyede bir yeni datayı dahil etsin.
      };
    } else {
      categories = { id: 0, name: "Kategori bulunamadı" };
      return {
        props: {
          categories,
        },
        revalidate: 20, // kaç saniyede bir yeni datayı dahil etsin.
      };
    }
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default NewProductPage;
