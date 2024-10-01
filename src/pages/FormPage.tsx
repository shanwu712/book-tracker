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
    try {
      const res = await axios.post(BASE_URL, formData);
      message.success(`${formData.bookName} Added successfully!`);
    } catch (error) {
      console.error("Error submitting data:", error);
      message.error("Failed to add the book.");
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
