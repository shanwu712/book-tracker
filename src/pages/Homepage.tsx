import { useEffect, useMemo, useState } from "react";
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
    name: string;
    comment: string;
  }[];
}

enum SortOrder {
  ASC = "A-Z",
  DESC = "Z-A",
}

export default function Homepage() {
  const [sortOrder, setSortOrder] = useState(SortOrder.ASC);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const books = useSelector((state: RootState) => state.books.books);

  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        dispatch(setBook(data));
      } catch {
        throw new Error("data fetching error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, [dispatch]);

  const sortedBooks = useMemo(() => {
    if (!Array.isArray(books)) {
      return [];
    }

    const filteredBooks = books.filter((book: Book) =>
      book.bookName.toLowerCase().includes(query.toLowerCase())
    );

    return [...filteredBooks].sort((a, b) => {
      if (sortOrder === SortOrder.ASC) {
        return a.bookName.localeCompare(b.bookName);
      } else {
        return b.bookName.localeCompare(a.bookName);
      }
    });
  }, [books, sortOrder, query]);

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
          defaultValue={SortOrder.ASC}
          style={{ width: 68, height: 27 }}
          options={Object.values(SortOrder).map((value) => ({
            value: value,
            label: value,
          }))}
          onChange={setSortOrder}
        />
      </div>

      <Content className={styles.content}>
        {isLoading ? (
          <Spin />
        ) : books.length === 0 ? (
          <div className={styles.empty}>
            <h2>You have no books on your bookshelf yet...</h2>
            <Button type="primary">
              <Link to="/form">Go Add a new book📕</Link>
            </Button>
          </div>
        ) : (
          <div className={styles.book}>
            {sortedBooks.map((book) => (
              <BookItem book={book} key={book.id} showSubBtn={true} />
            ))}
          </div>
        )}
      </Content>
    </Layout>
  );
}
