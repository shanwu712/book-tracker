import React from "react";
import styles from "./FavPage.module.scss";
import { Layout } from "antd";
import NavBar from "../components/NavBar";
const { Content, Footer } = Layout;

export default function FavPage() {
  return (
    <Layout className={styles.fav}>
      <NavBar />
      <Content className={styles.content}>
        <h2>🔖 My Favorites</h2>
      </Content>
    </Layout>
  );
}
