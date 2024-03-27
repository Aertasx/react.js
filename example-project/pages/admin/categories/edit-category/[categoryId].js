import { useRouter } from "next/router";
import { BACK_BASE_URL, FRONT_BASE_URL } from "../../../../config/urlConfig";
import axios from "axios";
import { openNotification } from "../../../../components/admin/ui/Notification";
import deleteConfirm from "../../../../components/admin/ui/deleteConfirm";
import EditCategoryForm from "../../../../components/admin/categories/EditCategoryForm";

const EditCategoryPage = (props) => {
  const router = useRouter();
  const { categoryId } = router.query;
  const editCategoryHandler = async (editedCategoryData) => {
    try {
      const axiosConfig = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        BACK_BASE_URL + "api/admin/categories/edit/" + categoryId,
        editedCategoryData,
        axiosConfig
      );

      let notificationParams;
      if (response.status === 200 && response.data.status === "success") {
        notificationParams = [
          "success",
          "Başarılı",
          "Kategori bilgileri güncellendi.",
          1.5,
          () => {
            setTimeout(() => {
              router.push("/admin/categories/edit-category");
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

  const removeCategoryHandler = async (categoryId) => {
    deleteConfirm('categories', categoryId, () => {
      router.push("/admin/categories/edit-category");
    });
  };

  return (
    <EditCategoryForm
      categoryData={props.categoryData}
      back_base_url={props.back_base_url}
      front_base_url={props.front_base_url}
      onEditCategory={editCategoryHandler}
      onRemoveCategory={removeCategoryHandler}
    />
  );
};

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
    return {
      props: {
        categoryData: {
          id: category.id.toString(),
          image: [category.image],
          name: category.name,
          descr: category.descr,
          products: category.products
        },
        back_base_url: BACK_BASE_URL,
        front_base_url: FRONT_BASE_URL,
      },
      revalidate: 1, // belirtilen süre içerisinde yeni bir istek gelirse tetiklenir
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default EditCategoryPage;