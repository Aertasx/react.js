import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Breadcrumb } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Cookies } from "react-cookie";
import { authActions } from "../../store/auth";
import checkAuth from "../utils/checkAuth";
import MainNavigation from "./MainNavigation";
import classes from "./SiteLayout.module.css";

const { Header, Sider, Content, Footer } = Layout;

function getItem(label, key, icon, path, children) {
  return {
    key,
    icon,
    children,
    label,
    path,
  };
}

const rootSubmenuKeys = ["sub1", "sub2"];

function SiteLayout(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const currentPath = router.pathname;

  let customOpenKeys = false;
  let customOpenKeysVal = [];

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([""]);
  // const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { isAuthCheckedForInit, isAuth } = checkAuth(); // Auth kontrolü ve durumunu alıyoruz
  // setIsAuthCheckedForInitVar(isAuthCheckedForInit);
  // setIsAuthForInitVar(isAuth);

  if (!isAuthCheckedForInit) {
    // Eğer auth kontrolü henüz tamamlanmamışsa burada bir yükleme gösterebiliriz
    return;
  }

  if (!isAuth && currentPath.startsWith("/admin")) {
    return (window.location.href = "/");
  }

  // if (isAuth) {
  //   if (currentPath === "/admin/products/edit-product" || currentPath === "/admin/products/new-product") {
  //     customOpenKeys = true;
  //     customOpenKeysVal = ['sub1'];
  //   } else if (currentPath === "/admin/categories/edit-category" || currentPath === "/admin/categories/new-category") {
  //     customOpenKeys = true;
  //     customOpenKeysVal = ['sub2'];
  //   }
  // }

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const menuOnClickHandler = ({ key }) => {
    if (key !== "3" && key !== "4" && key !== "5" && key !== "6") {
      setOpenKeys([""]);
    }
  };

  // const [selectedKey, setSelectedKey] = useState(items.find(_item => currentPath.startsWith(_item.path)).key);

  // const [isAuthCheckedForInitVar, setIsAuthCheckedForInitVar] = useState("");
  // const [isAuthForInitVar, setIsAuthForInitVar] = useState("");

  const checkAuthFetch = async (path) => {
    let isAuth = false;
    try {
      const axiosConfig = {
        withCredentials: true,
      };

      const response = await axios.get(
        "http://localhost:3500/api/account/check-auth",
        axiosConfig
      );
      console.log("checkAuth çalıştı 2");
      if (response.status === 200 && response.data.status === "success") {
        dispatch(authActions.login());
        isAuth = true;
      } else {
        dispatch(authActions.logout());
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (!isAuth) {
        return (window.location.href = "/");
      } else {
        return router.push(path);
      }
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3500/api/account/logout",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200 && response.data.status === "success") {
        cookies.remove("checkToken");
        cookies.remove("user");
        dispatch(authActions.logout());
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert(
          "Status: " +
            error.response.data.status +
            " Message: " +
            error.response.data.text
        );
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  let layout;
  if (isAuth) {
    const items = [
      getItem(
        <Link
          href="/admin"
          onClick={(e) => {
            e.preventDefault();
            checkAuthFetch("/admin");
          }}
        >
          Dashboard
        </Link>,
        "1",
        <DesktopOutlined />,
        "/admin"
      ),
      getItem(
        <Link
          href="/admin/test"
          onClick={(e) => {
            e.preventDefault();
            checkAuthFetch("/admin/test");
          }}
        >
          Test
        </Link>,
        "2",
        <VideoCameraOutlined />,
        "/admin/test"
      ),
      getItem("Product Management", "sub1", <UserOutlined />, "products", [
        getItem(
          <Link
            href="/admin/products/edit-product"
            onClick={(e) => {
              e.preventDefault();
              checkAuthFetch("/admin/products/edit-product");
            }}
          >
            Edit Product
          </Link>,
          "3",
          "",
          "/admin/products/edit-product"
        ),
        getItem(
          <Link
            href="/admin/products/new-product"
            onClick={(e) => {
              e.preventDefault();
              checkAuthFetch("/admin/products/new-product");
            }}
          >
            New Product
          </Link>,
          "4",
          "",
          "/admin/products/new-product"
        ),
      ]),
      getItem("Category Management", "sub2", <UserOutlined />, "", [
        getItem(
          <Link
            href="/admin/categories/edit-category"
            onClick={(e) => {
              e.preventDefault();
              checkAuthFetch("/admin/categories/edit-category");
            }}
          >
            Edit Category
          </Link>,
          "5",
          "",
          "/admin/categories/edit-category"
        ),
        getItem(
          <Link
            href="/admin/categories/new-category"
            onClick={(e) => {
              e.preventDefault();
              checkAuthFetch("/admin/categories/new-category");
            }}
          >
            New Category
          </Link>,
          "6",
          "",
          "/admin/categories/new-category"
        ),
      ]),
      getItem(
        <Link
          href="/auth/logout"
          onClick={(e) => {
            e.preventDefault();
            logoutHandler();
          }}
        >
          Logout
        </Link>,
        "7",
        <FileOutlined />
      ),
    ];

    // console.log(items);

    // const breadcrumbItems = [
    //   {
    //     path: '/admin',
    //     title: <HomeOutlined />,
    //   },
    //   {
    //     path: '/admin/products/edit-product',
    //     title: (
    //       <>
    //         <UserOutlined />
    //         <span>Edit Product</span>
    //       </>
    //     ),
    //   },
    //   {
    //     title: 'Product',
    //   },
    // ];

    // const breadcrumbItemRender = (route, params, items, paths) => {
    //   items.map((item) => {
    //     const last = items.indexOf(item) === items.length - 1;
    //     return last ? <span>{item.title}</span> : <Link href={paths.join('/')}>{item.title}</Link>;
    //   });
    // };

    const pathNames = currentPath.split("/").filter((item) => item);
    pathNames.shift();
    if (pathNames.includes("[prodId]")) {
      const { prodId } = router.query;
      pathNames.splice(pathNames.length - 1, 1, prodId);
    }

    const myBreadcrumb = (
      <Breadcrumb
        style={{
          margin: "24px 16px 0px",
        }}
        separator=">"
      >
        {pathNames.length > 0 ? (
          <Breadcrumb.Item>
            <Link
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                checkAuthFetch("/admin");
              }}
            >
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item>
            <HomeOutlined />
          </Breadcrumb.Item>
        )}
        {pathNames.map((name, index) => {
          // const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathNames.length - 1;
          let breadIcon;
          let breadName;
          let breadLink;
          let isEditProduct = false;

          switch (name) {
            case "products":
              breadIcon = <UserOutlined />;
              breadName = "Product Management";
              break;
            case "edit-product":
              isEditProduct = true;
              breadName = "Edit Product";
              breadLink = (
                <Link
                  href="/admin/products/edit-product"
                  onClick={(e) => {
                    e.preventDefault();
                    checkAuthFetch("/admin/products/edit-product");
                  }}
                >
                  {breadName}
                </Link>
              );
              break;
            default:
              breadName = name;
              break;
          }
          
          return isLast ? (
            <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>
              {isEditProduct ? (
                <> { breadLink } </>
              ) : (
                <>
                  {breadIcon} <span>{breadName}</span>
                </>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );

    // const items = [
    //   {
    //     key: "1",
    //     icon: <UserOutlined />,
    //     label: (
    //       <Link
    //         href="/admin"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           checkAuthFetch("/admin");
    //         }}
    //       >
    //         Dashboard
    //       </Link>
    //     ),
    //     path: "/admin",
    //   },
    //   {
    //     key: "2",
    //     icon: <VideoCameraOutlined />,
    //     label: (
    //       <Link
    //         href="/admin/test"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           checkAuthFetch("/admin/test");
    //         }}
    //       >
    //         Test
    //       </Link>
    //     ),
    //     path: "/admin/test",
    //   },
    //   {
    //     key: "3",
    //     icon: <UploadOutlined />,
    //     label: (
    //       <Link
    //         href="/admin/products/edit-product"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           checkAuthFetch("/admin/products/edit-product");
    //         }}
    //       >
    //         Edit Product
    //       </Link>
    //     ),
    //     path: "/admin/products/edit-product",
    //   },
    //   {
    //     key: "4",
    //     icon: <UploadOutlined />,
    //     label: (
    //       <Link
    //         href="/admin/products/new-product"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           checkAuthFetch("/admin/products/new-product");
    //         }}
    //       >
    //         New Product
    //       </Link>
    //     ),
    //     path: "/admin/products/new-product",
    //   },
    //   {
    //     key: "5",
    //     icon: <UploadOutlined />,
    //     label: (
    //       <Link
    //         href="/auth/logout"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           logoutHandler();
    //         }}
    //       >
    //         Logout
    //       </Link>
    //     ),
    //     path: "/auth/logout",
    //   },
    // ];

    // setSelectedKey();

    let customSelectedKey = items.find(
      (_item) => currentPath === _item.path
    )?.key;

    if (customSelectedKey === undefined) {
      items.forEach((item) => {
        if (item.children !== undefined) {
          for (let i = 0; i < item.children.length; i++) {
            if (currentPath === item.children[i].path) {
              customSelectedKey = item.children[i].key;
              // if (customSelectedKey === "3" || customSelectedKey === "4") {
              //   console.log(customSelectedKey);
              // } else {
              //   console.log(customSelectedKey);
              // }
              break;
            }
          }
        }
      });
    }

    layout = (
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={classes.demo_logo_vertical} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[customSelectedKey]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={menuOnClickHandler}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          {myBreadcrumb}
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {props.children}
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  } else {
    layout = (
      <div>
        <MainNavigation />
        <main className={classes.main}>{props.children}</main>
      </div>
    );
  }

  return layout;
}

export default SiteLayout;
