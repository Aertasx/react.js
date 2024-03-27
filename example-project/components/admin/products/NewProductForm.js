import { useState } from "react";
import { Select, Space, Switch, Modal, Upload, Button, Form, Input, InputNumber } from "antd";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import Card from "../ui/Card";
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function NewProductForm(props) {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isActv, setIsActv] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

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
    const enteredImage = selectedFile;
    const enteredCategory = selectedCategory;
    const is_actv = isActv;

    const productData = {
      name: values.name,
      price: values.price,
      descr: values.description,
      is_actv,
      categoryId: enteredCategory,
      isProduct: true,
      image: enteredImage
    };

    props.onAddProduct(productData);
  }

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
}

export default NewProductForm;
