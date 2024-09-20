import React from "react";
import styles from "./NavBar.module.scss";
import { Menu, MenuProps } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const items: MenuProps["items"] = [
  { key: "/", label: <NavLink to="/">Homepage</NavLink> },
  { key: "/favorite", label: <NavLink to="/favorite">My Favorite</NavLink> },
  { key: "/form", label: <NavLink to="/form">Add a New Book</NavLink> },
];

export default function NavBar() {
  const location = useLocation();

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items}
      className={styles.nav}
    />
  );
}
