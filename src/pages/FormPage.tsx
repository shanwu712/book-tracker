import React, { useState } from "react";
import axios from "axios";
import styles from "./FormPage.module.scss";
import { Layout, message } from "antd";
import NavBar from "../components/NavBar";
import InfoForm from "../components/InfoForm";

const { Content } = Layout;

const BASE_URL = "http://localhost:5002/books";

interface Data {
  id: string;
  bookName: string;
  description: string;
  image: string;
}

export default function FormPage() {
  async function handleSubmit(formData: Data) {
    console.log("Form Data:", formData);

    try {
      const res = await axios.post(BASE_URL, formData);
      message.success("Book Added successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      message.error("Failed to add book.");
    }
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
