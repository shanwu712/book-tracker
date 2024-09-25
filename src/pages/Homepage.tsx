import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.scss";
import { Layout, Input, Select } from "antd";
import NavBar from "../components/NavBar";
import BookItem from "../components/BookItem";

const { Content } = Layout;
const BASE_URL = "http://localhost:5002/books";

interface Book {
  id: string;
  bookName: string;
  description: string;
  image: string;
  review?: {
    name: string;
    mail: string;
    comment: string;
  };
}

export default function Homepage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortOrder, setSortOrder] = useState("A-Z");

  useEffect(function () {
    async function fetchBooks() {
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        setBooks(data);
      } catch {
        throw new Error("data fetching error");
      }
    }
    fetchBooks();
  }, []);

  const sortedBooks = [...books].sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.bookName.localeCompare(b.bookName);
    } else {
      return b.bookName.localeCompare(a.bookName);
    }
  });

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
          onChange={setSortOrder}
        />
      </div>

      <Content className={styles.content}>
        <div className={styles.book}>
          {books.length === 0 ? (
            <p>Loading...</p>
          ) : (
            sortedBooks.map((book) => (
              <BookItem book={book} setBooks={setBooks} key={book.id} />
            ))
          )}
        </div>
      </Content>
    </Layout>
  );
}
