import { useState } from "react";
import {
  Space,
  Modal,
  Upload,
  Button,
  Form,
  Input,
  Row,
  Col,
  Image,
  Card,
  Divider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ListCategoryProducts from "./ListCategoryProducts";

const { Meta } = Card;
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function EditCategoryForm(props) {
  const [enteredName, setEnteredName] = useState(props.categoryData.name);
  const [enteredDescription, setEnteredDescription] = useState(
    props.categoryData.descr
  );
  const [selectedFile, setSelectedFile] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].percent === 100) {
      setSelectedFile(newFileList[0].originFileObj);
    } else {
      setSelectedFile("");
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Select a file
      </div>
    </button>
  );

  function formSubmitHandler() {
    const enteredImage = selectedFile;

    const categoryData = {
      name: enteredName,
      descr: enteredDescription,
      isProduct: false,
      image: enteredImage,
    };

    props.onEditCategory(categoryData);
  }
  return (
    <Row>
      <Col span={14}>
        <Row>
          <Col span={23} /* style={{ padding: "20px" }} */ >
            <Row>
              <Col span={6}>
                <Card
                  hoverable
                  style={{
                    width: 200,
                  }}
                  cover={
                    <Image.PreviewGroup
                      preview={{
                        onChange: (current, prev) =>
                          console.log(
                            `current index: ${current}, prev index: ${prev}`
                          ),
                      }}
                    >
                      {/* {images} */}
                      <Image
                        width={200}
                        src={props.back_base_url + props.categoryData.image}
                      />
                    </Image.PreviewGroup>
                  }
                >
                  <Meta title="Category Image" />
                </Card>
              </Col>
              <Col span={18}>
                <Form
                  layout="horizontal" // "horizontal" "vertical"
                  labelCol={{
                    span: 5,
                  }}
                  wrapperCol={{
                    span: 18,
                  }}
                  initialValues={{
                    size: "default",
                  }}
                  size="default"
                  style={{
                    // maxWidth: 640,
                    padding: 15,
                  }}
                  onFinish={formSubmitHandler}
                >
                  <Form.Item name="name" label="Category Name">
                    <Space
                      direction="vertical"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Input
                        defaultValue={enteredName}
                        onChange={(e) => setEnteredName(e.target.value)}
                      />
                    </Space>
                  </Form.Item>
                  <Form.Item name="description" label="Description">
                    <Space
                      direction="vertical"
                      style={{
                        width: "100%",
                      }}
                    >
                      <TextArea
                        rows={4}
                        defaultValue={enteredDescription}
                        onChange={(e) => setEnteredDescription(e.target.value)}
                      />
                    </Space>
                  </Form.Item>
                  <Form.Item label="Change Image">
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleUploadChange}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal
                      width={680}
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="example"
                        style={{
                          width: "100%",
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                  <Form.Item label="" wrapperCol={{ span: 18, offset: 5 }}>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                      <Button
                        type="primary"
                        danger
                        htmlType="button"
                        onClick={() =>
                          props.onRemoveCategory(props.categoryData.id)
                        }
                      >
                        Delete Category
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col span={1} style={{ textAlign: "center" }}>
            <Divider type="vertical" style={{ height: "100%" }} />
          </Col>
        </Row>
      </Col>
      {/* <Col span={1} style={{ textAlign: "center"}}>
        <Divider type="vertical" style={{ height: "100%"}}/>
      </Col> */}
      <Col span={10} style={{ paddingLeft: "24px"}}>
        <Card title="Category Products">
          <ListCategoryProducts
            back_base_url={props.back_base_url}
            front_base_url={props.front_base_url}
            categoryProducts={props.categoryData.products}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default EditCategoryForm;
