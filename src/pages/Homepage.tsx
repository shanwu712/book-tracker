import { useEffect, useState } from "react";
import styles from "./Homepage.module.scss";
import { Layout, Input, Select, Spin } from "antd";
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
    comment: string;
  };
}

export default function Homepage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [query, setQuery] = useState("");

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

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(query.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.bookName.localeCompare(b.bookName);
    } else {
      return b.bookName.localeCompare(a.bookName);
    }
  });

  return (
    <Layout className={styles.homepage}>
      <NavBar />
      <Input
        placeholder="Search..."
        className={styles.search}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

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
            <Spin size="large" />
          ) : (
            sortedBooks.map((book) => (
              <BookItem
                book={book}
                setBooks={setBooks}
                key={book.id}
                showSubBtn={true}
              />
            ))
          )}
        </div>
      </Content>
    </Layout>
  );
}
