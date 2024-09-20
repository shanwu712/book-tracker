import React from "react";
import styles from "./Homepage.module.scss";
import { Layout, Input, Select } from "antd";
import NavBar from "../components/NavBar";

const { Content } = Layout;

export default function Homepage() {
  return (
    <Layout className={styles.homepage}>
      <NavBar />
      <Input placeholder="Search..." className={styles.search} />

      <div className={styles.sort}>
        <h4>Sort By:</h4>
        <Select
          defaultValue="A-Z"
          style={{ width: 68, height: 27 }}
          options={[
            { value: "A-Z", label: "A-Z" },
            { value: "Z-A", label: "Z-A" },
          ]}
        />
      </div>

      <Content className={styles.content}>
        <h2>homepage</h2>
      </Content>
    </Layout>
  );
}
