import { useEffect, useState } from "react";
import styles from "./Homepage.module.scss";
import { Layout, Input, Select, Spin, Button } from "antd";
import NavBar from "../components/NavBar";
import BookItem from "../components/BookItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setBook } from "../slice/bookSlice";
import { Link } from "react-router-dom";

const { Content } = Layout;
const BASE_URL = "http://localhost:5002/books";

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

export default function Homepage() {
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);

  useEffect(
    function () {
      async function fetchBooks() {
        try {
          const res = await fetch(BASE_URL);
          const data = await res.json();
          dispatch(setBook(data));
        } catch {
          throw new Error("data fetching error");
        }
      }
      fetchBooks();
    },
    [dispatch]
  );

  const filteredBooks = books.filter((book: Book) =>
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
            <div className={styles.empty}>
              <h2>You have no books on your bookshelf yet...</h2>
              <Button type="primary">
                <Link to="/form">Go Add a new book📕</Link>
              </Button>
            </div>
          ) : (
            sortedBooks.map((book) => (
              <BookItem
                book={book}
                //setBooks={setBooks}
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
