import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  ProjectOutlined,
  GlobalOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import Blogger from "../../../assets/Blogger.png";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/user";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      to: "/admin",
    },
    {
      key: "post-management",
      icon: <ProjectOutlined />,
      label: "Post Management",
      children: [
        {
          key: "/admin/post-management/categories",
          icon: <AppstoreOutlined />,
          label: "Categories",
          to: "/admin/post-management/categories",
        },
        {
          key: "/admin/post-management/posts",
          icon: <FileTextOutlined />,
          label: "Posts",
          to: "/admin/post-management/posts",
        },
        {
          key: "/admin/post-management/popup",
          icon: <FileTextOutlined />,
          label: "Popups",
          to: "/admin/post-management/popup",
        },
      ],
    },
    {
      key: "custom-pages",
      icon: <FileTextOutlined />,
      label: "Custom Pages",
      children: [
        {
          key: "/admin/custompages/createpage",
          icon: <AppstoreOutlined />,
          label: "Create Pages",
          to: "/admin/custompages/createpage",
        },
      ],
    },
    {
      key: "footer",
      icon: <GlobalOutlined />,
      label: "Footer",
      children: [
        {
          key: "/admin/footer/logo-text",
          icon: <AppstoreOutlined />,
          label: "Logo & Text",
          to: "/admin/footer/logo-text",
        },
        {
          key: "/admin/footer/quicklinks",
          icon: <FileTextOutlined />,
          label: "Quick Links",
          to: "/admin/footer/quicklinks",
        },
        {
          key: "/admin/footer/slider",
          icon: <FileTextOutlined />,
          label: "Slider Images",
          to: "/admin/footer/slider",
        },
      ],
    },
    {
      key: "/admin/user-management",
      icon: <UserOutlined />,
      label: "User Management",
      to: "/admin/user-management",
    },
  ];

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <img src={Blogger} className="w-40 h-10 mt-10" alt="Logo" />
      </div>
      <Button
        type="link"
        onClick={toggleCollapsed}
        style={{ position: "absolute", right: "16px", top: "16px" }}
      >
        {collapsed ? (
          <MenuOutlined style={{ color: "#fff" }} />
        ) : (
          <CloseOutlined style={{ color: "#fff" }} />
        )}
      </Button>
      <Menu
        className="mt-10"
        theme="light"
        mode="inline"
        defaultSelectedKeys={["/admin"]}
        onClick={({ key }) => {
          navigate(key);
        }}
        inlineCollapsed={collapsed}
        style={{ backgroundColor: "#fff", fontWeight: "600" }}
      >
        {menuItems.map((item) =>
          item.children ? (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>
                  <Link to={child.to} className="hover:text-blue-500">
                    {child.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.to} className="hover:text-blue-500">
                {item.label}
              </Link>
            </Menu.Item>
          )
        )}
      </Menu>
      <div className="mt-4 p-4">
        <Button
          type="primary"
          danger
          className="w-full"
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;
