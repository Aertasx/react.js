import { useRef, useState } from "react";
import {
  Select,
  Space,
  Switch,
  Modal,
  Upload,
  Button,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Image,
} from "antd";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import Card from "../ui/Card";
import classes from "./NewProductForm.module.css";
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function EditProductForm(props) {
  const [enteredName, setEnteredName] = useState(props.productData.name);
  const [enteredDescription, setEnteredDescription] = useState(props.productData.descr);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(props.productData.prodCatId !== null ? props.productData.prodCatId : null);
  const [isActv, setIsActv] = useState(props.productData.isActv);
  const [enteredPrice, setEnteredPrice] = useState(props.productData.price);

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
    // event.preventDefault();
    // const enteredPrice = enteredPrice;
    const enteredImage = selectedFile;
    const enteredCategory = selectedCategory;
    const is_actv = isActv;

    const productData = {
      name: enteredName,
      price: enteredPrice,
      descr: enteredDescription,
      is_actv,
      categoryId: enteredCategory,
      isProduct: true,
      image: enteredImage
    };

    props.onEditProduct(productData);
  };

  // function removeProductConfirmHandler () {
  //   props.onRemoveProduct(props.productData.id);
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file); // Seçilen dosyayı saklamak için bir state kullanabilirsiniz
  // };

  const categoryOptions = props.categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  

  // const images = props.productData.image.map((_image) => (
  //   <Image width={200} src={props.base_url + _image} />
  // ));

  // console.log(images);
  return (
    <Row>
      <Col span={10}>
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {/* {images} */}
          <Image width={200} src={props.base_url + props.productData.image} />
        </Image.PreviewGroup>
      </Col>
      <Col span={14}>
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
            maxWidth: 640,
            padding: 15,
          }}
          onFinish={formSubmitHandler}
        >
          <Form.Item name="name" label="Product Name">
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <Input defaultValue={enteredName} onChange={(e) => setEnteredName(e.target.value)} />
            </Space>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <TextArea rows={4} defaultValue={enteredDescription} onChange={(e) => setEnteredDescription(e.target.value)} />
            </Space>
          </Form.Item>
          <Form.Item label="Product Category">
            <Space
              direction="vertical"
              style={{
                width: "50%",
              }}
            >
              <Select
                id="categorySelect"
                placeholder="Please select"
                style={{
                  width: "100%",
                }}
                onChange={(value) => setSelectedCategory(value)}
                defaultValue={selectedCategory}
                options={categoryOptions}
              />
            </Space>
          </Form.Item>
          <Form.Item name="price" label="InputNumber">
            <Space
              direction="vertical"
              style={{
                width: "50%",
              }}
            >
              <InputNumber defaultValue={enteredPrice} onChange={(value) => setEnteredPrice(value)} />
            </Space>
          </Form.Item>
          <Form.Item label="Upload">
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
          <Form.Item label="Is Product Active?" valuePropName="checked">
            <Space
              direction="vertical"
              style={{
                width: "50%",
              }}
            >
              <Switch
                defaultChecked={isActv == "1" ? true : false}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(isActv) => setIsActv(isActv)}
              />
            </Space>
          </Form.Item>
          <Form.Item label="" wrapperCol={{ span: 18, offset: 5 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button type="primary" danger htmlType="button" onClick={() => props.onRemoveProduct(props.productData.id)}>
                Delete Product
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );

  // return (
  //   <Card size="small">
  //     <form className={classes.form} onSubmit={submitHandler}>
  //       <div className={classes.control}>
  //         <label htmlFor="name">Product Name</label>
  //         <input type="text" required id="name" ref={nameInputRef} />
  //       </div>
  //       <div className={classes.control}>
  //         <label htmlFor="image">Product Image</label>
  //         <input
  //           type="file"
  //           required
  //           id="image"
  //           name="Imgfile"
  //           onChange={handleFileChange}
  //         />
  //       </div>
  //       <div className={classes.control}>
  //         <label htmlFor="price">Product Price</label>
  //         <input type="text" required id="price" ref={priceInputRef} />
  //       </div>
  //       <div className={classes.control}>
  //         <label htmlFor="categorySelect">Product Category</label>
  //         <Space
  //           direction="vertical"
  //           style={{
  //             width: "100%",
  //           }}
  //         >
  //           <Select
  //             id="categorySelect"
  //             placeholder="Please select"
  //             style={{
  //               width: "100%",
  //             }}
  //             onChange={categorySelChangeHandler}
  //             options={categoryOptions}
  //           />
  //         </Space>
  //       </div>
  //       <div className={classes.control}>
  //         <label htmlFor="description">Description</label>
  //         <textarea
  //           id="description"
  //           required
  //           rows="4"
  //           ref={descriptionInputRef}
  //         ></textarea>
  //       </div>
  //       <div className={classes.control}>
  //         <label htmlFor="is_actv">Is Product Active?</label>
  //         <Space direction="vertical">
  //           <Switch
  //             checked={isActv}
  //             checkedChildren={<CheckOutlined />}
  //             unCheckedChildren={<CloseOutlined />}
  //             onChange={isActvSwitchChangeHandler}
  //           />
  //         </Space>
  //       </div>
  //       <div className={classes.actions}>
  //         <button>Add Product</button>
  //       </div>
  //     </form>
  //   </Card>
  // );
}

export default EditProductForm;
