import React from "react";
import styles from "./FormPage.module.scss";
import { Layout } from "antd";

import NavBar from "../components/NavBar";
import PicsUpload from "../components/PicsUpload";
import InfoForm from "../components/InfoForm";

const { Content, Footer } = Layout;

export default function FormPage() {
  return (
    <Layout className={styles.formPage}>
      <NavBar />

      <Content className={styles.content}>
        <PicsUpload />
        <InfoForm />
      </Content>
    </Layout>
  );
}
