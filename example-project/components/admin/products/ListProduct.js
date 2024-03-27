import { Button, Input, Space, Table, Flex, Tooltip, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Card from "../../ui/Card";
import Link from "next/link";
import { useRef, useState } from "react";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  // getCheckboxProps: (record) => ({
  //   disabled: record.name === 'Disabled User',
  //   // Column configuration not to be checked
  //   name: record.name,
  // }),
};

const ListProduct = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Price",
      dataIndex: "price",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category",
      dataIndex: "category",
      ...getColumnSearchProps("category"),
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Is Active?",
      dataIndex: "is_actv",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Deactive",
          value: "Deactive",
        },
      ],
      onFilter: (value, record) => record.is_actv_filter.indexOf(value) === 0,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      fixed: "right",
      render: (text, record) => (
        <Flex gap="middle" wrap="wrap">
          <Link href={"./edit-product/" + record.key} passHref>
            <Tooltip title="Edit">
              <Button type="primary" icon={<EditOutlined />} size="large" />
            </Tooltip>
          </Link>
          {/* <Link href={"./remove-product/" + record.key} passHref>
          </Link> */}
          <Tooltip title="Remove">
              <Button
                danger
                type="primary"
                icon={<DeleteOutlined />}
                size="large"
                onClick={() => {props.onRemoveProduct(record.key);}}
              />
            </Tooltip>
        </Flex>
      ),
    },
  ];

  // const data = [];
  // for (let i = 1; i <= 78; i++) {
  //   data.push({
  //     key: i,
  //     name: `Product ${i}`,
  //     price: `100${i}`,
  //     category: "Android",
  //     is_actv: <Tag bordered={false} color="success" value="Active">Active</Tag>
  //   });
  // }

  const productData = props.products.map((product) => ({
    key: product.id,
    name: product.name,
    price: product.price,
    category: product.categories[0] && product.categories[0].name ? product.categories[0].name : "Kategorisiz",
    is_actv:
      product.is_actv == 1 ? (
        <Tag bordered={false} color="success" value="Active">
          Active
        </Tag>
      ) : (
        <Tag bordered={false} color="warning" value="Deactive">
          Deactive
        </Tag>
      ),
    is_actv_filter: product.is_actv == 1 ? "Active" : "Deactive",
  }));

  // const productData = data;

  const totalRecord = productData.length;
  const sizeOpsArr = [];

  for (let i = 0; i < totalRecord; i += 10) {
    if (i === 50) {
      sizeOpsArr.push(totalRecord.toString());
      break;
    }
    sizeOpsArr.push((i + 10).toString());
  }

  let showSizeChanger = false;

  if (totalRecord > 10) {
    showSizeChanger = true;
  }

  return (
    <Card>
      <div style={{ padding: "10px 10px 0px" }}>
        <Table
          columns={columns}
          dataSource={productData}
          sticky={{
            offsetHeader: 0,
          }}
          // scroll={{
          //   y: 600,
          // }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={{
            defaultPageSize: 10,
            defaultCurrent: 1,
            showSizeChanger,
            pageSizeOptions: sizeOpsArr,
            showTotal: (total, range) => (
              <span style={{ left: 0, position: "absolute" }}>
                Showing {range[0]}-{range[1]} of {total}
              </span>
            ),
          }}
          // footer={(currentPageData) => {
          //   return <span>{currentPageData.length}</span>;
          // }}
        />
      </div>
    </Card>
  );
};

export default ListProduct;
