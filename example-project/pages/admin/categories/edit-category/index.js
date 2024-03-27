import { BACK_BASE_URL } from "../../../../config/urlConfig";
import axios from "axios";
import { useRouter } from "next/router";
import deleteConfirm from "../../../../components/admin/ui/deleteConfirm";
import ListCategories from "../../../../components/admin/categories/ListCategories";

// import { useState } from "react";

ListCategories
const ListCategoriesPage = (props) => {
  const router = useRouter();
  const removeCategoryHandler = async (categoryId) => {
    deleteConfirm('categories', categoryId, () => {
      router.push("/admin/categories/edit-category");
    });
  };

  return <ListCategories categories={props.categories} onRemoveCategory={removeCategoryHandler} />;
};

export async function getStaticProps () { 
  try {
    const response = await axios.get(BACK_BASE_URL + 'api/user/categories'); // Örnek bir endpoint URL'si
    const categories = response.data.categories;
    return {
      props: {
        categories,
        base_url: BACK_BASE_URL
      },
      revalidate: 1 // kaç saniyede bir yeni datayı dahil etsin.
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default ListCategoriesPage;