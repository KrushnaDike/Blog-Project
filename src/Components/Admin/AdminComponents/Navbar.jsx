import React from "react";
import { Button } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Navbar = ({ collapsed, setCollapsed }) => {
  const { user } = useSelector((state) => state.user);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleDarkMode = () => {
    // Implement dark mode functionality
    console.log("Switching to dark mode");
  };

  const handleLightMode = () => {
    // Implement light mode functionality
    console.log("Switching to light mode");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white sticky top-0 shadow-md z-50">
      {/* Toggle Button */}
      <Button
        type="link"
        onClick={toggleCollapsed}
        style={{ marginRight: "1rem" }}
      >
        {collapsed ? (
          <MenuOutlined style={{ fontSize: "1.5rem" }} />
        ) : (
          <CloseOutlined style={{ fontSize: "1.5rem" }} />
        )}
      </Button>

      {/* Dark and Light Mode Buttons */}
      <div className="flex items-center ml-auto space-x-4">
        <Button
          type="link"
          onClick={handleDarkMode}
          icon={<MoonOutlined />}
          className="hidden md:inline"
        />
        <Button
          type="link"
          onClick={handleLightMode}
          icon={<SunOutlined />}
          className="hidden md:inline"
        />

        {/* Responsive Dark and Light Mode Buttons */}
        <div className="md:hidden">
          <Button
            type="link"
            onClick={handleDarkMode}
            icon={<MoonOutlined />}
          />
          <Button
            type="link"
            onClick={handleLightMode}
            icon={<SunOutlined />}
          />
        </div>

        {/* User Icon */}
        <div className="flex items-center">
          <UserOutlined style={{ fontSize: "1.5rem" }} />
          <span className="ml-2">{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
