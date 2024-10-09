import React, { useEffect } from "react";
import styles from "./FavPage.module.scss";
import { Button, Layout } from "antd";
import { HeartFilled } from "@ant-design/icons";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BookItem from "../components/BookItem";
import { Link } from "react-router-dom";
const { Content } = Layout;

interface Book {
  id: string;
  bookName: string;
  description: string;
  image?: string;
  review?: {
    name?: string;
    comment?: string;
  };
}

export default function FavPage() {
  const favorites: string[] = useSelector(
    (state: RootState) => state.books.favorites
  );

  const books: Book[] = useSelector((state: RootState) => state.books.books);

  const likedBooks = books.filter((book) => favorites.includes(book.id));

  return (
    <Layout className={styles.fav}>
      <NavBar />
      <Content className={styles.content}>
        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <h2>
              <HeartFilled
                style={{ color: "rgb(244, 192, 219)", marginRight: "6px" }}
              />
              Add books to favorites on Homepage
            </h2>
            <Button type="primary">
              <Link to="/">👈Back to Homepage</Link>
            </Button>
          </div>
        ) : (
          likedBooks.map((book) => (
            <BookItem book={book} key={book.id} showSubBtn={false} />
          ))
        )}
      </Content>
    </Layout>
  );
}
