import { useRouter } from "next/router";
import { BASE_URL } from "../../../../backend/backendConfig";
import axios from "axios";
import EditProductForm from "../../../../components/admin/products/EditProductForm";

const EditProductPage = (props) => {
  // const router = useRouter();
  return <EditProductForm categories={props.categories} productData={props.productData} base_url={props.base_url} />;
};

export async function getStaticPaths() {
  // fallback false paths dizini desteklenen tüm prodId değerlerine sahip olduğunu belirtir. Bu sayede dizide olmayan bir id ile gelinir ise 404 görünür.
  try {
    const response = await axios.get("http://localhost:3500/api/user/products"); // Örnek bir endpoint URL'si
    const products = response.data.products;

    return {
      fallback: false,
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
      "http://localhost:3500/api/user/products/" + prodId
    ); // Örnek bir endpoint URL'si
    const product = prodResponse.data.product;

    const categoriesResponse = await axios.get(
      "http://localhost:3500/api/admin/categories"
    ); // Örnek bir endpoint URL'si
    
    const categories = categoriesResponse.data.categories;
    return {
      props: {
        productData: {
          id: product.id.toString(),
          image: [ product.image ],
          name: product.name,
          price: product.price,
          descr: product.descr,
          isActv: product.is_actv,
        },
        categories,
        base_url: BASE_URL
      },
      revalidate: 50, // belirtilen süre içerisinde yeni bir istek gelirse tetiklenir
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default EditProductPage;