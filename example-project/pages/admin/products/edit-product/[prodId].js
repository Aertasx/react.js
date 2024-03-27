import { useRouter } from "next/router";
import { BACK_BASE_URL } from "../../../../config/urlConfig";
import axios from "axios";
import EditProductForm from "../../../../components/admin/products/EditProductForm";
import { openNotification } from "../../../../components/admin/ui/Notification";
import deleteConfirm from "../../../../components/admin/ui/deleteConfirm";

const EditProductPage = (props) => {
  const router = useRouter();
  const { prodId } = router.query;
  const editProductHandler = async (editedProductData) => {
    try {
      const axiosConfig = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        BACK_BASE_URL + "api/admin/products/edit/" + prodId,
        editedProductData,
        axiosConfig
      );

      let notificationParams;
      if (response.status === 200 && response.data.status === "success") {
        notificationParams = [
          "success",
          "Başarılı",
          "Ürün bilgileri güncellendi.",
          1.5,
          () => {
            setTimeout(() => {
              router.push("/admin/products/edit-product");
            }, 300);
          },
        ];
      } else if ( response.status === 200 && response.data.status === "warning") {
        notificationParams = [
          "warning",
          "Dikkat",
          response.data.text,
          0,
          () => {
            router.reload();
          }
        ];
      } else if (response.status === 400 && response.data.status === "error") {
        notificationParams = [
          "error",
          "Hata",
          response.data.text,
          0,
          () => {}
        ];
      }

      return openNotification(...notificationParams);
    } catch (error) {
      return openNotification(
        "error",
        "Başarısız",
        "Kod: " +
          error.response.status +
          " Açıklama: " +
          error.response.data.text,
        0,
        () => {}
      );
    }
  };

  const removeProductHandler = async (prodId) => {
    deleteConfirm('products', prodId, () => {
      router.push("/admin/products/edit-product");
    });
  };

  return (
    <EditProductForm
      categories={props.categories}
      productData={props.productData}
      base_url={props.base_url}
      onEditProduct={editProductHandler}
      onRemoveProduct={removeProductHandler}
    />
  );
};

export async function getStaticPaths() {
  // fallback false paths dizini desteklenen tüm prodId değerlerine sahip olduğunu belirtir. Bu sayede dizide olmayan bir id ile gelinir ise 404 görünür.
  try {
    const response = await axios.get(BACK_BASE_URL + "api/user/products"); // Örnek bir endpoint URL'si
    const products = response.data.products;

    return {
      fallback: true,
      paths: products.map((product) => ({
        params: { prodId: product.id.toString() },
      })),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getStaticProps(context) {
  const prodId = context.params.prodId;
  try {
    const prodResponse = await axios.get(
      BACK_BASE_URL + "api/admin/products/" + prodId
    ); // Örnek bir endpoint URL'si
    const product = prodResponse.data.product;

    const categoriesResponse = await axios.get(
      BACK_BASE_URL + "api/admin/categories"
    ); // Örnek bir endpoint URL'si
    const categories = categoriesResponse.data.categories;

    return {
      props: {
        productData: {
          id: product.id.toString(),
          image: [product.image],
          name: product.name,
          price: product.price,
          descr: product.descr,
          isActv: product.is_actv,
          prodCatId: product.categories[0] && product.categories[0].id ? product.categories[0].id : null,
        },
        categories,
        base_url: BACK_BASE_URL,
      },
      revalidate: 1, // belirtilen süre içerisinde yeni bir istek gelirse tetiklenir
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default EditProductPage;
