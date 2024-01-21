import { useRef, useState } from "react";
import { Select, Space, Switch, Modal, Upload, Button, Form, Input, InputNumber } from "antd";
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

function NewProductForm(props) {
  // const [enteredName, setEnteredName] = useState("");
  // const [enteredDescription, setEnteredDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isActv, setIsActv] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  // const priceInputRef = useRef();

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
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
        background: 'none',
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

  function formSubmitHandler(values) {
    // event.preventDefault();
    // const enteredPrice = priceInputRef.current.value;

    const enteredImage = selectedFile;
    const enteredCategory = selectedCategory;
    const is_actv = isActv;

    const productData = {
      name: values.name,
      image: enteredImage,
      price: values.price,
      descr: values.description,
      is_actv,
      categoryId: enteredCategory,
    };

    props.onAddProduct(productData);
  }

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file); // Seçilen dosyayı saklamak için bir state kullanabilirsiniz
  // };

  const categorySelChangeHandler = (value) => {
    setSelectedCategory(value);
  };

  const isActvSwitchChangeHandler = (isActv) => {
    setIsActv(isActv);
  };

  const categoryOptions = props.categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));


  const onFormValueChange = () => {
    console.log("onFormValueChange: ");
  };

  return (
    <Card size="small">
      <Form
        layout="horizontal" // "horizontal" "vertical"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 18,
        }}
        initialValues={{
          size: 'default',
        }}
        onValuesChange={onFormValueChange}
        size='default'
        style={{
          maxWidth: 640,
          padding: 15
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
            <Input /* onChange={(e) => {setEnteredName(e.target.value)}} */ />
          </Space>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <TextArea rows={4} />
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
              onChange={categorySelChangeHandler}
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
            <InputNumber />
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
          <Modal width={680} open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
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
                checked={isActv}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={isActvSwitchChangeHandler}
              />
          </Space>
        </Form.Item>
        <Form.Item label="" wrapperCol= {{span: 1, offset: 5,}}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Card>
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

export default NewProductForm;
