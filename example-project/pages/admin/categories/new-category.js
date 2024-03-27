import { useRouter } from "next/router";
import axios from "axios";
import { openNotification } from "../../../components/admin/ui/Notification";
import NewCategoryForm from "../../../components/admin/categories/NewCategoryForm";
import { BACK_BASE_URL } from "../../../config/urlConfig";

NewCategoryForm
const NewCategoryPage = () => {
  const router = useRouter();

  const addCategoryHandler = async (enteredCategoryData) => {
    try {
      const axiosConfig = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        BACK_BASE_URL + "api/admin/categories/create",
        enteredCategoryData,
        axiosConfig
      );

      if (response.status === 200 && response.data.status === "success") {
        openNotification(
          "success",
          "Başarılı",
          "Kategori eklendi.",
          1.5,
          () => {
            setTimeout(() => {
              router.push("/admin/categories/edit-category");
              // router.reload();
            }, 300);
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

      return openNotification(
        "error",
        "Hata",
        error.response.data.text,
        0,
        () => {}
      );
      // console.log("Error posting data:", error);
      // return error;
    }
    // const result = await postProductData();
    // console.log("Form submit sonucu: " + result);
  };

  return <NewCategoryForm onAddCategory={addCategoryHandler} />;

};

export default NewCategoryPage;