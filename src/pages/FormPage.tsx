import React, { useState } from "react";
import styles from "./FormPage.module.scss";
import { Layout } from "antd";
import NavBar from "../components/NavBar";
import InfoForm from "../components/InfoForm";

const { Content, Footer } = Layout;

interface Data {
  id: string;
  bookName: string;
  description: string;
  image: string;
}

export default function FormPage() {
  function handleSubmit(formData: Data) {
    console.log("Form Data:", formData);
  }

  return (
    <Layout className={styles.formPage}>
      <NavBar />

      <Content className={styles.content}>
        <InfoForm onSubmit={handleSubmit} />
      </Content>
    </Layout>
  );
}
