import axios from "axios";
import { openConfirmModal } from "./confirmModal";
import { openNotification } from "./Notification";
import { checkProdsConfirmModal, confirmModalCloseHandler } from "./checkProdsConfirmModal";
import { BACK_BASE_URL } from "../../../config/urlConfig";

const deleteConfirm = async (del_op, obj_id, onAfterDelete) => {
  openConfirmModal(
    "Onay",
    "Bu işlemi gerçekleştirmek istediğinize emin misiniz?",
    async () => {
      try {
        let response;
        const axiosConfig = {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        };
        let requestData = {};
        if (del_op === "products") {
          requestData = { obj_id };
          response = await axios.post(
            `${BACK_BASE_URL}api/admin/${del_op}/delete/${obj_id}`,
            requestData,
            axiosConfig
          );
        } else if (del_op === "categories") {
          response = await axios.get(
            `${BACK_BASE_URL}api/admin/${del_op}/delete/${obj_id}`,
            axiosConfig
          );
        }

        if (response.status === 200 && response.data.status === "success") {
          openNotification(
            "success",
            "Başarılı",
            "Veri silinmiştir.",
            1.5,
            () => {
              onAfterDelete();
            }
          );
        } else if (
          response.status === 200 &&
          response.data.status === "warning"
        ) {
          checkProdsConfirmModal(
            "Onay",
            "Kategoriye ait ürünler de silinsin mi?",
            async () => {
              try {
                const catDelWithChildsResponse = await axios.post(
                  `${BACK_BASE_URL}api/admin/categories/delete/${obj_id}`,
                  {
                    childs: true,
                  },
                  axiosConfig
                );
                if (
                  catDelWithChildsResponse.status === 200 &&
                  catDelWithChildsResponse.data.status === "success"
                ) {
                  openNotification(
                    "success",
                    "Başarılı",
                    catDelWithChildsResponse.data.text,
                    1.8,
                    () => {
                      onAfterDelete();
                    }
                  );
                }
              } catch (error) {
                openNotification(
                  "error",
                  "Başarısız",
                  `Kod: ${error.response.status} Açıklama: ${error.response.data.text}`,
                  0,
                  () => {
                    return false;
                  }
                );
              }
            },
            async () => {
              try {
                const catDelWithoutChildsResponse = await axios.post(
                  `${BACK_BASE_URL}api/admin/categories/delete/${obj_id}`,
                  {
                    childs: false,
                  },
                  axiosConfig
                );
                confirmModalCloseHandler();
                if (
                  catDelWithoutChildsResponse.status === 200 &&
                  catDelWithoutChildsResponse.data.status === "success"
                ) {
                  openNotification(
                    "success",
                    "Başarılı",
                    catDelWithoutChildsResponse.data.text,
                    1.7,
                    () => {
                      onAfterDelete();
                    }
                  );
                }
              } catch (error) {
                openNotification(
                  "error",
                  "Başarısız",
                  `Kod: ${error.response.status} Açıklama: ${error.response.data.text}`,
                  0,
                  () => {
                    return false;
                  }
                );
              }
            },
            async () => {}
          );
        } else if (
          response.status === 200 &&
          response.data.status === "proceed"
        ) {
          try {
            const catDelResponse = await axios.post(
              `${BACK_BASE_URL}api/admin/categories/delete/${obj_id}`,
              { childs: false },
              axiosConfig
            );
            if (
              catDelResponse.status === 200 &&
              catDelResponse.data.status === "success"
            ) {
              openNotification(
                "success",
                "Başarılı",
                catDelResponse.data.text,
                1.7,
                () => {
                  onAfterDelete();
                }
              );
            }
          } catch (error) {
            openNotification(
              "error",
              "Başarısız",
              `Kod: ${error.response.status} Açıklama: ${error.response.data.text}`,
              0,
              () => {
                return false;
              }
            );
          }
        }
      } catch (error) {
        openNotification(
          "error",
          "Başarısız",
          `Kod: ${error.response.status} Açıklama: ${error.response.data.text}`,
          0,
          () => {
            return false;
          }
        );
      }
    },
    () => {
      console.log("İptal edildi");
    }
  );
};

export default deleteConfirm;
