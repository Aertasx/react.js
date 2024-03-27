import { Avatar, List } from 'antd';

const ListCategoryProducts = (props) => {
  return (
    <List
      itemLayout="horizontal"
      pagination={{
        pageSize: 3,
      }}
      dataSource={props.categoryProducts}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={props.back_base_url + item.image}
              />
            }
            title={<a href={props.front_base_url + "admin/products/edit-product/" + item.id}>{item.name}</a>}
          />
        </List.Item>
      )}
    />
  );
};

export default ListCategoryProducts;
