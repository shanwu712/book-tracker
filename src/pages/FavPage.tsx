import React, { useEffect } from "react";
import styles from "./FavPage.module.scss";
import { Layout } from "antd";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BookItem from "../components/BookItem";
const { Content, Footer } = Layout;

interface Book {
  id: string;
  bookName: string;
  description: string;
  image?: string;
  review?: {
    name: string;
    mail: string;
    comment: string;
  };
}

export default function FavPage() {
  const favorites: Book[] = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  return (
    <Layout className={styles.fav}>
      <NavBar />
      <Content className={styles.content}>
        {favorites.map((book) => (
          <BookItem book={book} key={book.id} />
        ))}
      </Content>
    </Layout>
  );
}
