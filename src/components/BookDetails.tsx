import { Avatar, Button, Input, Modal, message } from "antd";
import styles from "./BookDetails.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editFavBook, removeFavorite } from "../slice/FavoritesSlice";
import { useState } from "react";
import { editBook } from "../slice/bookSlice";
import TextArea from "antd/es/input/TextArea";
import { RootState } from "../store";
const { confirm } = Modal;

const BASE_URL = "http://localhost:5002/books";

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  book: Book;
  setBooks: any;
  showSubBtn?: boolean;
}

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

export default function BookDetails({
  onClose,
  open,
  book,
  setBooks,
  showSubBtn,
}: BookModalProps) {
  const [editing, setEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(book);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const { id, bookName, image, review } = book;

  const dispatch = useDispatch();

  async function handleDelete() {
    Modal.confirm({
      title: `Are you sure you want to remove "${bookName}"?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async function () {
        try {
          await axios.delete(`${BASE_URL}/${id}`);

          setBooks((prevBooks: Book[]) =>
            prevBooks.filter((book) => book.id !== id)
          );

          dispatch(removeFavorite(id));

          message.success(`${bookName} is removed successfully!`);
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      },
    });
  }

  async function handleEdit() {
    if (editing) {
      try {
        const res = await axios.put(`${BASE_URL}/${id}`, editedBook);

        setBooks((prevBooks: Book[]) =>
          prevBooks.map((book) => (book.id === id ? res.data : book))
        );

        dispatch(editBook(res.data));

        //not an ideal way
        const isFavorite = favorites.some((fav) => fav.id === res.data.id);
        if (isFavorite) {
          dispatch(editFavBook(res.data));
        }
      } catch (error) {
        console.error("Error editing book details", error);
      }
    }
    setEditing(!editing);
  }

  function handleInputChange(e: any) {
    const { name, value } = e.target;

    if (name === "comment") {
      setEditedBook((prevBook) => ({
        ...prevBook,
        review: {
          ...prevBook.review,
          comment: value,
        },
      }));
    }
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  }

  function handleClose() {
    if (!editing) {
      onClose();
    } else {
      confirm({
        title: "Incomplete editing! ",
        content: "Are you sure you want to finish editing without saving?",
        onOk() {
          setEditing(false);
          onClose();
        },
        onCancel() {},
      });
    }
  }

  return (
    <>
      <Modal
        title={bookName}
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
        footer={(_, { OkBtn }) => (
          <>
            {showSubBtn && (
              <>
                <Button key="delete" onClick={handleDelete}>
                  Remove This Book
                </Button>
                <Button key="edit" onClick={handleEdit}>
                  {editing ? "Confirm" : "Edit"}
                </Button>
              </>
            )}

            <OkBtn />
          </>
        )}
        className={styles.detail}
      >
        {editing ? (
          <div className={styles.detailContent}>
            <img alt="example" src={editedBook.image} style={{ height: 170 }} />
            <TextArea
              style={{ minHeight: "200px", maxHeight: "none", width: "330px" }}
              name="description"
              defaultValue={editedBook.description}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div className={styles.detailContent}>
            <img alt="example" src={image} style={{ height: 170 }} />
            <p>{editedBook.description}</p>
          </div>
        )}

        {review?.name !== "" && review?.comment !== "" && (
          <div className={styles.review}>
            <Avatar size={64}>{review?.name?.split(" ")[0]}</Avatar>
            {editing ? (
              <span>
                <h4>{review?.name}</h4>
                <TextArea
                  style={{ minHeight: "120px", maxHeight: "none" }}
                  name="comment"
                  defaultValue={review?.comment}
                  onChange={handleInputChange}
                />
              </span>
            ) : (
              <span>
                <h4>{review?.name}</h4>
                <p>{editedBook.review?.comment}</p>
              </span>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
